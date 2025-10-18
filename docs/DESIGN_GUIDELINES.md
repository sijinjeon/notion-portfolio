# 디자인 가이드라인 (Design Guidelines): Notion 기반 개인 웹페이지 자동화 솔루션

| 문서 버전 | 작성일 | 작성자 | 상태 |
| :--- | :--- | :--- | :--- |
| 1.0 | 2025.10.18 | AI Assistant | 최신(Latest) |

---

## 목차

1. [개요](#1-개요-overview)
2. [디자인 철학](#2-디자인-철학-design-philosophy)
3. [색상 시스템](#3-색상-시스템-color-system)
4. [타이포그래피](#4-타이포그래피-typography)
5. [간격 및 레이아웃](#5-간격-및-레이아웃-spacing--layout)
6. [컴포넌트 스타일](#6-컴포넌트-스타일-component-styles)
7. [아이콘 및 이미지](#7-아이콘-및-이미지-icons--images)
8. [애니메이션 및 트랜지션](#8-애니메이션-및-트랜지션-animations--transitions)
9. [반응형 디자인](#9-반응형-디자인-responsive-design)
10. [접근성](#10-접근성-accessibility)
11. [shadcn UI 설정](#11-shadcn-ui-설정-shadcn-ui-setup)

---

## 1. 개요 (Overview)

### 1.1. 문서 목적

본 문서는 Notion 기반 개인 웹페이지 자동화 솔루션의 시각적 디자인 표준을 정의합니다. **shadcn UI**를 기반으로 하며, 밝은 라이트모드를 중심으로 한 미니멀하고 전문적인 디자인 시스템을 제공합니다.

### 1.2. 디자인 시스템 스택

```
shadcn UI (Base Component Library)
    ↓
Tailwind CSS (Utility-First CSS Framework)
    ↓
Radix UI (Headless UI Components)
    ↓
CSS Variables (Theming)
```

### 1.3. 참조 문서

- PRD v1.8: 제품 요구사항 정의서
- TRD v1.1: 기술 요구사항 정의서
- IA v1.0: 정보 구조 설계서
- CODE_GUIDELINES v1.0: 코드 가이드라인

### 1.4. 디자인 참고

- **[Zolplay](https://zolplay.com/)**: 미니멀한 레이아웃, 타이포그래피 중심 디자인
- **shadcn UI 공식 문서**: 컴포넌트 패턴 및 베스트 프랙티스

---

## 2. 디자인 철학 (Design Philosophy)

### 2.1. 핵심 원칙

#### Clarity (명료함)
> "디자인은 콘텐츠를 방해하지 않고 돋보이게 한다"

- 불필요한 장식 최소화
- 명확한 시각적 계층
- 읽기 쉬운 타이포그래피

#### Consistency (일관성)
> "모든 페이지에서 통일된 경험"

- 일관된 색상 사용
- 통일된 간격 시스템
- 표준화된 컴포넌트

#### Focus (집중)
> "콘텐츠가 주인공"

- 넓은 여백 활용
- 시선을 유도하는 레이아웃
- 섹션별 명확한 구분

#### Craft (섬세함)
> "디테일에서 오는 품질"

- 부드러운 애니메이션
- 세련된 인터랙션
- 정교한 타이포그래피

### 2.2. 디자인 목표

| 목표 | 설명 | 구현 방법 |
|------|------|-----------|
| **전문성** | 포트폴리오로서 신뢰감 전달 | 클린한 레이아웃, 정제된 타이포그래피 |
| **가독성** | 콘텐츠를 쉽게 읽을 수 있게 | 충분한 line-height, 적절한 대비 |
| **현대성** | 트렌디하면서도 시대를 타지 않는 | 미니멀 디자인, 서브틀한 효과 |
| **유지보수성** | 일관되고 확장 가능한 시스템 | shadcn UI + Tailwind CSS |

### 2.3. 디자인 무드보드

```
┌─────────────────────────────────────────────┐
│  Zolplay-Inspired Aesthetics                │
├─────────────────────────────────────────────┤
│  ✓ Large, breathing whitespace              │
│  ✓ Typography-driven hierarchy              │
│  ✓ Subtle shadows and borders               │
│  ✓ Clean card-based layouts                 │
│  ✓ Muted color palette with accents         │
│  ✓ Smooth, purposeful animations            │
└─────────────────────────────────────────────┘
```

---

## 3. 색상 시스템 (Color System)

### 3.1. 브랜드 색상 (Brand Colors)

#### Primary - Slate/Neutral
```css
/* 주 색상: 우아한 그레이 톤 */
--primary: 222.2 47.4% 11.2%;          /* slate-900 */
--primary-foreground: 210 40% 98%;     /* slate-50 */
```

#### Secondary - Blue
```css
/* 강조 색상: 세련된 블루 */
--secondary: 217.2 91.2% 59.8%;        /* blue-500 */
--secondary-foreground: 222.2 47.4% 11.2%;
```

### 3.2. 시맨틱 색상 (Semantic Colors)

#### Background & Foreground
```css
/* 라이트모드 기본 */
--background: 0 0% 100%;               /* white */
--foreground: 222.2 47.4% 11.2%;       /* slate-900 */

/* 카드 배경 */
--card: 0 0% 100%;                     /* white */
--card-foreground: 222.2 47.4% 11.2%;  /* slate-900 */

/* 팝오버 배경 */
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

#### Muted (보조 색상)
```css
/* 덜 강조되는 요소 */
--muted: 210 40% 96.1%;                /* slate-100 */
--muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
```

#### Accent (강조 색상)
```css
/* 호버, 선택 상태 */
--accent: 210 40% 96.1%;               /* slate-100 */
--accent-foreground: 222.2 47.4% 11.2%;
```

#### Destructive (경고/삭제)
```css
--destructive: 0 84.2% 60.2%;          /* red-500 */
--destructive-foreground: 210 40% 98%;
```

### 3.3. Border & Ring
```css
/* 테두리 */
--border: 214.3 31.8% 91.4%;           /* slate-200 */
--input: 214.3 31.8% 91.4%;

/* 포커스 링 */
--ring: 222.2 47.4% 11.2%;
```

### 3.4. 색상 팔레트 확장

#### Gray Scale
```typescript
// Tailwind CSS 기준
const grayScale = {
  50: '#f8fafc',   // 배경, 카드
  100: '#f1f5f9',  // Hover 배경
  200: '#e2e8f0',  // Border
  300: '#cbd5e1',  // Disabled
  400: '#94a3b8',  // Placeholder
  500: '#64748b',  // Secondary text
  600: '#475569',  // Body text
  700: '#334155',  // Heading
  800: '#1e293b',  // Strong heading
  900: '#0f172a',  // Primary text
}
```

#### Accent Colors (선택적)
```typescript
const accentColors = {
  blue: {
    light: '#dbeafe',   // blue-100
    DEFAULT: '#3b82f6', // blue-500
    dark: '#1e40af',    // blue-800
  },
  green: {
    light: '#d1fae5',   // Success
    DEFAULT: '#10b981',
    dark: '#065f46',
  },
  amber: {
    light: '#fef3c7',   // Warning
    DEFAULT: '#f59e0b',
    dark: '#92400e',
  },
  rose: {
    light: '#ffe4e6',   // Error
    DEFAULT: '#f43f5e',
    dark: '#881337',
  }
}
```

### 3.5. 색상 사용 가이드

#### 텍스트 색상
```typescript
// ✅ Good: 명확한 계층
<h1 className="text-slate-900">       {/* Primary heading */}
<h2 className="text-slate-800">       {/* Secondary heading */}
<p className="text-slate-600">        {/* Body text */}
<span className="text-slate-500">    {/* Secondary text */}
<small className="text-slate-400">   {/* Tertiary text */}

// ❌ Bad: 불명확한 대비
<p className="text-slate-300">        {/* Too light on white */}
```

#### 배경 색상
```typescript
// ✅ Good: 섹션 구분
<section className="bg-white">        {/* Main content */}
<section className="bg-slate-50">     {/* Alternating section */}
<div className="bg-slate-100">        {/* Card hover */}

// ❌ Bad: 과도한 색상
<section className="bg-blue-500">     {/* Too distracting */}
```

#### 강조 색상 (Accent)
```typescript
// ✅ Good: 의미 있는 사용
<button className="bg-blue-500">      {/* Primary CTA */}
<a className="text-blue-500">         {/* Links */}
<Badge className="bg-blue-100">       {/* Category badge */}

// ✅ Good: 호버 상태
<button className="hover:bg-blue-600">
<a className="hover:text-blue-600">
```

---

## 4. 타이포그래피 (Typography)

### 4.1. 폰트 스택

#### Primary Font - Inter
```typescript
// Optimized for screens, excellent readability
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

#### Optional - Display Font
```typescript
// For headings (optional, 선택적)
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});
```

### 4.2. 타이포그래피 스케일

#### Type Scale (Tailwind)
```typescript
// 1.250 - Major Third Scale
const typeScale = {
  'xs': '0.75rem',      // 12px
  'sm': '0.875rem',     // 14px
  'base': '1rem',       // 16px (Body)
  'lg': '1.125rem',     // 18px
  'xl': '1.25rem',      // 20px
  '2xl': '1.5rem',      // 24px
  '3xl': '1.875rem',    // 30px
  '4xl': '2.25rem',     // 36px
  '5xl': '3rem',        // 48px (Display)
  '6xl': '3.75rem',     // 60px
  '7xl': '4.5rem',      // 72px
  '8xl': '6rem',        // 96px
  '9xl': '8rem',        // 128px
}
```

### 4.3. 텍스트 스타일 정의

#### Headings
```typescript
// H1 - Hero Title
<h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
  포트폴리오
</h1>

// H2 - Section Title
<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
  프로젝트
</h2>

// H3 - Card Title
<h3 className="text-xl md:text-2xl font-semibold text-slate-800">
  프로젝트 제목
</h3>

// H4 - Subsection
<h4 className="text-lg font-semibold text-slate-700">
  하위 섹션
</h4>
```

#### Body Text
```typescript
// Lead (Intro paragraph)
<p className="text-lg md:text-xl text-slate-600 leading-relaxed">
  소개 텍스트
</p>

// Body (Default)
<p className="text-base text-slate-600 leading-7">
  본문 텍스트
</p>

// Small
<p className="text-sm text-slate-500">
  보조 텍스트
</p>

// Extra Small (Caption)
<span className="text-xs text-slate-400">
  캡션, 메타 정보
</span>
```

#### Links
```typescript
// Inline Link
<a className="text-blue-500 hover:text-blue-600 underline underline-offset-4">
  링크 텍스트
</a>

// Standalone Link
<a className="text-slate-600 hover:text-slate-900 transition-colors">
  자세히 보기 →
</a>
```

### 4.4. 타이포그래피 유틸리티

#### Font Weight
```css
.font-light    { font-weight: 300; }  /* 가벼운 텍스트 */
.font-normal   { font-weight: 400; }  /* 기본 */
.font-medium   { font-weight: 500; }  /* 강조 */
.font-semibold { font-weight: 600; }  /* 제목 */
.font-bold     { font-weight: 700; }  /* 헤딩 */
```

#### Line Height
```css
.leading-none      { line-height: 1; }       /* 타이트한 제목 */
.leading-tight     { line-height: 1.25; }    /* 헤딩 */
.leading-snug      { line-height: 1.375; }   /* 카드 제목 */
.leading-normal    { line-height: 1.5; }     /* 기본 */
.leading-relaxed   { line-height: 1.625; }   /* 본문 */
.leading-loose     { line-height: 2; }       /* 읽기 쉬운 본문 */
```

#### Letter Spacing
```css
.tracking-tighter  { letter-spacing: -0.05em; }  /* Display heading */
.tracking-tight    { letter-spacing: -0.025em; } /* Heading */
.tracking-normal   { letter-spacing: 0; }        /* Body */
.tracking-wide     { letter-spacing: 0.025em; }  /* Uppercase label */
```

### 4.5. 타이포그래피 베스트 프랙티스

#### 가독성 최적화
```typescript
// ✅ Good: 읽기 좋은 라인 길이
<article className="max-w-2xl mx-auto">  {/* 60-75 characters */}
  <p className="leading-7">...</p>
</article>

// ✅ Good: 충분한 대비
<p className="text-slate-600">  {/* WCAG AA 기준 충족 */}

// ❌ Bad: 너무 긴 라인
<article className="w-full">  {/* > 100 characters */}

// ❌ Bad: 불충분한 대비
<p className="text-slate-300">  {/* On white background */}
```

#### 계층 구조
```typescript
// ✅ Good: 명확한 시각적 계층
<article>
  <h1 className="text-4xl font-bold mb-4">     {/* Level 1 */}
  <h2 className="text-2xl font-semibold mb-3"> {/* Level 2 */}
  <p className="text-base mb-4">               {/* Body */}
</article>

// ❌ Bad: 불명확한 계층
<article>
  <h1 className="text-xl">                     {/* Too small */}
  <h2 className="text-xl">                     {/* Same size */}
  <p className="text-lg">                      {/* Too large */}
</article>
```

---

## 5. 간격 및 레이아웃 (Spacing & Layout)

### 5.1. 사이드바 기반 레이아웃 (Sidebar Layout)

#### 5.1.1. 전체 레이아웃 구조
```tsx
// 전체 페이지 레이아웃
<div className="flex min-h-screen bg-white">
  {/* 고정 사이드바 */}
  <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 z-10">
    <div className="flex flex-col h-full">
      {/* 프로필 섹션 */}
      <div className="p-6 border-b border-slate-200">
        {/* 프로필 이미지 */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        {/* 개인 정보 */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            시진 전
          </h1>
          <p className="text-sm text-slate-600 mb-4">
            Frontend Developer
          </p>
          
          {/* 연락처 정보 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4" />
              <a href="mailto:sijin@example.com" className="hover:text-slate-900 transition-colors">
                sijin@example.com
              </a>
            </div>
            
            {/* SNS 링크 */}
            <div className="flex justify-center gap-3 mt-4">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          <li>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setActiveSection('home')}
            >
              <Home className="h-5 w-5 text-slate-500" />
              <span className="text-slate-700">홈</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setActiveSection('projects')}
            >
              <Briefcase className="h-5 w-5 text-slate-500" />
              <span className="text-slate-700">프로젝트</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setActiveSection('about')}
            >
              <User className="h-5 w-5 text-slate-500" />
              <span className="text-slate-700">소개</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setActiveSection('contact')}
            >
              <Mail className="h-5 w-5 text-slate-500" />
              <span className="text-slate-700">연락하기</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {/* 하단 정보 */}
      <div className="p-6 border-t border-slate-200">
        <div className="text-center text-xs text-slate-400">
          <p>© 2025 시진 전</p>
          <p className="mt-1">Built with Next.js & Notion</p>
        </div>
      </div>
    </div>
  </aside>
  
  {/* 메인 콘텐츠 영역 */}
  <main className="flex-1 ml-80">
    <div className="p-8">
      {/* 동적 콘텐츠 영역 */}
      {renderActiveSection()}
    </div>
  </main>
</div>
```

#### 5.1.2. 사이드바 스타일 가이드라인

**사이드바 너비 및 위치**
```typescript
const sidebarStyles = {
  width: 'w-80',           // 320px 고정 너비
  position: 'fixed',       // 고정 위치
  height: 'h-full',        // 전체 높이
  background: 'bg-white',  // 흰색 배경
  border: 'border-r border-slate-200', // 오른쪽 테두리
  zIndex: 'z-10',          // 다른 요소 위에 표시
}
```

**프로필 섹션**
```typescript
const profileSection = {
  container: 'p-6 border-b border-slate-200',
  image: {
    size: 'w-24 h-24',     // 96x96px 프로필 이미지
    style: 'rounded-full object-cover',
    container: 'relative mx-auto mb-4'
  },
  name: 'text-xl font-semibold text-slate-900 mb-2',
  title: 'text-sm text-slate-600 mb-4',
  contact: 'space-y-2',
  social: 'flex justify-center gap-3 mt-4'
}
```

**네비게이션 메뉴**
```typescript
const navigationMenu = {
  container: 'flex-1 p-6',
  list: 'space-y-2',
  item: {
    base: 'w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg',
    hover: 'hover:bg-slate-100 transition-colors',
    active: 'bg-blue-50 text-blue-600 border-r-2 border-blue-600',
    icon: 'h-5 w-5 text-slate-500',
    text: 'text-slate-700'
  }
}
```

#### 5.1.3. 메인 콘텐츠 영역

**콘텐츠 컨테이너**
```typescript
const mainContent = {
  container: 'flex-1 ml-80', // 사이드바 너비만큼 왼쪽 마진
  padding: 'p-8',            // 내부 패딩
  maxWidth: 'max-w-4xl mx-auto', // 최대 너비 제한
  background: 'bg-white'      // 배경색
}
```

**섹션별 레이아웃**
```tsx
// 홈 섹션
const HomeSection = () => (
  <section className="space-y-12">
    {/* Hero 섹션 */}
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-slate-900 mb-6">
        안녕하세요, <span className="text-blue-600">시진</span>입니다
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        프론트엔드 개발자로서 사용자 경험을 중시하며, 
        창의적이고 효율적인 웹 솔루션을 만듭니다.
      </p>
    </div>
    
    {/* 최근 프로젝트 */}
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        최근 프로젝트
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 프로젝트 카드들 */}
      </div>
    </div>
  </section>
);

// 프로젝트 섹션
const ProjectsSection = () => (
  <section className="space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-slate-900">
        프로젝트
      </h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">전체</Button>
        <Button variant="outline" size="sm">웹 개발</Button>
        <Button variant="outline" size="sm">모바일</Button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 프로젝트 그리드 */}
    </div>
  </section>
);
```

### 5.2. 간격 시스템

#### Spacing Scale (Tailwind)
```typescript
// 4px 기반 스케일
const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
}
```

### 5.2. 컨테이너 및 레이아웃

#### Container Widths
```typescript
// ✅ Good: 페이지별 최적 너비
const containerWidths = {
  // 메인 컨테이너
  main: 'max-w-7xl',        // 1280px (Home, Project List)
  
  // 콘텐츠 컨테이너
  content: 'max-w-4xl',     // 896px (Project Detail, About)
  
  // 텍스트 컨테이너
  prose: 'max-w-2xl',       // 672px (Blog post content)
  
  // 전체 너비
  full: 'max-w-full',       // 100%
}
```

#### Layout Examples
```tsx
// Home Page Layout
<div className="container mx-auto px-4 py-12 max-w-7xl">
  <section className="mb-16">
    <h1 className="text-5xl font-bold mb-4">Hero</h1>
  </section>
  
  <section>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Project Cards */}
    </div>
  </section>
</div>

// Project Detail Page Layout
<article className="container mx-auto px-4 py-12 max-w-4xl">
  <header className="mb-12">
    {/* Title, Meta */}
  </header>
  
  <div className="prose prose-lg max-w-none">
    {/* Markdown Content */}
  </div>
</article>
```

### 5.3. 그리드 시스템

#### Grid Pattern
```typescript
// ✅ Good: 반응형 그리드
// 모바일: 1열, 태블릿: 2열, 데스크톱: 3열
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ✅ Good: 자동 조정 그리드
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

// ✅ Good: 비대칭 그리드
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">  {/* 메인 콘텐츠 */}
  <div>                             {/* 사이드바 */}
</div>
```

### 5.4. 섹션 간격

#### Vertical Spacing
```typescript
// Page sections
const sectionSpacing = {
  // 섹션 간 간격
  between: 'mb-16 md:mb-24',        // 64px-96px
  
  // 섹션 내부 간격
  inner: 'mb-8 md:mb-12',           // 32px-48px
  
  // 요소 간 간격
  element: 'mb-4 md:mb-6',          // 16px-24px
}

// ✅ Good: 일관된 간격
<main className="py-12 md:py-16">
  <section className="mb-16 md:mb-24">
    <h2 className="mb-8">Section Title</h2>
    <div className="mb-4">Content</div>
  </section>
</main>
```

### 5.5. 여백 (Whitespace)

#### Breathing Room
```typescript
// ✅ Good: 넉넉한 여백
<div className="px-4 py-8 md:px-6 md:py-12">
  {/* Content with room to breathe */}
</div>

// ✅ Good: 카드 내부 여백
<div className="p-6 md:p-8">
  <h3 className="mb-4">Title</h3>
  <p>Content</p>
</div>

// ❌ Bad: 답답한 여백
<div className="p-2">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

---

## 6. 컴포넌트 스타일 (Component Styles)

### 6.1. Sidebar Component

#### 6.1.1. 사이드바 컴포넌트 구조

```tsx
import { useState } from 'react';
import Image from 'next/image';
import { Home, Briefcase, User, Mail, Github, Linkedin, Twitter } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'projects', label: '프로젝트', icon: Briefcase },
    { id: 'about', label: '소개', icon: User },
    { id: 'contact', label: '연락하기', icon: Mail },
  ];

  return (
    <>
      {/* 모바일 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">시진 전</h1>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200">
            <SidebarContent 
              activeSection={activeSection} 
              onSectionChange={(section) => {
                onSectionChange(section);
                setMobileMenuOpen(false);
              }} 
            />
          </aside>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 z-10 hidden md:block">
        <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
      </aside>
    </>
  );
}

function SidebarContent({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'projects', label: '프로젝트', icon: Briefcase },
    { id: 'about', label: '소개', icon: User },
    { id: 'contact', label: '연락하기', icon: Mail },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 프로필 섹션 */}
      <div className="p-6 border-b border-slate-200">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/profile.jpg"
            alt="시진 전"
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            시진 전
          </h1>
          <p className="text-sm text-slate-600 mb-4">
            Frontend Developer
          </p>
          
          {/* 연락처 정보 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4" />
              <a href="mailto:sijin@example.com" className="hover:text-slate-900 transition-colors">
                sijin@example.com
              </a>
            </div>
            
            {/* SNS 링크 */}
            <div className="flex justify-center gap-3 mt-4">
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* 하단 정보 */}
      <div className="p-6 border-t border-slate-200">
        <div className="text-center text-xs text-slate-400">
          <p>© 2025 시진 전</p>
          <p className="mt-1">Built with Next.js & Notion</p>
        </div>
      </div>
    </div>
  );
}
```

#### 6.1.2. 메인 레이아웃 컴포넌트

```tsx
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { HomeSection } from '@/components/sections/HomeSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function MainLayout() {
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 ml-0 md:ml-80 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
}
```

### 6.2. Card Component

#### Basic Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Project Card
<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200">
  <CardContent className="p-0">
    {/* Thumbnail */}
    <div className="aspect-video overflow-hidden">
      <img 
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    
    {/* Content */}
    <div className="p-6">
      {/* Category Badge */}
      <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
        {project.category}
      </span>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-slate-600 line-clamp-2 mb-4">
        {project.metaDescription}
      </p>
      
      {/* Meta */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <time>{formattedDate}</time>
        <span className="text-blue-500 group-hover:text-blue-600">
          자세히 보기 →
        </span>
      </div>
    </div>
  </CardContent>
</Card>
```

### 6.2. Button Component

#### Button Variants
```tsx
import { Button } from '@/components/ui/button';

// Primary Button
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  지금 시작하기
</Button>

// Secondary Button
<Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
  자세히 보기
</Button>

// Ghost Button
<Button variant="ghost" className="text-slate-600 hover:text-slate-900">
  취소
</Button>

// Link Style
<Button variant="link" className="text-blue-500 hover:text-blue-600">
  더 보기 →
</Button>
```

### 6.3. Badge Component

#### Category Badges
```tsx
import { Badge } from '@/components/ui/badge';

// Category Badge
<Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
  Web Development
</Badge>

// Tag Badge
<Badge variant="outline" className="border-slate-200 text-slate-600">
  React
</Badge>

// Status Badge
<Badge className="bg-green-50 text-green-600">
  Published
</Badge>
```

### 6.4. Navigation Component

#### Header Navigation
```tsx
<header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <nav className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
    {/* Logo */}
    <Link href="/" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
      Portfolio
    </Link>
    
    {/* Desktop Nav */}
    <div className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
        홈
      </Link>
      <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
        소개
      </Link>
      <Button variant="outline" size="sm">
        연락하기
      </Button>
    </div>
    
    {/* Mobile Menu Button */}
    <Button variant="ghost" size="icon" className="md:hidden">
      <MenuIcon className="h-5 w-5" />
    </Button>
  </nav>
</header>
```

### 6.5. Footer Component

```tsx
<footer className="border-t border-slate-200 bg-slate-50 mt-24">
  <div className="container mx-auto px-4 py-12 max-w-7xl">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Brand */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Portfolio
        </h3>
        <p className="text-slate-600">
          개발자, 디자이너, 크리에이터를 위한 포트폴리오
        </p>
      </div>
      
      {/* Links */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">
          링크
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              홈
            </a>
          </li>
          <li>
            <a href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
              소개
            </a>
          </li>
        </ul>
      </div>
      
      {/* Social */}
      <div>
        <h4 className="text-sm font-semibold text-slate-900 mb-4">
          소셜
        </h4>
        <div className="flex gap-4">
          <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
            GitHub
          </a>
          <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
    
    {/* Copyright */}
    <div className="pt-8 border-t border-slate-200">
      <p className="text-sm text-slate-500 text-center">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

### 6.6. 컴포넌트 상태

#### Hover States
```typescript
// ✅ Good: 부드러운 호버 효과
className="transition-colors hover:text-blue-600"
className="transition-transform hover:scale-105"
className="transition-shadow hover:shadow-lg"

// ✅ Good: 그룹 호버
<Link className="group">
  <span className="group-hover:text-blue-600">Text</span>
</Link>
```

#### Focus States
```typescript
// ✅ Good: 명확한 포커스 표시
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

// ✅ Good: 키보드 네비게이션
className="focus-visible:ring-2 focus-visible:ring-blue-500"
```

#### Active States
```typescript
// ✅ Good: 클릭 피드백
className="active:scale-95"
className="active:bg-blue-600"
```

---

## 7. 아이콘 및 이미지 (Icons & Images)

### 7.1. 아이콘 시스템

#### Lucide React (권장)
```tsx
import { 
  ArrowRight, 
  Calendar, 
  Tag, 
  ExternalLink, 
  Github, 
  Linkedin,
  Mail
} from 'lucide-react';

// Usage
<Button>
  자세히 보기
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

<div className="flex items-center gap-2 text-slate-500">
  <Calendar className="h-4 w-4" />
  <time>2024.10.18</time>
</div>
```

#### Icon Sizes
```typescript
const iconSizes = {
  xs: 'h-3 w-3',    // 12px
  sm: 'h-4 w-4',    // 16px
  md: 'h-5 w-5',    // 20px (Default)
  lg: 'h-6 w-6',    // 24px
  xl: 'h-8 w-8',    // 32px
}
```

### 7.2. 이미지 처리

#### Next.js Image Component
```tsx
import Image from 'next/image';

// Project Thumbnail
<div className="relative aspect-video overflow-hidden rounded-lg">
  <Image
    src={project.thumbnail}
    alt={project.title}
    fill
    className="object-cover transition-transform duration-300 group-hover:scale-105"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority={false}
  />
</div>

// Profile Image
<div className="relative h-24 w-24 rounded-full overflow-hidden">
  <Image
    src="/profile.jpg"
    alt="Profile"
    fill
    className="object-cover"
    sizes="96px"
  />
</div>
```

#### Image Placeholder
```tsx
// Blur placeholder
<Image
  src={thumbnail}
  alt={title}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>

// Loading state
<div className="aspect-video bg-slate-100 animate-pulse rounded-lg" />
```

### 7.3. 이미지 스타일

```typescript
// ✅ Good: 이미지 처리
const imageStyles = {
  // 썸네일 (카드)
  thumbnail: 'aspect-video object-cover rounded-lg',
  
  // Hero 이미지
  hero: 'w-full h-[60vh] object-cover',
  
  // 프로필 이미지
  profile: 'rounded-full object-cover',
  
  // 콘텐츠 내 이미지
  content: 'rounded-lg shadow-md my-8',
}
```

---

## 8. 애니메이션 및 트랜지션 (Animations & Transitions)

### 8.1. 트랜지션 타이밍

```css
/* Tailwind Defaults */
.transition-none     { transition-duration: 0s; }
.transition-all      { transition-duration: 150ms; }
.transition-colors   { transition-duration: 150ms; }
.transition-opacity  { transition-duration: 150ms; }
.transition-transform { transition-duration: 150ms; }

/* Custom Durations */
.duration-200  { transition-duration: 200ms; }  /* Quick */
.duration-300  { transition-duration: 300ms; }  /* Standard */
.duration-500  { transition-duration: 500ms; }  /* Smooth */
```

### 8.2. Easing Functions

```css
.ease-linear    { transition-timing-function: linear; }
.ease-in        { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out       { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out    { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

### 8.3. 마이크로 인터랙션

#### Hover Effects
```tsx
// Card Hover
<Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

// Button Hover
<Button className="transition-colors duration-200 hover:bg-blue-600">

// Link Hover
<a className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">
  Underline Effect
</a>
```

#### Scale Effects
```tsx
// Image Zoom on Hover
<div className="overflow-hidden">
  <img className="transition-transform duration-500 hover:scale-110" />
</div>

// Button Press
<button className="active:scale-95 transition-transform">
  Click Me
</button>
```

### 8.4. 페이지 전환 애니메이션

#### Framer Motion (권장)
```tsx
import { motion } from 'framer-motion';

// Page Fade In
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>

// Slide In
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {children}
</motion.div>

// Stagger Children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 8.5. 로딩 애니메이션

```tsx
// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />

// Pulse (Skeleton)
<div className="animate-pulse bg-slate-200 rounded-lg h-48" />

// Progress Bar
<div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
  <div className="h-full bg-blue-500 animate-progress" />
</div>
```

---

## 9. 반응형 디자인 (Responsive Design)

### 9.1. 사이드바 반응형 레이아웃

#### 9.1.1. 브레이크포인트별 레이아웃 전략

```typescript
// 사이드바 반응형 브레이크포인트
const sidebarBreakpoints = {
  mobile: '< 768px',    // 모바일: 사이드바 숨김, 햄버거 메뉴
  tablet: '768px - 1024px', // 태블릿: 축소된 사이드바 또는 오버레이
  desktop: '> 1024px'   // 데스크톱: 전체 사이드바 표시
}
```

#### 9.1.2. 모바일 레이아웃 (768px 미만)

```tsx
// 모바일: 햄버거 메뉴 + 오버레이 사이드바
<div className="flex min-h-screen bg-white">
  {/* 모바일 헤더 */}
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 md:hidden">
    <div className="flex items-center justify-between p-4">
      <h1 className="text-lg font-semibold">시진 전</h1>
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 rounded-lg hover:bg-slate-100"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  </header>

  {/* 모바일 오버레이 사이드바 */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* 오버레이 배경 */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* 사이드바 */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 transform transition-transform">
        {/* 모바일 사이드바 내용 - 데스크톱과 동일하지만 더 컴팩트 */}
      </aside>
    </div>
  )}

  {/* 모바일 메인 콘텐츠 */}
  <main className="flex-1 pt-16 md:pt-0 md:ml-80">
    <div className="p-4 md:p-8">
      {/* 콘텐츠 */}
    </div>
  </main>
</div>
```

#### 9.1.3. 태블릿 레이아웃 (768px - 1024px)

```tsx
// 태블릿: 축소된 사이드바 또는 토글 가능한 사이드바
<div className="flex min-h-screen bg-white">
  {/* 태블릿 사이드바 - 축소된 버전 */}
  <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-10 hidden lg:block">
    <div className="flex flex-col h-full">
      {/* 프로필 섹션 - 더 컴팩트 */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative w-16 h-16 mx-auto mb-3">
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-semibold text-slate-900 mb-1">시진 전</h1>
          <p className="text-xs text-slate-600 mb-3">Frontend Developer</p>
          {/* SNS 링크 - 아이콘만 */}
          <div className="flex justify-center gap-2">
            <a href="#" className="text-slate-400 hover:text-slate-600">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 - 아이콘 + 텍스트 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-slate-100">
              <Home className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-700">홈</span>
            </button>
          </li>
          {/* 기타 메뉴 아이템들 */}
        </ul>
      </nav>
    </div>
  </aside>

  {/* 태블릿 메인 콘텐츠 */}
  <main className="flex-1 ml-0 lg:ml-64">
    <div className="p-6">
      {/* 콘텐츠 */}
    </div>
  </main>
</div>
```

### 9.2. 브레이크포인트

```typescript
// Tailwind Breakpoints
const breakpoints = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop (사이드바 표시)
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large
}
```

### 9.3. 모바일 우선 (Mobile-First)

```tsx
// ✅ Good: 모바일 우선 접근
<div className="
  text-base              {/* Mobile */}
  md:text-lg             {/* Tablet+ */}
  lg:text-xl             {/* Desktop+ */}
">

<div className="
  grid-cols-1           {/* Mobile: 1 column */}
  md:grid-cols-2        {/* Tablet: 2 columns */}
  lg:grid-cols-3        {/* Desktop: 3 columns */}
">

// ❌ Bad: Desktop-first
<div className="
  text-xl
  lg:text-base
">
```

### 9.3. 반응형 패턴

#### Container Padding
```tsx
// ✅ Good: 반응형 패딩
<div className="px-4 md:px-6 lg:px-8">
```

#### Typography
```tsx
// ✅ Good: 반응형 텍스트
<h1 className="text-3xl md:text-4xl lg:text-5xl">
<p className="text-base md:text-lg">
```

#### Spacing
```tsx
// ✅ Good: 반응형 간격
<section className="py-12 md:py-16 lg:py-24">
<div className="mb-8 md:mb-12 lg:mb-16">
```

### 9.4. 숨김/보임 제어

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">
  Desktop only content
</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">
  Mobile only content
</div>
```

---

## 10. 접근성 (Accessibility)

### 10.1. 색상 대비

```typescript
// WCAG AA 기준 (4.5:1 for normal text, 3:1 for large text)

// ✅ Good: 충분한 대비
text-slate-900 on bg-white      // 21:1
text-slate-600 on bg-white      // 7:1
text-white on bg-blue-500       // 8:1

// ❌ Bad: 불충분한 대비
text-slate-300 on bg-white      // 2.5:1
text-slate-400 on bg-slate-100  // 2.1:1
```

### 10.2. 포커스 표시

```tsx
// ✅ Good: 명확한 포커스 링
<button className="
  focus:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-blue-500 
  focus-visible:ring-offset-2
">
  Button
</button>

<a className="
  focus:outline-none
  focus-visible:underline
  focus-visible:decoration-2
">
  Link
</a>
```

### 10.3. 시맨틱 HTML

```tsx
// ✅ Good: 시맨틱 마크업
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Title</h1>
    <p>Content</p>
  </article>
</main>

<footer>
  <p>Copyright</p>
</footer>

// ❌ Bad: Non-semantic
<div className="header">
  <div className="nav">
```

### 10.4. ARIA 레이블

```tsx
// Icon buttons
<button aria-label="메뉴 열기">
  <MenuIcon />
</button>

// Links with icons only
<a href="#" aria-label="GitHub 프로필">
  <GithubIcon />
</a>

// Loading states
<div role="status" aria-live="polite">
  <span className="sr-only">로딩 중...</span>
  <Spinner />
</div>
```

### 10.5. 키보드 네비게이션

```tsx
// ✅ Good: 키보드 접근 가능
<button type="button">         {/* Keyboard accessible */}
<a href="/about">              {/* Keyboard accessible */}

// ✅ Good: Skip to content
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  메인 콘텐츠로 건너뛰기
</a>

// ❌ Bad: div onClick
<div onClick={handleClick}>    {/* Not keyboard accessible */}
```

---

## 11. shadcn UI 설정 (shadcn UI Setup)

### 11.1. 설치 및 초기 설정

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest notion-portfolio --typescript --tailwind --app

# shadcn UI 초기화
npx shadcn-ui@latest init
```

### 11.2. components.json 설정

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 11.3. globals.css 테마 설정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Background */
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    
    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    
    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    
    /* Primary */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    
    /* Secondary */
    --secondary: 217.2 91.2% 59.8%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    
    /* Muted */
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    /* Accent */
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    /* Destructive */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    /* Border */
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 47.4% 11.2%;
    
    /* Radius */
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 11.4. 필수 컴포넌트 설치

```bash
# 기본 컴포넌트
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge

# 네비게이션
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add sheet  # 모바일 메뉴

# 폼 (필요 시)
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label

# 기타
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton  # 로딩
```

### 11.5. 커스텀 컴포넌트 예시

```tsx
// components/project-card.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    metaDescription: string;
    category: string;
    thumbnail: string;
    publishDate: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="p-6">
            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 mb-3">
              {project.category}
            </Badge>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-600 line-clamp-2 mb-4">
              {project.metaDescription}
            </p>
            
            <div className="flex items-center justify-between text-sm text-slate-500">
              <time>{project.publishDate}</time>
              <span className="text-blue-500 group-hover:text-blue-600">
                자세히 보기 →
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

---

## 부록 A: 디자인 체크리스트

### 시각적 일관성
- [ ] 모든 헤딩에 일관된 폰트 크기 및 가중치 사용
- [ ] 통일된 색상 팔레트 적용
- [ ] 일관된 간격 시스템 사용
- [ ] 모든 카드/컴포넌트에 동일한 스타일 적용

### 반응형
- [ ] 모바일, 태블릿, 데스크톱에서 테스트
- [ ] 모든 텍스트가 읽기 쉬운 크기
- [ ] 터치 타겟이 최소 44x44px
- [ ] 가로 스크롤 없음

### 접근성
- [ ] 색상 대비 WCAG AA 기준 충족
- [ ] 모든 인터랙티브 요소에 포커스 표시
- [ ] 시맨틱 HTML 사용
- [ ] 대체 텍스트 제공 (이미지, 아이콘)
- [ ] 키보드만으로 모든 기능 접근 가능

### 성능
- [ ] 이미지 최적화 (Next.js Image 컴포넌트)
- [ ] 불필요한 애니메이션 제거
- [ ] 폰트 최적화 (font-display: swap)
- [ ] CSS 최소화

### 사용자 경험
- [ ] 명확한 CTA (Call-to-Action)
- [ ] 로딩 상태 표시
- [ ] 에러 메시지 사용자 친화적
- [ ] 빠른 페이지 전환

---

## 부록 B: 참고 자료

### 공식 문서
- [shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

### 디자인 참고
- [Zolplay](https://zolplay.com/) - 미니멀 레이아웃, 타이포그래피
- [Linear](https://linear.app/) - 세련된 인터랙션
- [Vercel](https://vercel.com/) - 클린한 디자인 시스템

### 접근성 가이드
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.1 | 2025.10.18 | 사이드바 기반 레이아웃 추가 - Zolplay 스타일 참고, 프로필 섹션, 반응형 디자인 | AI Assistant |
| 1.0 | 2025.10.18 | 초안 작성 - shadcn UI 기반, 라이트모드, Zolplay 영감 | AI Assistant |

---

**문서 승인:**

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| 디자인 리드 | | | |
| 프론트엔드 리드 | | | |
| 제품 매니저 | | | |

---

*본 문서는 디자인 시스템의 발전에 따라 지속적으로 업데이트됩니다.*

