import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../config/theme'

interface LotusLogoProps {
  size?: number
  color?: string
  /** 선이 그려지는 개화 애니메이션 시작 프레임 (씬 로컬). undefined면 정적 표시 */
  drawFrom?: number
  drawDurationFrames?: number
}

const PATHS = [
  'M16 6c-2.2 3-3.2 6.2-3.2 9.4 0 3.4 1.4 6 3.2 7.6 1.8-1.6 3.2-4.2 3.2-7.6 0-3.2-1-6.4-3.2-9.4Z',
  'M8.4 11.5c-.4 3.6.5 6.9 2.4 9.2 1.1 1.3 2.4 2.2 3.9 2.7',
  'M23.6 11.5c.4 3.6-.5 6.9-2.4 9.2-1.1 1.3-2.4 2.2-3.9 2.7',
  'M5 18.2c1 2.8 3 4.9 5.6 6 1.6.7 3.4 1 5.4 1s3.8-.3 5.4-1c2.6-1.1 4.6-3.2 5.6-6',
]

/** 연꽃 선화 로고 — drawFrom 지정 시 획이 순서대로 그려지는 개화 연출 */
export default function LotusLogo({
  size = 160,
  color = COLORS.accent,
  drawFrom,
  drawDurationFrames = 50,
}: LotusLogoProps) {
  const frame = useCurrentFrame()
  const perPath = drawDurationFrames / PATHS.length

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    >
      {PATHS.map((d, index) => {
        const offset =
          drawFrom === undefined
            ? 0
            : interpolate(
                frame,
                [drawFrom + index * perPath * 0.6, drawFrom + index * perPath * 0.6 + perPath],
                [1, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              )
        return (
          <path
            key={d}
            d={d}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={offset}
          />
        )
      })}
    </svg>
  )
}
