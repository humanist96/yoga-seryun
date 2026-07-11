import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { fadeUp } from '../lib/motion'


const SENTENCE =
  '진흙을 뚫고 피어나는 연꽃처럼, 지치고 힘든 순간을 지나 끝내 피어나고마는 우리. 스스로 돌볼 시간이 사라졌다면, 지금 나의 몸이 나를 좀 돌보아주기를 요구하고 있는 걸지도 모릅니다.'

const HIGHLIGHTS = ['연꽃처럼,', '끝내', '피어나고마는'] as const

interface WordProps {
  progress: MotionValue<number>
  range: [number, number]
  word: string
}

function Word({ progress, range, word }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const isHighlight = HIGHLIGHTS.includes(word as (typeof HIGHLIGHTS)[number])

  return (
    <motion.span
      style={{ opacity }}
      className={isHighlight ? 'text-accent' : 'text-foreground'}
    >
      {word}{' '}
    </motion.span>
  )
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.5'],
  })
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkY = useTransform(sectionProgress, [0, 1], [80, -80])

  const words = SENTENCE.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-40 md:pt-56 pb-28 md:pb-36 px-6"
    >
      <motion.span
        aria-hidden="true"
        style={{ y: watermarkY }}
        className="absolute -right-10 md:right-6 top-16 font-serif text-[13rem] md:text-[22rem] leading-none text-accent/[0.05] select-none pointer-events-none"
      >
        蓮
      </motion.span>
      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        <p className="font-latin italic text-accent-deep text-lg mb-8">se-ryun, the lotus</p>
        <p className="font-serif text-2xl md:text-4xl leading-[1.6] md:leading-[1.6]">
          {words.map((word, index) => (
            <Word
              key={`${word}-${index}`}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
              word={word}
            />
          ))}
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <motion.div {...fadeUp(0)} className="rounded-2xl bg-card p-8">
            <p className="font-serif text-3xl mb-3">
              세 <span className="text-muted-foreground text-xl">世</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              세상 속에서 살아가는 우리. 바쁜 하루의 한가운데에서도 스스로를 돌볼 자리를
              마련합니다.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="rounded-2xl bg-card p-8">
            <p className="font-serif text-3xl mb-3">
              련 <span className="text-muted-foreground text-xl">蓮</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              진흙 속에서도 끝내 피어나는 연꽃. 지치고 힘든 순간을 지나 다시 피어나는 우리의
              모습입니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
