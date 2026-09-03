// HedPop palette — dramatically different themes per gender:
//   • Male   = full dark theme with the logo's PEACH/CORAL accent (#FFA77F)
//   • Female = full light theme with ROSE GOLD accents (white bg, black text)
//
// Every token below is swapped when applyTheme() runs, so backgrounds, text,
// borders, cards, inputs — the entire surface — flips between light and dark.

const base = {
  danger: '#F63100',
  success: '#34C759',
  placeholder: '#999',
};

// MALE — full dark theme, logo peach/coral accent
export const malePalette = {
  primary: '#FFA77F',
  primaryDark: '#E0824F',
  accent: '#FFC9A3',
  primaryTint: 'rgba(255,167,127,0.12)',
  primaryGlow: 'rgba(255,167,127,0.38)',

  background: '#000',
  surface: '#100d0a',
  surfaceAlt: '#1c1712',
  surfaceDeep: '#150f0b',
  surfaceTranslucent: 'rgba(21,15,11,0.88)',

  text: '#ffffff',
  textMuted: '#ffffffde',
  textFaint: '#ffffff9e',
  textDisabled: '#ffffff60',
  textInverse: '#000000',

  border: '#333333',
  borderDark: '#444444',
  borderFaint: '#222222',

  inputBg: '#1c1712',
  inputBgLight: '#1c1712',
  inputBorder: '#3d3126',

  gradientStart: '#FFA77F',
  gradientEnd: '#E0824F',
  headerAccent: '#FFA77F',

  statusBarStyle: 'light-content',
};

// FEMALE — full light theme with elegant ROSE GOLD accents
export const femalePalette = {
  primary: '#B76E79',
  primaryDark: '#8E4A55',
  accent: '#E8B4B8',
  primaryTint: 'rgba(183,110,121,0.10)',
  primaryGlow: 'rgba(183,110,121,0.28)',

  background: '#ffffff',
  surface: '#fdfafa',
  surfaceAlt: '#f7ecee',
  surfaceDeep: '#ffffff',
  surfaceTranslucent: 'rgba(253,248,249,0.94)',

  text: '#1a1416',
  textMuted: '#1a1416cc',
  textFaint: '#00000080',
  textDisabled: '#00000055',
  textInverse: '#ffffff',

  border: '#ead6da',
  borderDark: '#d4b8be',
  borderFaint: '#f2e2e5',

  inputBg: '#f7ecee',
  inputBgLight: '#f7ecee',
  inputBorder: '#e0c4c9',

  gradientStart: '#B76E79',
  gradientEnd: '#8E4A55',
  headerAccent: '#B76E79',

  statusBarStyle: 'dark-content',
};

export const paletteFor = (gender) =>
  gender === 'female' ? femalePalette : malePalette;

// Live singleton — mutated so lingering module-scoped reads stay consistent.
export const colors = { ...base, ...malePalette };

export const applyTheme = (gender) => {
  const p = paletteFor(gender);
  Object.keys(p).forEach((k) => { colors[k] = p[k]; });
};

export default colors;
