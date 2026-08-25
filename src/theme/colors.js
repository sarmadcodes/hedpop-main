// HedPop palette — dramatically different themes per gender:
//   • Male   = full dark theme with GOLD accents (black bg, white text)
//   • Female = full light theme with COPPER accents (white bg, black text)
//
// Every token below is swapped when applyTheme() runs, so backgrounds, text,
// borders, cards, inputs — the entire surface — flips between light and dark.

const base = {
  danger: '#F63100',
  success: '#34C759',
  placeholder: '#999',
};

// MALE — full dark theme, gold accents
export const malePalette = {
  primary: '#F5C518',
  primaryDark: '#B8941F',
  accent: '#FFEB99',
  primaryTint: 'rgba(245,197,24,0.10)',
  primaryGlow: 'rgba(245,197,24,0.35)',

  background: '#000',
  surface: '#0f0e0a',
  surfaceAlt: '#1a180f',
  surfaceDeep: '#141208',
  surfaceTranslucent: 'rgba(20,18,8,0.88)',

  text: '#ffffff',
  textMuted: '#ffffffde',
  textFaint: '#ffffff9e',
  textDisabled: '#ffffff60',
  textInverse: '#000000',

  border: '#333333',
  borderDark: '#444444',
  borderFaint: '#222222',

  inputBg: '#1a180f',
  inputBgLight: '#1a180f',
  inputBorder: '#3a3520',

  gradientStart: '#F5C518',
  gradientEnd: '#B8941F',
  headerAccent: '#F5C518',

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
