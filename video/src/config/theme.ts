/** 웹사이트(site/src/index.css)와 동일한 "연꽃빛 새벽" 토큰 */
export const COLORS = {
  background: 'hsl(20, 45%, 98%)',
  foreground: 'hsl(340, 16%, 22%)',
  card: 'hsl(348, 35%, 96%)',
  mutedForeground: 'hsl(340, 8%, 46%)',
  accent: 'hsl(346, 42%, 55%)',
  accentDeep: 'hsl(346, 45%, 44%)',
  accentSoft: 'hsl(348, 45%, 90%)',
  sage: 'hsl(100, 12%, 62%)',
  plum: 'hsl(340, 20%, 16%)',
  plumSoft: 'hsl(340, 16%, 24%)',
  plumForeground: 'hsl(20, 45%, 97%)',
} as const

export const FONTS = {
  serif: 'MaruBuri, serif',
  sans: 'Pretendard, sans-serif',
  latin: '"Instrument Serif", Georgia, serif',
} as const

/** 쇼츠/릴스 UI에 가리지 않는 세이프 존 (1920 기준) */
export const SAFE = { top: 220, bottom: 340, side: 84 } as const
