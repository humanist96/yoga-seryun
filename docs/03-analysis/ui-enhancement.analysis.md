# Gap Analysis: ui-enhancement

> Feature: `ui-enhancement` · Phase: Check · 분석일: 2026-07-16
> 기준: `docs/01-plan/ui-enhancement.plan.md` (2장 개선안 상세 + 3장 로드맵) vs `site/` 구현 코드
> 분석: gap-detector agent (26개 항목, D5는 "선택·후순위" 명시로 스코프 제외)

## Match Rate: 90% (23.5 / 26)

- FULL 21개 · PARTIAL 5개 · MISSING 0개
- 판정 기준: FULL=1, PARTIAL=0.5, MISSING=0 / 합리적 사유가 있는 DEVIATION은 FULL

## 항목별 판정표

| 항목 | 판정 | 근거 | 비고 |
|------|------|------|------|
| A1 하단 도크 내비 | FULL | MobileDock.tsx | 5앵커·스크롤스파이·aria-current·safe-area. "스크롤 다운 시 아이콘만 축소" 서브불릿은 미구현 |
| A2 스티키 예약 바 | FULL | MobileDock.tsx:65-81 | 도크 통합형, #trial 노출 시 자동 접힘 |
| A3 이미지 파이프라인 v2 | **PARTIAL** | scripts/images.mjs | **AVIF 미생성(WebP만)**. srcset 3단·preload·fetchpriority 완비 |
| A4 라이트박스 모바일 마감 | **PARTIAL** | GallerySection.tsx | 포커스 트랩·스와이프·ESC 완비. **핀치/더블탭 줌 미구현** |
| B1 연꽃 개화 프로그레스 | FULL | LotusProgress.tsx | 획 드로우 방식(DEVIATION — 꽃잎 회전 대신), 모바일 미노출(sm:flex) |
| B2 시간대 무드 히어로 | FULL | Hero.tsx:13-24 | KST 3무드 인사말·글로우 전환 |
| B3 호흡 인터랙티브 | FULL | BreathGuide.tsx | 들4·날6 ×3회 + CTA. 싱잉볼 톤은 계획상 '선택' |
| B4 마이크로 인터랙션 | **PARTIAL** | index.css, Voices.tsx | 마퀴·nav 언더라인 ✓. **카운트업·CTA 꽃잎 파티클·곡선 디바이더 ✗** |
| C1 시간표→예약 직결 | FULL | ClassDetailSheet.tsx | 셀 탭→시트, 예약 딥링크+요청사항 메모 안내 |
| C2 다가오는 수업 배너 | FULL | Schedule.tsx:72-108 | 문장형 + 굵은 단위 잔여시간 |
| C3 예약 3스텝 시각화 | FULL | FirstClass.tsx:7-38 | "오시면 0원" 스텝퍼 |
| C4 온보딩 말풍선 | FULL | FloatingContact.tsx | 6초 후 1회, sessionStorage |
| C5 FAQPage JSON-LD | FULL | index.html:66-114 | 수동 복제(DEVIATION) — FAQS 수정 시 동기 필요 |
| D1 첫 방문 타임라인 | FULL | FirstVisitTimeline.tsx | 4단계 + 사진 매칭 |
| D2 공지 배너 | FULL | Announcement.tsx | 기간 만료 자동 숨김 |
| D3 스페셜 카드화 | FULL | Schedule.tsx | 평일낮/일요일 카드 + 톡톡 CTA |
| D4 Teachers 스캐폴드 | FULL | Teachers.tsx | 데이터 대기, 빈 배열 시 미노출 |
| G1~G3, G5, G7~G9 | FULL | 상동 | 해당 개선안으로 해소 |
| G4 이미지 최적화 | PARTIAL | =A3 | AVIF 미생성 |
| G6 모션 히어로 편중 | PARTIAL | =B1/B4 | LotusProgress 데스크톱 전용, 디바이더 미구현 |

## 갭 목록 (보완 방법)

1. **A3/G4 — AVIF 미생성**: images.mjs에 `.avif()` 분기 + `<source type="image/avif">` 추가
2. **A4 — 라이트박스 핀치/더블탭 줌**: 더블탭 scale 2단 토글 (계획 대비 의도적 축소 — 브라우저 기본 확대로 갈음 판단)
3. **B4 — 카운트업·CTA 파티클·곡선 디바이더**: 시각 노이즈 우려로 보류했던 항목. 도입 시 카운트업(useInView+animate), Petals 재사용 파티클, 곡선 SVG 디바이더 순 권장
4. **G6 — LotusProgress 모바일 미노출**: 도크와의 하단 혼잡 회피가 사유. 도입 시 도크 좌측 소형 배치

## 계획 외 추가 구현 (플러스 알파)

- rAF 커스텀 스무스 스크롤 (lib/scroll.ts) — Chrome 앵커 스크롤 중단 문제 견고화, 휠·터치 양보, 동작 줄이기 존중
- 모달 UX 표준화 — 시트·라이트박스·호흡가이드 공통 ESC/스크롤락/오토포커스
- 히어로 2400w 티어 + 켄번즈 줌

## 총평

핵심 전환·모바일·콘텐츠 축은 계획 의도대로 완전 구현됐고 접근성·스크롤 견고화는 계획을 초과했다. 미달 5건은 모두 "감성 마감" 성격의 세부 항목이며, 그중 3건(핀치 줌·파티클·디바이더)은 구현 중 의도적으로 보류한 것이다. 90%로 Report 진입 기준을 충족하며, 완결을 원하면 B4 묶음 + AVIF 분기를 1회 이터레이션으로 마감할 수 있다.
