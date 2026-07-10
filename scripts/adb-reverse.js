#!/usr/bin/env node
// Re-establish ADB port forwarding so the phone can reach Metro (8081)
// and the backend (5000). Safe to run anytime; idempotent.
// Runs automatically as `prestart` / `preandroid` (see package.json).

const { execSync } = require('child_process');

const PORTS = [5000, 8081];

function run(cmd) {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return e.stderr?.toString() || ''; }
}

const devices = run('adb devices').split('\n').slice(1).filter((l) => /\tdevice$/.test(l));
if (devices.length === 0) {
  console.log('[adb-reverse] No device attached — skipping.');
  process.exit(0);
}

for (const port of PORTS) {
  run(`adb reverse tcp:${port} tcp:${port}`);
}
const list = run('adb reverse --list').trim();
console.log('[adb-reverse] Active:');
console.log(list.split('\n').map((l) => '  ' + l).join('\n'));
