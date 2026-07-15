const OPT_WIDTHS = [480, 960, 1600] as const

/** '/media/gallery/x.jpg' → scripts/images.mjs가 생성한 WebP srcset 문자열 */
export const webpSrcSet = (src: string): string => {
  const base = src.split('/').pop()?.replace(/\.jpg$/, '') ?? ''
  return OPT_WIDTHS.map((width) => `/media/opt/${base}-${width}.webp ${width}w`).join(', ')
}
