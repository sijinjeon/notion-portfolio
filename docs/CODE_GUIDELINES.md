# 코드 가이드라인 (Code Guidelines): Notion 기반 개인 웹페이지 자동화 솔루션

| 문서 버전 | 작성일 | 작성자 | 상태 |
| :--- | :--- | :--- | :--- |
| 1.0 | 2025.10.18 | AI Assistant | 최신(Latest) |

---

## 목차

1. [개요](#1-개요-overview)
2. [프로젝트 구조](#2-프로젝트-구조-project-structure)
3. [명명 규칙](#3-명명-규칙-naming-conventions)
4. [TypeScript 가이드라인](#4-typescript-가이드라인)
5. [React 및 Next.js 가이드라인](#5-react-및-nextjs-가이드라인)
6. [Notion API 연동 가이드라인](#6-notion-api-연동-가이드라인)
7. [스타일링 가이드라인](#7-스타일링-가이드라인)
8. [데이터 처리 가이드라인](#8-데이터-처리-가이드라인)
9. [에러 처리](#9-에러-처리)
10. [성능 최적화](#10-성능-최적화)
11. [보안 가이드라인](#11-보안-가이드라인)
12. [테스트 가이드라인](#12-테스트-가이드라인)
13. [Git 커밋 컨벤션](#13-git-커밋-컨벤션)

---

## 1. 개요 (Overview)

본 문서는 Notion 기반 개인 웹페이지 자동화 솔루션 프로젝트의 코드 작성 표준과 모범 사례를 정의합니다. 팀원 모두가 일관된 코드 스타일을 유지하고 유지보수가 용이한 코드를 작성하기 위한 지침을 제공합니다.

### 1.1. 핵심 원칙

- **일관성 (Consistency)**: 프로젝트 전체에서 동일한 패턴과 스타일 유지
- **가독성 (Readability)**: 명확하고 이해하기 쉬운 코드 작성
- **유지보수성 (Maintainability)**: 변경과 확장이 용이한 구조
- **타입 안전성 (Type Safety)**: TypeScript를 활용한 엄격한 타입 체크
- **성능 (Performance)**: 최적화된 정적 사이트 생성

---

## 2. 프로젝트 구조 (Project Structure)

### 2.1. 디렉토리 구조

```
notion-portfolio/
├── .github/                    # GitHub Actions 워크플로우
│   └── workflows/
│       ├── on-demand-sync.yml
│       └── scheduled-sync.yml
├── public/                     # 정적 파일
│   ├── favicon.ico
│   └── images/
├── src/                        # 소스 코드
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   ├── projects/           # 프로젝트 라우트
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/              # About 페이지 (선택)
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── components/             # React 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   └── MarkdownRenderer.tsx
│   ├── lib/                    # 유틸리티 및 라이브러리
│   │   ├── notion.ts           # Notion API 래퍼
│   │   ├── data.ts             # 데이터 로더
│   │   ├── errors.ts           # 에러 핸들링
│   │   └── logger.ts           # 로깅 유틸리티
│   └── types/                  # TypeScript 타입 정의
│       └── index.ts
├── data/                       # 동기화된 Notion 데이터
│   ├── index.json
│   └── pages/
│       ├── home.json
│       ├── footer.json
│       └── [project-slug].json
├── scripts/                    # 동기화 스크립트
│   ├── sync-single-page.js
│   └── sync-all-pages.js
├── api/                        # Vercel Serverless Functions
│   └── webhook/
│       └── notion.ts
├── tests/                      # 테스트 파일
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                       # 프로젝트 문서
│   ├── PRD.md
│   ├── TRD.md
│   └── CODE_GUIDELINES.md
├── .env.local                  # 로컬 환경 변수
├── .gitignore
├── next.config.ts              # Next.js 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── tsconfig.json               # TypeScript 설정
├── package.json
└── README.md
```

### 2.2. 파일 명명 규칙

#### 컴포넌트 파일
- **React 컴포넌트**: PascalCase (예: `ProjectCard.tsx`, `MarkdownRenderer.tsx`)
- **페이지 컴포넌트**: `page.tsx` (Next.js App Router 규칙)
- **레이아웃 컴포넌트**: `layout.tsx` (Next.js App Router 규칙)

#### 유틸리티 파일
- **라이브러리/유틸리티**: camelCase (예: `notion.ts`, `logger.ts`)
- **타입 정의**: camelCase 또는 `index.ts` (예: `types/index.ts`)

#### 스크립트 파일
- **자동화 스크립트**: kebab-case (예: `sync-single-page.js`)

---

## 3. 명명 규칙 (Naming Conventions)

### 3.1. 변수 및 함수

```typescript
// ✅ Good: camelCase for variables and functions
const databaseId = process.env.NOTION_DATABASE_ID;
const pageData = await getPageData(slug);

async function fetchAllPages() {
  // ...
}

// ❌ Bad: inconsistent naming
const database_id = process.env.NOTION_DATABASE_ID;
const PageData = await get_page_data(slug);
```

### 3.2. 상수

```typescript
// ✅ Good: UPPER_SNAKE_CASE for constants
const NOTION_RATE_LIMITS = {
  requestsPerSecond: 3,
  averageRequestsPerMinute: 60
};

const MAX_RETRIES = 3;
const DEFAULT_PAGE_SIZE = 100;

// ❌ Bad
const notionRateLimits = { ... };
const maxRetries = 3;
```

### 3.3. 타입 및 인터페이스

```typescript
// ✅ Good: PascalCase for types and interfaces
interface PageData {
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
}

type PageType = "Home" | "Project" | "Footer" | "About";

// ❌ Bad
interface pageData { ... }
type pageType = "Home" | "Project";
```

### 3.4. 컴포넌트

```typescript
// ✅ Good: PascalCase for components
export default function ProjectCard({ project }: ProjectCardProps) {
  return <div>{project.title}</div>;
}

// ✅ Good: Component props interface
interface ProjectCardProps {
  project: PageData;
}

// ❌ Bad
export default function projectCard({ project }) {
  return <div>{project.title}</div>;
}
```

---

## 4. TypeScript 가이드라인

### 4.1. 기본 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4.2. 타입 정의

#### 명시적 타입 선언

```typescript
// ✅ Good: Explicit type annotations
async function getProjects(): Promise<PageData[]> {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  const indexData = await fs.readFile(indexPath, 'utf-8');
  return JSON.parse(indexData);
}

// ✅ Good: Function parameter types
function processPage(page: NotionPage, options: ProcessOptions): PageData {
  // ...
}

// ❌ Bad: Missing types
async function getProjects() {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  const indexData = await fs.readFile(indexPath, 'utf-8');
  return JSON.parse(indexData);
}
```

#### 타입 vs 인터페이스

```typescript
// ✅ Good: Use type for unions, intersections, and mapped types
type PageType = "Home" | "Project" | "Footer" | "About";

type ReadonlyPageData = Readonly<PageData>;

type PartialPageData = Partial<PageData>;

// ✅ Good: Use interface for object shapes
interface PageData {
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
  content: string;
}

// ✅ Good: Extend interfaces
interface ExtendedPageData extends PageData {
  customField: string;
}
```

#### Generic 타입 활용

```typescript
// ✅ Good: Generic utility function
async function fetchWithRetry<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000);
    }
  }
  throw new Error('Max retries exceeded');
}

// Usage
const pageData = await fetchWithRetry<PageData>(
  () => notionService.getPage(pageId)
);
```

### 4.3. Type Guards

```typescript
// ✅ Good: Type guards for runtime checks
function isPageData(data: unknown): data is PageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'pageType' in data &&
    'slug' in data &&
    'title' in data
  );
}

// Usage
const rawData = JSON.parse(jsonString);
if (isPageData(rawData)) {
  // rawData is now typed as PageData
  console.log(rawData.title);
}

// ✅ Good: Use Notion SDK type guards
import { Client, isFullPageOrDataSource } from '@notionhq/client';

const response = await notion.databases.query({ database_id });

for (const item of response.results) {
  if (isFullPageOrDataSource(item)) {
    // item is now properly typed
    console.log(item.created_time);
  }
}
```

### 4.4. any 사용 최소화

```typescript
// ❌ Bad: Using any
function processData(data: any) {
  return data.map((item: any) => item.value);
}

// ✅ Good: Use proper types
function processData<T extends { value: string }>(data: T[]): string[] {
  return data.map(item => item.value);
}

// ✅ Good: Use unknown when type is truly unknown
function parseJson(jsonString: string): unknown {
  return JSON.parse(jsonString);
}
```

---

## 5. React 및 Next.js 가이드라인

### 5.1. Server Components 우선

```typescript
// ✅ Good: Default to Server Components
// app/page.tsx
import fs from 'fs/promises';
import path from 'path';

export default async function HomePage() {
  // Server-side data fetching
  const projects = await getProjects();
  
  return (
    <main>
      <h1>프로젝트</h1>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </main>
  );
}

// ✅ Good: Use 'use client' only when needed
// components/InteractiveButton.tsx
'use client';

import { useState } from 'react';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### 5.2. 정적 사이트 생성 (SSG)

```typescript
// ✅ Good: Force static generation
// app/page.tsx
export const dynamic = 'force-static';

export default async function HomePage() {
  // This will run at build time only
  const projects = await getProjects();
  return <main>{/* ... */}</main>;
}

// ✅ Good: Generate static params for dynamic routes
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  const indexData = await fs.readFile(indexPath, 'utf-8');
  const index: DatabaseIndex = JSON.parse(indexData);
  
  // Only generate pages for Project type
  return index.pages
    .filter(page => page.pageType === 'Project')
    .map(page => ({
      slug: page.slug
    }));
}
```

### 5.3. 메타데이터 생성

```typescript
// ✅ Good: Generate metadata for SEO
import { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  
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
      images: project.thumbnail ? [project.thumbnail] : [],
      type: 'article',
      publishedTime: project.publishDate,
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

### 5.4. 컴포넌트 구조

```typescript
// ✅ Good: Props interface first, then component
interface ProjectCardProps {
  project: PageData;
  className?: string;
}

export default function ProjectCard({ 
  project, 
  className = '' 
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block bg-white rounded-lg shadow-md ${className}`}
    >
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-gray-600">{project.metaDescription}</p>
      </div>
    </Link>
  );
}

// ❌ Bad: No props interface, inline styles
export default function ProjectCard({ project }) {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white' }}>
      <h3>{project.title}</h3>
    </div>
  );
}
```

### 5.5. 조건부 렌더링

```typescript
// ✅ Good: Early return for null cases
export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  
  if (!project) {
    notFound(); // Next.js utility
  }
  
  return (
    <article>
      <h1>{project.title}</h1>
      {project.metaDescription && (
        <p className="text-xl">{project.metaDescription}</p>
      )}
    </article>
  );
}

// ❌ Bad: Nested conditionals
export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  
  return (
    <article>
      {project ? (
        <div>
          <h1>{project.title}</h1>
          {project.metaDescription ? (
            <p>{project.metaDescription}</p>
          ) : null}
        </div>
      ) : (
        <div>Not found</div>
      )}
    </article>
  );
}
```

---

## 6. Notion API 연동 가이드라인

### 6.1. Client 초기화

```typescript
// ✅ Good: Singleton pattern for Notion client
// lib/notion.ts
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

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
  }
  
  public static getInstance(): NotionService {
    if (!NotionService.instance) {
      NotionService.instance = new NotionService();
    }
    return NotionService.instance;
  }
  
  // ... methods
}

export default NotionService;
```

### 6.2. 데이터베이스 쿼리

```typescript
// ✅ Good: Type-safe database query with filters
async queryDatabase(databaseId: string): Promise<PageData[]> {
  const response = await this.notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
        property: "PublishDate",
        direction: "descending"
      }
    ]
  });
  
  const pages = await Promise.all(
    response.results.map(page => this.convertPageToData(page))
  );
  
  return pages;
}
```

### 6.3. 페이지 속성 추출

```typescript
// ✅ Good: Type-safe property extraction
private getPropertyValue(page: any, propertyName: string): any {
  const property = page.properties[propertyName];
  
  if (!property) {
    return null;
  }
  
  switch (property.type) {
    case "title":
      return property.title[0]?.plain_text || "";
      
    case "rich_text":
      return property.rich_text[0]?.plain_text || "";
      
    case "checkbox":
      return property.checkbox;
      
    case "select":
      return property.select?.name || null;
      
    case "multi_select":
      return property.multi_select.map((item: any) => item.name);
      
    case "date":
      return property.date?.start || null;
      
    case "files":
      return property.files[0]?.external?.url || 
             property.files[0]?.file?.url || null;
      
    default:
      return null;
  }
}
```

### 6.4. Rate Limit 처리

```typescript
// ✅ Good: Implement retry logic with exponential backoff
async function notionApiWithRetry<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error: any) {
      if (error.code === 'rate_limited' && i < maxRetries - 1) {
        const waitTime = Math.pow(2, i) * 1000;
        console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}

// Usage
const pageData = await notionApiWithRetry(
  () => this.notion.pages.retrieve({ page_id: pageId })
);
```

### 6.5. 블록 처리 및 Markdown 변환

```typescript
// ✅ Good: Convert Notion blocks to Markdown
private async convertPageToData(page: any): Promise<PageData> {
  // Get blocks and convert to Markdown
  const blocks = await this.n2m.pageToMarkdown(page.id);
  const markdown = this.n2m.toMarkdownString(blocks);
  
  // Extract PageType
  const pageType = this.getPropertyValue(page, "PageType") as PageType;
  
  // Generate slug based on PageType
  let slug = this.getPropertyValue(page, "Slug") as string;
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
        slug = page.id;
    }
  }
  
  return {
    id: page.id,
    pageType: pageType || "Project",
    slug: slug,
    title: this.getPropertyValue(page, "Title") as string,
    metaDescription: this.getPropertyValue(page, "MetaDescription") as string,
    category: this.getPropertyValue(page, "Category") as string | null,
    tags: this.getPropertyValue(page, "Tags") as string[],
    thumbnail: this.getPropertyValue(page, "Thumbnail") as string | null,
    publishDate: this.getPropertyValue(page, "PublishDate") as string,
    lastEditedTime: page.last_edited_time,
    published: this.getPropertyValue(page, "Published") as boolean,
    content: markdown.parent
  };
}
```

---

## 7. 스타일링 가이드라인

### 7.1. Tailwind CSS 사용

```typescript
// ✅ Good: Use Tailwind utility classes
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
          {project.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">
          {project.metaDescription}
        </p>
      </div>
    </Link>
  );
}

// ❌ Bad: Inline styles
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px'
    }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
        {project.title}
      </h3>
    </div>
  );
}
```

### 7.2. 조건부 클래스

```typescript
// ✅ Good: Use clsx or template literals for conditional classes
import clsx from 'clsx';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ variant, disabled, children }: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### 7.3. 반응형 디자인

```typescript
// ✅ Good: Mobile-first responsive design
export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

---

## 8. 데이터 처리 가이드라인

### 8.1. 파일 시스템 작업

```typescript
// ✅ Good: Safe file operations with proper error handling
import fs from 'fs/promises';
import path from 'path';

async function savePageData(pageData: PageData): Promise<void> {
  const filePath = path.join(
    process.cwd(),
    'data',
    'pages',
    `${pageData.slug}.json`
  );
  
  try {
    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Write file
    await fs.writeFile(
      filePath,
      JSON.stringify(pageData, null, 2),
      'utf-8'
    );
    
    console.log(`✅ Saved: ${pageData.slug}`);
  } catch (error) {
    console.error(`❌ Failed to save ${pageData.slug}:`, error);
    throw error;
  }
}
```

### 8.2. JSON 파싱

```typescript
// ✅ Good: Safe JSON parsing with validation
async function loadPageData(slug: string): Promise<PageData | null> {
  const filePath = path.join(
    process.cwd(),
    'data',
    'pages',
    `${slug}.json`
  );
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // Validate data structure
    if (!isPageData(data)) {
      throw new Error('Invalid page data structure');
    }
    
    return data;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null; // File doesn't exist
    }
    throw error;
  }
}
```

### 8.3. 데이터 변환

```typescript
// ✅ Good: Pure functions for data transformation
function transformToPageSummary(page: PageData): PageSummary {
  return {
    id: page.id,
    pageType: page.pageType,
    slug: page.slug,
    title: page.title,
    category: page.category,
    publishDate: page.publishDate,
    published: page.published
  };
}

// ✅ Good: Immutable data updates
function updatePagePublishStatus(
  page: PageData,
  published: boolean
): PageData {
  return {
    ...page,
    published,
    lastEditedTime: new Date().toISOString()
  };
}
```

---

## 9. 에러 처리

### 9.1. 커스텀 에러 클래스

```typescript
// ✅ Good: Define custom error classes
// lib/errors.ts
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
```

### 9.2. 에러 핸들링

```typescript
// ✅ Good: Centralized error handler
export function handleError(error: unknown): void {
  if (error instanceof NotionApiError) {
    console.error(`Notion API Error [${error.code}]:`, {
      message: error.message,
      statusCode: error.statusCode
    });
    
    if (error.statusCode === 429) {
      console.error('⚠️  Rate limited. Please wait before retrying.');
    }
  } else if (error instanceof SyncError) {
    console.error('Sync Error:', {
      message: error.message,
      pageId: error.pageId
    });
  } else if (error instanceof ValidationError) {
    console.error('Validation Error:', {
      message: error.message,
      field: error.field
    });
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message);
    console.error(error.stack);
  } else {
    console.error('Unexpected error:', error);
  }
}

// Usage
try {
  await syncPage(pageId);
} catch (error) {
  handleError(error);
  process.exit(1);
}
```

### 9.3. Try-Catch 사용

```typescript
// ✅ Good: Specific error handling
async function processPage(pageId: string): Promise<PageData> {
  try {
    const page = await notionService.getPage(pageId);
    return page;
  } catch (error) {
    if (error instanceof NotionApiError && error.statusCode === 404) {
      console.warn(`Page ${pageId} not found, skipping...`);
      return null;
    }
    throw new SyncError(`Failed to process page ${pageId}`, pageId);
  }
}

// ❌ Bad: Silent error swallowing
async function processPage(pageId: string): Promise<PageData> {
  try {
    return await notionService.getPage(pageId);
  } catch (error) {
    console.log('Error occurred');
    return null;
  }
}
```

---

## 10. 성능 최적화

### 10.1. 병렬 처리

```typescript
// ✅ Good: Parallel processing with concurrency limit
async function fetchAllPages(pageIds: string[]): Promise<PageData[]> {
  const BATCH_SIZE = 5; // Notion API rate limit consideration
  const results: PageData[] = [];
  
  for (let i = 0; i < pageIds.length; i += BATCH_SIZE) {
    const batch = pageIds.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(id => notionService.getPage(id))
    );
    results.push(...batchResults);
    
    // Wait between batches to respect rate limits
    if (i + BATCH_SIZE < pageIds.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

// ❌ Bad: Sequential processing
async function fetchAllPages(pageIds: string[]): Promise<PageData[]> {
  const results: PageData[] = [];
  
  for (const id of pageIds) {
    const page = await notionService.getPage(id);
    results.push(page);
  }
  
  return results;
}
```

### 10.2. 메모이제이션

```typescript
// ✅ Good: Cache expensive computations
const cache = new Map<string, PageData>();

async function getCachedPage(slug: string): Promise<PageData | null> {
  if (cache.has(slug)) {
    return cache.get(slug)!;
  }
  
  const page = await loadPageData(slug);
  if (page) {
    cache.set(slug, page);
  }
  
  return page;
}
```

### 10.3. 이미지 최적화

```typescript
// ✅ Good: Use Next.js Image component
import Image from 'next/image';

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative">
      {project.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={800}
          height={450}
          className="object-cover"
          priority={false}
          loading="lazy"
        />
      )}
    </div>
  );
}
```

---

## 11. 보안 가이드라인

### 11.1. 환경 변수 관리

```typescript
// ✅ Good: Validate environment variables at startup
function validateEnvVariables(): void {
  const required = [
    'NOTION_API_KEY',
    'NOTION_DATABASE_ID',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Call at application startup
validateEnvVariables();
```

### 11.2. Webhook 서명 검증

```typescript
// ✅ Good: Verify webhook signatures
import crypto from 'crypto';

function verifyWebhookSignature(
  receivedSignature: string,
  body: string,
  secret: string
): boolean {
  if (!receivedSignature || !secret) {
    return false;
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  // Timing attack prevention
  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature),
    Buffer.from(expectedSignature)
  );
}
```

### 11.3. 입력 검증

```typescript
// ✅ Good: Validate and sanitize inputs
function validateSlug(slug: string): boolean {
  // Allow only alphanumeric, hyphens, and underscores
  const slugRegex = /^[a-z0-9-_]+$/i;
  
  if (!slugRegex.test(slug)) {
    throw new ValidationError('Invalid slug format', 'slug');
  }
  
  if (slug.length > 200) {
    throw new ValidationError('Slug too long', 'slug');
  }
  
  return true;
}
```

---

## 12. 테스트 가이드라인

### 12.1. 단위 테스트

```typescript
// ✅ Good: Test pure functions
// lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { transformToPageSummary, validateSlug } from './utils';

describe('transformToPageSummary', () => {
  it('should extract summary fields from PageData', () => {
    const pageData: PageData = {
      id: '123',
      pageType: 'Project',
      slug: 'test-project',
      title: 'Test Project',
      content: 'Content...',
      published: true,
      // ... other fields
    };
    
    const summary = transformToPageSummary(pageData);
    
    expect(summary).toEqual({
      id: '123',
      pageType: 'Project',
      slug: 'test-project',
      title: 'Test Project',
      published: true,
    });
  });
});

describe('validateSlug', () => {
  it('should accept valid slugs', () => {
    expect(() => validateSlug('valid-slug')).not.toThrow();
    expect(() => validateSlug('valid_slug_123')).not.toThrow();
  });
  
  it('should reject invalid slugs', () => {
    expect(() => validateSlug('invalid slug!')).toThrow(ValidationError);
    expect(() => validateSlug('가나다')).toThrow(ValidationError);
  });
});
```

### 12.2. 통합 테스트

```typescript
// ✅ Good: Test component integration
// components/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  const mockProject: PageData = {
    id: '1',
    slug: 'test',
    title: 'Test Project',
    metaDescription: 'Test description',
    thumbnail: 'https://example.com/image.jpg',
    // ... other fields
  };
  
  it('should render project information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
  
  it('should have correct link', () => {
    render(<ProjectCard project={mockProject} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/test');
  });
});
```

---

## 13. Git 커밋 컨벤션

### 13.1. 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 프로세스, 도구 설정 변경

#### 예시

```bash
# Good examples
git commit -m "feat(notion): add PageType filter to database query"
git commit -m "fix(sync): handle rate limit errors properly"
git commit -m "docs(readme): update setup instructions"

# With body
git commit -m "refactor(components): extract ProjectCard logic

- Create separate hook for data fetching
- Simplify rendering logic
- Add prop validation"
```

### 13.2. 브랜치 전략

```bash
main              # 프로덕션 배포
├── develop       # 개발 통합
│   ├── feature/add-about-page
│   ├── feature/improve-seo
│   └── fix/notion-api-error
```

---

## 부록 A: 체크리스트

### 코드 리뷰 체크리스트

- [ ] TypeScript strict mode 준수
- [ ] 모든 함수에 타입 정의
- [ ] any 사용 최소화
- [ ] 에러 처리 구현
- [ ] 환경 변수 검증
- [ ] 성능 최적화 고려
- [ ] 보안 검증 (입력 검증, XSS 방지 등)
- [ ] 테스트 코드 작성
- [ ] 문서화 (JSDoc 주석)
- [ ] 커밋 메시지 컨벤션 준수

### 배포 전 체크리스트

- [ ] 빌드 에러 없음 (`npm run build`)
- [ ] 린트 에러 없음 (`npm run lint`)
- [ ] 타입 체크 통과 (`npm run type-check`)
- [ ] 테스트 통과 (`npm run test`)
- [ ] 환경 변수 설정 확인
- [ ] SEO 메타데이터 확인
- [ ] 성능 테스트 (Lighthouse)
- [ ] 접근성 검사
- [ ] 모바일 반응형 확인

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0 | 2025.10.18 | 초안 작성 | AI Assistant |

---

*본 문서는 프로젝트의 발전에 따라 지속적으로 업데이트됩니다.*

