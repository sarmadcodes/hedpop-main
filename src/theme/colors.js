// HedPop palette — the male (gold) and female (copper) themes swap not just
// the primary accent but tinted surfaces, borders, inputs, and gradients so
// the two themes read as visually distinct across the whole app.

const base = {
  background: '#000',
  danger: '#F63100',
  success: '#34C759',

  text: '#fff',
  textMuted: '#ffffffde',
  textFaint: '#ffffff9e',
  textDisabled: '#ffffff60',
  textInverse: '#000',

  border: '#ccc',
  borderDark: '#444',
  borderFaint: '#333',

  inputBgLight: '#f2f2f2',
  placeholder: '#ccc',
};

// GOLD — bright, saturated. Cool black surfaces with warm gold tint.
export const malePalette = {
  primary: '#F5C518',
  primaryDark: '#B8941F',
  accent: '#FFEB99',
  primaryTint: 'rgba(245,197,24,0.10)',
  primaryGlow: 'rgba(245,197,24,0.35)',

  surface: '#0f0e0a',              // slightly gold-warm dark
  surfaceAlt: '#1a180f',           // card fill
  surfaceDeep: '#141208',
  surfaceTranslucent: 'rgba(20,18,8,0.88)',
  inputBg: '#1a180f',
  inputBorder: '#3a3520',

  gradientStart: '#F5C518',
  gradientEnd: '#B8941F',
  headerAccent: '#F5C518',
};

// COPPER — warm orange-brown. Warm black surfaces with copper tint.
export const femalePalette = {
  primary: '#C46A2E',
  primaryDark: '#8B4513',
  accent: '#E8A87C',
  primaryTint: 'rgba(196,106,46,0.12)',
  primaryGlow: 'rgba(196,106,46,0.40)',

  surface: '#100b08',               // slightly copper-warm dark
  surfaceAlt: '#1c130d',            // card fill
  surfaceDeep: '#160e09',
  surfaceTranslucent: 'rgba(28,19,13,0.88)',
  inputBg: '#1c130d',
  inputBorder: '#3d2a1d',

  gradientStart: '#C46A2E',
  gradientEnd: '#8B4513',
  headerAccent: '#C46A2E',
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
