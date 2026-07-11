import { AbsoluteFill } from 'remotion'
import { COLORS } from '../config/theme'

interface GlowBackgroundProps {
  base?: string
  roseOpacity?: number
  sageOpacity?: number
}

/**
 * 새벽빛 라디얼 글로우 배경 — 웹사이트 AmbientGlow의 영상판.
 * blur 필터 대신 radial-gradient 사용 (헤드리스 렌더 부하 방지).
 */
export default function GlowBackground({
  base = COLORS.background,
  roseOpacity = 0.65,
  sageOpacity = 0.3,
}: GlowBackgroundProps) {
  return (
    <AbsoluteFill style={{ backgroundColor: base }}>
      <div
        style={{
          position: 'absolute',
          width: 1600,
          height: 1600,
          top: -650,
          right: -550,
          background: `radial-gradient(circle, ${COLORS.accentSoft} 0%, rgba(241,219,223,0.4) 40%, transparent 68%)`,
          opacity: roseOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1400,
          height: 1400,
          bottom: -600,
          left: -520,
          background: `radial-gradient(circle, ${COLORS.sage} 0%, rgba(153,167,145,0.35) 40%, transparent 68%)`,
          opacity: sageOpacity,
        }}
      />
    </AbsoluteFill>
  )
}
