import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

const PHOTOS = [
  {
    src: '/media/studio-hall.jpg',
    alt: '흰 커튼과 파스텔 매트가 놓인 밝은 수련실',
    caption: '“사진보다 더 쾌적하고 커요. 차 한 잔 마시며 쉬어갈 수 있는 공간도 있어요.”',
    wide: true,
  },
  {
    src: '/media/arch-locker.jpg',
    alt: '아치문 너머로 보이는 여성 탈의실과 개인 락커',
    caption: '“교보문고 같은 아로마 향이 나서 좋았어요.”',
    wide: false,
  },
] as const

export default function SpaceSection() {
  return (
    <section id="space" className="py-28 md:py-40 px-6">
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

        <div className="grid md:grid-cols-[1.6fr_1fr] gap-4 items-stretch">
          {PHOTOS.map((photo, index) => (
            <motion.figure key={photo.src} {...fadeUp(index * 0.15)} className="flex flex-col">
              <div
                className={`overflow-hidden flex-1 ${
                  photo.wide ? 'rounded-2xl' : 'rounded-t-full rounded-b-2xl'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover min-h-72 transition-transform duration-[2500ms] ease-out hover:scale-[1.045]"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted-foreground">{photo.caption}</figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p {...fadeUp(0.25)} className="mt-10 text-center text-sm text-muted-foreground">
          매트와 소도구는 모두 준비되어 있습니다 · 남녀 화장실 구분 · 개인 락커
        </motion.p>
      </div>
    </section>
  )
}
