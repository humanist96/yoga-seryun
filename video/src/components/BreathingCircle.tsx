import { useCurrentFrame, useVideoConfig } from 'remotion'
import { breathScale } from '../lib/anim'
import { COLORS } from '../config/theme'

interface BreathingCircleProps {
  size?: number
  opacity?: number
}

/** 들숨 4초 · 날숨 6초로 숨 쉬는 원 + 위상차 링 — 웹사이트 시그니처의 영상판 */
export default function BreathingCircle({ size = 760, opacity = 1 }: BreathingCircleProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scale = breathScale(frame, fps, 0.12)
  const ringScale = 2.06 - scale // 반대 위상

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        opacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent} 0%, ${COLORS.accent} 62%, transparent 72%)`,
          opacity: 0.12,
          transform: `scale(${scale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: size * 0.08,
          borderRadius: '50%',
          border: `1.5px solid ${COLORS.accent}`,
          opacity: 0.28,
          transform: `scale(${ringScale})`,
        }}
      />
    </div>
  )
}
