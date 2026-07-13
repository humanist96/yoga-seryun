import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { LINKS } from '../data/content'

export default function FirstClass() {
  return (
    <section id="trial" className="py-28 md:py-40 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          first class
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 font-serif text-3xl md:text-5xl text-center">
          첫 수업, 부담 없이
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="mt-4 text-center text-muted-foreground">
          요가명상,세련이 궁금하다면 먼저 한 번 경험해 보세요.
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          className="mt-12 rounded-2xl border border-accent/50 bg-accent-soft/50 p-6 text-center"
        >
          <p className="font-serif text-xl">1회 무료 체험</p>
          <p className="mt-2 text-sm text-muted-foreground">
            예약비 1만원, 수업에 참여하시면 전액 환불됩니다. 요가명상,세련이 궁금한 누구나.
          </p>
          <motion.a
            href={LINKS.booking}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-block rounded-full bg-accent text-white px-7 py-3 text-sm font-semibold"
          >
            무료 체험 예약하기
          </motion.a>
        </motion.div>

        <motion.p {...fadeUp(0.3)} className="mt-8 text-center text-sm text-muted-foreground">
          수강권 안내는 상담 시 자세히 도와드려요 ·{' '}
          <a
            href={LINKS.naverTalk}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            네이버 톡톡
          </a>{' '}
          ·{' '}
          <a
            href={LINKS.tel}
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            전화 문의
          </a>
        </motion.p>
      </div>
    </section>
  )
}
