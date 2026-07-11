import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { CATEGORIES, LEVELS } from '../data/content'
import AmbientGlow from './AmbientGlow'

function LevelSpectrum() {
  const [selected, setSelected] = useState(1)
  const current = LEVELS.find((item) => item.level === selected) ?? LEVELS[0]

  return (
    <motion.div {...fadeUp(0.1)} className="mt-14 max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-2">
        {LEVELS.map((item) => (
          <button
            key={item.level}
            type="button"
            onClick={() => setSelected(item.level)}
            aria-pressed={selected === item.level}
            className={`flex-1 flex flex-col items-center gap-2 rounded-xl py-3 transition-colors ${
              selected === item.level ? 'bg-card' : 'hover:bg-card/60'
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full ${item.dotClass}`} />
            <span className="text-xs text-muted-foreground tnum">Lv.{item.level}</span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-center text-muted-foreground leading-relaxed min-h-12">
        <span className="text-foreground font-medium">{current.name}</span> — {current.description}
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        수업마다 레벨이 표시되어 있어, 그날의 컨디션에 맞게 골라 들을 수 있습니다.
      </p>
    </motion.div>
  )
}

export default function Classes() {
  return (
    <section id="classes" className="relative overflow-hidden py-28 md:py-40 px-6">
      <AmbientGlow className="w-[34rem] h-[34rem] top-24 -left-52 bg-accent-soft/40" />
      <div className="relative max-w-5xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          classes
        </motion.p>
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-4 font-serif text-3xl md:text-5xl text-center leading-snug"
        >
          동작이 아니라, <span className="text-accent">명상</span>으로서의 요가
        </motion.h2>

        <LevelSpectrum />

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.article
              key={category.title}
              {...fadeUp(index * 0.12)}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-card p-8 flex flex-col transition-shadow duration-500 hover:shadow-[0_18px_50px_-16px_rgba(188,92,116,0.25)]"
            >
              <p className="font-latin italic text-accent-deep">{category.eyebrow}</p>
              <h3 className="mt-1 font-serif text-2xl">{category.title}</h3>
              <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-border/70 text-sm text-muted-foreground leading-relaxed">
                {category.note}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
