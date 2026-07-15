import { motion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import { TEACHERS } from '../data/content'

/**
 * 강사 소개 — content.ts의 TEACHERS에 약력이 채워지면 자동 노출되는 스캐폴드. (기획서 D4)
 * 데이터가 비어 있는 동안에는 아무것도 렌더링하지 않는다.
 */
export default function Teachers() {
  if (TEACHERS.length === 0) return null

  return (
    <section id="teachers" className="py-28 md:py-40 px-6 border-t border-border/60">
      <div className="max-w-4xl mx-auto">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground text-center"
        >
          teachers
        </motion.p>
        <motion.h2 {...fadeUp(0.1)} className="mt-4 mb-14 font-serif text-3xl md:text-5xl text-center">
          함께하는 선생님
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {TEACHERS.map((teacher, index) => (
            <motion.article
              key={teacher.id}
              id={`teacher-${teacher.id}`}
              {...fadeUp(0.15 + index * 0.1)}
              className="rounded-2xl bg-card p-7"
            >
              {teacher.photo && (
                <img
                  src={teacher.photo}
                  alt={`${teacher.name} 선생님`}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <h3 className="mt-4 font-serif text-xl">{teacher.name} 선생님</h3>
              <p className="mt-1 text-sm text-accent-deep">{teacher.role}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {teacher.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
