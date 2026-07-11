import { interpolate } from 'remotion'

/** 들숨 4초 · 날숨 6초 호흡 곡선 — 1 ~ 1+amplitude 스케일 */
export const breathScale = (frame: number, fps: number, amplitude = 0.12): number => {
  const t = (frame / fps) % 10
  const phase = t < 4 ? t / 4 : 1 - (t - 4) / 6
  const eased = 0.5 - 0.5 * Math.cos(Math.PI * phase)
  return 1 + eased * amplitude
}

/** 씬 진입 페이드+라이즈 (fadeUp의 영상판) */
export const fadeUp = (frame: number, startFrame: number, durationFrames = 18) => {
  const progress = interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const eased = 1 - Math.pow(1 - progress, 3)
  return { opacity: eased, transform: `translateY(${(1 - eased) * 26}px)` }
}

/** 씬 전체 크로스 페이드 인 */
export const sceneFadeIn = (frame: number, durationFrames = 14): number =>
  interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
