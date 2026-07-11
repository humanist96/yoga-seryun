import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { REVIEWS, REVIEW_KEYWORDS, LINKS } from '../data/content'

const MAX_COUNT = Math.max(...REVIEW_KEYWORDS.map((keyword) => keyword.count))

export default function Voices() {
  return (
    <section className="bg-plum text-plum-foreground py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="text-xs tracking-[3px] uppercase text-plum-foreground/60">
          voices
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 font-serif text-3xl md:text-5xl leading-snug">
          수련을 다녀간
          <br />
          85개의 목소리
        </motion.h2>

        <div className="mt-14 grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <motion.div {...fadeUp(0.2)} className="space-y-3">
            {REVIEW_KEYWORDS.map((keyword) => (
              <div key={keyword.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-plum-foreground/85">{keyword.label}</span>
                  <span className="tnum text-plum-foreground/50">{keyword.count}</span>
                </div>
                <div className="h-1 rounded-full bg-plum-foreground/10">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(keyword.count / MAX_COUNT) * 100}%` }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
            <p className="pt-3 text-xs text-plum-foreground/45">네이버 방문자 리뷰 키워드 · 84명 참여</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((review, index) => (
              <motion.blockquote
                key={review.quote}
                {...fadeUp(0.15 + index * 0.08)}
                className="rounded-2xl bg-plum-soft p-6 flex flex-col justify-between"
              >
                <p className="text-sm leading-relaxed text-plum-foreground/90">“{review.quote}”</p>
                <footer className="mt-4 text-xs text-accent/90">{review.tag}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <motion.div {...fadeUp(0.3)} className="mt-16 text-center">
          <motion.a
            href={LINKS.booking}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-full bg-plum-foreground text-plum px-8 py-3.5 text-sm font-semibold"
          >
            나의 첫 수업 예약하기
          </motion.a>
          <p className="mt-3 text-xs text-plum-foreground/50">
            예약비 1만원, 수업에 참여하시면 전액 환불됩니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
