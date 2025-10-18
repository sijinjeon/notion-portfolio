# 정보 구조 설계서(IA): Notion 기반 개인 웹페이지 자동화 솔루션

| 문서 버전 | 작성일 | 작성자 | 상태 |
| :--- | :--- | :--- | :--- |
| 1.0 | 2025.10.18 | AI Assistant | 최신(Latest) |

---

## 목차

1. [개요](#1-개요-overview)
2. [사이트맵](#2-사이트맵-sitemap)
3. [URL 구조](#3-url-구조-url-structure)
4. [페이지 타입 정의](#4-페이지-타입-정의-page-types)
5. [네비게이션 구조](#5-네비게이션-구조-navigation-structure)
6. [콘텐츠 분류 체계](#6-콘텐츠-분류-체계-content-taxonomy)
7. [콘텐츠 모델](#7-콘텐츠-모델-content-model)
8. [사용자 플로우](#8-사용자-플로우-user-flow)
9. [메타데이터 구조](#9-메타데이터-구조-metadata-structure)
10. [Notion 데이터베이스 매핑](#10-notion-데이터베이스-매핑)

---

## 1. 개요 (Overview)

### 1.1. 문서 목적

본 문서는 Notion 기반 개인 웹페이지 자동화 솔루션의 정보 아키텍처를 정의합니다. 웹사이트의 정보가 어떻게 구조화되고, 사용자가 어떻게 정보를 탐색하며, Notion 데이터베이스가 어떻게 웹사이트 구조로 매핑되는지를 명확히 합니다.

### 1.2. 핵심 원칙

#### 단순성 (Simplicity)
- 최소한의 페이지 계층 구조 (최대 2단계)
- 명확하고 직관적인 URL 패턴
- 일관된 네비게이션

#### 확장성 (Scalability)
- PageType을 활용한 유연한 페이지 추가
- 카테고리 기반 콘텐츠 분류
- 동적 라우팅 지원

#### 일관성 (Consistency)
- 모든 페이지에 공통 레이아웃 적용
- 통일된 메타데이터 구조
- 표준화된 콘텐츠 포맷

### 1.3. 참조 문서

- PRD v1.8: Notion 기반 개인 웹페이지 자동화 솔루션
- TRD v1.1: 기술 요구사항 정의서
- CODE_GUIDELINES v1.0: 코드 가이드라인

---

## 2. 사이트맵 (Sitemap)

### 2.1. 시각적 사이트맵 (사이드바 기반 레이아웃)

```
notion-portfolio/
│
├── / (Single Page Application)
│   │
│   ├── [Sidebar - 고정]                  # 모든 섹션에서 공통
│   │   ├── 프로필 섹션
│   │   │   ├── 프로필 이미지
│   │   │   ├── 이름 & 직함
│   │   │   ├── 이메일
│   │   │   └── SNS 링크
│   │   ├── 네비게이션 메뉴
│   │   │   ├── 홈
│   │   │   ├── 프로젝트
│   │   │   ├── 소개
│   │   │   └── 연락하기
│   │   └── 하단 정보
│   │
│   └── [콘텐츠 영역 - 동적]              # 메뉴 클릭 시 변경
│       ├── Home 섹션                     # PageType: "Home"
│       │   └── 소개 + 최근 프로젝트
│       ├── Projects 섹션                 # PageType: "Project"
│       │   └── 전체 프로젝트 목록
│       ├── About 섹션                    # PageType: "About"
│       │   └── 자기소개 페이지
│       └── Contact 섹션
│           └── 연락처 정보
│
├── /projects/[slug] (선택적)            # 별도 상세 페이지
│   └── 프로젝트 상세 내용
│
└── [Footer - Sidebar 하단]               # PageType: "Footer"
    └── 사이드바 하단에 통합 표시
```

### 2.2. 페이지 계층 구조

| 레벨 | 페이지/섹션 | PageType | 렌더링 위치 | 설명 |
|------|-----------|----------|------------|------|
| - | Sidebar | - | 고정 (왼쪽 320px) | 프로필, 메뉴, Footer 통합 |
| 1 | Home 섹션 | Home | 메인 콘텐츠 영역 | 소개 및 최근 프로젝트 표시 |
| 1 | Projects 섹션 | Project | 메인 콘텐츠 영역 | 전체 프로젝트 목록 표시 |
| 1 | About 섹션 | About | 메인 콘텐츠 영역 | 자기소개 내용 (선택) |
| 1 | Contact 섹션 | - | 메인 콘텐츠 영역 | 연락처 정보 표시 |
| 2 | 프로젝트 상세 | Project | 별도 페이지 (선택) | `/projects/[slug]` 개별 상세 |
| - | Footer | Footer | Sidebar 하단 | 저작권 정보 통합 |

### 2.3. 페이지 수 추정

| 페이지 타입 | 수량 | 비고 |
|------------|------|------|
| Home | 1 | 고정 페이지 |
| Project | 10~100+ | 사용자에 따라 가변 |
| About | 0~1 | 선택적 |
| Footer | 1 | 컴포넌트 |
| **합계** | **12~102+** | |

---

## 3. URL 구조 (URL Structure)

### 3.1. URL 패턴

#### 기본 원칙
- **RESTful URL**: 명사 중심, 계층적 구조
- **소문자 사용**: 모든 URL은 소문자
- **하이픈 구분**: 단어 구분자로 하이픈(-) 사용
- **의미 있는 Slug**: 콘텐츠를 설명하는 URL

#### URL 매핑 테이블

| PageType | URL 패턴 | Slug 규칙 | 예시 |
|----------|----------|-----------|------|
| Home | `/` | 고정: "home" | `/` |
| Project | `/projects/[slug]` | 사용자 정의 또는 자동 생성 | `/projects/my-first-project`<br>`/projects/design-system-2024` |
| About | `/about` | 고정: "about" | `/about` |
| Footer | - | 고정: "footer" | - (컴포넌트) |

### 3.2. Slug 생성 규칙

#### 사용자 정의 Slug (권장)
```
Notion 속성: Slug = "my-project"
→ URL: /projects/my-project
```

#### 자동 생성 Slug (Fallback)
```
PageType = "Project" & Slug = null
→ Slug = page.id (Notion Page ID)
→ URL: /projects/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Slug 유효성 검사
- **허용 문자**: 영문 소문자, 숫자, 하이픈(-), 언더스코어(_)
- **최대 길이**: 200자
- **정규식**: `/^[a-z0-9-_]+$/i`

### 3.3. URL 예시

```
# 메인 페이지
https://portfolio.example.com/

# 프로젝트 상세 페이지
https://portfolio.example.com/projects/responsive-web-design
https://portfolio.example.com/projects/mobile-app-ui-kit
https://portfolio.example.com/projects/brand-identity-2024

# 소개 페이지
https://portfolio.example.com/about
```

---

## 4. 페이지 타입 정의 (Page Types)

### 4.1. Home 섹션 (사이드바 기반 레이아웃)

#### 목적
- 방문자에게 첫인상 제공
- 최신 프로젝트 소개
- 자기소개 및 핵심 정보 전달

#### 콘텐츠 구성
```
┌──────────────┬──────────────────────────────────────┐
│              │                                      │
│   Sidebar    │         Home Section (중앙)         │
│   (고정)     │                                      │
│              │  ┌────────────────────────────────┐ │
│ ┌────────┐   │  │      Hero Section             │ │
│ │Profile │   │  │  안녕하세요, 시진입니다        │ │
│ │ Image  │   │  │  프론트엔드 개발자로서...      │ │
│ └────────┘   │  └────────────────────────────────┘ │
│              │                                      │
│  시진 전      │  ┌────────────────────────────────┐ │
│  Frontend    │  │      최근 프로젝트              │ │
│  Developer   │  ├────────────────────────────────┤ │
│              │  │  ┌─────┐  ┌─────┐             │ │
│ 📧 Email     │  │  │Card1│  │Card2│             │ │
│              │  │  └─────┘  └─────┘             │ │
│ 🔗 GitHub    │  │  ┌─────┐  ┌─────┐             │ │
│ 🔗 LinkedIn  │  │  │Card3│  │Card4│             │ │
│              │  │  └─────┘  └─────┘             │ │
│ ─────────    │  └────────────────────────────────┘ │
│              │                                      │
│ • 홈 (활성)  │                                      │
│ • 프로젝트    │                                      │
│ • 소개       │                                      │
│ • 연락하기    │                                      │
│              │                                      │
│ ─────────    │                                      │
│              │                                      │
│ © 2025       │                                      │
│ Built with   │                                      │
│ Next.js      │                                      │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

#### Notion 매핑
- **소스**: PageType = "Home"인 페이지
- **속성**:
  - Title: 페이지 제목
  - 본문: Hero 섹션 콘텐츠 (선택)
  - MetaDescription: SEO 설명

#### 주요 기능
- 프로젝트 카드 그리드 표시
- 카테고리별 필터링 (선택)
- 최신순 정렬
- 각 카드에서 상세 페이지로 링크

### 4.2. Project 페이지

#### 목적
- 개별 프로젝트/블로그 게시물의 전체 내용 표시
- 상세한 설명, 이미지, 링크 등 포함
- SEO 최적화

#### 콘텐츠 구성
```
┌─────────────────────────────────────────┐
│            Header / Navigation          │
├─────────────────────────────────────────┤
│                                         │
│         썸네일 이미지 (전체 너비)         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         메타 정보                        │
│  📅 2024.10.18  |  🏷️ Web Development  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         제목 (H1)                        │
│         설명 (Lead)                      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         본문 콘텐츠 (Markdown)           │
│  - 헤딩, 단락, 리스트                   │
│  - 이미지, 코드 블록                    │
│  - 링크, 인용구                         │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         네비게이션                       │
│  ← 목록으로 돌아가기                    │
│                                         │
├─────────────────────────────────────────┤
│               Footer                    │
└─────────────────────────────────────────┘
```

#### Notion 매핑
- **소스**: PageType = "Project"인 페이지들
- **속성**:
  - Title: 게시물 제목
  - Slug: URL 경로
  - Category: 카테고리
  - Tags: 태그 목록
  - Thumbnail: 썸네일 이미지
  - PublishDate: 게시 날짜
  - MetaDescription: SEO 설명
  - 본문: Markdown 콘텐츠

#### 주요 기능
- Markdown 렌더링
- 코드 하이라이팅
- 이미지 최적화
- SEO 메타데이터
- 소셜 미디어 공유 메타 태그

### 4.3. About 페이지 (선택)

#### 목적
- 자기소개 및 경력 정보
- 연락처 정보
- 스킬 및 전문성 표시

#### 콘텐츠 구성
```
┌─────────────────────────────────────────┐
│            Header / Navigation          │
├─────────────────────────────────────────┤
│                                         │
│         프로필 정보                      │
│  - 사진, 이름, 직함                     │
│  - 간단한 소개                          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         상세 소개 (Markdown)            │
│  - 경력                                 │
│  - 교육                                 │
│  - 스킬                                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         연락처                           │
│  📧 Email  |  🔗 LinkedIn  |  💼 GitHub │
│                                         │
├─────────────────────────────────────────┤
│               Footer                    │
└─────────────────────────────────────────┘
```

#### Notion 매핑
- **소스**: PageType = "About"인 페이지
- **속성**:
  - Title: "소개" 또는 "About"
  - 본문: Markdown 콘텐츠
  - MetaDescription: SEO 설명

### 4.4. Footer 컴포넌트

#### 목적
- 저작권 정보
- 소셜 미디어 링크
- 추가 네비게이션
- 연락처 정보

#### 콘텐츠 구성
```
┌─────────────────────────────────────────┐
│               Footer                    │
├─────────────────────────────────────────┤
│                                         │
│  Footer 콘텐츠 (Notion에서 관리)        │
│  - 저작권: © 2025 All rights reserved  │
│  - 소셜 링크: GitHub | LinkedIn | Email │
│  - 추가 정보                            │
│                                         │
└─────────────────────────────────────────┘
```

#### Notion 매핑
- **소스**: PageType = "Footer"인 페이지
- **속성**:
  - Title: "Footer"
  - 본문: Footer에 표시될 콘텐츠 (Markdown)

#### 렌더링 위치
- 모든 페이지 하단에 자동 포함

---

## 5. 네비게이션 구조 (Navigation Structure)

### 5.1. 사이드바 네비게이션 (Sidebar Navigation)

#### 위치
- 화면 왼쪽 고정 사이드바 (320px)
- 모바일: 햄버거 메뉴 → 오버레이 사이드바

#### 구성
```
┌──────────────────────┐
│   Sidebar (고정)     │
├──────────────────────┤
│                      │
│   ┌────────────┐     │
│   │  Profile   │     │
│   │   Image    │     │
│   └────────────┘     │
│                      │
│   시진 전            │
│   Frontend Dev       │
│   📧 Email           │
│   🔗 Social          │
│                      │
├──────────────────────┤
│                      │
│   Navigation:        │
│   • 홈 (활성)        │
│   • 프로젝트         │
│   • 소개            │
│   • 연락하기         │
│                      │
├──────────────────────┤
│                      │
│   Footer Info        │
│   © 2025             │
│                      │
└──────────────────────┘
```

#### 네비게이션 아이템

| 섹션 ID | 레이블 | 아이콘 | 동작 | 비고 |
|---------|--------|--------|------|------|
| `home` | 홈 | Home | Home 섹션 표시 | 기본 활성 |
| `projects` | 프로젝트 | Briefcase | Projects 섹션 표시 | 전체 목록 |
| `about` | 소개 | User | About 섹션 표시 | Notion 연동 |
| `contact` | 연락하기 | Mail | Contact 섹션 표시 | 연락처 정보 |

### 5.2. 프로젝트 네비게이션

#### 카테고리 필터 (선택)
```
┌─────────────────────────────────────────┐
│  [All]  [Web Dev]  [Design]  [Mobile]  │
└─────────────────────────────────────────┘
```

- **위치**: 메인 페이지 프로젝트 목록 상단
- **동작**: 클라이언트 사이드 필터링
- **소스**: Notion의 Category 속성

#### 프로젝트 카드 링크
```tsx
<Link href={`/projects/${project.slug}`}>
  <ProjectCard />
</Link>
```

### 5.3. 내부 페이지 네비게이션

#### 프로젝트 상세 → 목록
```
┌─────────────────────────────────────────┐
│  ← 목록으로 돌아가기                     │
└─────────────────────────────────────────┘
```

- **위치**: 프로젝트 상세 페이지 하단
- **링크**: `/` (메인 페이지)

#### 이전/다음 게시물 (선택)
```
┌─────────────────────────────────────────┐
│  ← 이전 게시물    |    다음 게시물 →     │
└─────────────────────────────────────────┘
```

- **구현**: 선택적 기능
- **정렬**: PublishDate 기준

### 5.4. 모바일 네비게이션

#### 햄버거 메뉴
```
┌─────────────────────────────┐
│  [Logo]              [≡]    │
└─────────────────────────────┘

[≡] 클릭 시:
┌─────────────────────────────┐
│  [×]                        │
│                             │
│  Home                       │
│  About                      │
│  Contact                    │
│                             │
└─────────────────────────────┘
```

---

## 6. 콘텐츠 분류 체계 (Content Taxonomy)

### 6.1. 분류 계층 구조

```
콘텐츠
│
├── PageType (1차 분류 - 필수)
│   ├── Home
│   ├── Project
│   ├── Footer
│   └── About
│
└── Category (2차 분류 - Project만 해당, 선택)
    ├── Web Development
    ├── Mobile App
    ├── Design
    ├── Writing
    └── ... (사용자 정의)
```

### 6.2. PageType (1차 분류)

| PageType | 설명 | 수량 | 특징 |
|----------|------|------|------|
| **Home** | 메인 페이지 | 1 | 고정, Slug: "home" |
| **Project** | 프로젝트/게시물 | 다수 | 동적 라우팅, 사용자 정의 Slug |
| **Footer** | Footer 컴포넌트 | 1 | 고정, 모든 페이지에 표시 |
| **About** | 소개 페이지 | 0~1 | 선택적, Slug: "about" |

### 6.3. Category (2차 분류)

#### 특징
- **적용 대상**: Project 페이지만
- **타입**: Select (단일 선택)
- **사용자 정의**: 자유롭게 추가/수정 가능

#### 예시 카테고리
```
Web Development    → 웹 개발 프로젝트
Mobile App         → 모바일 앱 개발
UI/UX Design       → 디자인 프로젝트
Branding           → 브랜딩 작업
Writing            → 글쓰기/블로그
Photography        → 사진
Video              → 영상
Research           → 리서치/분석
```

#### 활용
- 메인 페이지에서 필터링
- 프로젝트 카드에 배지로 표시
- URL에는 포함하지 않음

### 6.4. Tags (3차 분류)

#### 특징
- **적용 대상**: Project 페이지만
- **타입**: Multi-select (다중 선택)
- **사용**: 세부 기술/도구 표시

#### 예시 태그
```
기술 스택:
- React
- TypeScript
- Next.js
- Tailwind CSS
- Node.js
- Python

도구:
- Figma
- Photoshop
- Illustrator

특성:
- Responsive
- Accessible
- Open Source
```

### 6.5. 분류 체계 활용

#### 메인 페이지 필터링 (선택)
```tsx
// Category 기반 필터
<CategoryFilter 
  categories={['All', 'Web Development', 'Design', 'Mobile App']}
  active={activeCategory}
  onChange={setActiveCategory}
/>

// 필터링된 프로젝트 표시
{filteredProjects.map(project => (
  <ProjectCard key={project.id} project={project} />
))}
```

#### 프로젝트 카드 표시
```tsx
<ProjectCard>
  <CategoryBadge>{project.category}</CategoryBadge>
  <Title>{project.title}</Title>
  <Tags>
    {project.tags.map(tag => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </Tags>
</ProjectCard>
```

---

## 7. 콘텐츠 모델 (Content Model)

### 7.1. 통합 콘텐츠 모델

#### 개념도
```
┌─────────────────────────────────────────────────────┐
│          Notion 통합 데이터베이스                     │
│  (모든 PageType의 페이지를 하나의 DB에서 관리)        │
└────────────┬────────────────────────────────────────┘
             │
             ├─→ PageType = "Home"      (1개)
             ├─→ PageType = "Project"   (다수)
             ├─→ PageType = "Footer"    (1개)
             └─→ PageType = "About"     (0~1개)
                    ↓
         ┌──────────┴──────────┐
         │  Published = true?  │
         └──────────┬──────────┘
                    ↓
         ┌──────────┴──────────┐
         │   웹사이트에 게시    │
         └─────────────────────┘
```

### 7.2. 페이지 데이터 모델

#### TypeScript 인터페이스
```typescript
interface PageData {
  // 기본 속성
  id: string;                    // Notion 페이지 ID
  pageType: PageType;            // "Home" | "Project" | "Footer" | "About"
  slug: string;                  // URL slug
  title: string;                 // 페이지 제목
  
  // SEO 속성
  metaDescription: string;       // 메타 설명 (최대 160자 권장)
  
  // 분류 속성 (Project에서 주로 사용)
  category: string | null;       // 카테고리 (단일)
  tags: string[];                // 태그 (다중)
  
  // 미디어
  thumbnail: string | null;      // 썸네일 이미지 URL
  
  // 날짜
  publishDate: string;           // 게시 날짜 (ISO 8601)
  lastEditedTime: string;        // 마지막 수정 시간 (ISO 8601)
  
  // 상태
  published: boolean;            // 게시 여부
  
  // 콘텐츠
  content: string;               // Markdown 형식의 본문
}
```

### 7.3. PageType별 필수/선택 속성

| 속성 | Home | Project | Footer | About |
|------|------|---------|--------|-------|
| **id** | ✓ 필수 | ✓ 필수 | ✓ 필수 | ✓ 필수 |
| **pageType** | ✓ 필수 | ✓ 필수 | ✓ 필수 | ✓ 필수 |
| **slug** | ✓ 필수<br>(고정: "home") | ✓ 필수<br>(사용자 정의) | ✓ 필수<br>(고정: "footer") | ✓ 필수<br>(고정: "about") |
| **title** | ✓ 필수 | ✓ 필수 | ✓ 필수 | ✓ 필수 |
| **published** | ✓ 필수 | ✓ 필수 | ✓ 필수 | ✓ 필수 |
| **metaDescription** | ○ 선택 | ● 권장 | ○ 선택 | ● 권장 |
| **category** | - | ● 권장 | - | - |
| **tags** | - | ○ 선택 | - | - |
| **thumbnail** | - | ● 권장 | - | ○ 선택 |
| **publishDate** | ○ 선택 | ✓ 필수 | - | ○ 선택 |
| **content** | ○ 선택 | ✓ 필수 | ● 권장 | ● 권장 |

### 7.4. 콘텐츠 라이프사이클

```
┌────────────────────────────────────────────────────┐
│                1. 콘텐츠 생성                       │
│  Notion에서 새 페이지 생성                         │
│  - Title, PageType, Slug 등 속성 설정             │
│  - Published = false (초안)                       │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                2. 콘텐츠 작성                       │
│  Notion 에디터에서 본문 작성                       │
│  - 텍스트, 이미지, 코드 블록 등                    │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                3. 콘텐츠 발행                       │
│  Published = true로 변경                           │
│  방법 1: "🚀 지금 바로 발행하기" 버튼 (즉시)       │
│  방법 2: 10분 대기 (자동 동기화)                   │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                4. 동기화                            │
│  GitHub Actions 실행                               │
│  - Notion API로 데이터 가져오기                    │
│  - JSON 파일로 저장 (data/pages/)                 │
│  - Git commit & push                               │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                5. 빌드 & 배포                       │
│  Vercel 자동 배포                                  │
│  - Next.js 빌드                                    │
│  - 정적 페이지 생성                                │
│  - CDN 배포                                        │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                6. 웹사이트 업데이트                 │
│  사용자가 웹사이트에서 콘텐츠 확인 가능            │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                7. 콘텐츠 수정 (선택)                │
│  Notion에서 내용 수정                              │
│  → 다시 발행 (3단계로 돌아감)                      │
└────────────┬───────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────┐
│                8. 콘텐츠 삭제/비공개               │
│  방법 1: Notion에서 페이지 삭제                    │
│  방법 2: Published = false로 변경                 │
│  → 다음 동기화 시 웹사이트에서 제거                │
└────────────────────────────────────────────────────┘
```

---

## 8. 사용자 플로우 (User Flow)

### 8.1. 방문자 플로우 (Visitor Flow)

#### 첫 방문자
```
방문자 → 메인 페이지(/) 도착
   │
   ├─→ Hero 섹션 읽기
   │   └─→ 소개 내용 확인
   │
   └─→ 프로젝트 목록 탐색
       │
       ├─→ 카테고리 필터 사용 (선택)
       │   └─→ 특정 카테고리 프로젝트만 보기
       │
       └─→ 프로젝트 카드 클릭
           └─→ 프로젝트 상세 페이지(/projects/[slug])
               │
               ├─→ 콘텐츠 읽기
               │   ├─→ 텍스트
               │   ├─→ 이미지
               │   └─→ 코드 예제
               │
               ├─→ 외부 링크 클릭 (GitHub, Demo 등)
               │   └─→ 새 탭에서 열림
               │
               └─→ "목록으로 돌아가기" 클릭
                   └─→ 메인 페이지(/)로 복귀
```

#### 재방문자
```
재방문자 → 메인 페이지(/) 도착
   │
   ├─→ 새 게시물 확인
   │   └─→ 최신순 정렬된 프로젝트 목록
   │
   ├─→ 특정 프로젝트 직접 접근
   │   └─→ 북마크나 검색으로 URL 직접 입력
   │       └─→ /projects/[slug]
   │
   └─→ About 페이지 방문
       └─→ /about
           └─→ 연락처 정보 확인
```

### 8.2. 콘텐츠 제작자 플로우 (Creator Flow)

#### 신규 게시물 작성 및 즉시 발행
```
1. Notion 데이터베이스 열기
   │
   ▼
2. "New" 버튼 클릭 → 새 페이지 생성
   │
   ▼
3. 속성 설정
   ├─→ Title: "새 프로젝트 이름"
   ├─→ PageType: "Project" 선택
   ├─→ Slug: "new-project-name" 입력
   ├─→ Category: "Web Development" 선택
   ├─→ Tags: "React", "TypeScript" 추가
   ├─→ Thumbnail: 이미지 업로드
   ├─→ PublishDate: 오늘 날짜 설정
   ├─→ MetaDescription: SEO 설명 입력
   └─→ Published: ☑️ 체크
   │
   ▼
4. 본문 작성
   ├─→ 헤딩, 단락 작성
   ├─→ 이미지 삽입
   ├─→ 코드 블록 추가
   └─→ 링크 삽입
   │
   ▼
5. 발행 방법 선택
   │
   ├─→ Option A: 즉시 발행
   │   └─→ "🚀 지금 바로 발행하기" 버튼 클릭
   │       └─→ Webhook 트리거
   │           └─→ ~1분 대기
   │               └─→ 웹사이트 확인
   │
   └─→ Option B: 자동 발행
       └─→ 그냥 대기 (10분 이내)
           └─→ 자동 동기화
               └─→ 웹사이트 확인
```

#### 기존 게시물 수정
```
1. Notion에서 수정할 페이지 열기
   │
   ▼
2. 내용 수정
   ├─→ 오타 수정
   ├─→ 이미지 추가/변경
   └─→ 정보 업데이트
   │
   ▼
3. 발행 (신규와 동일)
   ├─→ "🚀 지금 바로 발행하기" 버튼 (즉시)
   └─→ 10분 대기 (자동)
   │
   ▼
4. 웹사이트에서 변경사항 확인
```

#### 게시물 비공개/삭제
```
비공개:
Notion에서 Published 체크박스 해제
└─→ 다음 동기화 시 웹사이트에서 제거

삭제:
Notion에서 페이지 삭제
└─→ 다음 동기화 시 웹사이트에서 제거
```

### 8.3. 주요 사용자 여정 (User Journey)

#### Journey 1: 포트폴리오 탐색
```
목표: 프로젝트 작업물 확인

1. [Entry] 메인 페이지 방문
   감정: 호기심 😊
   
2. [Explore] 프로젝트 목록 스크롤
   감정: 흥미 🤔
   
3. [Filter] 관심 카테고리 선택 (선택)
   감정: 집중 🎯
   
4. [Click] 흥미로운 프로젝트 클릭
   감정: 기대 ✨
   
5. [Read] 프로젝트 상세 내용 읽기
   감정: 만족 / 실망 😊 / 😐
   
6. [Action] 외부 링크 클릭 또는 복귀
   감정: 영감 / 다음 탐색 💡
```

#### Journey 2: 빠른 정보 찾기
```
목표: 연락처 정보 확인

1. [Entry] 메인 페이지 방문
   
2. [Navigate] 네비게이션에서 "About" 클릭
   
3. [Scroll] About 페이지에서 연락처 섹션 찾기
   
4. [Action] 이메일 또는 소셜 링크 클릭
   
5. [Exit] 외부 채널로 이동 (메일 클라이언트, LinkedIn 등)
```

---

## 9. 메타데이터 구조 (Metadata Structure)

### 9.1. SEO 메타데이터

#### 기본 메타 태그
```html
<!-- Title -->
<title>프로젝트 제목 | 포트폴리오</title>

<!-- Description -->
<meta name="description" content="프로젝트 설명 (최대 160자)">

<!-- Canonical URL -->
<link rel="canonical" href="https://portfolio.example.com/projects/slug">

<!-- Robots -->
<meta name="robots" content="index, follow">
```

#### Open Graph (Facebook, LinkedIn 등)
```html
<meta property="og:type" content="article">
<meta property="og:title" content="프로젝트 제목">
<meta property="og:description" content="프로젝트 설명">
<meta property="og:image" content="https://...thumbnail.jpg">
<meta property="og:url" content="https://portfolio.example.com/projects/slug">
<meta property="article:published_time" content="2024-10-18T00:00:00Z">
<meta property="article:author" content="작성자 이름">
```

#### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="프로젝트 제목">
<meta name="twitter:description" content="프로젝트 설명">
<meta name="twitter:image" content="https://...thumbnail.jpg">
<meta name="twitter:creator" content="@username">
```

### 9.2. PageType별 메타데이터 매핑

#### Home 페이지
```typescript
{
  title: "홍길동 - UX/UI 디자이너",
  description: "서울 기반 UX/UI 디자이너의 포트폴리오. 사용자 중심 디자인과 인터랙티브한 경험을 만듭니다.",
  openGraph: {
    type: "website",
    title: "홍길동 - UX/UI 디자이너",
    description: "...",
    images: ["/og-image.jpg"],
    url: "https://portfolio.example.com"
  }
}
```

#### Project 페이지
```typescript
{
  title: project.title,
  description: project.metaDescription,
  openGraph: {
    type: "article",
    title: project.title,
    description: project.metaDescription,
    images: [project.thumbnail],
    url: `https://portfolio.example.com/projects/${project.slug}`,
    publishedTime: project.publishDate,
    tags: project.tags
  },
  twitter: {
    card: "summary_large_image",
    title: project.title,
    description: project.metaDescription,
    images: [project.thumbnail]
  }
}
```

#### About 페이지
```typescript
{
  title: "소개 | 홍길동",
  description: "홍길동의 경력, 스킬, 연락처 정보",
  openGraph: {
    type: "profile",
    title: "소개 | 홍길동",
    description: "...",
    url: "https://portfolio.example.com/about"
  }
}
```

### 9.3. 구조화된 데이터 (JSON-LD)

#### Person Schema (About 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "홍길동",
  "jobTitle": "UX/UI Designer",
  "url": "https://portfolio.example.com",
  "sameAs": [
    "https://github.com/username",
    "https://linkedin.com/in/username",
    "https://twitter.com/username"
  ],
  "email": "hello@example.com"
}
```

#### Article Schema (Project 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "프로젝트 제목",
  "description": "프로젝트 설명",
  "image": "https://...thumbnail.jpg",
  "datePublished": "2024-10-18T00:00:00Z",
  "dateModified": "2024-10-18T12:00:00Z",
  "author": {
    "@type": "Person",
    "name": "홍길동"
  },
  "publisher": {
    "@type": "Person",
    "name": "홍길동"
  }
}
```

---

## 10. Notion 데이터베이스 매핑

### 10.1. 통합 데이터베이스 구조

#### Notion 데이터베이스 속성

| Notion 속성 | 타입 | 필수 | 설명 | 웹사이트 매핑 |
|------------|------|------|------|--------------|
| **Title** | title | ✓ | 페이지 제목 | `<h1>`, `<title>` |
| **PageType** | select | ✓ | 페이지 유형 | 라우팅 결정 |
| **Slug** | rich_text | ✓ | URL 경로 | URL path |
| **MetaDescription** | rich_text | ○ | SEO 설명 | `<meta name="description">` |
| **Published** | checkbox | ✓ | 게시 여부 | 빌드 포함 여부 |
| **Category** | select | ○ | 카테고리 | 카드 배지, 필터 |
| **Thumbnail** | files | ○ | 썸네일 | 카드 이미지, OG 이미지 |
| **PublishDate** | date | ○ | 게시 날짜 | 날짜 표시, 정렬 |
| **Tags** | multi_select | ○ | 태그 | 태그 목록 |
| **본문** | blocks | ○ | 페이지 콘텐츠 | Markdown 렌더링 |

### 10.2. 데이터베이스 → 웹사이트 변환 프로세스

```
┌───────────────────────────────────────────────────┐
│          Notion 통합 데이터베이스                  │
├───────────────────────────────────────────────────┤
│  Page 1: [Title="홈", PageType="Home", ...]       │
│  Page 2: [Title="프로젝트1", PageType="Project"]  │
│  Page 3: [Title="프로젝트2", PageType="Project"]  │
│  Page 4: [Title="Footer", PageType="Footer"]      │
│  Page 5: [Title="소개", PageType="About"]         │
└────────────────┬──────────────────────────────────┘
                 │ 1. Query Database
                 │    (Published = true)
                 ▼
┌───────────────────────────────────────────────────┐
│              GitHub Actions                        │
│  sync-all-pages.js                                │
├───────────────────────────────────────────────────┤
│  for each page:                                   │
│    - Retrieve page properties                     │
│    - Convert blocks to Markdown                   │
│    - Generate PageData object                     │
│    - Save as JSON file                            │
└────────────────┬──────────────────────────────────┘
                 │ 2. Save to Repository
                 ▼
┌───────────────────────────────────────────────────┐
│          GitHub Repository: data/                  │
├───────────────────────────────────────────────────┤
│  pages/                                           │
│    ├─ home.json              (PageType: Home)     │
│    ├─ project-1.json         (PageType: Project)  │
│    ├─ project-2.json         (PageType: Project)  │
│    ├─ footer.json            (PageType: Footer)   │
│    └─ about.json             (PageType: About)    │
│  index.json                  (메타데이터)         │
└────────────────┬──────────────────────────────────┘
                 │ 3. Git Push → Vercel Deploy
                 ▼
┌───────────────────────────────────────────────────┐
│          Next.js Build Process                     │
├───────────────────────────────────────────────────┤
│  1. Read data/index.json                          │
│  2. Generate static params                        │
│  3. Create static pages:                          │
│     - / (Home)                                    │
│     - /projects/project-1 (Project)               │
│     - /projects/project-2 (Project)               │
│     - /about (About)                              │
│  4. Include Footer component in all pages         │
└────────────────┬──────────────────────────────────┘
                 │ 4. Deploy to CDN
                 ▼
┌───────────────────────────────────────────────────┐
│          Static Website (Vercel)                   │
│  https://portfolio.example.com                    │
└───────────────────────────────────────────────────┘
```

### 10.3. PageType별 처리 로직

```typescript
// NotionService.convertPageToData()
async convertPageToData(page: NotionPage): Promise<PageData> {
  const pageType = getPropertyValue(page, "PageType");
  let slug = getPropertyValue(page, "Slug");
  
  // PageType에 따른 기본 slug 설정
  if (!slug) {
    switch (pageType) {
      case "Home":
        slug = "home";
        break;
      case "Footer":
        slug = "footer";
        break;
      case "About":
        slug = "about";
        break;
      default:
        slug = page.id; // Fallback to page ID
    }
  }
  
  // Convert blocks to Markdown
  const blocks = await this.n2m.pageToMarkdown(page.id);
  const markdown = this.n2m.toMarkdownString(blocks);
  
  return {
    id: page.id,
    pageType: pageType || "Project",
    slug: slug,
    title: getPropertyValue(page, "Title"),
    metaDescription: getPropertyValue(page, "MetaDescription"),
    category: getPropertyValue(page, "Category"),
    tags: getPropertyValue(page, "Tags"),
    thumbnail: getPropertyValue(page, "Thumbnail"),
    publishDate: getPropertyValue(page, "PublishDate"),
    lastEditedTime: page.last_edited_time,
    published: getPropertyValue(page, "Published"),
    content: markdown.parent
  };
}
```

### 10.4. 데이터 파일 구조

#### data/index.json
```json
{
  "lastSyncTime": "2024-10-18T12:00:00Z",
  "totalPages": 12,
  "pagesByType": {
    "home": {
      "id": "page-1",
      "pageType": "Home",
      "slug": "home",
      "title": "홈",
      "published": true
    },
    "projects": [
      {
        "id": "page-2",
        "pageType": "Project",
        "slug": "project-1",
        "title": "프로젝트 1",
        "category": "Web Development",
        "publishDate": "2024-10-15",
        "published": true
      },
      {
        "id": "page-3",
        "pageType": "Project",
        "slug": "project-2",
        "title": "프로젝트 2",
        "category": "Design",
        "publishDate": "2024-10-10",
        "published": true
      }
    ],
    "footer": {
      "id": "page-4",
      "pageType": "Footer",
      "slug": "footer",
      "title": "Footer",
      "published": true
    },
    "about": {
      "id": "page-5",
      "pageType": "About",
      "slug": "about",
      "title": "소개",
      "published": true
    }
  },
  "pages": [
    // 전체 페이지 목록 (하위 호환성)
  ]
}
```

#### data/pages/project-1.json
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "pageType": "Project",
  "slug": "project-1",
  "title": "반응형 웹 디자인 시스템",
  "metaDescription": "모바일부터 데스크톱까지 일관된 사용자 경험을 제공하는 디자인 시스템 구축 프로젝트",
  "category": "Web Development",
  "tags": ["React", "TypeScript", "Storybook", "Design System"],
  "thumbnail": "https://notion.so/images/...",
  "publishDate": "2024-10-15",
  "lastEditedTime": "2024-10-15T10:30:00Z",
  "published": true,
  "content": "# 프로젝트 개요\n\n이 프로젝트는...\n\n## 기술 스택\n\n- React 18\n- TypeScript\n- ..."
}
```

---

## 부록 A: IA 체크리스트

### 설계 검증 체크리스트

#### 사이트맵
- [ ] 모든 필수 페이지 타입 정의됨 (Home, Project, Footer, About)
- [ ] 페이지 계층 구조가 명확함 (최대 2단계)
- [ ] 확장 가능한 구조 (새 프로젝트 추가 용이)

#### URL 구조
- [ ] RESTful URL 패턴 적용
- [ ] Slug 생성 규칙 명확
- [ ] URL 유효성 검사 규칙 정의

#### 네비게이션
- [ ] 주 네비게이션 구조 정의
- [ ] 모바일 네비게이션 고려
- [ ] Breadcrumb/Back 링크 계획 (필요 시)

#### 콘텐츠 분류
- [ ] PageType 분류 체계 명확
- [ ] Category 활용 방안 정의
- [ ] Tags 사용 가이드 작성

#### 메타데이터
- [ ] SEO 메타데이터 구조 정의
- [ ] Open Graph 메타데이터 계획
- [ ] 구조화된 데이터 (JSON-LD) 계획

#### Notion 매핑
- [ ] 모든 Notion 속성이 웹사이트 요소로 매핑됨
- [ ] PageType별 필수/선택 속성 정의
- [ ] 데이터 변환 프로세스 문서화

---

## 부록 B: IA 변경 관리

### 변경 시 고려사항

#### URL 구조 변경
```
❌ 피해야 할 변경:
- 기존 URL 패턴 변경 (SEO 손실)
- Slug 자동 변경 (링크 깨짐)

✓ 안전한 변경:
- 새 PageType 추가
- 선택적 속성 추가
- Category/Tags 옵션 추가
```

#### 페이지 타입 추가
```typescript
// 새 PageType 추가 시
type PageType = "Home" | "Project" | "Footer" | "About" | "Blog"; // 추가

// 해당 PageType의 URL 패턴 정의
// 예: Blog → /blog/[slug]

// 필수/선택 속성 정의
// 예: Blog는 publishDate 필수, category 선택
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2025.10.18 | 초안 작성 - PRD v1.8, TRD v1.1, CODE_GUIDELINES v1.0 기반 | AI Assistant |
| 1.1 | 2025.10.18 | 사이드바 기반 네비게이션 및 SPA 스타일 레이아웃으로 변경 | AI Assistant |

---

**문서 승인:**

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| 제품 매니저 | | | |
| 기술 리드 | | | |
| UX 디자이너 | | | |

---

*본 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*

