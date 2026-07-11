import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { COLORS } from '../config/theme'

interface PetalConfig {
  left: string
  size: number
  duration: number
  delay: number
  sway: number
  rotate: number
}

/** 웹사이트 Petals와 동일한 구성값 */
const PETALS: readonly PetalConfig[] = [
  { left: '6%', size: 56, duration: 20, delay: 0, sway: 84, rotate: 210 },
  { left: '18%', size: 40, duration: 26, delay: -5, sway: -68, rotate: -160 },
  { left: '34%', size: 48, duration: 22, delay: -9, sway: 100, rotate: 180 },
  { left: '48%', size: 36, duration: 28, delay: -2, sway: -92, rotate: 240 },
  { left: '62%', size: 60, duration: 18, delay: -7, sway: 72, rotate: -200 },
  { left: '74%', size: 42, duration: 24, delay: -11, sway: -56, rotate: 190 },
  { left: '86%', size: 52, duration: 21, delay: -4, sway: 80, rotate: -230 },
  { left: '94%', size: 38, duration: 27, delay: -13, sway: -72, rotate: 170 },
]

function petalOpacity(progress: number): number {
  if (progress < 0.1) return (progress / 0.1) * 0.75
  if (progress > 0.85) return ((1 - progress) / 0.15) * 0.75
  return 0.75
}

export default function Petals() {
  const frame = useCurrentFrame()
  const { fps, height } = useVideoConfig()

  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      {PETALS.map((petal) => {
        const cycle = petal.duration * fps
        const raw = (frame - petal.delay * fps) / cycle
        const progress = ((raw % 1) + 1) % 1
        const y = (-0.08 + progress * 1.16) * height
        const x = Math.sin(progress * Math.PI * 2) * petal.sway
        const rotate = progress * petal.rotate

        return (
          <div
            key={petal.left}
            style={{
              position: 'absolute',
              left: petal.left,
              top: 0,
              transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`,
              opacity: petalOpacity(progress),
            }}
          >
            <svg
              width={petal.size}
              height={petal.size * 1.4}
              viewBox="0 0 20 28"
              fill="none"
            >
              <path
                d="M10 1C15 8 16 16 10 27C4 16 5 8 10 1Z"
                fill={COLORS.accent}
                fillOpacity={0.68}
                stroke={COLORS.accent}
                strokeOpacity={0.55}
                strokeWidth={0.7}
              />
            </svg>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
