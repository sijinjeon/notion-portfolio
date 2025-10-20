# 모바일 반응형 디자인 개선 계획

## 🎨 핵심 디자인 원칙

> **중요**: 이 작업은 데스크톱 디자인을 변경하지 않습니다. 모바일 환경에서만 최적화된 경험을 제공합니다.

### 원칙 1: 데스크톱 우선 보존 (Desktop-First Preservation)
- **768px (md) 이상**: 현재 디자인 100% 유지
- 사이드바 레이아웃, 카드 크기, 여백, 폰트 크기 모두 그대로 유지
- 기존 사용자 경험에 영향 없음

### 원칙 2: 모바일 전용 최적화 (Mobile-Only Optimization)  
- **767px 이하**: 모바일에 최적화된 새로운 레이아웃 적용
- 햄버거 메뉴, 터치 친화적 버튼, 적절한 여백
- 작은 화면에서의 가독성과 사용성 개선

### 원칙 3: 점진적 향상 (Progressive Enhancement)
```tsx
// 기본 스타일 = 모바일
// md: 프리픽스 = 데스크톱 (기존 스타일 유지)
<div className="p-4 md:p-6">  {/* 모바일: 16px, 데스크톱: 24px */}
```

### 브레이크포인트 경계선
- **모바일**: `< 768px` → 새로운 최적화 적용
- **데스크톱**: `≥ 768px` → **현재 디자인 유지**

---

## 📋 현재 상태 분석

### 주요 문제점

1. **MainLayout.tsx**
   - 사이드바가 항상 고정 너비 (320px, `w-80`)로 렌더링됨
   - 모바일 화면에서도 사이드바가 표시되어 공간을 과도하게 차지
   - `flex` 레이아웃이 작은 화면에서 콘텐츠 영역을 압축시킴
   - 최소 여백 (`p-6`)이 모바일에서 너무 큼

2. **Sidebar.tsx**
   - 모바일 메뉴 기능이 구현되어 있으나 MainLayout과 통합되지 않음
   - 모바일 헤더가 있지만 실제로 활성화되지 않음
   - 오버레이 메뉴가 항상 숨겨진 상태

3. **섹션 컴포넌트들 (Home, Projects, About)**
   - 통계 카드가 `grid-cols-1 md:grid-cols-3`로 설정되어 있어 작동은 하지만 최적화 여지 있음
   - 카드 내부 패딩과 텍스트 크기가 모바일에 맞춰 조정되지 않음
   - 프로젝트 카드의 간격과 레이아웃이 모바일에서 개선 필요

4. **전체적인 문제**
   - 데스크톱 우선 레이아웃 (Desktop-first approach)
   - 터치 타겟 크기가 모바일에 최적화되지 않음
   - 여백과 간격이 화면 크기에 따라 적절히 조정되지 않음

---

## 🎯 개선 목표

### 1. 완전한 모바일 반응형 레이아웃 구현
- 모바일에서 사이드바를 숨기고 햄버거 메뉴로 전환
- 태블릿과 데스크톱에서 기존 사이드바 레이아웃 유지
- 부드러운 전환 애니메이션

### 2. 모바일 우선 최적화
- 터치 친화적인 버튼 크기 (최소 44x44px)
- 적절한 여백과 간격
- 가독성 좋은 폰트 크기

### 3. 반응형 브레이크포인트 정의
```
- sm: 640px (모바일 가로)
- md: 768px (태블릿)
- lg: 1024px (소형 데스크톱)
- xl: 1280px (대형 데스크톱)
```

---

## 🔧 구현 계획

### Phase 1: MainLayout 모바일 대응

> **원칙**: `md:` (768px) 이상에서는 현재 코드 그대로 작동. 모바일에서만 새로운 레이아웃 적용.

#### 현재 코드 (데스크톱용 - 유지됨)
```tsx
// src/components/MainLayout.tsx
<div className="flex gap-6 h-[calc(100vh-3rem)]">
  {/* 사이드바 - 항상 렌더링됨 */}
  <div className="w-80 flex-shrink-0">
    {/* ... */}
  </div>
  
  {/* 메인 콘텐츠 */}
  <div className="flex-1 min-w-0">
    {/* ... */}
  </div>
</div>
```

#### 개선 후 코드
```tsx
{/* 모바일 (<768px): 햄버거 메뉴 헤더만 표시 */}
{/* 데스크톱 (≥768px): 기존 flex 레이아웃 그대로 유지 */}
<div className="md:flex md:gap-6 md:h-[calc(100vh-3rem)]">
  {/* 사이드바 - 모바일: 숨김, 데스크톱: 현재 스타일 유지 */}
  <div className="hidden md:block md:w-80 md:flex-shrink-0">
    {/* ... */}
  </div>
  
  {/* 메인 콘텐츠 - 모바일: 전체 너비, 데스크톱: 현재 스타일 유지 */}
  <div className="flex-1 min-w-0 md:overflow-hidden">
    {/* 모바일: 상단 패딩 추가, 데스크톱: 현재대로 */}
    <main className="pt-16 md:pt-0 md:h-[calc(100vh-3rem)]">
      {/* ... */}
    </main>
  </div>
</div>
```

**변경 영향:**
- ✅ **데스크톱 (≥768px)**: 변경 없음, 기존 디자인 100% 유지
- 🆕 **모바일 (<768px)**: 햄버거 메뉴 + 전체 너비 콘텐츠
- 📱 컨테이너 여백: `p-4` (모바일) → `md:p-6` (데스크톱 유지)

---

### Phase 2: Sidebar 모바일 메뉴 활성화

#### 현재 상태
- 모바일 헤더 코드는 있지만 제대로 작동하지 않음
- 오버레이가 MainLayout과 독립적으로 동작

#### 개선 방안
```tsx
// Sidebar.tsx
return (
  <>
    {/* 모바일 헤더 - md 미만에서만 표시 */}
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 md:hidden">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">전시진</h1>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>

    {/* 모바일 사이드바 오버레이 */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-40 md:hidden">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <aside className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl animate-slide-in">
          <SidebarContent {...props} />
        </aside>
      </div>
    )}

    {/* 데스크톱 사이드바 */}
    <aside className="hidden md:flex md:flex-col w-full h-full">
      <SidebarContent {...props} />
    </aside>
  </>
);
```

**애니메이션 추가 (globals.css):**
```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

---

### Phase 3: 섹션별 모바일 최적화

> **원칙**: 모든 `md:` 프리픽스는 "데스크톱에서 현재 스타일 유지"를 의미합니다.

#### 3.1 HomeSection.tsx

**통계 카드 최적화:**
```tsx
{/* 현재: 데스크톱에서 3컬럼 (유지됨) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{/* 개선: 모바일 1컬럼, 태블릿 2컬럼, 데스크톱 3컬럼 (유지) */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                              {/* ↑ 데스크톱: 기존 3컬럼 유지 */}
```

**프로젝트 카드 패딩 조정:**
```tsx
{/* 모바일: 16px, 데스크톱: 24px (현재 값 유지) */}
<CardHeader className="pb-3 px-4 md:px-6">
                            {/* ↑ 데스크톱: 기존 px-6 유지 */}
  {/* ... */}
</CardHeader>
<CardContent className="pt-0 px-4 md:px-6">
  {/* ... */}
</CardContent>
```

**폰트 크기 반응형 조정:**
```tsx
{/* 제목: 모바일 20px, 데스크톱 24px (현재 크기 유지) */}
<CardTitle className="text-xl md:text-2xl font-bold">
                              {/* ↑ 데스크톱: 기존 2xl 유지 */}
  {project.title}
</CardTitle>

{/* 설명: 모바일 14px, 데스크톱 16px (현재 크기 유지) */}
<p className="text-sm md:text-base text-slate-600">
                  {/* ↑ 데스크톱: 기존 base 유지 */}
  {project.metaDescription}
</p>
```

#### 3.2 ProjectsSection.tsx

**카테고리 필터 버튼 최적화:**
```tsx
<div className="flex flex-wrap gap-1.5 md:gap-2">
  {categories.map((category) => (
    <Button
      key={category}
      variant={activeCategory === category ? 'default' : 'outline'}
      size="sm"
      className="text-xs md:text-sm min-h-[44px] md:min-h-auto px-3 md:px-4"
    >
      {category}
    </Button>
  ))}
</div>
```

**프로젝트 카드 레이아웃:**
```tsx
<Card className="group hover:shadow-md">
  <CardContent className="p-4 md:p-5">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        {/* ... */}
      </div>
      
      {/* View Details 버튼 - 모바일에서는 풀 너비 */}
      <Link 
        href={`/projects/${project.slug}`}
        className="w-full md:w-auto text-center md:text-left flex items-center justify-center md:justify-start min-h-[44px] md:min-h-auto"
      >
        View Details
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </div>
  </CardContent>
</Card>
```

#### 3.3 AboutSection.tsx

**마크다운 렌더러 최적화:**
```tsx
<div className="prose prose-slate prose-sm md:prose-base max-w-none">
  <MarkdownRenderer content={aboutData.content} />
</div>
```

**Prose 스타일 모바일 조정 (globals.css):**
```css
.prose {
  @apply text-sm md:text-base;
}

.prose h1 {
  @apply text-2xl md:text-4xl;
}

.prose h2 {
  @apply text-xl md:text-3xl;
}

.prose h3 {
  @apply text-lg md:text-2xl;
}

.prose p {
  @apply leading-relaxed md:leading-loose;
}

.prose img {
  @apply rounded-lg w-full h-auto;
}
```

---

### Phase 4: 공통 컴포넌트 최적화

#### 4.1 버튼 최소 크기 보장
```css
/* globals.css */
.btn-mobile {
  @apply min-h-[44px] min-w-[44px];
}
```

#### 4.2 터치 타겟 간격
```tsx
{/* 소셜 링크 버튼 */}
<div className="flex flex-wrap justify-center gap-2 md:gap-2">
  <a className="inline-flex items-center gap-1.5 px-3 py-2 md:px-2.5 md:py-1.5">
    {/* ... */}
  </a>
</div>
```

#### 4.3 네비게이션 메뉴 아이템
```tsx
<button 
  className={`w-full px-3 py-3 md:py-2.5 rounded-md transition-all`}
>
  {/* ... */}
</button>
```

---

### Phase 5: 여백 및 간격 조정

#### 5.1 컨테이너 패딩
```tsx
{/* MainLayout.tsx */}
<div className="max-w-[1280px] mx-auto p-4 md:p-6">
  {/* ... */}
</div>
```

#### 5.2 메인 콘텐츠 패딩
```tsx
<main className="bg-white rounded-xl">
  <div className="p-6 md:p-8 lg:px-16 lg:py-14">
    {renderActiveSection()}
  </div>
</main>
```

#### 5.3 섹션 간격
```tsx
<section className="space-y-6 md:space-y-8">
  {/* ... */}
</section>
```

---

## 📱 모바일 테스트 체크리스트

### 뷰포트 크기별 테스트
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13 mini)
- [ ] 390px (iPhone 12/13/14)
- [ ] 414px (iPhone 12/13/14 Plus)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)

### 기능 테스트
- [ ] 햄버거 메뉴 열기/닫기
- [ ] 메뉴 아이템 클릭 시 사이드바 자동 닫힘
- [ ] 오버레이 클릭 시 메뉴 닫힘
- [ ] 섹션 전환 정상 작동
- [ ] 프로젝트 카드 클릭 가능
- [ ] 카테고리 필터 작동
- [ ] 스크롤 정상 작동

### UX 테스트
- [ ] 터치 타겟이 최소 44x44px
- [ ] 버튼 간격이 충분함
- [ ] 텍스트 가독성 확인
- [ ] 이미지 반응형 로딩
- [ ] 로딩 스켈레톤 정상 표시
- [ ] 애니메이션 부드러움

### 성능 테스트
- [ ] 모바일 네트워크에서 빠른 로딩
- [ ] 스크롤 성능 확인
- [ ] 이미지 최적화 확인

---

## 🎨 디자인 가이드라인

### 터치 타겟
- **최소 크기:** 44x44px (Apple HIG)
- **권장 간격:** 8px 이상

### 폰트 크기
- **본문:** 14px (모바일), 16px (데스크톱)
- **제목 H1:** 24px (모바일), 32-36px (데스크톱)
- **제목 H2:** 20px (모바일), 24-28px (데스크톱)
- **제목 H3:** 18px (모바일), 20-24px (데스크톱)
- **작은 텍스트:** 12px

### 여백
- **컨테이너:** 16px (모바일), 24px (데스크톱)
- **카드 패딩:** 16px (모바일), 20-24px (데스크톱)
- **섹션 간격:** 24px (모바일), 32px (데스크톱)
- **요소 간격:** 12px (모바일), 16px (데스크톱)

### 색상 및 대비
- **텍스트:** WCAG AA 이상 (최소 4.5:1)
- **터치 상태:** 명확한 시각적 피드백
- **포커스 상태:** 2px 아웃라인

---

## 🚀 구현 우선순위

### 높음 (즉시 구현)
1. ✅ MainLayout 모바일 대응
2. ✅ Sidebar 모바일 메뉴 활성화
3. ✅ 기본 여백 및 패딩 조정

### 중간 (단기)
4. ✅ 섹션별 레이아웃 최적화
5. ✅ 버튼 및 터치 타겟 크기 조정
6. ✅ 폰트 크기 반응형 조정

### 낮음 (중장기)
7. 🔄 애니메이션 및 전환 효과 개선
8. 🔄 이미지 최적화 (Next.js Image)
9. 🔄 성능 최적화 (코드 스플리팅)

---

## 📝 구현 노트

### Tailwind 브레이크포인트 활용
```tsx
// 기본: 모바일
// sm: 640px+
// md: 768px+
// lg: 1024px+
// xl: 1280px+

<div className="p-4 sm:p-5 md:p-6 lg:p-8">
  {/* 점진적으로 패딩 증가 */}
</div>
```

### 조건부 렌더링 vs CSS 숨김
```tsx
{/* 추천: CSS로 숨김 (DOM에는 유지) */}
<div className="hidden md:block">
  {/* ... */}
</div>

{/* 비추천: 조건부 렌더링 (SSR/CSR 불일치 가능) */}
{isDesktop && <div>{/* ... */}</div>}
```

### 모바일 메뉴 상태 관리
- useState로 열림/닫힘 상태 관리
- 메뉴 아이템 클릭 시 자동 닫힘
- 오버레이 클릭 시 닫힘
- ESC 키로 닫기 (접근성)

---

## 🔍 참고 자료

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

## 📊 변경 영향 요약

### 데스크톱 (≥768px) - 변경 없음 ✅
```
┌─────────────────────────────────────┐
│  현재 디자인 100% 유지               │
│  - 사이드바 레이아웃 그대로          │
│  - 모든 카드 크기 그대로             │
│  - 여백과 폰트 크기 그대로           │
│  - 사용자 경험 변화 없음             │
└─────────────────────────────────────┘
```

### 모바일 (<768px) - 최적화 적용 🆕
```
┌─────────────────────────────────────┐
│  새로운 모바일 최적화 레이아웃       │
│  - 햄버거 메뉴 + 오버레이 사이드바   │
│  - 터치 친화적 버튼 (44x44px)       │
│  - 전체 너비 콘텐츠 영역             │
│  - 축소된 여백과 폰트                │
└─────────────────────────────────────┘
```

### 구현 시 주의사항
1. **절대 변경하지 말 것**: 기존 클래스 값 (예: `text-2xl`, `px-6`, `gap-6`)
2. **반드시 추가할 것**: `md:` 프리픽스로 데스크톱 스타일 보존
3. **테스트 필수**: 768px 이상에서 현재 디자인과 100% 동일한지 확인

---

## ✅ 완료 후 확인사항

### 데스크톱 검증 (최우선)
- [ ] **768px 이상에서 현재 디자인과 100% 동일**
- [ ] 사이드바 레이아웃 변경 없음
- [ ] 카드 크기와 간격 변경 없음
- [ ] 폰트 크기 변경 없음
- [ ] 여백과 패딩 변경 없음

### 모바일 검증
- [ ] 모든 페이지가 모바일에서 정상 작동
- [ ] 터치 타겟이 모두 44x44px 이상
- [ ] 텍스트 가독성 확보
- [ ] 이미지가 반응형으로 로드
- [ ] 햄버거 메뉴 정상 작동

### 성능 및 접근성
- [ ] 성능 저하 없음
- [ ] 접근성 기준 충족
- [ ] 다양한 디바이스에서 테스트 완료

