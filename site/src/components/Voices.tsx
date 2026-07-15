import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { REVIEWS, REVIEW_KEYWORDS, LINKS } from '../data/content'
import AmbientGlow from './AmbientGlow'

const MAX_COUNT = Math.max(...REVIEW_KEYWORDS.map((keyword) => keyword.count))

export default function Voices() {
  return (
    <section className="relative overflow-hidden bg-plum text-plum-foreground py-28 md:py-40 px-6">
      <AmbientGlow className="w-[40rem] h-[40rem] -top-56 -right-56 bg-accent/10" />
      <AmbientGlow className="w-[30rem] h-[30rem] -bottom-40 -left-40 bg-accent/[0.07]" />
      <div className="relative max-w-5xl mx-auto">
        <motion.p {...fadeUp(0)} className="text-xs tracking-[3px] uppercase text-plum-foreground/60">
          voices
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 font-serif text-3xl md:text-5xl leading-snug">
          수련을 다녀간
          <br />
          마음들의 목소리
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

          <motion.div
            {...fadeUp(0.2)}
            className="relative overflow-hidden self-center"
            aria-label="회원 리뷰 모음 — 마우스를 올리면 멈춥니다"
          >
            <div className="voices-strip flex w-max items-stretch">
              {[0, 1].map((half) => (
                <div key={half} className="flex gap-4 pr-4" aria-hidden={half === 1 || undefined}>
                  {REVIEWS.map((review) => (
                    <blockquote
                      key={`${half}-${review.quote}`}
                      className="w-72 shrink-0 rounded-2xl bg-plum-soft p-6 flex flex-col justify-between"
                    >
                      <p className="text-sm leading-relaxed text-plum-foreground/90">
                        “{review.quote}”
                      </p>
                      <footer className="mt-4 text-xs text-accent/90">{review.tag}</footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-plum to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-plum to-transparent"
            />
          </motion.div>
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
          <p className="mt-3 text-xs text-plum-foreground/50 tnum">
            예약 1만원 → 수업 참여 → 전액 환불 · 오시면 0원입니다.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
