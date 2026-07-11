import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, BREATH_DURATION_S } from '../lib/motion'
import { HERO_VIDEO_URL, LINKS } from '../data/content'
import AmbientGlow from './AmbientGlow'
import Petals from './Petals'

/** 들숨 4초 · 날숨 6초 — 호흡 템포로 숨 쉬는 원, 안쪽에 위상차 링 하나 */
function BreathingCircle() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        className="w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] rounded-full bg-accent/12 blur-sm"
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
        transition={{
          duration: BREATH_DURATION_S,
          times: [0, 0.4, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-8 md:inset-12 rounded-full border border-accent/20"
        animate={reduceMotion ? undefined : { scale: [1.06, 1, 1.06], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: BREATH_DURATION_S,
          times: [0, 0.4, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

function HeroBackdrop() {
  const reduceMotion = useReducedMotion()

  if (HERO_VIDEO_URL) {
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_VIDEO_URL}
        poster="/media/studio-hall.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
    )
  }

  return (
    <motion.img
      src="/media/studio-hall.jpg"
      alt="흰 커튼 사이로 빛이 드는 세련의 수련실"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ scale: 1 }}
      animate={reduceMotion ? undefined : { scale: 1.06 }}
      transition={{ duration: 32, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
    />
  )
}

function ScrollHint() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href="#classes"
      className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      animate={reduceMotion ? undefined : { y: [0, 7, 0], opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="text-[10px] tracking-[3px] uppercase">scroll</span>
      <span className="h-8 w-px bg-current" aria-hidden="true" />
    </motion.a>
  )
}

export default function Hero() {
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 110])
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0.1])

  return (
    <section id="top" className="relative min-h-svh flex items-center justify-center overflow-hidden">
      <HeroBackdrop />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      <AmbientGlow className="w-[42rem] h-[42rem] -top-48 -right-40 bg-accent-soft/60" />
      <AmbientGlow className="w-[36rem] h-[36rem] -bottom-40 -left-40 bg-sage/25" />
      <BreathingCircle />
      <Petals />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-28 md:pt-32 pb-24 max-w-4xl"
      >
        <motion.p
          {...fadeUp(0)}
          className="font-latin italic text-lg md:text-xl text-accent-deep mb-4"
        >
          a space to restore
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.25] tracking-tight"
        >
          세상에 피어난 <span className="text-accent">연꽃처럼</span>,
          <br />
          다시 나에게.
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          className="mt-6 text-base md:text-lg text-hero-subtitle max-w-xl"
        >
          요가와 명상으로 회복하는 공간, 마곡나루 요가명상 세련.
          <br className="hidden md:block" /> 동작만을 좇는 요가가 아니라, 명상의 일부로서의 요가를
          안내합니다.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-col sm:flex-row items-center gap-3">
          <motion.a
            href={LINKS.booking}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-foreground text-background px-8 py-3.5 text-sm font-semibold"
          >
            첫 수업 무료로 체험하기
          </motion.a>
          <motion.a
            href="#schedule"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass rounded-full px-8 py-3.5 text-sm font-medium text-foreground"
          >
            수업 시간표 보기
          </motion.a>
        </motion.div>

        <motion.p {...fadeUp(0.55)} className="mt-10 text-sm text-muted-foreground">
          네이버 리뷰 85건 · 소수정예 4~5인 · 마곡나루역 1번 출구 도보 4분
        </motion.p>
      </motion.div>

      <ScrollHint />
    </section>
  )
}
