import { Composition } from 'remotion'
import Promo, { SCENE_COMPONENTS } from './Promo'
import { FPS, HEIGHT, SCENES, TOTAL_FRAMES, WIDTH } from './config/timeline'
import { loadAllFonts } from './config/fonts'

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
