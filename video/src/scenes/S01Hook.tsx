import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { COLORS, FONTS } from '../config/theme'
import { SCRIPT } from '../config/script'

/** 딥 플럼 어둠에서 싱잉볼 파동과 함께 연꽃빛이 번지는 오프닝 */
export default function S01Hook() {
  const frame = useCurrentFrame()
  const light = interpolate(frame, [10, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const textOpacity = interpolate(frame, [35, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.plum }}>
      {/* 싱잉볼 파동 링 3개 */}
      {[0, 1, 2].map((ring) => {
        const progress = interpolate(frame, [ring * 14, ring * 14 + 100], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        return (
          <div
            key={ring}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 200 + progress * 1500,
              height: 200 + progress * 1500,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: `1.5px solid ${COLORS.accentSoft}`,
              opacity: (1 - progress) * 0.5,
            }}
          />
        )
      })}
      {/* 중앙에서 번지는 연꽃빛 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1600,
          height: 1600,
          transform: `translate(-50%, -50%) scale(${0.2 + light * 1.1})`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accentSoft} 0%, transparent 65%)`,
          opacity: light * 0.5,
        }}
      />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p
          style={{
            fontFamily: FONTS.serif,
            fontWeight: 300,
            fontSize: 66,
            color: COLORS.plumForeground,
            opacity: textOpacity,
            textAlign: 'center',
            wordBreak: 'keep-all',
            margin: 0,
            padding: '0 90px',
            lineHeight: 1.55,
          }}
        >
          {SCRIPT.s01.caption}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
