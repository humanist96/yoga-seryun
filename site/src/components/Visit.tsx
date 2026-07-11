import { motion } from 'framer-motion'
import { MapPin, Clock, CarFront, Phone } from 'lucide-react'
import { fadeUp } from '../lib/motion'
import { FAQS, LINKS } from '../data/content'

const INFO = [
  {
    icon: MapPin,
    title: '오시는 길',
    body: '서울 강서구 마곡중앙로 161-8 두산더랜드파크 A동 2층 217호 · 마곡나루역(9호선·공항철도) 1번 출구 도보 4분',
  },
  {
    icon: Clock,
    title: '운영 시간',
    body: '월–토 10:00–22:00 · 일요일 휴무',
  },
  {
    icon: CarFront,
    title: '주차 안내',
    body: '평일 2시간 무료(오후 6시 이후 3시간) · 주말 3시간 무료. 주차장 진입 후 우회전, A동 가까이 주차하면 직통 엘리베이터와 가장 가깝습니다.',
  },
  {
    icon: Phone,
    title: '문의',
    body: '010-4985-0082 · 네이버 톡톡으로도 편하게 물어보세요.',
  },
] as const

export default function Visit() {
  return (
    <section id="visit" className="bg-card/60 border-t border-border/60 py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          visit
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 mb-14 font-serif text-3xl md:text-5xl text-center">
          회복하러 오는 길
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          {INFO.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp(index * 0.1)}
              className="rounded-2xl bg-background p-7 flex gap-4"
            >
              <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-medium mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="mt-6 text-center">
          <motion.a
            href={LINKS.naverMap}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block liquid-glass rounded-full px-7 py-3 text-sm font-medium"
          >
            네이버 지도로 길찾기
          </motion.a>
        </motion.div>

        <motion.div {...fadeUp(0.35)} className="mt-20 max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl text-center mb-8">자주 묻는 질문</h3>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-background px-6 py-5">
                <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-medium text-sm md:text-base">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
