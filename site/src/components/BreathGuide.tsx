import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { LINKS } from '../data/content'
import { useFocusTrap } from '../lib/focusTrap'

const CYCLE_S = 10
const INHALE_S = 4
const TOTAL_CYCLES = 3
const TICK_MS = 200

interface BreathState {
  phase: 'inhale' | 'exhale' | 'done'
  count: number
}

const stateAt = (elapsedS: number): BreathState => {
  if (elapsedS >= CYCLE_S * TOTAL_CYCLES) return { phase: 'done', count: 0 }
  const t = elapsedS % CYCLE_S
  return t < INHALE_S
    ? { phase: 'inhale', count: Math.floor(t) + 1 }
    : { phase: 'exhale', count: Math.floor(t - INHALE_S) + 1 }
}

/**
 * "함께 한 호흡" — 들숨 4초·날숨 6초 3회를 안내하는 전체 화면 가이드. (기획서 B3)
 * 원의 호흡은 기존 .breath CSS keyframes와 동일 템포라 텍스트와 자연 동기화된다.
 */
export default function BreathGuide({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<BreathState>({ phase: 'inhale', count: 1 })
  const startRef = useRef<number>(Date.now())
  useFocusTrap(containerRef)

  useEffect(() => {
    const timer = setInterval(() => {
      setState(stateAt((Date.now() - startRef.current) / 1000))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const cycleIndex = Math.min(
    TOTAL_CYCLES,
    Math.floor((Date.now() - startRef.current) / 1000 / CYCLE_S) + 1,
  )

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="호흡 가이드"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/97 backdrop-blur-md px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="호흡 가이드 닫기"
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative flex items-center justify-center" aria-hidden="true">
        <div className="breath w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/15 blur-sm" />
        <div className="breath-ring absolute inset-6 rounded-full border border-accent/25" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {state.phase !== 'done' ? (
            <motion.div
              key={state.phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-center"
              aria-live="polite"
            >
              <p className="font-serif text-3xl md:text-4xl text-foreground">
                {state.phase === 'inhale' ? '들이쉬고' : '내쉬고'}
              </p>
              <p className="mt-3 font-latin italic text-2xl text-accent-deep tnum">{state.count}</p>
              <p className="mt-6 text-xs tracking-[3px] uppercase text-muted-foreground tnum">
                {cycleIndex} / {TOTAL_CYCLES}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center pointer-events-auto"
            >
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
                이 호흡을 매일,
                <br />
                세련에서.
              </p>
              <a
                href={LINKS.booking}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-block rounded-full bg-accent text-white px-7 py-3 text-sm font-semibold"
              >
                첫 수업 무료로 체험하기
              </a>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 block mx-auto text-sm text-muted-foreground underline underline-offset-4"
              >
                닫기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
