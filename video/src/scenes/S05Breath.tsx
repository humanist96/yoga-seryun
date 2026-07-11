import { AbsoluteFill, useCurrentFrame } from 'remotion'
import GlowBackground from '../components/GlowBackground'
import BreathingCircle from '../components/BreathingCircle'
import Petals from '../components/Petals'
import Caption from '../components/Caption'
import { SCRIPT } from '../config/script'
import { sceneFadeIn } from '../lib/anim'

/** 음성④ — 숨 쉬는 원과 꽃잎: "내쉬는 숨과 함께 천천히 눈을 감습니다" */
export default function S05Breath() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <GlowBackground roseOpacity={0.75} />
      <BreathingCircle size={860} />
      <Petals />
      <Caption text={SCRIPT.s05.caption} appearFrame={14} />
    </AbsoluteFill>
  )
}
