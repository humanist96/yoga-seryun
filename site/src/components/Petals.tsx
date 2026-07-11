import type { CSSProperties } from 'react'

interface PetalConfig {
  left: string
  size: number
  duration: number
  delay: number
  sway: number
  rotate: number
}

const PETALS: readonly PetalConfig[] = [
  { left: '6%', size: 28, duration: 20, delay: 0, sway: 42, rotate: 210 },
  { left: '18%', size: 20, duration: 26, delay: -5, sway: -34, rotate: -160 },
  { left: '34%', size: 24, duration: 22, delay: -9, sway: 50, rotate: 180 },
  { left: '48%', size: 18, duration: 28, delay: -2, sway: -46, rotate: 240 },
  { left: '62%', size: 30, duration: 18, delay: -7, sway: 36, rotate: -200 },
  { left: '74%', size: 21, duration: 24, delay: -11, sway: -28, rotate: 190 },
  { left: '86%', size: 26, duration: 21, delay: -4, sway: 40, rotate: -230 },
  { left: '94%', size: 19, duration: 27, delay: -13, sway: -36, rotate: 170 },
]

function PetalShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path
        d="M10 1C15 8 16 16 10 27C4 16 5 8 10 1Z"
        fill="currentColor"
        fillOpacity="0.68"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="0.7"
      />
    </svg>
  )
}

const petalStyle = (petal: PetalConfig): CSSProperties =>
  ({
    left: petal.left,
    '--petal-duration': `${petal.duration}s`,
    '--petal-delay': `${petal.delay}s`,
    '--petal-sway': `${petal.sway}px`,
    '--petal-rotate': `${petal.rotate}deg`,
  }) as CSSProperties

/**
 * 히어로 위로 아주 느리게 떨어지는 연꽃잎.
 * JS 엔진이 아닌 순수 CSS keyframes로 구동 — 기기의 '동작 줄이기' 설정과
 * 무관하게 항상 재생된다(느리고 부드러운 장식 모션이라 의도적으로 허용).
 * 음수 delay로 첫 화면부터 꽃잎이 낙하 중간 지점에 분포한다.
 */
export default function Petals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PETALS.map((petal) => (
        <div key={petal.left} className="petal text-accent" style={petalStyle(petal)}>
          <PetalShape size={petal.size} />
        </div>
      ))}
    </div>
  )
}
