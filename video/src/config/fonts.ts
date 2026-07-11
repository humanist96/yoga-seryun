import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

export const loadAllFonts = (): Promise<unknown> =>
  Promise.all([
    loadFont({ family: 'MaruBuri', url: staticFile('fonts/MaruBuri-Regular.woff2'), weight: '400' }),
    loadFont({ family: 'MaruBuri', url: staticFile('fonts/MaruBuri-Light.woff2'), weight: '300' }),
    loadFont({ family: 'MaruBuri', url: staticFile('fonts/MaruBuri-SemiBold.woff2'), weight: '600' }),
    loadFont({ family: 'Pretendard', url: staticFile('fonts/Pretendard-Regular.woff2'), weight: '400' }),
    loadFont({ family: 'Pretendard', url: staticFile('fonts/Pretendard-SemiBold.woff2'), weight: '600' }),
    loadFont({
      family: 'Instrument Serif',
      url: staticFile('fonts/InstrumentSerif-Italic.ttf'),
      weight: '400',
      style: 'italic',
    }),
  ])
