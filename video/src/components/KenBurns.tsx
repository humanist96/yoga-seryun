import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion'

interface KenBurnsProps {
  src: string
  durationInFrames: number
  from?: number
  to?: number
  panX?: number
}

/** 사진 슬로우 줌(켄번즈) — 씬 길이에 맞춰 선형 줌 */
export default function KenBurns({
  src,
  durationInFrames,
  from = 1.05,
  to = 1.18,
  panX = -20,
}: KenBurnsProps) {
  const frame = useCurrentFrame()
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: 'clamp',
  })
  const x = interpolate(frame, [0, durationInFrames], [0, panX], {
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale}) translateX(${x}px)`,
        }}
      />
    </AbsoluteFill>
  )
}
