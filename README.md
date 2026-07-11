# 요가명상,세련 — 홍보 웹사이트

> **SR : A Space To Restore** — 요가와 명상으로 회복하는 공간, 마곡나루 요가명상세련의 공식 홍보 웹사이트

**라이브**: https://yoga-seryun.vercel.app

![OG](site/public/og.jpg)

## 소개

서울 강서구 마곡나루역 4분 거리의 요가·명상 스튜디오 "요가명상,세련"의 원페이지 홍보 사이트입니다.
네이버플레이스·인스타그램에서 유입된 방문자를 **1회 무료 체험 예약(네이버 예약)**으로 전환시키는 브랜드 허브 역할을 합니다.

디자인 컨셉은 **"세상에 피어난 연꽃 (Lotus at Dawn)"** — 상호 세(世)+련(蓮)에서 도출한
웜 화이트 × 로터스 로즈 팔레트에, 호흡 템포(들숨 4초·날숨 6초)의 모션 시스템을 얹었습니다.

## 주요 기능

- **인터랙티브 시간표** — 요일 탭(모바일)/주간 그리드(PC), 현재 시각 기준 "다가오는 수업" 자동 하이라이트, 레벨 5색 도트·담당 강사 표기
- **스크롤 단어 리빌** — 브랜드 스토리가 스크롤에 따라 단어 단위로 떠오름 (蓮 워터마크 패럴랙스)
- **시그니처 모션** — 히어로의 숨 쉬는 원(호흡 템포) + 낙하 연꽃잎 + 새벽빛 앰비언트 글로우
- **전환 장치** — 네이버 예약 딥링크 CTA, 네이버 톡톡·전화 플로팅 버튼, 실제 리뷰 85건 기반 신뢰 블록
- **SEO/공유** — LocalBusiness JSON-LD, OG 이미지, 연꽃 파비콘
- 전 모션 `prefers-reduced-motion` 대응, 모바일 퍼스트

## 기술 스택

| 영역 | 선택 |
|---|---|
| 프레임워크 | React 18 + Vite 5 + TypeScript |
| 스타일 | Tailwind CSS v4 |
| 모션 | Framer Motion |
| 서체 | MaruBuri(한글 세리프) · Pretendard(본문) · Instrument Serif(영문 이탤릭) — 동적 서브셋 CDN |
| 배포 | Vercel (`yoga-seryun` 프로젝트) |

## 프로젝트 구조

```
.
├── docs/01-plan/                  # 기획서 (딥리서치 기반 계획 + 부록 A 빌드 프롬프트 + 부록 B 모션 설계)
└── site/                          # 웹사이트 소스
    ├── public/media/              # 실제 스튜디오 사진, OG 이미지, 파비콘
    └── src/
        ├── data/
        │   ├── schedule.ts        # ★ 수업 시간표 — 시간표 개편 시 이 파일만 수정
        │   └── content.ts         # ★ 가격·리뷰·FAQ·링크 — 콘텐츠 수정 포인트
        ├── components/            # 섹션별 컴포넌트 (Hero, Schedule, Voices, Pricing …)
        └── lib/motion.ts          # fadeUp 헬퍼, 호흡 템포 상수
```

## 개발 & 배포

```bash
cd site
npm install
npm run dev        # 개발 서버
npm run build      # 타입체크 + 프로덕션 빌드
vercel deploy --prod --yes   # 프로덕션 배포
```

## 콘텐츠 수정 가이드 (비개발자용)

| 바꾸고 싶은 것 | 수정 위치 |
|---|---|
| 수업 시간표 | `site/src/data/schedule.ts` |
| 가격·이벤트 | `site/src/data/content.ts`의 `PRICING`, `UNLIMITED` |
| 리뷰 인용문 | `site/src/data/content.ts`의 `REVIEWS` |
| FAQ | `site/src/data/content.ts`의 `FAQS` |
| 히어로 영상 | `content.ts`의 `HERO_VIDEO_URL`에 mp4 주소 입력 (비어 있으면 사진 사용) |
| 사진 | `site/public/media/` 교체 |

수정 후 `git push` → `vercel deploy --prod --yes` 로 반영합니다.

## 남은 작업 (TODO)

- [ ] 히어로 영상 실촬영본 교체 (`HERO_VIDEO_URL`)
- [ ] 카카오톡 채널 개설 시 플로팅 버튼 링크 교체 (현재 네이버 톡톡)
- [ ] 강사(나영·시소) 약력 확보 시 Teachers 섹션 추가
- [ ] 커스텀 도메인 연결 (예: yogaseryun.kr)
- [ ] 네이버 서치어드바이저 등록 + 스마트플레이스 홈페이지 슬롯에 URL 역연동

## 링크

- 네이버플레이스: https://map.naver.com/p/entry/place/2088771512
- 네이버 예약(무료 체험): https://m.booking.naver.com/booking/6/bizes/1676272
- Instagram: https://www.instagram.com/yoga_seryun
- Blog: https://blog.naver.com/mindful_yoga_seryun
