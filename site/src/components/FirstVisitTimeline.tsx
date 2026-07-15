import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { webpSrcSet } from '../lib/images'

const STEPS = [
  {
    photo: '/media/gallery/powder-room.jpg',
    time: '수업 20분 전',
    title: '여유 있게 도착',
    desc: '차 한 잔과 함께 공간의 향과 온도에 먼저 적응해요.',
  },
  {
    photo: '/media/gallery/entry-curtain.jpg',
    time: '수업 전',
    title: '몸 상태 나누기',
    desc: '오늘의 컨디션과 불편한 곳을 선생님과 짧게 이야기해요.',
  },
  {
    photo: '/media/gallery/hall-pastel.jpg',
    time: '60분',
    title: '나에게 맞는 수련',
    desc: '매트와 소도구는 모두 준비되어 있어요. 편한 복장이면 충분해요.',
  },
  {
    photo: '/media/gallery/evening-circle.jpg',
    time: '마무리',
    title: '싱잉볼과 정리 명상',
    desc: '울림과 함께 호흡을 정리하고, 가벼워진 몸으로 돌아가요.',
  },
] as const

/** "첫 수업은 이렇게 진행돼요" — FAQ에 흩어진 정보를 여정 타임라인으로 (기획서 D1) */
export default function FirstVisitTimeline() {
  return (
    <div className="mt-16">
      <motion.h3 {...fadeUp(0)} className="text-center font-serif text-xl md:text-2xl">
        첫 수업은 이렇게 진행돼요
      </motion.h3>

      <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {STEPS.map((step, index) => (
          <motion.li key={step.title} {...fadeUp(0.1 + index * 0.08)} className="flex sm:block gap-4">
            <div className="w-24 sm:w-full shrink-0 overflow-hidden rounded-xl">
              <picture>
                <source
                  type="image/webp"
                  srcSet={webpSrcSet(step.photo)}
                  sizes="(min-width: 640px) 180px, 96px"
                />
                <img
                  src={step.photo}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-square sm:aspect-[4/3] object-cover"
                />
              </picture>
            </div>
            <div className="sm:mt-3">
              <p className="text-[11px] tracking-wide uppercase text-accent-deep tnum">
                {index + 1} · {step.time}
              </p>
              <p className="mt-1 text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
