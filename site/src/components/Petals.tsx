import { motion, useReducedMotion } from 'framer-motion'

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
  { left: '18%', size: 20, duration: 26, delay: 5, sway: -34, rotate: -160 },
  { left: '34%', size: 24, duration: 22, delay: 9, sway: 50, rotate: 180 },
  { left: '48%', size: 18, duration: 28, delay: 2, sway: -46, rotate: 240 },
  { left: '62%', size: 30, duration: 18, delay: 7, sway: 36, rotate: -200 },
  { left: '74%', size: 21, duration: 24, delay: 11, sway: -28, rotate: 190 },
  { left: '86%', size: 26, duration: 21, delay: 4, sway: 40, rotate: -230 },
  { left: '94%', size: 19, duration: 27, delay: 13, sway: -36, rotate: 170 },
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

/** 동작 줄이기 설정 기기: 낙하 대신 고정된 꽃잎을 흩뿌려 보여준다 */
function StaticPetals() {
  const positions = ['12%', '30%', '58%', '76%', '90%'] as const

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {positions.map((left, index) => (
        <div
          key={left}
          className="absolute text-accent opacity-50"
          style={{
            left,
            top: `${12 + index * 16}%`,
            transform: `rotate(${index * 70 - 30}deg)`,
          }}
        >
          <PetalShape size={PETALS[index]?.size ?? 20} />
        </div>
      ))}
    </div>
  )
}

/** 히어로 위로 아주 느리게 떨어지는 연꽃잎 — 시그니처는 이 한 곳에만 */
export default function Petals() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <StaticPetals />

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PETALS.map((petal) => (
        <motion.div
          key={petal.left}
          className="absolute text-accent"
          style={{ left: petal.left, top: '-6%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.sway, petal.sway * 0.35, petal.sway * 0.8],
            rotate: [0, petal.rotate],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.12, 0.85, 1],
          }}
        >
          <PetalShape size={petal.size} />
        </motion.div>
      ))}
    </div>
  )
}
