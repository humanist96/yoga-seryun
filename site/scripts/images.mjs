/**
 * 이미지 파이프라인 v2 — 갤러리·히어로 원본(jpg)을 WebP 3단 srcset으로 변환한다.
 * 사용: npm run images (원본 추가·교체 후 1회 실행, 산출물은 public/media/opt/)
 */
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const MEDIA = new URL('../public/media/', import.meta.url).pathname
const OUT = path.join(MEDIA, 'opt')
const WIDTHS = [480, 960, 1600]
const QUALITY = 78

const sources = [
  ...(await readdir(path.join(MEDIA, 'gallery'))).map((f) => path.join(MEDIA, 'gallery', f)),
  path.join(MEDIA, 'hero.jpg'),
  path.join(MEDIA, 'arch-locker.jpg'),
].filter((f) => f.endsWith('.jpg'))

await mkdir(OUT, { recursive: true })

for (const src of sources) {
  const base = path.basename(src, '.jpg')
  const widths = base === 'hero' ? [...WIDTHS, 2400] : WIDTHS
  for (const width of widths) {
    const dest = path.join(OUT, `${base}-${width}.webp`)
    await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(dest)
  }
  console.log(`✓ ${base} → ${widths.join('/')}w`)
}
