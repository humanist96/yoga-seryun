import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion'
import KenBurns from '../../../components/KenBurns'
import Caption from '../../../components/Caption'
import { sceneFadeIn } from '../../../lib/anim'
import { RECOVERY } from '../content'

interface SceneVoiceProps {
  durationInFrames: number
}

/** 원장님 육성 — v02(5s) + v03(7s), 저녁 수련실 켄번즈 (쇼츠 전용) */
export default function SceneVoice({ durationInFrames }: SceneVoiceProps) {
  const frame = useCurrentFrame()
  const V02_FRAMES = 150

  return (
    <AbsoluteFill style={{ opacity: sceneFadeIn(frame) }}>
      <KenBurns
        src="images/evening-circle.jpg"
        durationInFrames={durationInFrames}
        from={1.04}
        to={1.15}
        panX={-16}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(49,32,42,0.28) 0%, rgba(49,32,42,0.08) 45%, rgba(49,32,42,0.45) 100%)',
        }}
      />
      <Sequence from={0} durationInFrames={V02_FRAMES} name="v02">
        <Audio src={staticFile('audio/voice/v02.wav')} />
        <Caption text={RECOVERY.voiceCaptions[0]} appearFrame={8} dark />
      </Sequence>
      <Sequence from={V02_FRAMES} name="v03">
        <Audio src={staticFile('audio/voice/v03.wav')} />
        <Caption text={RECOVERY.voiceCaptions[1]} appearFrame={8} dark />
      </Sequence>
    </AbsoluteFill>
  )
}
