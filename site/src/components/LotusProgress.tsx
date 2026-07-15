import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { scrollToSection } from '../lib/scroll'

const LOTUS_PATHS = [
  'M16 6c-2.2 3-3.2 6.2-3.2 9.4 0 3.4 1.4 6 3.2 7.6 1.8-1.6 3.2-4.2 3.2-7.6 0-3.2-1-6.4-3.2-9.4Z',
  'M8.4 11.5c-.4 3.6.5 6.9 2.4 9.2 1.1 1.3 2.4 2.2 3.9 2.7',
  'M23.6 11.5c.4 3.6-.5 6.9-2.4 9.2-1.1 1.3-2.4 2.2-3.9 2.7',
  'M5 18.2c1 2.8 3 4.9 5.6 6 1.6.7 3.4 1 5.4 1s3.8-.3 5.4-1c2.6-1.1 4.6-3.2 5.6-6',
] as const

/** 스크롤 진행도에 따라 획이 하나씩 그려지는 연꽃 획 */
function LotusPath({ d, index, progress }: { d: string; index: number; progress: ReturnType<typeof useSpring> }) {
  const segment = 0.92 / LOTUS_PATHS.length
  const start = index * segment
  const pathLength = useTransform(progress, [start, start + segment], [0, 1])

  return <motion.path d={d} pathLength={1} style={{ pathLength }} strokeDasharray="1 1" />
}

/**
 * 연꽃 개화 스크롤 프로그레스 — 스크롤(수련의 여정)에 따라 꽃잎 획이
 * 한 장씩 그려지고, 페이지 끝에서 만개(글로우)한다. 누르면 맨 위로. (기획서 B1)
 */
export default function LotusProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const bloomOpacity = useTransform(progress, [0.92, 1], [0, 1])
  const bloomScale = useTransform(progress, [0.92, 1], [0.8, 1])
  const visibility = useTransform(progress, [0, 0.02, 0.03], [0, 0, 1])

  return (
    <motion.button
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => scrollToSection('top')}
      style={{ opacity: visibility, y: '-50%' }}
      className="fixed z-40 right-4 md:right-6 top-1/2 hidden sm:flex items-center justify-center w-11 h-11 rounded-full hover:shadow-[0_8px_24px_-8px_rgba(188,92,116,0.45)] transition-shadow"
    >
      <span aria-hidden="true" className="liquid-glass absolute inset-0 rounded-full" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-accent/15 blur-[6px]"
        style={{ opacity: bloomOpacity, scale: bloomScale }}
      />
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="relative w-6 h-6 text-accent-deep"
        aria-hidden="true"
      >
        {LOTUS_PATHS.map((d, index) => (
          <LotusPath key={d} d={d} index={index} progress={progress} />
        ))}
      </svg>
    </motion.button>
  )
}
