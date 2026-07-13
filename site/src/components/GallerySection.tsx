import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { fadeUp } from '../lib/motion'

const PHOTOS = [
  {
    src: '/media/gallery/hall-symmetry.jpg',
    alt: '싱잉볼을 중심으로 좌우 대칭을 이룬 밝은 수련실 정면',
    caption: '“사진보다 더 쾌적하고 커요. 차 한 잔 마시며 쉬어갈 수 있는 공간도 있어요.”',
    portrait: false,
  },
  {
    src: '/media/gallery/bowls-afternoon.jpg',
    alt: '오후 빛 속에 크리스탈 싱잉볼이 놓인 수련실',
    caption: '수업 전, 크리스탈 싱잉볼 세팅',
    portrait: false,
  },
  {
    src: '/media/gallery/entry-curtain.jpg',
    alt: '오렌지빛 커튼 사이로 보이는 수련실 입구',
    caption: '커튼을 걷으면 수련실이 열립니다',
    portrait: true,
  },
  {
    src: '/media/gallery/evening-circle.jpg',
    alt: '저녁 조명 아래 매트가 둥글게 놓인 수련실',
    caption: '저녁 명상 클래스 — 둥글게 모여 앉는 시간',
    portrait: false,
  },
  {
    src: '/media/gallery/bowls-matlevel.jpg',
    alt: '매트 눈높이에서 바라본 크리스탈 싱잉볼',
    caption: '매트에 앉으면 보이는 풍경',
    portrait: false,
  },
  {
    src: '/media/gallery/powder-room.jpg',
    alt: '벤치와 화분이 놓인 입구와 파우더룸',
    caption: '“교보문고 같은 아로마 향이 나서 좋았어요.”',
    portrait: true,
  },
  {
    src: '/media/gallery/evening-wide.jpg',
    alt: '저녁 램프 조명 아래 넓게 펼쳐진 수련실',
    caption: '하루를 마무리하는 이브닝 클래스',
    portrait: false,
  },
  {
    src: '/media/gallery/hall-daylight.jpg',
    alt: '흰 커튼으로 빛이 가득 드는 낮의 수련실 전경',
    caption: '커튼 가득 빛이 드는 낮의 수련실',
    portrait: false,
  },
  {
    src: '/media/arch-locker.jpg',
    alt: '아치문 너머로 보이는 여성 탈의실과 개인 락커',
    caption: '아치문 너머, 여성 탈의실과 개인 락커',
    portrait: true,
  },
] as const

const STACK_ROTATIONS = [-6, 4, -2, 7, -4, 3, -7, 5, -3]
const SWIPE_THRESHOLD_PX = 60
const SPREAD_DELAY_MS = 350

type Offset = { x: number; y: number; rotate: number }

type LightboxProps = {
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

function Lightbox({ index, onClose, onNavigate }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const photo = PHOTOS[index]

  const goPrev = useCallback(
    () => onNavigate((index - 1 + PHOTOS.length) % PHOTOS.length),
    [index, onNavigate],
  )
  const goNext = useCallback(() => onNavigate((index + 1) % PHOTOS.length), [index, onNavigate])

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, goPrev, goNext])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="닫기"
        className="absolute top-5 right-5 p-2 rounded-full text-foreground hover:bg-foreground/10 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      <button
        type="button"
        aria-label="이전 사진"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-foreground hover:bg-foreground/10 transition-colors"
        onClick={(event) => {
          event.stopPropagation()
          goPrev()
        }}
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="max-h-[76svh] max-w-full rounded-xl object-contain shadow-2xl cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_, info) => {
            if (info.offset.x > SWIPE_THRESHOLD_PX) goPrev()
            else if (info.offset.x < -SWIPE_THRESHOLD_PX) goNext()
          }}
          onClick={(event) => event.stopPropagation()}
        />
      </AnimatePresence>

      <button
        type="button"
        aria-label="다음 사진"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-foreground hover:bg-foreground/10 transition-colors"
        onClick={(event) => {
          event.stopPropagation()
          goNext()
        }}
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      <p className="mt-5 text-sm text-muted-foreground text-center max-w-xl">
        {photo.caption}
        <span className="block mt-1 text-xs opacity-70">
          {index + 1} / {PHOTOS.length}
        </span>
      </p>
    </motion.div>
  )
}

/**
 * 사진첩 스택 → 펼쳐짐 그리드.
 * 각 카드의 그리드 위치를 측정해 컨테이너 중앙으로 모아둔 뒤(스택),
 * 섹션이 보이면 제자리로 순차 비행한다. '동작 줄이기'에서는 즉시 펼쳐진 상태.
 */
function SpreadGrid({ onSelect }: { onSelect: (index: number) => void }) {
  const reduceMotion = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [offsets, setOffsets] = useState<Offset[] | null>(null)
  const [spread, setSpread] = useState(false)
  const inView = useInView(gridRef, { once: true, amount: 0.25 })

  useLayoutEffect(() => {
    if (reduceMotion || spread) return

    const measure = () => {
      const grid = gridRef.current
      if (!grid) return
      const gridRect = grid.getBoundingClientRect()
      const centerX = gridRect.left + gridRect.width / 2
      const centerY = gridRect.top + gridRect.height / 2
      setOffsets(
        PHOTOS.map((_, index) => {
          const card = cardRefs.current[index]
          if (!card) return { x: 0, y: 0, rotate: 0 }
          const rect = card.getBoundingClientRect()
          return {
            x: centerX - (rect.left + rect.width / 2),
            y: centerY - (rect.top + rect.height / 2),
            rotate: STACK_ROTATIONS[index % STACK_ROTATIONS.length],
          }
        }),
      )
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [reduceMotion, spread])

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setSpread(true)
      return
    }
    const timer = setTimeout(() => setSpread(true), SPREAD_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inView, reduceMotion])

  const staticLayout = reduceMotion || offsets === null

  return (
    <div
      ref={gridRef}
      className={`columns-2 md:columns-3 gap-4 space-y-4 ${
        !reduceMotion && offsets === null ? 'invisible' : ''
      }`}
      style={{ pointerEvents: staticLayout || spread ? 'auto' : 'none' }}
    >
      {PHOTOS.map((photo, index) => {
        const offset = offsets?.[index] ?? { x: 0, y: 0, rotate: 0 }
        const stacked = { x: offset.x, y: offset.y, rotate: offset.rotate, scale: 0.9 }
        const settled = { x: 0, y: 0, rotate: 0, scale: 1 }

        return (
          <motion.figure
            key={photo.src}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="break-inside-avoid"
            style={{ zIndex: PHOTOS.length - index, position: 'relative' }}
            initial={false}
            animate={staticLayout || spread ? settled : stacked}
            transition={
              spread
                ? { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }
                : { duration: 0 }
            }
          >
            <button
              type="button"
              aria-label={`${photo.alt} 크게 보기`}
              className="group block w-full overflow-hidden rounded-2xl shadow-[0_10px_36px_rgba(120,80,60,0.16)]"
              onClick={() => onSelect(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-[1.045] ${
                  photo.portrait ? 'aspect-[3/4]' : 'aspect-[4/3]'
                }`}
              />
            </button>
          </motion.figure>
        )
      })}
    </div>
  )
}

/** 무한 루프 필름스트립 — 호흡처럼 느리게 흐르고, 호버 시 멈추고, 클릭하면 라이트박스. */
function Filmstrip({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <div className="relative mt-14 overflow-hidden" aria-label="수련실 사진 필름스트립">
      <div className="filmstrip flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex gap-3 pr-3" aria-hidden={half === 1 || undefined}>
            {PHOTOS.map((photo, index) => (
              <button
                key={`${half}-${photo.src}`}
                type="button"
                tabIndex={half === 1 ? -1 : 0}
                aria-label={`${photo.alt} 크게 보기`}
                className="shrink-0 overflow-hidden rounded-xl opacity-85 hover:opacity-100 transition-opacity"
                onClick={() => onSelect(index)}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="h-20 md:h-24 w-auto object-cover"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent"
      />
    </div>
  )
}

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="space" className="py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          space
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 mb-14 font-serif text-3xl md:text-5xl text-center">
          빛이 머무는 수련실
        </motion.h2>

        <SpreadGrid onSelect={setActiveIndex} />

        <motion.p {...fadeUp(0.25)} className="mt-10 text-center text-sm text-muted-foreground">
          사진을 누르면 크게 볼 수 있어요 · 매트와 소도구는 모두 준비되어 있습니다 · 남녀 화장실 구분 · 개인 락커
        </motion.p>
      </div>

      <Filmstrip onSelect={setActiveIndex} />

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
