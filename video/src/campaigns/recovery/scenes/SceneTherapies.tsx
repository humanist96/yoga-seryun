import { AbsoluteFill, useCurrentFrame } from 'remotion'
import KenBurns from '../../../components/KenBurns'
import { COLORS, FONTS } from '../../../config/theme'
import { fadeUp, sceneFadeIn } from '../../../lib/anim'
import { RECOVERY } from '../content'

interface SceneTherapiesProps {
  durationInFrames: number
}

/** 테라피 — 싱잉볼 배경 위 2×2 카드가 호흡 간격으로 떠오른다 */
export default function SceneTherapies({ durationInFrames }: SceneTherapiesProps) {
  const frame = useCurrentFrame()
  const stagger = Math.floor((durationInFrames - 80) / RECOVERY.therapies.length)

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <KenBurns
        src="images/bowls-afternoon.jpg"
        durationInFrames={durationInFrames}
        from={1.08}
        to={1.16}
        panX={14}
      />
      <AbsoluteFill style={{ background: 'rgba(253,250,248,0.68)' }} />
      <AbsoluteFill
        style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 44 }}
      >
        <p
          style={{
            fontFamily: FONTS.latin,
            fontStyle: 'italic',
            fontSize: 38,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 8),
          }}
        >
          four ways to restore
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 30,
            width: 820,
          }}
        >
          {RECOVERY.therapies.map((therapy, index) => (
            <div
              key={therapy}
              style={{
                fontFamily: FONTS.serif,
                fontWeight: 600,
                fontSize: 52,
                textAlign: 'center',
                wordBreak: 'keep-all',
                color: COLORS.foreground,
                background: 'rgba(241,219,223,0.9)',
                border: `1.5px solid ${COLORS.accent}55`,
                borderRadius: 32,
                padding: '52px 20px',
                ...fadeUp(frame, 22 + index * stagger, 18),
              }}
            >
              {therapy}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
