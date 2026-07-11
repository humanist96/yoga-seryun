import { AbsoluteFill, useCurrentFrame } from 'remotion'
import GlowBackground from '../components/GlowBackground'
import { SCRIPT } from '../config/script'
import { COLORS, FONTS, SAFE } from '../config/theme'
import { fadeUp, sceneFadeIn } from '../lib/anim'

const LEVEL_DOTS = ['#E4C97E', '#E0A98F', '#A9BC93', '#9DBBC9', '#B49BC0']

/** 수업 태그 스태거 + 레벨 5색 도트 */
export default function S06Classes() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <GlowBackground />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 60,
          padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom}px`,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 400,
            fontSize: 62,
            color: COLORS.foreground,
            textAlign: 'center',
            wordBreak: 'keep-all',
            margin: 0,
            ...fadeUp(frame, 6),
          }}
        >
          {SCRIPT.s06.title}
        </h2>
        <div style={{ display: 'flex', gap: 26, ...fadeUp(frame, 20) }}>
          {LEVEL_DOTS.map((color, index) => (
            <div
              key={color}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: color }} />
              <span
                style={{ fontFamily: FONTS.sans, fontSize: 26, color: COLORS.mutedForeground }}
              >
                Lv.{index + 1}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 22,
            maxWidth: 860,
          }}
        >
          {SCRIPT.s06.tags.map((tag, index) => (
            <span
              key={tag}
              style={{
                fontFamily: FONTS.serif,
                fontSize: 42,
                color: COLORS.foreground,
                background: COLORS.card,
                border: `1px solid ${COLORS.accentSoft}`,
                borderRadius: 999,
                padding: '20px 42px',
                ...fadeUp(frame, 28 + index * 9),
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
