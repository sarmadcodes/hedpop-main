// Lazy Socket.IO client. Imports socket.io-client only when first used so the
// app still boots if the package hasn't been installed yet.

import env from '../config/env';

let socket = null;
let socketLib = null;

function getSocketLib() {
  if (socketLib !== null) return socketLib;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    socketLib = require('socket.io-client');
  } catch {
    socketLib = false;
  }
  return socketLib;
}

// Strip the /api/v1 suffix — socket.io connects to the server root.
const SOCKET_URL = env.API_BASE_URL.replace(/\/api\/v1\/?$/, '');

export function getSocket() {
  if (socket) return socket;
  const lib = getSocketLib();
  if (!lib) return null;
  socket = lib.io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
  });
  return socket;
}

export function subscribeToSlots(salon, date, handlers) {
  const s = getSocket();
  if (!s) return () => {};

  // Back-compat: callers used to pass a single function (onBookingCreated).
  // Normalize to { onCreated, onCancelled }.
  const created = typeof handlers === 'function' ? handlers : handlers?.onCreated;
  const cancelled = typeof handlers === 'function' ? null : handlers?.onCancelled;

  s.emit('subscribe', { salon, date });
  if (created) s.on('booking:created', created);
  if (cancelled) s.on('booking:cancelled', cancelled);

  return () => {
    s.emit('unsubscribe', { salon, date });
    if (created) s.off('booking:created', created);
    if (cancelled) s.off('booking:cancelled', cancelled);
  };
}

export default getSocket;
