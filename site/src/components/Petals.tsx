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
  { left: '8%', size: 22, duration: 26, delay: 0, sway: 40, rotate: 210 },
  { left: '22%', size: 15, duration: 32, delay: 6, sway: -32, rotate: -160 },
  { left: '46%', size: 19, duration: 28, delay: 12, sway: 48, rotate: 180 },
  { left: '64%', size: 14, duration: 34, delay: 3, sway: -44, rotate: 240 },
  { left: '81%', size: 23, duration: 30, delay: 9, sway: 34, rotate: -200 },
  { left: '92%', size: 17, duration: 36, delay: 16, sway: -26, rotate: 190 },
]

function PetalShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path
        d="M10 1C15 8 16 16 10 27C4 16 5 8 10 1Z"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
    </svg>
  )
}

/** 히어로 위로 아주 느리게 떨어지는 연꽃잎 — 시그니처는 이 한 곳에만 */
export default function Petals() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

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
            opacity: [0, 0.55, 0.55, 0],
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
