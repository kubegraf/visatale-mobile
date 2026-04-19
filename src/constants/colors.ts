export const Colors = {
  teal: '#0D9488',
  tealLight: '#14B8A6',
  tealDark: '#0F766E',
  emerald: '#059669',
  emeraldLight: '#10B981',
  amber: '#F59E0B',
  amberLight: '#FCD34D',
  ink: '#0A1628',
  inkLight: '#1A2840',
  slate: '#4A5568',
  muted: '#94A3B8',
  surface: '#F0FAF8',
  surfaceAlt: '#E8F5F2',
  border: '#E4EDE9',
  canvas: '#FAFCFB',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  white: '#FFFFFF',
  black: '#000000',

  // Nav dark background (LiveStatus)
  navy: '#0B1220',
  navyLight: '#0F1929',

  // Gradients
  gradientTeal: ['#0D9488', '#059669'] as [string, string],
  gradientTealDark: ['#0A1628', '#0D9488'] as [string, string],
  gradientAmber: ['#F59E0B', '#D97706'] as [string, string],

  // Status colors
  statusApproved: '#059669',
  statusPending: '#F59E0B',
  statusProcessing: '#0D9488',
  statusRejected: '#EF4444',
  statusDraft: '#94A3B8',
} as const;

export type ColorKey = keyof typeof Colors;
