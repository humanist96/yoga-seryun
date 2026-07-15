import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { LINKS } from '../data/content'
import { handleAnchorClick } from '../lib/scroll'

const DOCK_ITEMS = [
  { label: '수업', id: 'classes' },
  { label: '시간표', id: 'schedule' },
  { label: '체험', id: 'trial' },
  { label: '공간', id: 'space' },
  { label: '오시는길', id: 'visit' },
] as const

/**
 * 모바일 하단 도크 — 섹션 바로가기(스크롤 스파이) + 스티키 예약 CTA.
 * 히어로를 지나면 떠오르고, 체험 섹션(#trial)처럼 예약 CTA가 이미 보이는
 * 구간에서는 CTA 스트립만 자동으로 접힌다. (기획서 A1+A2 통합안)
 */
export default function MobileDock() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [ctaDuplicated, setCtaDuplicated] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > window.innerHeight * 0.6)
  })

  // 스크롤 스파이 — 뷰포트 중앙 밴드에 걸린 섹션을 활성 표시
  useEffect(() => {
    const sections = DOCK_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // 체험 섹션의 큰 CTA가 보이는 동안에는 스티키 CTA를 접는다
  useEffect(() => {
    const trial = document.getElementById('trial')
    if (!trial) return
    const observer = new IntersectionObserver(
      ([entry]) => setCtaDuplicated(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(trial)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 140, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 md:hidden px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pointer-events-none"
    >
      <AnimatePresence initial={false}>
        {!ctaDuplicated && (
          <motion.a
            key="dock-cta"
            href={LINKS.booking}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 8 }}
            exit={{ opacity: 0, y: 12, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto block overflow-hidden rounded-full bg-accent text-white text-center text-sm font-semibold shadow-lg shadow-accent/30"
          >
            <span className="block py-3">첫 수업 무료로 체험하기</span>
          </motion.a>
        )}
      </AnimatePresence>

      <nav
        aria-label="섹션 바로가기"
        className="pointer-events-auto rounded-2xl bg-background/85 backdrop-blur-lg border border-border/70 shadow-[0_-10px_36px_rgba(120,80,60,0.12)] px-1.5 py-1.5 flex justify-between"
      >
        {DOCK_ITEMS.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => handleAnchorClick(event, `#${item.id}`)}
              aria-current={isActive ? 'true' : undefined}
              className={`flex-1 flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] transition-colors ${
                isActive ? 'text-accent-deep font-semibold' : 'text-muted-foreground'
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-accent' : 'bg-foreground/15'
                }`}
              />
              {item.label}
            </a>
          )
        })}
      </nav>
    </motion.div>
  )
}
