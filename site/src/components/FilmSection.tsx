import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { fadeUp } from '../lib/motion'

/** 브랜드 필름 — 원장님 목소리가 담긴 48초 세로 영상 (아치 프레임) */
export default function FilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  return (
    <section id="film" className="py-28 md:py-40 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          film
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-4 font-serif text-3xl md:text-5xl text-center leading-snug"
        >
          48초의 <span className="text-accent">회복</span>
        </motion.h2>
        <motion.p {...fadeUp(0.15)} className="mt-4 text-center text-muted-foreground">
          원장님의 목소리를 따라, 세련의 시간을 미리 경험해 보세요.
        </motion.p>

        <motion.div {...fadeUp(0.25)} className="mt-12 relative w-[min(84vw,380px)]">
          <div className="overflow-hidden rounded-t-full rounded-b-[2.5rem] border border-border/70 shadow-[0_30px_80px_-30px_rgba(188,92,116,0.35)]">
            <video
              ref={videoRef}
              src="/media/brand-film.mp4"
              poster="/media/brand-film-poster.jpg"
              preload="none"
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
              className="block w-full aspect-[9/16] object-cover cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? '영상 일시정지' : '영상 재생'}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-accent-deep transition-opacity duration-500 ${
              playing ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Play className="w-8 h-8 ml-1" aria-hidden="true" />
          </button>

          {playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="영상 일시정지"
              className="absolute right-4 bottom-4 w-11 h-11 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground"
            >
              <Pause className="w-4.5 h-4.5" aria-hidden="true" />
            </button>
          )}
        </motion.div>

        <motion.p {...fadeUp(0.35)} className="mt-5 text-xs text-muted-foreground">
          소리와 함께 재생됩니다
        </motion.p>
      </div>
    </section>
  )
}
