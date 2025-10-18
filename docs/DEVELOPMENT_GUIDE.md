# 개발 가이드 및 구현 로드맵 (Development Guide & Implementation Roadmap)

| 문서 버전 | 작성일 | 작성자 | 상태 |
| :--- | :--- | :--- | :--- |
| 1.0 | 2025.10.18 | AI Assistant | 최신(Latest) |

---

## 목차

### 시작하기
1. [개요 및 준비사항](#1-개요-및-준비사항)
2. [전체 개발 로드맵](#2-전체-개발-로드맵)

### 구현 Phase
3. [Phase 0: 사전 준비](#phase-0-사전-준비)
4. [Phase 1: 프로젝트 초기화](#phase-1-프로젝트-초기화)
5. [Phase 2: 기본 구조 및 설정](#phase-2-기본-구조-및-설정)
6. [Phase 3: Notion 연동 구현](#phase-3-notion-연동-구현)
7. [Phase 4: 공통 컴포넌트 구현](#phase-4-공통-컴포넌트-구현)
8. [Phase 5: 페이지 라우팅 구현](#phase-5-페이지-라우팅-구현)
9. [Phase 6: 동기화 스크립트](#phase-6-동기화-스크립트)
10. [Phase 7: GitHub Actions 워크플로우](#phase-7-github-actions-워크플로우)
11. [Phase 8: Vercel 배포](#phase-8-vercel-배포)
12. [Phase 9: Notion 통합 완성](#phase-9-notion-통합-완성)
13. [Phase 10: 최적화 및 런칭](#phase-10-최적화-및-런칭)

### 부록
14. [부록 A: 전체 파일 구조](#부록-a-전체-파일-구조)
15. [부록 B: 환경 변수 전체 목록](#부록-b-환경-변수-전체-목록)
16. [부록 C: package.json 전체](#부록-c-packagejson-전체)
17. [부록 D: 통합 트러블슈팅](#부록-d-통합-트러블슈팅)

---

## 1. 개요 및 준비사항

### 1.1. 문서 목적

본 문서는 Notion 기반 개인 웹페이지 자동화 솔루션을 **처음부터 끝까지** 구현하기 위한 단계별 가이드입니다. 각 Phase는 독립적으로 완료 가능하며, 순차적으로 진행하면 완전한 포트폴리오 웹사이트가 완성됩니다.

### 1.2. 대상 독자

- **개발 경험이 있는 개발자**: TypeScript, React 기본 지식 보유
- **웹 개발 입문자**: 단계별 가이드를 따라 학습하며 구현
- **기술 PM/디자이너**: 개발 프로세스 이해 및 협업

### 1.3. 필요한 사전 지식

| 기술 | 필수 수준 | 설명 |
|------|----------|------|
| **JavaScript/TypeScript** | ⭐⭐⭐ | 기본 문법, async/await, 모듈 시스템 |
| **React** | ⭐⭐ | 컴포넌트, Props, Hooks 기본 |
| **Next.js** | ⭐ | App Router 개념 (학습 가능) |
| **Git** | ⭐⭐ | 기본 명령어 (add, commit, push) |
| **Terminal** | ⭐⭐ | CLI 명령어 실행 |

### 1.4. 필요한 계정 및 도구

#### 필수 계정
- [ ] **Notion 계정** (무료) - [notion.so](https://notion.so)
- [ ] **GitHub 계정** (무료) - [github.com](https://github.com)
- [ ] **Vercel 계정** (무료) - [vercel.com](https://vercel.com)

#### 필수 도구
- [ ] **Node.js 18+** - [nodejs.org](https://nodejs.org)
- [ ] **VS Code** (권장) - [code.visualstudio.com](https://code.visualstudio.com)
- [ ] **Git** - [git-scm.com](https://git-scm.com)

#### 권장 VS Code 확장
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Translator

### 1.5. 예상 총 소요 시간

| Phase | 예상 시간 | 난이도 |
|-------|----------|--------|
| Phase 0: 사전 준비 | 30분 | ⭐ |
| Phase 1: 프로젝트 초기화 | 20분 | ⭐ |
| Phase 2: 기본 구조 | 40분 | ⭐⭐ |
| Phase 3: Notion 연동 | 1시간 | ⭐⭐⭐ |
| Phase 4: 공통 컴포넌트 | 1.5시간 | ⭐⭐ |
| Phase 5: 페이지 구현 | 2시간 | ⭐⭐⭐ |
| Phase 6: 동기화 스크립트 | 1시간 | ⭐⭐⭐ |
| Phase 7: GitHub Actions | 40분 | ⭐⭐ |
| Phase 8: Vercel 배포 | 30분 | ⭐⭐ |
| Phase 9: Notion 통합 | 40분 | ⭐⭐ |
| Phase 10: 최적화 | 1시간 | ⭐⭐ |
| **총 예상 시간** | **약 9-10시간** | |

> 💡 **팁**: 각 Phase를 하루에 1-2개씩 진행하면 약 1주일 내에 완성할 수 있습니다.

---

## 2. 전체 개발 로드맵

### 2.1. 개발 프로세스 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 사전 준비                                          │
│  ✓ 계정 생성 (Notion, GitHub, Vercel)                       │
│  ✓ 개발 환경 설정 (Node.js, Git, VS Code)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1-2: 프로젝트 초기화 및 기본 구조                     │
│  → Next.js + TypeScript + Tailwind + shadcn UI              │
│  → 타입 정의, 설정 파일, 환경 변수                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3-4: 핵심 로직 및 컴포넌트                            │
│  → Notion API 연동 (NotionService)                          │
│  → 공통 컴포넌트 (Header, Footer, Card, Markdown)          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 페이지 구현                                        │
│  → 홈 페이지 (프로젝트 목록)                                 │
│  → 프로젝트 상세 페이지 (동적 라우트)                        │
│  → About 페이지 (선택)                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 6-7: 자동화                                           │
│  → 동기화 스크립트 (sync-single, sync-all)                  │
│  → GitHub Actions 워크플로우                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 8-9: 배포 및 통합                                     │
│  → Vercel 배포                                               │
│  → Webhook 설정                                              │
│  → Notion 버튼 연동                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 10: 최적화 및 런칭                                    │
│  → 성능 최적화, SEO, 접근성                                  │
│  → 프로덕션 배포                                             │
│  ✨ 완성! 🎉                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.2. Phase 간 의존성

```
Phase 0 (사전 준비)
    ↓
Phase 1 (초기화) → Phase 2 (구조)
    ↓
Phase 3 (Notion 연동) ← 중요!
    ↓
Phase 4 (컴포넌트) → Phase 5 (페이지)
    ↓
Phase 6 (스크립트) → Phase 7 (GitHub Actions)
    ↓
Phase 8 (Vercel) → Phase 9 (Notion 통합)
    ↓
Phase 10 (최적화)
```

---

## Phase 0: 사전 준비

### 📋 개요
개발을 시작하기 전에 필요한 모든 계정과 도구를 준비합니다.

### 🎯 목표
- [ ] 모든 필수 계정 생성
- [ ] 개발 환경 설정 완료
- [ ] Notion Integration 생성

### ⏱️ 예상 시간
30분

---

### Step 0.1: 계정 생성

#### Notion 계정
1. [notion.so](https://notion.so) 접속
2. 이메일로 회원가입 (무료 플랜)
3. Workspace 생성

#### GitHub 계정
1. [github.com](https://github.com) 접속
2. 회원가입
3. 이메일 인증

#### Vercel 계정
1. [vercel.com](https://vercel.com) 접속
2. "GitHub로 계속하기" 클릭
3. GitHub 계정으로 로그인

### Step 0.2: 개발 환경 설정

#### Node.js 설치
```bash
# 현재 버전 확인
node --version  # v18.0.0 이상 필요

# 설치 필요 시
# macOS (Homebrew)
brew install node

# Windows (공식 사이트)
# https://nodejs.org 에서 LTS 버전 다운로드
```

#### Git 설치
```bash
# 현재 버전 확인
git --version

# macOS
brew install git

# Windows
# https://git-scm.com 에서 다운로드
```

### Step 0.3: Notion Integration 생성

1. [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) 접속
2. **"+ New integration"** 클릭
3. 설정:
   - **Name**: "Portfolio Sync" (또는 원하는 이름)
   - **Associated workspace**: 본인 Workspace 선택
   - **Type**: Internal
4. **Submit** 클릭
5. **Internal Integration Token** 복사
   ```
   secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. 안전한 곳에 저장 (나중에 환경 변수로 사용)

### ✅ Phase 0 체크리스트
- [ ] Notion 계정 생성 완료
- [ ] GitHub 계정 생성 완료
- [ ] Vercel 계정 생성 완료
- [ ] Node.js 18+ 설치 확인
- [ ] Git 설치 확인
- [ ] VS Code 설치 (권장)
- [ ] Notion Integration Token 복사

---

## Phase 1: 프로젝트 초기화

### 📋 개요
Next.js 프로젝트를 생성하고 shadcn UI를 설정합니다.

### 🎯 목표
- [ ] Next.js 14+ 프로젝트 생성
- [ ] shadcn UI 초기화
- [ ] 기본 디렉토리 구조 생성
- [ ] Git 저장소 초기화

### ⏱️ 예상 시간
20분

---

### Step 1.1: Next.js 프로젝트 생성

```bash
# 프로젝트 생성
npx create-next-app@latest notion-portfolio

# 프롬프트에 다음과 같이 응답:
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? … Yes
✔ Would you like to customize the default import alias (@/*)? … No

# 프로젝트 디렉토리로 이동
cd notion-portfolio
```

### Step 1.2: shadcn UI 초기화

```bash
# shadcn UI CLI 초기화
npx shadcn-ui@latest init

# 프롬프트에 다음과 같이 응답:
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Would you like to use CSS variables for colors? › yes
```

이 명령은 다음 파일들을 자동 생성합니다:
- `components.json`
- `src/components/ui/` 디렉토리
- `src/lib/utils.ts`
- `tailwind.config.ts` 업데이트
- `src/app/globals.css` 업데이트

### Step 1.3: 추가 의존성 설치

```bash
# Notion SDK 및 Markdown 변환
npm install @notionhq/client notion-to-md

# 아이콘
npm install lucide-react

# Markdown 렌더링
npm install react-markdown remark-gfm rehype-raw

# 코드 하이라이팅
npm install react-syntax-highlighter
npm install -D @types/react-syntax-highlighter

# 애니메이션 (선택)
npm install framer-motion

# 유틸리티
npm install clsx
```

### Step 1.4: 디렉토리 구조 생성

```bash
# 필요한 디렉토리 생성
mkdir -p src/types
mkdir -p src/lib
mkdir -p scripts
mkdir -p data/pages
mkdir -p api/webhook
mkdir -p .github/workflows

# .gitkeep 파일 생성 (빈 디렉토리 추적)
touch data/.gitkeep
touch data/pages/.gitkeep
```

### Step 1.5: Git 초기화

```bash
# Git 초기화 (이미 되어있지 않다면)
git init

# 초기 커밋
git add .
git commit -m "chore: initial project setup with Next.js and shadcn UI"
```

### ✅ Phase 1 체크리스트
- [ ] Next.js 프로젝트 생성 완료
- [ ] shadcn UI 초기화 완료
- [ ] 모든 의존성 설치 완료 (`npm install` 에러 없음)
- [ ] 디렉토리 구조 생성 완료
- [ ] Git 초기화 완료
- [ ] `npm run dev` 실행 시 개발 서버 정상 작동

---

## Phase 2: 기본 구조 및 설정

### 📋 개요
TypeScript 타입, 환경 변수, Next.js 설정 등 프로젝트의 기반을 구축합니다.

### 🎯 목표
- [ ] TypeScript 타입 정의
- [ ] 환경 변수 템플릿 생성
- [ ] Next.js 및 Tailwind 설정
- [ ] shadcn UI 테마 커스터마이징

### ⏱️ 예상 시간
40분

---

### Step 2.1: TypeScript 타입 정의

**파일 생성**: `src/types/index.ts`

```typescript
// src/types/index.ts

/**
 * 페이지 타입 정의
 */
export type PageType = "Home" | "Project" | "Footer" | "About";

/**
 * 페이지 데이터 인터페이스
 */
export interface PageData {
  // 기본 속성
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
  
  // SEO
  metaDescription: string;
  
  // 분류 (Project 주로 사용)
  category: string | null;
  tags: string[];
  
  // 미디어
  thumbnail: string | null;
  
  // 날짜
  publishDate: string;
  lastEditedTime: string;
  
  // 상태
  published: boolean;
  
  // 콘텐츠
  content: string;
}

/**
 * 페이지 요약 인터페이스 (목록용)
 */
export interface PageSummary {
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
  category: string | null;
  publishDate: string;
  published: boolean;
}

/**
 * 데이터베이스 인덱스 인터페이스
 */
export interface DatabaseIndex {
  lastSyncTime: string;
  totalPages: number;
  pagesByType: {
    home: PageSummary | null;
    projects: PageSummary[];
    footer: PageSummary | null;
    about: PageSummary | null;
  };
  pages: PageSummary[];
}

/**
 * Notion 웹훅 페이로드
 */
export interface NotionWebhookPayload {
  page_id: string;
  workspace_id?: string;
  timestamp?: string;
}
```

### Step 2.2: 환경 변수 설정

**파일 생성**: `.env.local`

```bash
# Notion API
NOTION_API_KEY=secret_your_notion_integration_token_here
NOTION_DATABASE_ID=your_database_id_here

# GitHub (나중에 설정)
GITHUB_OWNER=your-github-username
GITHUB_REPO=notion-portfolio
GITHUB_TOKEN=your_github_token_here

# Webhook Security
NOTION_WEBHOOK_SECRET=generate_random_string_here
```

**파일 생성**: `.env.example` (Git에 커밋용)

```bash
# Notion API
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# GitHub
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_TOKEN=

# Webhook
NOTION_WEBHOOK_SECRET=
```

### Step 2.3: Next.js 설정

**파일 수정**: `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Vercel
  output: 'export',
  
  // Image optimization
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        pathname: '/secure.notion-static.com/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
  
  // Strict mode
  reactStrictMode: true,
  
  // TypeScript strict
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
```

### Step 2.4: Tailwind 설정

**파일 수정**: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### Step 2.5: globals.css 테마 설정

**파일 수정**: `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 91.2% 59.8%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 47.4% 11.2%;
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

### Step 2.6: 추가 Tailwind 플러그인 설치

```bash
# Typography plugin (Markdown 스타일링용)
npm install -D @tailwindcss/typography
```

### ✅ Phase 2 체크리스트
- [ ] `src/types/index.ts` 파일 생성
- [ ] `.env.local` 파일 생성 및 설정
- [ ] `.env.example` 파일 생성
- [ ] `next.config.ts` 수정 완료
- [ ] `tailwind.config.ts` 수정 완료
- [ ] `src/app/globals.css` 테마 설정 완료
- [ ] `npm run dev` 실행 시 에러 없음

---

## Phase 3: Notion 연동 구현

### 📋 개요
Notion API와 통신하는 핵심 로직을 구현합니다. 이 Phase가 전체 프로젝트의 핵심입니다.

### 🎯 목표
- [ ] NotionService 클래스 구현
- [ ] 에러 핸들링 시스템 구축
- [ ] 로거 유틸리티 구현

### ⏱️ 예상 시간
1시간

### 🔧 필요 지식
- TypeScript 클래스
- Async/Await
- Notion API 기본 개념

---

### Step 3.1: 에러 핸들링 클래스

**파일 생성**: `src/lib/errors.ts`

```typescript
// src/lib/errors.ts

export class NotionApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'NotionApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class SyncError extends Error {
  constructor(
    message: string,
    public pageId?: string
  ) {
    super(message);
    this.name = 'SyncError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 중앙집중식 에러 핸들러
 */
export function handleError(error: unknown): void {
  if (error instanceof NotionApiError) {
    console.error(`[Notion API Error] ${error.code}:`, {
      message: error.message,
      statusCode: error.statusCode,
    });
    
    if (error.statusCode === 429) {
      console.error('⚠️  Rate limited. Please wait before retrying.');
    }
  } else if (error instanceof SyncError) {
    console.error('[Sync Error]:', {
      message: error.message,
      pageId: error.pageId,
    });
  } else if (error instanceof ValidationError) {
    console.error('[Validation Error]:', {
      message: error.message,
      field: error.field,
    });
  } else if (error instanceof Error) {
    console.error('[Unknown Error]:', error.message);
    console.error(error.stack);
  } else {
    console.error('[Unexpected Error]:', error);
  }
}
```

### Step 3.2: 로거 유틸리티

**파일 생성**: `src/lib/logger.ts`

```typescript
// src/lib/logger.ts

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

class Logger {
  private log(level: LogLevel, message: string, context?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };
    
    const output = JSON.stringify(entry);
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(output);
        break;
      case LogLevel.WARN:
        console.warn(output);
        break;
      default:
        console.log(output);
    }
  }
  
  debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }
  
  error(message: string, error?: Error, context?: any): void {
    this.log(LogLevel.ERROR, message, {
      ...context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : undefined,
    });
  }
}

export const logger = new Logger();
```

### Step 3.3: NotionService 구현 (핵심!)

**파일 생성**: `src/lib/notion.ts`

```typescript
// src/lib/notion.ts

import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageData, PageType } from '@/types';
import { logger } from './logger';

class NotionService {
  private static instance: NotionService;
  private notion: Client;
  private n2m: NotionToMarkdown;
  
  private constructor() {
    const apiKey = process.env.NOTION_API_KEY;
    
    if (!apiKey) {
      throw new Error('NOTION_API_KEY is not defined');
    }
    
    this.notion = new Client({ auth: apiKey });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
    
    logger.info('NotionService initialized');
  }
  
  /**
   * Singleton 인스턴스 가져오기
   */
  public static getInstance(): NotionService {
    if (!NotionService.instance) {
      NotionService.instance = new NotionService();
    }
    return NotionService.instance;
  }
  
  /**
   * 데이터베이스 전체 쿼리
   */
  async queryDatabase(databaseId: string): Promise<PageData[]> {
    logger.info('Querying database', { databaseId });
    
    try {
      const response = await this.notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'PublishDate',
            direction: 'descending',
          },
        ],
      });
      
      logger.info(`Found ${response.results.length} published pages`);
      
      const pages = await Promise.all(
        response.results.map((page) => this.convertPageToData(page))
      );
      
      return pages;
    } catch (error: any) {
      logger.error('Failed to query database', error);
      throw error;
    }
  }
  
  /**
   * 단일 페이지 가져오기
   */
  async getPage(pageId: string): Promise<PageData> {
    logger.info('Fetching page', { pageId });
    
    try {
      const page = await this.notion.pages.retrieve({ page_id: pageId });
      return await this.convertPageToData(page);
    } catch (error: any) {
      logger.error('Failed to fetch page', error, { pageId });
      throw error;
    }
  }
  
  /**
   * Notion 페이지를 PageData로 변환
   */
  private async convertPageToData(page: any): Promise<PageData> {
    // Get blocks and convert to Markdown
    const blocks = await this.n2m.pageToMarkdown(page.id);
    const markdown = this.n2m.toMarkdownString(blocks);
    
    // Extract PageType
    const pageType = this.getPropertyValue(page, 'PageType') as PageType;
    
    // Generate slug
    let slug = this.getPropertyValue(page, 'Slug') as string;
    if (!slug) {
      switch (pageType) {
        case 'Home':
          slug = 'home';
          break;
        case 'Footer':
          slug = 'footer';
          break;
        case 'About':
          slug = 'about';
          break;
        default:
          slug = page.id;
      }
    }
    
    return {
      id: page.id,
      pageType: pageType || 'Project',
      slug: slug,
      title: this.getPropertyValue(page, 'Title') as string,
      metaDescription: (this.getPropertyValue(page, 'MetaDescription') as string) || '',
      category: this.getPropertyValue(page, 'Category') as string | null,
      tags: (this.getPropertyValue(page, 'Tags') as string[]) || [],
      thumbnail: this.getPropertyValue(page, 'Thumbnail') as string | null,
      publishDate: (this.getPropertyValue(page, 'PublishDate') as string) || new Date().toISOString(),
      lastEditedTime: page.last_edited_time,
      published: this.getPropertyValue(page, 'Published') as boolean,
      content: markdown.parent,
    };
  }
  
  /**
   * Notion 속성값 추출
   */
  private getPropertyValue(page: any, propertyName: string): any {
    const property = page.properties[propertyName];
    
    if (!property) {
      return null;
    }
    
    switch (property.type) {
      case 'title':
        return property.title[0]?.plain_text || '';
        
      case 'rich_text':
        return property.rich_text[0]?.plain_text || '';
        
      case 'checkbox':
        return property.checkbox;
        
      case 'select':
        return property.select?.name || null;
        
      case 'multi_select':
        return property.multi_select.map((item: any) => item.name);
        
      case 'date':
        return property.date?.start || null;
        
      case 'files':
        return property.files[0]?.external?.url || 
               property.files[0]?.file?.url || null;
        
      default:
        return null;
    }
  }
}

export default NotionService;
```

### Step 3.4: 데이터 로더 구현

**파일 생성**: `src/lib/data.ts`

```typescript
// src/lib/data.ts

import fs from 'fs/promises';
import path from 'path';
import { PageData, DatabaseIndex, PageSummary } from '@/types';

/**
 * 데이터베이스 인덱스 로드
 */
export async function loadIndex(): Promise<DatabaseIndex> {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  
  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // 인덱스 파일이 없으면 기본값 반환
    return {
      lastSyncTime: '',
      totalPages: 0,
      pagesByType: {
        home: null,
        projects: [],
        footer: null,
        about: null,
      },
      pages: [],
    };
  }
}

/**
 * 단일 페이지 데이터 로드
 */
export async function loadPageData(slug: string): Promise<PageData | null> {
  const filePath = path.join(process.cwd(), 'data', 'pages', `${slug}.json`);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * 모든 프로젝트 로드
 */
export async function loadAllProjects(): Promise<PageData[]> {
  const index = await loadIndex();
  
  const projects = await Promise.all(
    index.pagesByType.projects.map((summary) => loadPageData(summary.slug))
  );
  
  return projects.filter((p): p is PageData => p !== null);
}

/**
 * Home 페이지 데이터 로드
 */
export async function loadHomeData(): Promise<PageData | null> {
  return await loadPageData('home');
}

/**
 * Footer 데이터 로드
 */
export async function loadFooterData(): Promise<PageData | null> {
  return await loadPageData('footer');
}

/**
 * About 페이지 데이터 로드
 */
export async function loadAboutData(): Promise<PageData | null> {
  return await loadPageData('about');
}
```

### ✅ Phase 3 체크리스트
- [ ] `src/lib/errors.ts` 생성 완료
- [ ] `src/lib/logger.ts` 생성 완료
- [ ] `src/lib/notion.ts` 생성 완료
- [ ] `src/lib/data.ts` 생성 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] 모든 import 경로 정확

### 🐛 Phase 3 트러블슈팅

**문제**: `Module not found: @notionhq/client`
```bash
# 해결
npm install @notionhq/client notion-to-md
```

**문제**: `Cannot find module '@/types'`
```bash
# tsconfig.json 확인
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Phase 4: 공통 컴포넌트 구현

### 📋 개요
shadcn UI를 활용하여 재사용 가능한 공통 컴포넌트를 구현합니다.

### 🎯 목표
- [ ] shadcn UI 컴포넌트 설치
- [ ] Header 컴포넌트 구현
- [ ] Footer 컴포넌트 구현
- [ ] ProjectCard 컴포넌트 구현
- [ ] MarkdownRenderer 컴포넌트 구현

### ⏱️ 예상 시간
1.5시간

---

### Step 4.1: shadcn UI 컴포넌트 설치

```bash
# 필수 컴포넌트
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add skeleton

# 네비게이션
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add sheet
```

이 명령들은 `src/components/ui/` 디렉토리에 컴포넌트를 생성합니다.

### Step 4.2: Header 컴포넌트

**파일 생성**: `src/components/Header.tsx`

```typescript
// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
        >
          Portfolio
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
```

### Step 4.3: Footer 컴포넌트

**파일 생성**: `src/components/Footer.tsx`

```typescript
// src/components/Footer.tsx

import { loadFooterData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default async function Footer() {
  const footerData = await loadFooterData();
  
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {footerData ? (
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: footerData.content }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Default Footer */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Portfolio
              </h3>
              <p className="text-slate-600">
                Notion으로 관리하는 개인 포트폴리오
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                링크
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-slate-600 hover:text-slate-900">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-slate-600 hover:text-slate-900">
                    소개
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                소셜
              </h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  GitHub
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        <div className="text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

### Step 4.4: ProjectCard 컴포넌트

**파일 생성**: `src/components/ProjectCard.tsx`

```typescript
// src/components/ProjectCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { PageData } from '@/types';

interface ProjectCardProps {
  project: PageData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.publishDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 h-full">
        <CardContent className="p-0">
          {/* Thumbnail */}
          {project.thumbnail && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            {project.category && (
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium mb-3">
                {project.category}
              </Badge>
            )}
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {project.title}
            </h3>
            
            {/* Description */}
            {project.metaDescription && (
              <p className="text-slate-600 line-clamp-2 mb-4">
                {project.metaDescription}
              </p>
            )}
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={project.publishDate}>{formattedDate}</time>
              </div>
              <span className="text-blue-500 group-hover:text-blue-600 font-medium">
                자세히 보기 →
              </span>
            </div>
            
            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-slate-200 text-slate-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

### Step 4.5: MarkdownRenderer 컴포넌트

**파일 생성**: `src/components/MarkdownRenderer.tsx`

```typescript
// src/components/MarkdownRenderer.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark as any}
                language={match[1]}
                PreTag="div"
                className="rounded-lg"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt }) {
            return (
              <img
                src={src}
                alt={alt || ''}
                className="rounded-lg shadow-md"
                loading="lazy"
              />
            );
          },
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-blue-500 hover:text-blue-600 underline underline-offset-4"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

### Step 4.6: 필요한 추가 패키지 설치

```bash
# Markdown 관련 패키지
npm install rehype-raw
```

### ✅ Phase 4 체크리스트
- [ ] shadcn UI 컴포넌트 설치 완료
- [ ] Header.tsx 생성 완료
- [ ] Footer.tsx 생성 완료
- [ ] ProjectCard.tsx 생성 완료
- [ ] MarkdownRenderer.tsx 생성 완료
- [ ] 모든 컴포넌트 TypeScript 에러 없음

---

## Phase 5: 페이지 라우팅 구현

### 📋 개요
Next.js App Router를 사용하여 실제 페이지를 구현합니다.

### 🎯 목표
- [ ] 루트 레이아웃 구현
- [ ] 홈 페이지 구현
- [ ] 프로젝트 상세 페이지 (동적 라우트)
- [ ] About 페이지 구현

### ⏱️ 예상 시간
2시간

---

### Step 5.1: 루트 레이아웃

**파일 수정**: `src/app/layout.tsx`

```typescript
// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'Notion으로 관리하는 개인 포트폴리오',
  keywords: ['portfolio', 'projects', 'blog', 'notion'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://your-domain.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Step 5.2: 홈 페이지

**파일 수정**: `src/app/page.tsx`

```typescript
// src/app/page.tsx

import { loadHomeData, loadAllProjects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export const dynamic = 'force-static';

export default async function HomePage() {
  const homeData = await loadHomeData();
  const projects = await loadAllProjects();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="mb-16">
        {homeData ? (
          <>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              {homeData.title}
            </h1>
            {homeData.metaDescription && (
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
                {homeData.metaDescription}
              </p>
            )}
            {homeData.content && (
              <div className="prose prose-lg max-w-3xl">
                <MarkdownRenderer content={homeData.content} />
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              안녕하세요, 저는 [이름]입니다
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              [직업/분야]로 활동하며 [설명]을 하고 있습니다.
            </p>
          </>
        )}
      </section>
      
      {/* Projects Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8">
          프로젝트
        </h2>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">
              아직 게시된 프로젝트가 없습니다.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Notion 데이터베이스에 프로젝트를 추가해주세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export async function generateMetadata() {
  const homeData = await loadHomeData();
  
  return {
    title: homeData?.title || 'Portfolio',
    description: homeData?.metaDescription || 'Notion으로 관리하는 개인 포트폴리오',
  };
}
```

### Step 5.3: 프로젝트 상세 페이지

**파일 생성**: `src/app/projects/[slug]/page.tsx`

```typescript
// src/app/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { loadPageData, loadIndex } from '@/lib/data';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-static';

interface PageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await loadPageData(params.slug);
  
  if (!project || project.pageType !== 'Project') {
    notFound();
  }
  
  const formattedDate = new Date(project.publishDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={project.publishDate}>{formattedDate}</time>
          </div>
          
          {project.category && (
            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
              {project.category}
            </Badge>
          )}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          {project.title}
        </h1>
        
        {/* Description */}
        {project.metaDescription && (
          <p className="text-xl text-slate-600 leading-relaxed">
            {project.metaDescription}
          </p>
        )}
        
        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-200 text-slate-600"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      
      {/* Content */}
      <div className="mb-12">
        <MarkdownRenderer content={project.content} />
      </div>
      
      {/* Navigation */}
      <nav className="pt-8 border-t border-slate-200">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
      </nav>
    </article>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  const index = await loadIndex();
  
  return index.pagesByType.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await loadPageData(params.slug);
  
  if (!project) {
    return {
      title: 'Not Found',
    };
  }
  
  return {
    title: project.title,
    description: project.metaDescription,
    openGraph: {
      title: project.title,
      description: project.metaDescription,
      type: 'article',
      publishedTime: project.publishDate,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.metaDescription,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}
```

### Step 5.4: About 페이지 (선택)

**파일 생성**: `src/app/about/page.tsx`

```typescript
// src/app/about/page.tsx

import { loadAboutData } from '@/lib/data';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Metadata } from 'next';

export const dynamic = 'force-static';

export default async function AboutPage() {
  const aboutData = await loadAboutData();
  
  if (!aboutData) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">소개</h1>
        <p className="text-slate-600">
          Notion 데이터베이스에 About 페이지를 추가해주세요.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
        {aboutData.title}
      </h1>
      
      {aboutData.metaDescription && (
        <p className="text-xl text-slate-600 leading-relaxed mb-12">
          {aboutData.metaDescription}
        </p>
      )}
      
      <MarkdownRenderer content={aboutData.content} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await loadAboutData();
  
  return {
    title: aboutData?.title || '소개',
    description: aboutData?.metaDescription || '',
  };
}
```

### Step 5.5: 404 페이지

**파일 생성**: `src/app/not-found.tsx`

```typescript
// src/app/not-found.tsx

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-slate-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
```

### ✅ Phase 5 체크리스트
- [ ] `src/app/layout.tsx` 수정 완료
- [ ] `src/app/page.tsx` 구현 완료
- [ ] `src/app/projects/[slug]/page.tsx` 구현 완료
- [ ] `src/app/about/page.tsx` 구현 완료
- [ ] `src/app/not-found.tsx` 생성 완료
- [ ] `npm run dev`로 로컬 서버 확인
- [ ] 모든 페이지 라우팅 작동 확인

### 🐛 Phase 5 트러블슈팅

**문제**: `Error: ENOENT: no such file or directory, open 'data/index.json'`

**해결**: 초기 데이터 파일 생성
```bash
# data/index.json 생성
cat > data/index.json << 'EOF'
{
  "lastSyncTime": "",
  "totalPages": 0,
  "pagesByType": {
    "home": null,
    "projects": [],
    "footer": null,
    "about": null
  },
  "pages": []
}
EOF
```

---

## Phase 6: 동기화 스크립트

### 📋 개요
Notion 데이터를 JSON 파일로 동기화하는 스크립트를 작성합니다.

### 🎯 목표
- [ ] 전체 동기화 스크립트 구현
- [ ] 단일 페이지 동기화 스크립트 구현
- [ ] 로컬 테스트 성공

### ⏱️ 예상 시간
1시간

---

### Step 6.1: 전체 동기화 스크립트

**파일 생성**: `scripts/sync-all-pages.js`

```javascript
// scripts/sync-all-pages.js

const fs = require('fs').promises;
const path = require('path');
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

/**
 * Notion 속성값 추출
 */
function getPropertyValue(page, propertyName) {
  const property = page.properties[propertyName];
  
  if (!property) return null;
  
  switch (property.type) {
    case 'title':
      return property.title[0]?.plain_text || '';
    case 'rich_text':
      return property.rich_text[0]?.plain_text || '';
    case 'checkbox':
      return property.checkbox;
    case 'select':
      return property.select?.name || null;
    case 'multi_select':
      return property.multi_select.map(item => item.name);
    case 'date':
      return property.date?.start || null;
    case 'files':
      return property.files[0]?.external?.url || 
             property.files[0]?.file?.url || null;
    default:
      return null;
  }
}

/**
 * 페이지 데이터 변환
 */
async function convertPageToData(page) {
  const blocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(blocks);
  
  const pageType = getPropertyValue(page, 'PageType');
  let slug = getPropertyValue(page, 'Slug');
  
  // PageType에 따른 기본 slug
  if (!slug) {
    switch (pageType) {
      case 'Home':
        slug = 'home';
        break;
      case 'Footer':
        slug = 'footer';
        break;
      case 'About':
        slug = 'about';
        break;
      default:
        slug = page.id;
    }
  }
  
  return {
    id: page.id,
    pageType: pageType || 'Project',
    slug: slug,
    title: getPropertyValue(page, 'Title'),
    metaDescription: getPropertyValue(page, 'MetaDescription') || '',
    category: getPropertyValue(page, 'Category'),
    tags: getPropertyValue(page, 'Tags') || [],
    thumbnail: getPropertyValue(page, 'Thumbnail'),
    publishDate: getPropertyValue(page, 'PublishDate') || new Date().toISOString(),
    lastEditedTime: page.last_edited_time,
    published: getPropertyValue(page, 'Published'),
    content: markdown.parent,
  };
}

/**
 * 전체 동기화 실행
 */
async function syncAllPages() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    console.error('❌ NOTION_DATABASE_ID is required');
    process.exit(1);
  }
  
  console.log('🔄 Starting full database sync...');
  console.log(`📊 Database ID: ${databaseId}`);
  
  try {
    // 1. Notion에서 모든 게시된 페이지 가져오기
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    });
    
    console.log(`📚 Found ${response.results.length} published pages`);
    
    // 2. 각 페이지 변환
    const pages = await Promise.all(
      response.results.map(page => convertPageToData(page))
    );
    
    // 3. 각 페이지를 JSON 파일로 저장
    const dataDir = path.join(process.cwd(), 'data', 'pages');
    await fs.mkdir(dataDir, { recursive: true });
    
    const savedSlugs = new Set();
    
    for (const page of pages) {
      const filePath = path.join(dataDir, `${page.slug}.json`);
      await fs.writeFile(
        filePath,
        JSON.stringify(page, null, 2),
        'utf-8'
      );
      savedSlugs.add(page.slug);
      console.log(`  ✅ ${page.title} (${page.pageType})`);
    }
    
    // 4. 더 이상 존재하지 않는 파일 삭제
    const existingFiles = await fs.readdir(dataDir);
    for (const file of existingFiles) {
      if (!file.endsWith('.json')) continue;
      
      const slug = file.replace('.json', '');
      if (!savedSlugs.has(slug) && slug !== '.gitkeep') {
        await fs.unlink(path.join(dataDir, file));
        console.log(`  🗑️  Removed: ${file}`);
      }
    }
    
    // 5. 인덱스 파일 생성
    const pagesByType = {
      home: pages.find(p => p.pageType === 'Home') || null,
      projects: pages.filter(p => p.pageType === 'Project'),
      footer: pages.find(p => p.pageType === 'Footer') || null,
      about: pages.find(p => p.pageType === 'About') || null,
    };
    
    const index = {
      lastSyncTime: new Date().toISOString(),
      totalPages: pages.length,
      pagesByType: {
        home: pagesByType.home ? {
          id: pagesByType.home.id,
          pageType: pagesByType.home.pageType,
          slug: pagesByType.home.slug,
          title: pagesByType.home.title,
          category: null,
          publishDate: pagesByType.home.publishDate,
          published: pagesByType.home.published,
        } : null,
        projects: pagesByType.projects.map(p => ({
          id: p.id,
          pageType: p.pageType,
          slug: p.slug,
          title: p.title,
          category: p.category,
          publishDate: p.publishDate,
          published: p.published,
        })),
        footer: pagesByType.footer ? {
          id: pagesByType.footer.id,
          pageType: pagesByType.footer.pageType,
          slug: pagesByType.footer.slug,
          title: pagesByType.footer.title,
          category: null,
          publishDate: pagesByType.footer.publishDate,
          published: pagesByType.footer.published,
        } : null,
        about: pagesByType.about ? {
          id: pagesByType.about.id,
          pageType: pagesByType.about.pageType,
          slug: pagesByType.about.slug,
          title: pagesByType.about.title,
          category: null,
          publishDate: pagesByType.about.publishDate,
          published: pagesByType.about.published,
        } : null,
      },
      pages: pages.map(p => ({
        id: p.id,
        pageType: p.pageType,
        slug: p.slug,
        title: p.title,
        category: p.category,
        publishDate: p.publishDate,
        published: p.published,
      })),
    };
    
    await fs.writeFile(
      path.join(process.cwd(), 'data', 'index.json'),
      JSON.stringify(index, null, 2),
      'utf-8'
    );
    
    console.log('\n✅ Full sync completed');
    console.log(`   Home: ${pagesByType.home ? '✓' : '✗'}`);
    console.log(`   Projects: ${pagesByType.projects.length}`);
    console.log(`   Footer: ${pagesByType.footer ? '✓' : '✗'}`);
    console.log(`   About: ${pagesByType.about ? '✓' : '✗'}`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 실행
syncAllPages();
```

### Step 6.2: 단일 페이지 동기화 스크립트

**파일 생성**: `scripts/sync-single-page.js`

```javascript
// scripts/sync-single-page.js

const fs = require('fs').promises;
const path = require('path');
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

// (getPropertyValue, convertPageToData 함수는 sync-all-pages.js와 동일)
// ... 중복 코드 생략 ...

async function syncSinglePage() {
  const pageId = process.env.PAGE_ID;
  
  if (!pageId) {
    console.error('❌ PAGE_ID environment variable is required');
    process.exit(1);
  }
  
  console.log(`📄 Fetching page: ${pageId}`);
  
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const n2m = new NotionToMarkdown({ notionClient: notion });
    
    const page = await notion.pages.retrieve({ page_id: pageId });
    const pageData = await convertPageToData(page);
    
    const filePath = path.join(
      process.cwd(),
      'data',
      'pages',
      `${pageData.slug}.json`
    );
    
    // Published가 false면 파일 삭제
    if (!pageData.published) {
      console.log('🗑️  Page is unpublished, removing file');
      try {
        await fs.unlink(filePath);
        console.log('✅ File removed');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log('ℹ️  File already removed');
      }
      return;
    }
    
    // JSON 파일로 저장
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(
      filePath,
      JSON.stringify(pageData, null, 2),
      'utf-8'
    );
    
    console.log(`✅ Page synced: ${pageData.title}`);
    console.log(`   Slug: ${pageData.slug}`);
    console.log(`   PageType: ${pageData.pageType}`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

syncSinglePage();
```

### Step 6.3: package.json 스크립트 추가

**파일 수정**: `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "sync": "node scripts/sync-all-pages.js",
    "sync:single": "node scripts/sync-single-page.js"
  }
}
```

### Step 6.4: 로컬 테스트

```bash
# 환경 변수 확인
cat .env.local

# 전체 동기화 테스트
npm run sync

# 결과 확인
ls -la data/pages/
cat data/index.json
```

### ✅ Phase 6 체크리스트
- [ ] `scripts/sync-all-pages.js` 생성 완료
- [ ] `scripts/sync-single-page.js` 생성 완료
- [ ] package.json에 스크립트 추가
- [ ] `npm run sync` 실행 성공
- [ ] `data/pages/` 디렉토리에 JSON 파일 생성 확인
- [ ] `data/index.json` 파일 생성 확인

---

## Phase 7: GitHub Actions 워크플로우

### 📋 개요
자동 동기화를 위한 GitHub Actions 워크플로우를 설정합니다.

### 🎯 목표
- [ ] On-Demand 동기화 워크플로우 생성
- [ ] 주기적 동기화 워크플로우 생성
- [ ] GitHub Secrets 설정

### ⏱️ 예상 시간
40분

---

### Step 7.1: On-Demand 동기화 워크플로우

**파일 생성**: `.github/workflows/on-demand-sync.yml`

```yaml
name: On-Demand Notion Sync

on:
  repository_dispatch:
    types: [notion-webhook]
  workflow_dispatch:
    inputs:
      page_id:
        description: 'Notion Page ID to sync'
        required: true
        type: string

jobs:
  sync-page:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Fetch single page from Notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          PAGE_ID: ${{ github.event.client_payload.page_id || github.event.inputs.page_id }}
        run: |
          node scripts/sync-single-page.js
      
      - name: Check for changes
        id: git-check
        run: |
          if [[ -n $(git status --porcelain) ]]; then
            echo "has_changes=true" >> $GITHUB_OUTPUT
          else
            echo "has_changes=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Commit and push changes
        if: steps.git-check.outputs.has_changes == 'true'
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add data/
          git commit -m "sync: update page ${{ github.event.client_payload.page_id || github.event.inputs.page_id }}"
          git push
      
      - name: Notify completion
        if: success()
        run: |
          echo "✅ Page updated successfully"
          echo "Page ID: ${{ github.event.client_payload.page_id || github.event.inputs.page_id }}"
```

### Step 7.2: 주기적 동기화 워크플로우

**파일 생성**: `.github/workflows/scheduled-sync.yml`

```yaml
name: Scheduled Notion Sync

on:
  schedule:
    # 매 10분마다 실행 (UTC 기준)
    - cron: '*/10 * * * *'
  workflow_dispatch:  # 수동 실행 허용

jobs:
  sync-all:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Sync all pages from Notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: |
          node scripts/sync-all-pages.js
      
      - name: Check for changes
        id: git-check
        run: |
          if [[ -n $(git status --porcelain) ]]; then
            echo "has_changes=true" >> $GITHUB_OUTPUT
          else
            echo "has_changes=false" >> $GITHUB_OUTPUT
          fi
      
      - name: Commit and push changes
        if: steps.git-check.outputs.has_changes == 'true'
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add data/
          git commit -m "sync: scheduled update $(date +'%Y-%m-%d %H:%M:%S UTC')"
          git push
      
      - name: Report sync results
        run: |
          if [[ "${{ steps.git-check.outputs.has_changes }}" == "true" ]]; then
            echo "✅ Sync completed with changes"
          else
            echo "ℹ️ No changes detected"
          fi
```

### Step 7.3: GitHub 저장소 생성 및 푸시

```bash
# GitHub에서 새 저장소 생성 (웹 UI)
# 1. github.com 접속
# 2. 우측 상단 '+' 클릭 > New repository
# 3. Repository name: notion-portfolio
# 4. Public/Private 선택
# 5. Create repository

# 로컬 저장소와 연결
git remote add origin https://github.com/[your-username]/notion-portfolio.git
git branch -M main
git push -u origin main
```

### Step 7.4: GitHub Secrets 설정

1. GitHub 저장소 페이지 접속
2. **Settings** > **Secrets and variables** > **Actions** 클릭
3. **New repository secret** 클릭
4. 다음 Secrets 추가:

| Name | Value | 설명 |
|------|-------|------|
| `NOTION_API_KEY` | `secret_xxx...` | Notion Integration Token |
| `NOTION_DATABASE_ID` | `xxx...` | Notion 데이터베이스 ID |

### Step 7.5: GitHub Actions 권한 설정

1. **Settings** > **Actions** > **General**
2. **Workflow permissions** 섹션에서:
   - ✅ "Read and write permissions" 선택
   - ✅ "Allow GitHub Actions to create and approve pull requests" 체크
3. **Save** 클릭

### Step 7.6: 워크플로우 테스트

```bash
# 1. Actions 탭 접속
# 2. "Scheduled Notion Sync" 워크플로우 선택
# 3. "Run workflow" 버튼 클릭 (수동 실행)
# 4. 실행 결과 확인

# 성공 시 data/ 디렉토리에 새 커밋이 생성됩니다
```

### ✅ Phase 7 체크리스트
- [ ] `.github/workflows/on-demand-sync.yml` 생성
- [ ] `.github/workflows/scheduled-sync.yml` 생성
- [ ] GitHub 저장소 생성 및 푸시
- [ ] GitHub Secrets 설정 완료
- [ ] Actions 권한 설정 완료
- [ ] 워크플로우 수동 실행 테스트 성공

---

## Phase 8: Vercel 배포

### 📋 개요
Vercel에 프로젝트를 배포하고 Webhook API를 구현합니다.

### 🎯 목표
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정
- [ ] 초기 배포 성공
- [ ] Webhook API 구현

### ⏱️ 예상 시간
30분

---

### Step 8.1: Webhook API 구현

**파일 생성**: `src/app/api/webhook/notion/route.ts`

```typescript
// src/app/api/webhook/notion/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface NotionWebhookPayload {
  page_id: string;
  workspace_id?: string;
  timestamp?: string;
}

/**
 * Webhook 서명 검증
 */
function verifyWebhookSignature(
  signature: string,
  body: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * GitHub Actions 트리거
 */
async function triggerGitHubAction(pageId: string) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  
  if (!owner || !repo || !token) {
    throw new Error('GitHub configuration missing');
  }
  
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/dispatches`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'notion-webhook',
        client_payload: {
          page_id: pageId,
          timestamp: new Date().toISOString(),
        },
      }),
    }
  );
  
  return response;
}

/**
 * POST /api/webhook/notion
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문 파싱
    const body = await request.text();
    const payload: NotionWebhookPayload = JSON.parse(body);
    
    // 2. 서명 검증 (선택적, 보안 강화)
    const signature = request.headers.get('x-notion-signature');
    const secret = process.env.NOTION_WEBHOOK_SECRET;
    
    if (signature && secret) {
      const isValid = verifyWebhookSignature(signature, body, secret);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }
    
    // 3. page_id 검증
    const { page_id } = payload;
    if (!page_id) {
      return NextResponse.json(
        { error: 'Missing page_id' },
        { status: 400 }
      );
    }
    
    // 4. GitHub Actions 트리거
    const githubResponse = await triggerGitHubAction(page_id);
    
    if (!githubResponse.ok) {
      throw new Error('Failed to trigger GitHub Action');
    }
    
    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered',
      page_id: page_id,
    });
    
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// OPTIONS 메서드 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-notion-signature',
    },
  });
}
```

### Step 8.2: Vercel 프로젝트 생성

1. [vercel.com](https://vercel.com) 접속
2. **Add New...** > **Project** 클릭
3. GitHub 저장소 선택: `notion-portfolio`
4. **Import** 클릭
5. 설정:
   - **Framework Preset**: Next.js (자동 감지)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)

### Step 8.3: Vercel 환경 변수 설정

**Environment Variables** 섹션에서 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `NOTION_API_KEY` | `secret_xxx...` | Production, Preview |
| `NOTION_DATABASE_ID` | `xxx...` | Production, Preview |
| `GITHUB_OWNER` | `your-username` | Production |
| `GITHUB_REPO` | `notion-portfolio` | Production |
| `GITHUB_TOKEN` | `ghp_xxx...` | Production |
| `NOTION_WEBHOOK_SECRET` | `random-string` | Production |

### Step 8.4: GitHub Personal Access Token 생성

1. GitHub 우측 상단 프로필 > **Settings**
2. 좌측 하단 **Developer settings** > **Personal access tokens** > **Tokens (classic)**
3. **Generate new token** > **Generate new token (classic)**
4. 설정:
   - **Note**: "Vercel Webhook Trigger"
   - **Expiration**: 90 days (또는 원하는 기간)
   - **Scopes**:
     - ✅ `repo` (모든 하위 항목)
     - ✅ `workflow`
5. **Generate token** 클릭
6. 토큰 복사 후 Vercel 환경 변수에 추가

### Step 8.5: 초기 배포

1. Vercel 프로젝트 페이지에서 **Deploy** 클릭
2. 배포 진행 상황 확인
3. 배포 성공 시 도메인 확인
   ```
   https://notion-portfolio-xxx.vercel.app
   ```

### Step 8.6: vercel.json 설정 (선택)

**파일 생성**: `vercel.json`

```json
{
  "framework": "nextjs",
  "regions": ["icn1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### ✅ Phase 8 체크리스트
- [ ] Webhook API 구현 (`src/app/api/webhook/notion/route.ts`)
- [ ] Vercel 프로젝트 생성 완료
- [ ] 모든 환경 변수 설정 완료
- [ ] GitHub Personal Access Token 생성 및 설정
- [ ] 초기 배포 성공
- [ ] 배포된 사이트 접속 가능
- [ ] Webhook URL 확인: `https://your-domain.vercel.app/api/webhook/notion`

---

## Phase 9: Notion 통합 완성

### 📋 개요
Notion 데이터베이스를 생성하고 버튼을 연결하여 전체 시스템을 통합합니다.

### 🎯 목표
- [ ] Notion 데이터베이스 생성
- [ ] 필수 속성 설정
- [ ] 샘플 페이지 작성
- [ ] 버튼 블록 추가
- [ ] 전체 플로우 테스트

### ⏱️ 예상 시간
40분

---

### Step 9.1: Notion 데이터베이스 생성

1. Notion에서 새 페이지 생성
2. `/database` 입력 → **Database - Full page** 선택
3. 데이터베이스 이름: "Portfolio Content"

### Step 9.2: 필수 속성 추가

다음 속성(Property)을 추가하세요:

| 속성명 | 타입 | 설명 |
|--------|------|------|
| `Title` | Title | 자동 생성됨 |
| `PageType` | Select | **중요!** "Home", "Project", "Footer", "About" 옵션 추가 |
| `Slug` | Text | URL 경로 |
| `MetaDescription` | Text | SEO 설명 (최대 160자) |
| `Published` | Checkbox | 게시 여부 |
| `Category` | Select | 카테고리 (예: "Web Development", "Design") |
| `Thumbnail` | Files & media | 썸네일 이미지 |
| `PublishDate` | Date | 게시 날짜 |
| `Tags` | Multi-select | 태그 (예: "React", "TypeScript") |

#### PageType 옵션 설정
1. `PageType` 속성 클릭
2. **Edit property** 클릭
3. 다음 옵션 추가:
   - `Home` (색상: Blue)
   - `Project` (색상: Green)
   - `Footer` (색상: Gray)
   - `About` (색상: Purple)

### Step 9.3: Integration 연결

1. 데이터베이스 페이지 우측 상단 **...** 클릭
2. **Add connections** 클릭
3. Phase 0에서 생성한 "Portfolio Sync" Integration 선택

### Step 9.4: 데이터베이스 ID 복사

1. 데이터베이스 페이지를 전체 페이지로 열기
2. URL 확인:
   ```
   https://www.notion.so/workspace/[DATABASE_ID]?v=...
   ```
3. `DATABASE_ID` 부분 복사 (32자 영숫자)
4. `.env.local`의 `NOTION_DATABASE_ID`에 설정

### Step 9.5: 샘플 페이지 작성

#### Home 페이지
1. 데이터베이스에서 **New** 클릭
2. 속성 설정:
   - Title: "홈"
   - PageType: "Home"
   - Slug: "home"
   - Published: ✅
   - MetaDescription: "개발자의 포트폴리오입니다"
3. 본문 작성 (선택):
   ```
   안녕하세요! 저는 풀스택 개발자 홍길동입니다.
   
   사용자 중심의 웹 애플리케이션을 만드는 것을 좋아합니다.
   ```

#### Footer 페이지
1. **New** 클릭
2. 속성:
   - Title: "Footer"
   - PageType: "Footer"
   - Slug: "footer"
   - Published: ✅
3. 본문:
   ```
   © 2025 홍길동. All rights reserved.
   
   [GitHub](https://github.com/username) | [LinkedIn](https://linkedin.com/in/username)
   ```

#### 프로젝트 페이지 (샘플)
1. **New** 클릭
2. 속성:
   - Title: "나의 첫 프로젝트"
   - PageType: "Project"
   - Slug: "my-first-project"
   - Category: "Web Development"
   - Tags: "React", "TypeScript", "Next.js"
   - PublishDate: 오늘 날짜
   - Published: ✅
   - MetaDescription: "Notion과 Next.js로 만든 포트폴리오 웹사이트"
   - Thumbnail: 이미지 업로드 (선택)
3. 본문:
   ```markdown
   # 프로젝트 개요
   
   이 프로젝트는 Notion을 CMS로 활용하여...
   
   ## 주요 기능
   
   - Notion 데이터 자동 동기화
   - 정적 사이트 생성
   - shadcn UI 디자인 시스템
   
   ## 기술 스택
   
   - Next.js 14
   - TypeScript
   - Tailwind CSS
   - shadcn UI
   ```

### Step 9.6: 버튼 블록 추가 (데이터베이스 템플릿)

1. 데이터베이스 우측 상단 **↓** 클릭 > **Edit database** > **Templates**
2. 기존 템플릿 편집 또는 새 템플릿 생성
3. 템플릿 본문 상단에 `/button` 입력
4. 버튼 설정:
   - **Button text**: "🚀 지금 바로 발행하기"
   - **Link**: `https://your-domain.vercel.app/api/webhook/notion`
   - **Style**: Primary
5. 템플릿 저장

> ⚠️ **중요**: Vercel 도메인은 Phase 8.5에서 확인한 실제 도메인을 사용하세요.

### Step 9.7: 전체 플로우 테스트

#### 자동 동기화 테스트
1. Notion에서 새 프로젝트 페이지 작성
2. Published ✅ 체크
3. 10분 대기 (또는 GitHub Actions 수동 실행)
4. 웹사이트 새로고침하여 확인

#### 즉시 발행 테스트
1. Notion 페이지에서 "🚀 지금 바로 발행하기" 버튼 클릭
2. GitHub Actions 페이지에서 워크플로우 실행 확인
3. 1-2분 대기
4. 웹사이트 새로고침하여 확인

### ✅ Phase 9 체크리스트
- [ ] Notion 데이터베이스 생성 완료
- [ ] 모든 필수 속성 추가 완료
- [ ] PageType 옵션 설정 완료
- [ ] Integration 연결 완료
- [ ] Home, Footer 페이지 생성
- [ ] 샘플 프로젝트 페이지 생성
- [ ] 버튼 블록 템플릿 설정 완료
- [ ] 자동 동기화 테스트 성공
- [ ] 즉시 발행 테스트 성공

---

## Phase 10: 최적화 및 런칭

### 📋 개요
성능 최적화, SEO 검증, 접근성 테스트를 수행하고 프로덕션에 배포합니다.

### 🎯 목표
- [ ] 성능 최적화
- [ ] SEO 검증
- [ ] 접근성 테스트
- [ ] 프로덕션 체크리스트 완료

### ⏱️ 예상 시간
1시간

---

### Step 10.1: 빌드 최적화

```bash
# 프로덕션 빌드 테스트
npm run build

# 번들 크기 확인
npm run build | grep "Route (app)"

# 빌드 결과 확인
ls -lh .next/static/chunks/
```

#### next.config.ts 최적화 (이미 Phase 2에서 설정됨)
- ✅ `output: 'export'` 정적 내보내기
- ✅ 이미지 도메인 설정
- ✅ TypeScript strict mode

### Step 10.2: SEO 검증

#### Lighthouse 테스트
```bash
# Chrome DevTools에서:
# 1. F12 (개발자 도구)
# 2. Lighthouse 탭
# 3. Categories: Performance, Accessibility, Best Practices, SEO 선택
# 4. Analyze page load

# 목표 스코어:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

#### SEO 체크리스트
- [ ] 모든 페이지에 `<title>` 태그
- [ ] 모든 페이지에 `<meta name="description">`
- [ ] Open Graph 메타 태그
- [ ] Twitter Card 메타 태그
- [ ] Canonical URL
- [ ] Sitemap.xml (자동 생성)
- [ ] robots.txt

#### sitemap.xml 생성 (선택)

**파일 생성**: `src/app/sitemap.ts`

```typescript
// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { loadIndex } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.vercel.app';
  const index = await loadIndex();
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  const projectPages = index.pagesByType.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...projectPages];
}
```

### Step 10.3: 접근성 검증

#### WAVE 테스트
1. [WAVE Extension](https://wave.webaim.org/extension/) 설치
2. 모든 페이지 테스트
3. 에러 및 경고 수정

#### 키보드 네비게이션 테스트
```
Tab 키로 모든 인터랙티브 요소 접근 가능 확인:
- [ ] 헤더 네비게이션
- [ ] 프로젝트 카드 링크
- [ ] "목록으로 돌아가기" 버튼
- [ ] Footer 링크
- [ ] 모바일 메뉴 버튼
```

#### 스크린 리더 테스트 (선택)
- macOS: VoiceOver (Cmd + F5)
- Windows: NVDA (무료)

### Step 10.4: 성능 최적화

#### 이미지 최적화 체크
```typescript
// ✅ 모든 이미지가 Next.js Image 컴포넌트 사용
import Image from 'next/image';

<Image
  src={thumbnail}
  alt={title}
  fill
  sizes="..."
  priority={false}  // Above the fold 이미지만 true
/>
```

#### 폰트 최적화 체크
```typescript
// ✅ next/font 사용
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // FOIT 방지
});
```

#### 번들 크기 최적화
```bash
# 사용하지 않는 shadcn UI 컴포넌트 제거
# node_modules 크기 확인
du -sh node_modules/

# 불필요한 의존성 제거
npm uninstall [unused-package]
```

### Step 10.5: 최종 프로덕션 체크리스트

#### 기능 확인
- [ ] 홈 페이지에서 모든 프로젝트 표시
- [ ] 프로젝트 카드 클릭 시 상세 페이지 이동
- [ ] Markdown 콘텐츠 정상 렌더링
- [ ] 코드 블록 하이라이팅 작동
- [ ] 이미지 로딩 정상
- [ ] 모바일 메뉴 작동
- [ ] Footer 표시 정상

#### 동기화 확인
- [ ] GitHub Actions 주기적 동기화 작동 (10분마다)
- [ ] Notion 버튼 클릭 시 즉시 발행 작동
- [ ] 페이지 수정 시 웹사이트 업데이트 확인
- [ ] 페이지 삭제 시 웹사이트에서 제거 확인

#### 보안 확인
- [ ] 환경 변수가 코드에 하드코딩되지 않음
- [ ] `.env.local`이 `.gitignore`에 포함됨
- [ ] API 키가 GitHub에 노출되지 않음
- [ ] Webhook 서명 검증 활성화 (선택)

#### 성능 확인
- [ ] Lighthouse Performance 90+
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms

#### SEO 확인
- [ ] Lighthouse SEO 90+
- [ ] 모든 페이지 메타데이터 확인
- [ ] sitemap.xml 생성 확인
- [ ] robots.txt 확인

#### 접근성 확인
- [ ] Lighthouse Accessibility 90+
- [ ] WAVE 에러 0개
- [ ] 키보드 네비게이션 100%
- [ ] 색상 대비 WCAG AA 준수

---

## 부록 A: 전체 파일 구조

```
notion-portfolio/
├── .github/
│   └── workflows/
│       ├── on-demand-sync.yml
│       └── scheduled-sync.yml
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── globals.css
│   │   ├── api/
│   │   │   └── webhook/
│   │   │       └── notion/
│   │   │           └── route.ts
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                      # shadcn UI 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── ...
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── lib/
│   │   ├── errors.ts
│   │   ├── logger.ts
│   │   ├── notion.ts
│   │   ├── data.ts
│   │   └── utils.ts                 # shadcn UI 유틸리티
│   └── types/
│       └── index.ts
├── scripts/
│   ├── sync-all-pages.js
│   └── sync-single-page.js
├── data/
│   ├── index.json
│   └── pages/
│       ├── home.json
│       ├── footer.json
│       ├── about.json
│       └── [project-slug].json
├── docs/
│   ├── PRD.md
│   ├── TRD.md
│   ├── IA.md
│   ├── CODE_GUIDELINES.md
│   ├── DESIGN_GUIDELINES.md
│   └── DEVELOPMENT_GUIDE.md
├── .env.local
├── .env.example
├── .gitignore
├── components.json                  # shadcn UI 설정
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── vercel.json
└── README.md
```

---

## 부록 B: 환경 변수 전체 목록

### 로컬 개발 (.env.local)
```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub (로컬 테스트용, 선택)
GITHUB_OWNER=your-github-username
GITHUB_REPO=notion-portfolio
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Webhook
NOTION_WEBHOOK_SECRET=random-secret-string-generate-with-crypto
```

### GitHub Secrets
| Secret Name | 설명 | 예시 |
|-------------|------|------|
| `NOTION_API_KEY` | Notion Integration Token | `secret_xxx...` |
| `NOTION_DATABASE_ID` | 데이터베이스 ID | 32자 영숫자 |

### Vercel Environment Variables
| Name | Value | Environments |
|------|-------|--------------|
| `NOTION_API_KEY` | Notion Token | Production, Preview |
| `NOTION_DATABASE_ID` | Database ID | Production, Preview |
| `GITHUB_OWNER` | GitHub username | Production |
| `GITHUB_REPO` | Repository name | Production |
| `GITHUB_TOKEN` | Personal Access Token | Production |
| `NOTION_WEBHOOK_SECRET` | Webhook secret | Production |

---

## 부록 C: package.json 전체

```json
{
  "name": "notion-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "sync": "node scripts/sync-all-pages.js",
    "sync:single": "node scripts/sync-single-page.js"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@notionhq/client": "^2.2.15",
    "notion-to-md": "^3.1.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-raw": "^7.0.0",
    "react-syntax-highlighter": "^15.5.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "class-variance-authority": "^0.7.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/react-syntax-highlighter": "^15.5.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "@tailwindcss/typography": "^0.5.13",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 부록 D: 통합 트러블슈팅

### D.1. Notion API 관련

#### 문제: "Integration not found"
```
Error: Could not find integration with ID xxx
```

**해결**:
1. Notion Integration이 올바른 Workspace에 생성되었는지 확인
2. Integration Token이 정확한지 확인
3. 데이터베이스에 Integration이 연결되었는지 확인

#### 문제: "Rate limited"
```
Error: rate_limited
```

**해결**:
- 스크립트에 이미 재시도 로직 포함됨
- 요청 간격을 늘려야 하는 경우 `sync-all-pages.js`에서 `setTimeout` 조정

#### 문제: "Property not found"
```
Cannot read property 'PageType' of undefined
```

**해결**:
1. Notion 데이터베이스에 필수 속성이 모두 있는지 확인
2. 속성 이름이 정확한지 확인 (대소문자 구분)
3. 최소한 하나의 페이지가 Published = true인지 확인

### D.2. Next.js 빌드 관련

#### 문제: "Module not found"
```
Module not found: Can't resolve '@/components/ui/button'
```

**해결**:
```bash
# shadcn UI 컴포넌트 재설치
npx shadcn-ui@latest add button

# 또는 모든 컴포넌트 재설치
rm -rf src/components/ui
npx shadcn-ui@latest add button card badge separator sheet
```

#### 문제: "Image hostname not configured"
```
Invalid src prop on `next/image`, hostname "xxx" is not configured
```

**해결**: `next.config.ts`에서 이미지 도메인 추가
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-hostname',
    },
  ],
},
```

### D.3. GitHub Actions 관련

#### 문제: "Permission denied"
```
Error: Resource not accessible by integration
```

**해결**:
1. Repository Settings > Actions > General
2. Workflow permissions: "Read and write permissions" 선택
3. 저장

#### 문제: "Secrets not found"
```
Error: NOTION_API_KEY is required
```

**해결**:
1. Settings > Secrets and variables > Actions
2. 모든 필요한 Secrets 추가 확인
3. Secret 이름 대소문자 정확히 일치 확인

### D.4. Vercel 배포 관련

#### 문제: "Build failed"
```
Error: ENOENT: no such file or directory
```

**해결**:
```bash
# 초기 데이터 파일 커밋
git add data/index.json
git commit -m "chore: add initial data file"
git push
```

#### 문제: "Environment variable not set"
```
Error: NOTION_API_KEY is not defined
```

**해결**:
1. Vercel Dashboard > Project > Settings > Environment Variables
2. 모든 환경 변수 추가
3. Redeploy

### D.5. 일반적인 문제

#### 문제: 웹사이트에 프로젝트가 표시되지 않음

**체크리스트**:
```bash
# 1. Notion 데이터베이스 확인
- Published가 체크되어 있는가?
- PageType이 "Project"로 설정되어 있는가?

# 2. 동기화 확인
npm run sync
cat data/index.json  # projects 배열에 데이터가 있는가?

# 3. 빌드 확인
npm run build
# 에러 없이 빌드 되는가?

# 4. 로컬 확인
npm run dev
# http://localhost:3000 에서 프로젝트가 보이는가?
```

#### 문제: 버튼 클릭 시 아무 일도 안 일어남

**해결**:
1. Notion 버튼 URL 확인
   - 정확한 Vercel 도메인 사용 확인
   - `/api/webhook/notion` 경로 확인
2. Vercel Functions 로그 확인
   - Vercel Dashboard > Deployments > Functions
   - 요청이 들어왔는지 확인
3. GitHub Actions 로그 확인
   - repository_dispatch 이벤트가 트리거되었는지 확인

---

## 부록 E: 참고 자료

### 공식 문서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com/)
- [shadcn UI 문서](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Vercel 문서](https://vercel.com/docs)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

### 커뮤니티 및 지원
- [Next.js Discord](https://discord.gg/nextjs)
- [Notion Developers Slack](https://developers.notion.com/community)
- [shadcn UI GitHub Discussions](https://github.com/shadcn/ui/discussions)

### 유용한 도구
- [Notion API Playground](https://developers.notion.com/reference/intro)
- [Vercel Logs](https://vercel.com/docs/observability/runtime-logs)
- [GitHub Actions Debugger](https://github.com/actions/toolkit)

---

## 부록 F: 다음 단계 및 확장

### 향후 개선 사항

#### 1. 댓글 시스템 추가
```typescript
// giscus, utterances 등 GitHub 기반 댓글 시스템
import Giscus from '@giscus/react';

<Giscus
  repo="username/notion-portfolio"
  repoId="xxx"
  category="General"
  mapping="pathname"
/>
```

#### 2. 검색 기능
```typescript
// 클라이언트 사이드 검색
import { useState } from 'react';

const [searchQuery, setSearchQuery] = useState('');
const filteredProjects = projects.filter(p =>
  p.title.toLowerCase().includes(searchQuery.toLowerCase())
);
```

#### 3. 카테고리 필터
```typescript
// 카테고리별 필터링
const [activeCategory, setActiveCategory] = useState('All');
const filtered = activeCategory === 'All' 
  ? projects 
  : projects.filter(p => p.category === activeCategory);
```

#### 4. RSS Feed
```typescript
// src/app/feed.xml/route.ts
export async function GET() {
  const projects = await loadAllProjects();
  const rss = generateRSS(projects);
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

#### 5. Analytics 추가
```typescript
// Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 템플릿 커스터마이징

#### 색상 테마 변경
```css
/* src/app/globals.css */
:root {
  /* 예: Green 테마 */
  --primary: 142.1 76.2% 36.3%;      /* green-600 */
  --secondary: 142.1 70.6% 45.3%;    /* green-500 */
}
```

#### 폰트 변경
```typescript
// src/app/layout.tsx
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});
```

---

## 완료! 🎉

축하합니다! Notion 기반 포트폴리오 웹사이트를 성공적으로 구축했습니다.

### 이제 할 수 있는 것들

✅ Notion에서 글만 쓰면 자동으로 웹사이트 업데이트
✅ 버튼 클릭으로 즉시 발행
✅ 카테고리와 태그로 프로젝트 정리
✅ SEO 최적화된 포트폴리오
✅ 모바일 친화적 반응형 디자인

### 유지보수 가이드

#### 일일
- [ ] 웹사이트 정상 작동 확인

#### 주간
- [ ] GitHub Actions 실행 이력 확인
- [ ] Vercel 빌드 로그 확인

#### 월간
- [ ] 의존성 업데이트 (`npm outdated`)
- [ ] 성능 메트릭 확인 (Lighthouse)
- [ ] 백업 확인

### 도움이 필요하신가요?

프로젝트 문서를 참고하세요:
- **기획**: [PRD.md](./PRD.md)
- **기술**: [TRD.md](./TRD.md)
- **구조**: [IA.md](./IA.md)
- **디자인**: [DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md)
- **코드**: [CODE_GUIDELINES.md](./CODE_GUIDELINES.md)

---

**문서 작성자**: AI Assistant  
**마지막 업데이트**: 2025.10.18  
**문서 버전**: 1.0

---

*이 가이드를 통해 성공적으로 포트폴리오를 구축하시길 바랍니다! 🚀*

