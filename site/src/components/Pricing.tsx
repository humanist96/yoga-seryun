import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { PRICING, UNLIMITED, LINKS } from '../data/content'

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 md:py-40 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          pricing
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 font-serif text-3xl md:text-5xl text-center">
          리뉴얼 사전등록
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="mt-4 text-center text-muted-foreground">
          7월 리뉴얼을 맞아 선착순 20명 한정으로 진행하는 사전등록 가격입니다.
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

        <motion.div {...fadeUp(0.3)} className="mt-6 rounded-2xl bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70 text-muted-foreground">
                <th className="py-4 px-5 text-left font-medium">수강권</th>
                <th className="py-4 px-5 text-right font-medium">3개월</th>
                <th className="py-4 px-5 text-right font-medium">6개월</th>
              </tr>
            </thead>
            <tbody>
              {PRICING.map((row) => (
                <tr key={row.plan} className="border-b border-border/50 last:border-0">
                  <td className="py-4 px-5 font-medium">{row.plan}</td>
                  <td className="py-4 px-5 text-right tnum">{row.three}</td>
                  <td className="py-4 px-5 text-right tnum">{row.six}</td>
                </tr>
              ))}
              <tr>
                <td className="py-4 px-5 font-medium">
                  {UNLIMITED.plan}
                  <span className="ml-2 text-xs text-accent-deep">{UNLIMITED.note}</span>
                </td>
                <td className="py-4 px-5 text-right tnum" colSpan={2}>
                  {UNLIMITED.price}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.p {...fadeUp(0.35)} className="mt-4 text-xs text-muted-foreground text-center">
          이벤트 수강권은 환불이 불가하며, 양도는 센터 내 회원을 제외하고 가능합니다.
        </motion.p>
      </div>
    </section>
  )
}
