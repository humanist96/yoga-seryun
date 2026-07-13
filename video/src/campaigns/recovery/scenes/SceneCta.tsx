import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import GlowBackground from '../../../components/GlowBackground'
import BreathingCircle from '../../../components/BreathingCircle'
import Petals from '../../../components/Petals'
import LotusLogo from '../../../components/LotusLogo'
import { COLORS, FONTS } from '../../../config/theme'
import { fadeUp, sceneFadeIn } from '../../../lib/anim'
import { RECOVERY } from '../content'

interface SceneCtaProps {
  durationInFrames: number
  /** 쇼츠에서 위치·전화 정보를 추가 표시 */
  extended?: boolean
}

/** 엔드카드 — 로고 개화 + 무료체험 오퍼 + 검색어 */
export default function SceneCta({ durationInFrames, extended = false }: SceneCtaProps) {
  const frame = useCurrentFrame()
  const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) * fadeOut }}>
      <GlowBackground roseOpacity={0.7} />
      <BreathingCircle size={900} opacity={0.7} />
      <Petals />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div style={{ ...fadeUp(frame, 6) }}>
          <LotusLogo size={140} drawFrom={6} drawDurationFrames={40} />
        </div>
        <p
          style={{
            fontFamily: FONTS.latin,
            fontStyle: 'italic',
            fontSize: 34,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 14),
          }}
        >
          {RECOVERY.cta.eyebrow}
        </p>
        <h1
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 600,
            fontSize: 80,
            color: COLORS.foreground,
            margin: 0,
            ...fadeUp(frame, 22),
          }}
        >
          {RECOVERY.cta.brand}
        </h1>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 52,
            color: COLORS.background,
            background: COLORS.foreground,
            borderRadius: 999,
            padding: '28px 64px',
            marginTop: 20,
            ...fadeUp(frame, 38),
          }}
        >
          {RECOVERY.cta.offer}
        </div>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 32,
            color: COLORS.mutedForeground,
            margin: 0,
            ...fadeUp(frame, 50),
          }}
        >
          {RECOVERY.cta.sub}
        </p>
        <div style={{ height: 18 }} />
        <p
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 600,
            fontSize: 36,
            color: COLORS.accentDeep,
            margin: 0,
            ...fadeUp(frame, 62),
          }}
        >
          {RECOVERY.cta.search}
        </p>
        {extended && (
          <>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 30,
                color: COLORS.mutedForeground,
                margin: 0,
                ...fadeUp(frame, 74),
              }}
            >
              {RECOVERY.cta.location}
            </p>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 30,
                color: COLORS.mutedForeground,
                margin: 0,
                ...fadeUp(frame, 84),
              }}
            >
              {RECOVERY.cta.tel}
            </p>
          </>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
