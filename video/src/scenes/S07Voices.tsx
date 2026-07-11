import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { SCRIPT } from '../config/script'
import { COLORS, FONTS, SAFE } from '../config/theme'
import { fadeUp, sceneFadeIn } from '../lib/anim'

/** 딥 플럼 반전 — 실제 네이버 리뷰 인용 */
export default function S07Voices() {
  const frame = useCurrentFrame()
  const count = Math.round(
    interpolate(frame, [10, 60], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
  )

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.plum, opacity: sceneFadeIn(frame) }}>
      <div
        style={{
          position: 'absolute',
          width: 1300,
          height: 1300,
          top: -550,
          right: -500,
          background: `radial-gradient(circle, ${COLORS.accent} 0%, rgba(188,92,116,0.3) 40%, transparent 68%)`,
          opacity: 0.12,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 48,
          padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom}px`,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 400,
            fontSize: 58,
            color: COLORS.plumForeground,
            margin: 0,
            ...fadeUp(frame, 4),
          }}
        >
          네이버 리뷰{' '}
          <span style={{ color: COLORS.accent, fontVariantNumeric: 'tabular-nums' }}>{count}</span>
          건
        </h2>
        {SCRIPT.s07.reviews.map((review, index) => (
          <blockquote
            key={review}
            style={{
              fontFamily: FONTS.serif,
              fontWeight: 300,
              fontSize: 46,
              lineHeight: 1.6,
              color: COLORS.plumForeground,
              background: COLORS.plumSoft,
              borderRadius: 28,
              padding: '36px 48px',
              margin: 0,
              maxWidth: 880,
              textAlign: 'center',
              wordBreak: 'keep-all',
              ...fadeUp(frame, 24 + index * 18),
            }}
          >
            {review}
          </blockquote>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
