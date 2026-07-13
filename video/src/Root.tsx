import { Composition } from 'remotion'
import Promo, { SCENE_COMPONENTS } from './Promo'
import { FPS, HEIGHT, SCENES, TOTAL_FRAMES, WIDTH } from './config/timeline'
import { loadAllFonts } from './config/fonts'
import RecoveryReels from './campaigns/recovery/Reels'
import RecoveryShorts from './campaigns/recovery/Shorts'
import { REELS_SCENES, SHORTS_SCENES, totalFrames } from './campaigns/recovery/timeline'

loadAllFonts()

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Promo48"
        component={Promo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* 캠페인: recovery-story — 릴스 24s · 쇼츠 45s */}
      <Composition
        id="RecoveryReels"
        component={RecoveryReels}
        durationInFrames={totalFrames(REELS_SCENES)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="RecoveryShorts"
        component={RecoveryShorts}
        durationInFrames={totalFrames(SHORTS_SCENES)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* 씬별 단독 컴포지션 — Studio에서 개별 프리뷰·렌더용 */}
      {SCENES.map((scene) => (
        <Composition
          key={scene.id}
          id={scene.id}
          component={SCENE_COMPONENTS[scene.id]}
          durationInFrames={scene.durationInFrames}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      ))}
    </>
  )
}
