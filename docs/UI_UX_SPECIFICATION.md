# UI/UX 기능 명세서

## 📋 목차

1. [개요](#1-개요)
2. [디자인 시스템](#2-디자인-시스템)
3. [레이아웃 구조](#3-레이아웃-구조)
4. [주요 컴포넌트](#4-주요-컴포넌트)
5. [페이지별 UI/UX](#5-페이지별-uiux)
6. [인터랙션 및 애니메이션](#6-인터랙션-및-애니메이션)
7. [반응형 디자인](#7-반응형-디자인)
8. [접근성](#8-접근성)
9. [성능 최적화](#9-성능-최적화)

---

## 1. 개요

### 1.1 프로젝트 목적
Notion 기반 CMS와 연동된 개인 포트폴리오 웹사이트로, 세련되고 전문적인 UI/UX를 제공하여 방문자에게 좋은 첫인상을 주는 것을 목표로 합니다.

### 1.2 디자인 철학
- **미니멀리즘**: 깔끔하고 여백이 충분한 디자인
- **전문성**: 신뢰감을 주는 타이포그래피와 색상 체계
- **사용성 우선**: 직관적인 네비게이션과 명확한 정보 계층
- **반응형**: 모든 디바이스에서 최적화된 경험 제공

### 1.3 기술 스택
- **프레임워크**: Next.js 15 (App Router)
- **스타일링**: Tailwind CSS 3.4
- **UI 라이브러리**: shadcn/ui
- **아이콘**: Lucide React
- **타이포그래피**: Inter (Google Fonts)
- **마크다운**: ReactMarkdown, remark-gfm, rehype-raw
- **코드 하이라이팅**: react-syntax-highlighter

---

## 2. 디자인 시스템

### 2.1 색상 팔레트

#### 주요 색상 (Primary)
```css
--primary: 222.2 47.4% 11.2%        /* 다크 네이비 - 주요 텍스트, 버튼 */
--primary-foreground: 210 40% 98%  /* 밝은 배경 */
```

#### 보조 색상 (Secondary)
```css
--secondary: 217.2 91.2% 59.8%      /* 블루 - 액센트, 링크 */
--secondary-foreground: 222.2 47.4% 11.2%
```

#### 중립 색상 (Slate 계열)
- **배경**: `slate-50/50` - 전체 배경
- **카드**: `white` - 카드 배경
- **텍스트**: 
  - 주요: `slate-900` (제목, 강조)
  - 보조: `slate-600` (본문)
  - 힌트: `slate-400`, `slate-500` (메타정보)
- **테두리**: `slate-200`, `slate-300`

#### 의미 색상
```css
--destructive: 0 84.2% 60.2%        /* 오류, 삭제 */
--muted: 210 40% 96.1%              /* 비활성 요소 */
--accent: 210 40% 96.1%             /* 하이라이트 */
```

### 2.2 타이포그래피

#### 폰트 패밀리
- **본문**: Inter (Google Fonts) - 가독성이 뛰어난 산세리프

#### 폰트 크기 체계
```css
/* 제목 */
--text-4xl: 2.25rem (36px)   /* 메인 제목 */
--text-2xl: 1.5rem (24px)    /* 섹션 제목 */
--text-xl: 1.25rem (20px)    /* 서브 제목 */
--text-lg: 1.125rem (18px)   /* 카드 제목 */

/* 본문 */
--text-base: 1rem (16px)     /* 기본 본문 */
--text-sm: 0.875rem (14px)   /* 보조 텍스트 */
--text-xs: 0.75rem (12px)    /* 메타정보 */
```

#### 폰트 굵기
- **Bold (700)**: 제목, 강조
- **Semibold (600)**: 서브 제목
- **Medium (500)**: 메타정보, 라벨
- **Normal (400)**: 본문

#### 행간 (Line Height)
- 제목: `leading-tight` (1.25)
- 본문: `leading-relaxed` (1.625)
- 일반: `leading-normal` (1.5)

### 2.3 간격 체계 (Spacing)

#### 패딩
- **컨테이너**: `p-6` (24px)
- **카드 내부**: `p-5` ~ `p-8` (20px ~ 32px)
- **섹션**: `p-8 md:p-12 lg:px-16 lg:py-14`

#### 마진
- **카드 간격**: `space-y-8` (32px) - 홈 피드
- **리스트 간격**: `space-y-3` (12px) - 프로젝트 리스트
- **섹션 간격**: `space-y-4` ~ `space-y-8`

#### 갭 (Gap)
- **플렉스/그리드**: `gap-2` ~ `gap-6` (8px ~ 24px)

### 2.4 테두리 (Border)

#### Border Radius
```css
--radius: 0.5rem (8px)              /* 기본 */
border-radius: 12px                 /* 카드, 버튼 */
border-radius: 9999px               /* 원형 (프로필 이미지, 배지) */
```

#### Border Width
- **기본**: `border` (1px)
- **강조**: `border-2` (2px)

### 2.5 그림자 (Shadow)

```css
/* 카드 기본 */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)

/* 호버 상태 */
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)

/* 커스텀 (통계 카드) */
box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3)
```

---

## 3. 레이아웃 구조

### 3.1 전체 레이아웃 (MainLayout)

#### 구조
```
┌─────────────────────────────────────────────────┐
│           전체 컨테이너 (max-w-[1280px])         │
│  ┌──────────────┬──────────────────────────┐    │
│  │              │                          │    │
│  │   Sidebar    │     Main Content         │    │
│  │   (320px)    │       (flex-1)           │    │
│  │   고정       │       스크롤 가능         │    │
│  │              │                          │    │
│  └──────────────┴──────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

#### 특징
- **최대 너비**: 1280px (중앙 정렬)
- **외부 여백**: `p-6` (24px)
- **컴포넌트 간격**: `gap-6` (24px)
- **배경색**: `bg-slate-50/50` (반투명 회색)
- **높이**: `h-[calc(100vh-3rem)]` (뷰포트 높이 기준)

### 3.2 사이드바 (Sidebar)

#### 디자인
- **너비**: `w-80` (320px)
- **배경**: 흰색 카드
- **위치**: `sticky top-6` (스크롤 시 고정)
- **모서리**: `rounded-xl` (12px)
- **테두리**: `border border-slate-200/60` (반투명)

#### 구성 요소
1. **프로필 섹션**
   - 프로필 이미지 (80x80px, 원형)
   - 이름 (text-xl, font-bold)
   - 연락처 정보 (이메일, 위치)
   - 소셜 링크 버튼 (GitHub, LinkedIn, Threads)

2. **네비게이션 메뉴**
   - 홈, 프로젝트, 소개 (아이콘 + 텍스트)
   - 활성 상태: 다크 배경, 흰색 텍스트
   - 비활성 상태: 회색 텍스트, 호버 시 배경 변경

3. **푸터 정보**
   - 저작권 표시
   - "Built with Cursor & Notion"

### 3.3 메인 콘텐츠 영역

#### 구조
- **배경**: 흰색 카드
- **패딩**: `p-8 md:p-12 lg:px-16 lg:py-14`
- **스크롤**: `overflow-y-auto`
- **모서리**: `rounded-xl`

---

## 4. 주요 컴포넌트

### 4.1 통계 카드 (Stats Cards)

#### 홈 화면 통계 카드
```typescript
// 3개의 카드가 그리드로 배치
grid-cols-1 md:grid-cols-3 gap-4
```

**구성 요소**:
- **헤더**
  - 라벨 (text-xs, text-slate-600)
  - 아이콘 (h-3 w-3, Lucide Icons)
- **본문**
  - 주요 값 (text-xl, font-bold, text-slate-900)
  - 설명 텍스트 (text-xs, text-slate-500)

**예시**:
- Years of Experience: "5+ years" / "in business optimization"
- Specialization: "No-Code, Automation" / "Core expertise areas"
- Current Status: "Available for projects" / "Ready for new challenges"

#### 프로젝트 화면 통계 카드
- Total Projects
- Categories
- Recent Projects (올해)

### 4.2 프로젝트 카드

#### 홈 화면 피드 형식
```css
Card {
  spacing: space-y-8 (32px)
  hover: shadow-lg transition-all
  border: border-slate-200
}
```

**구성**:
1. **헤더 영역**
   - 날짜 (Calendar 아이콘 + text-xs)
   - 카테고리 배지 (Badge)
   
2. **제목 영역**
   - 제목 (text-2xl, font-bold)
   - 태그 라인 (최대 5개, Badge outline)
   
3. **본문 영역**
   - Meta Description (text-base, text-slate-600)
   - "Read more" 링크 (ArrowRight 아이콘)

#### 프로젝트 화면 리스트 형식
```css
Card {
  spacing: space-y-3 (12px)
  layout: horizontal (flex justify-between)
  padding: p-5
}
```

**구성**:
- **왼쪽**: 날짜, 카테고리, 제목, 태그 (최대 4개)
- **오른쪽**: "View Details" 버튼

**차이점**:
- Meta Description 없음
- 더 간결한 수평 레이아웃
- 촘촘한 간격

### 4.3 배지 (Badge)

#### 종류
1. **Secondary Badge**
   ```css
   variant="secondary"
   /* 카테고리 표시용 */
   text-xs px-2 py-0 h-5
   ```

2. **Outline Badge**
   ```css
   variant="outline"
   /* 태그 표시용 */
   text-xs font-normal border-slate-300 text-slate-600
   ```

### 4.4 버튼 (Button)

#### 변형 (Variants)
1. **Default**: 기본 버튼 (다크 배경)
2. **Outline**: 테두리 버튼 (필터, 네비게이션)
3. **Ghost**: 투명 버튼 (링크형)

#### 크기 (Sizes)
- `sm`: 작은 버튼 (필터, 메타 버튼)
- `default`: 기본 크기

#### 상태
- **Hover**: 색상 변경, transition
- **Active**: 선택된 필터 (배경 강조)

### 4.5 스켈레톤 로더 (Skeleton)

#### 용도
- 데이터 로딩 중 표시
- 실제 콘텐츠와 유사한 형태

#### 구현
```tsx
<Skeleton className="h-8 w-3/4" />  // 제목
<Skeleton className="h-4 w-full" /> // 본문
```

### 4.6 마크다운 렌더러 (MarkdownRenderer)

#### 기능
- **GFM 지원**: 표, 체크리스트, 스트라이크스루
- **HTML 지원**: rehype-raw로 HTML 임베딩
- **코드 하이라이팅**: Syntax Highlighter (oneDark 테마)
- **이미지 최적화**: Next.js Image 컴포넌트
- **외부 링크**: target="_blank", rel="noopener noreferrer"

#### Notion 전용 스타일
1. **통계 카드**
   - 그라디언트 배경 (보라색)
   - 큰 숫자 + 설명

2. **경험 카드**
   - 회색 배경 카드
   - 회사명, 직무, 기간, 역할, 성과

3. **도서/강의 카드**
   - 노란색 배경
   - 제목, 저자, 설명

---

## 5. 페이지별 UI/UX

### 5.1 홈 페이지 (Home Section)

#### 구조
```
1. 통계 카드 (3개 그리드)
2. 구분선 (Separator)
3. Recent Projects 제목 + "View All" 버튼
4. 프로젝트 피드 (최대 6개, 피드 형식)
```

#### 특징
- **피드 스타일**: 여유로운 간격 (space-y-8)
- **상세 정보**: Meta Description 포함
- **태그 표시**: 제목 바로 아래 (최대 5개)
- **큰 제목**: text-2xl, font-bold

#### 데이터 로딩
- `useEffect`로 비동기 로드
- 스켈레톤 로더 표시
- Profile 데이터로 통계 카드 정보 파싱

### 5.2 프로젝트 페이지 (Projects Section)

#### 구조
```
1. 통계 카드 (3개 그리드)
2. 구분선
3. 카테고리 필터 (버튼 그룹)
4. 구분선
5. 프로젝트 리스트 (전체, 리스트 형식)
```

#### 특징
- **리스트 스타일**: 촘촘한 간격 (space-y-3)
- **간결한 정보**: Meta Description 없음
- **수평 레이아웃**: 제목 왼쪽, 버튼 오른쪽
- **필터링**: 카테고리별 필터 (전체, 카테고리명)

#### 정렬
- 최신 날짜순 (publishDate 기준 내림차순)

#### 빈 상태
- 프로젝트 없을 때 안내 메시지
- 아이콘 + 설명 텍스트

### 5.3 소개 페이지 (About Section)

#### 구조
```
1. Markdown 콘텐츠 (prose 스타일)
```

#### 특징
- **타이포그래피**: `prose prose-slate max-w-none`
- **Notion 콘텐츠**: MarkdownRenderer로 렌더링
- **전용 스타일**: 경험 카드, 통계 카드, 도서 카드

### 5.4 프로젝트 상세 페이지 (Project Detail)

#### 구조
```
1. Header
   - Thumbnail (aspect-video, 16:9)
   - 메타정보 (날짜, 카테고리)
   - 제목 (text-4xl md:text-5xl)
   - Meta Description (text-xl)
   - 태그 (#태그 형식, outline badge)
   
2. Content
   - MarkdownRenderer (prose-lg)
   
3. Navigation
   - "목록으로 돌아가기" 버튼
```

#### 특징
- **컨테이너**: max-w-4xl (중앙 정렬)
- **썸네일**: 상단 전체 너비
- **타이포그래피**: 큰 제목, 여유로운 본문
- **SEO**: generateMetadata로 메타데이터 생성

---

## 6. 인터랙션 및 애니메이션

### 6.1 호버 효과

#### 카드
```css
/* 홈 화면 피드 */
hover:shadow-lg transition-all duration-300

/* 프로젝트 리스트 */
hover:shadow-md hover:border-slate-300 transition-all duration-200
```

#### 버튼
```css
hover:bg-slate-100 transition-colors
hover:text-slate-900 transition-colors
```

#### 링크
```css
/* 제목 */
group-hover:text-slate-700 transition-colors

/* 버튼 텍스트 */
hover:text-slate-600 transition-colors
```

### 6.2 로딩 애니메이션

#### 스켈레톤
```css
animate-pulse
```

#### 프로필 이미지 로딩
- `priority` 속성으로 즉시 로드
- `loading="lazy"` (기타 이미지)

### 6.3 페이지 전환
- Next.js App Router의 기본 전환
- 부드러운 네비게이션

### 6.4 스크롤 동작
- **사이드바**: `sticky top-6` (고정)
- **메인 콘텐츠**: `overflow-y-auto` (스크롤)
- **부드러운 스크롤**: CSS smooth scroll

---

## 7. 반응형 디자인

> **⚡ 구현 완료**: 2025.10.20 - 완벽한 모바일 반응형 디자인 구현

### 7.1 핵심 디자인 원칙

#### 데스크톱 우선 보존
- **≥768px**: 기존 디자인 100% 유지
- 사이드바 레이아웃, 카드 크기, 여백, 폰트 모두 그대로

#### 모바일 전용 최적화
- **<768px**: 완전히 새로운 모바일 최적화 레이아웃
- 햄버거 메뉴, 터치 최적화 (44x44px), 반응형 여백

### 7.2 브레이크포인트

```css
/* 실제 구현된 브레이크포인트 */
mobile:  < 768px    /* 햄버거 메뉴, 전체 너비 콘텐츠 */
tablet:  768px+     /* 사이드바 표시, 기존 디자인 유지 */
desktop: 768px+     /* 기존 디자인 100% 유지 */

/* Tailwind 브레이크포인트 */
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿/데스크톱 경계선 ⭐ */
lg: 1024px  /* 대형 데스크톱 */
xl: 1280px  /* 초대형 데스크톱 */
```

### 7.3 모바일 레이아웃 (< 768px)

#### 7.3.1 햄버거 메뉴 헤더
- **위치**: 상단 고정 (`fixed top-0`)
- **높이**: 64px (`h-16`)
- **배경**: 흰색 + 하단 보더
- **버튼**: 44x44px 터치 타겟 보장

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:hidden">
  <div className="flex items-center justify-between p-4">
    <h1 className="text-lg font-semibold">전시진</h1>
    <button className="min-h-[44px] min-w-[44px]">
      <Menu className="h-6 w-6" />
    </button>
  </div>
</header>
```

#### 7.3.2 슬라이드 인 오버레이 사이드바
- **애니메이션**: 0.3초 슬라이드 인
- **배경 오버레이**: 반투명 블랙 + 블러
- **사이드바 너비**: 320px (`w-80`)
- **닫기 방법**: 
  - 오버레이 클릭
  - 메뉴 아이템 선택
  - ESC 키 (추후 구현 가능)

```tsx
{mobileMenuOpen && (
  <div className="fixed inset-0 z-40 md:hidden">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    <aside className="fixed left-0 top-0 h-full w-80 bg-white animate-slide-in">
      {/* 사이드바 내용 */}
    </aside>
  </div>
)}
```

#### 7.3.3 메인 콘텐츠
- **상단 패딩**: 64px (헤더 공간 확보)
- **여백**: 16px (모바일) → 24px (데스크톱)
- **너비**: 100% (모바일) → 계산된 너비 (데스크톱)

```tsx
<main className="pt-16 md:pt-0">
  <div className="p-6 md:p-8 lg:px-16 lg:py-14">
    {/* 콘텐츠 */}
  </div>
</main>
```

### 7.4 반응형 컴포넌트

#### 7.4.1 통계 카드 그리드
```tsx
// 1열 (모바일) → 2열 (태블릿) → 3열 (데스크톱)
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
```

#### 7.4.2 프로젝트 카드
```tsx
// 세로 레이아웃 (모바일) → 가로 레이아웃 (데스크톱)
<div className="flex flex-col md:flex-row gap-3 md:gap-4">
  
// 폰트 크기
<h3 className="text-xl md:text-2xl">  // 20px → 24px
<p className="text-sm md:text-base">   // 14px → 16px
```

#### 7.4.3 터치 타겟 최적화
```tsx
// 모든 버튼은 최소 44x44px
<button className="min-h-[44px] md:min-h-auto">

// 소셜 링크
<a className="px-3 py-2 md:px-2.5 md:py-1.5">

// 카테고리 필터
<Button className="min-h-[44px] md:min-h-auto px-3 md:px-4">
```

### 7.5 반응형 여백 시스템

```tsx
// 컨테이너
p-4 md:p-6              // 16px → 24px

// 메인 콘텐츠
p-6 md:p-8 lg:px-16     // 24px → 32px → 64px (좌우)

// 섹션 간격
space-y-6 md:space-y-8  // 24px → 32px

// 카드 패딩
px-4 md:px-6            // 16px → 24px
```

### 7.4 이미지 반응형

#### Next.js Image
```tsx
<Image
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
  className="object-cover"
/>
```

---

## 8. 접근성

### 8.1 시맨틱 HTML

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 사용
- `<time dateTime={...}>` 날짜 표시
- `<h1>` ~ `<h3>` 계층적 제목 구조

### 8.2 ARIA 속성

```tsx
// 현재 페이지 표시
aria-current={isActive ? 'page' : undefined}

// 스크린 리더 전용 텍스트
<span className="sr-only">메뉴 열기</span>
```

### 8.3 키보드 네비게이션

- 모든 인터랙티브 요소 포커스 가능
- 버튼과 링크 구분 명확
- Tab 순서 논리적

### 8.4 색상 대비

- **제목**: `text-slate-900` (충분한 대비)
- **본문**: `text-slate-600` (WCAG AA 기준 충족)
- **힌트**: `text-slate-400`, `text-slate-500`

### 8.5 대체 텍스트

- 모든 이미지에 `alt` 속성
- 장식용 아이콘은 ARIA로 숨김

---

## 9. 성능 최적화

### 9.1 이미지 최적화

#### Next.js Image 컴포넌트
- 자동 최적화 (WebP 변환)
- Lazy loading (기본)
- Priority 로딩 (중요 이미지)
- Responsive sizes 설정

```tsx
<Image
  src="/profile.jpg"
  alt="프로필"
  width={80}
  height={80}
  priority  // 우선 로드
  sizes="80px"
/>
```

### 9.2 코드 스플리팅

#### 자동 스플리팅
- Next.js App Router 자동 분할
- 페이지별 번들 분리

#### 동적 임포트
```tsx
'use client'  // 클라이언트 컴포넌트만 번들에 포함
```

### 9.3 정적 생성 (SSG)

```tsx
export const dynamic = 'force-static';
export async function generateStaticParams() { ... }
```

- 빌드 시 모든 프로젝트 페이지 생성
- 초고속 로딩

### 9.4 폰트 최적화

```tsx
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',        // FOUT 방지
  variable: '--font-inter',
});
```

### 9.5 CSS 최적화

- **Tailwind CSS**: Purge CSS로 미사용 클래스 제거
- **Utility-First**: 중복 스타일 최소화
- **CSS Variables**: 런타임 테마 변경 가능

### 9.6 데이터 로딩 최적화

#### 클라이언트 사이드
```tsx
// 병렬 로딩
const projectPromises = projectSummaries.map(async (summary) => {
  return fetch(`/data/pages/${summary.slug}.json`);
});
const projects = await Promise.all(projectPromises);
```

#### 캐싱
- Static JSON 파일 CDN 캐싱
- Next.js 자동 캐싱

---

## 10. 미래 개선 사항

### 10.1 다크 모드
```tsx
// tailwind.config.ts에 이미 준비됨
darkMode: 'class'
```

- 토글 버튼 추가
- 색상 체계 다크 모드 대응

### 10.2 애니메이션 강화
- Framer Motion 도입
- 페이지 전환 애니메이션
- 스크롤 기반 애니메이션

### 10.3 검색 기능
- 프로젝트 검색
- 태그 필터 강화
- 전문 검색 (Fuse.js)

### 10.4 공유 기능
- 소셜 미디어 공유 버튼
- 클립보드 복사

### 10.5 국제화 (i18n)
- 한국어/영어 지원
- Next.js i18n 라우팅

---

## 부록: 컴포넌트 트리

```
App
├── MainLayout (클라이언트 컴포넌트)
│   ├── Sidebar
│   │   ├── SidebarContent
│   │   │   ├── 프로필 섹션
│   │   │   ├── 네비게이션 메뉴
│   │   │   └── 푸터
│   │   └── 모바일 메뉴
│   │
│   └── Main Content
│       ├── HomeSection
│       │   ├── 통계 카드 x3
│       │   └── 프로젝트 피드
│       │       └── ProjectCard (피드 형식)
│       │
│       ├── ProjectsSection
│       │   ├── 통계 카드 x3
│       │   ├── 카테고리 필터
│       │   └── 프로젝트 리스트
│       │       └── ProjectCard (리스트 형식)
│       │
│       └── AboutSection
│           └── MarkdownRenderer
│
└── Projects/[slug] (별도 페이지)
    ├── Header
    │   ├── Thumbnail
    │   ├── Meta Info
    │   ├── Title
    │   └── Tags
    ├── Content (MarkdownRenderer)
    └── Navigation
```

---

## 변경 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|-----------|
| 1.0.0 | 2025-01-19 | 초기 작성 - 전체 UI/UX 명세 |
| 1.1.0 | 2025-01-19 | 홈/프로젝트 화면 차별화 반영 |

---

**작성자**: AI Assistant  
**최종 수정일**: 2025년 1월 19일

