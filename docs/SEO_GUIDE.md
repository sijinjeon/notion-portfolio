# SEO 수정 가이드

Next.js App Router에서 SEO를 위한 `<head>` 섹션은 `metadata` 객체로 관리됩니다.

---

## 📍 수정 위치별 가이드

### 1. 전역 SEO 설정 (모든 페이지 공통)

**파일**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // 페이지 제목
  title: {
    default: '시진 전 - Frontend Developer',  // 기본 제목
    template: '%s | 시진 전',                  // 서브 페이지 제목 템플릿
  },
  
  // 메타 설명
  description: '프론트엔드 개발자 시진 전의 포트폴리오',
  
  // 키워드 (구글은 무시하지만 다른 검색엔진용)
  keywords: ['포트폴리오', '프론트엔드', '개발자', 'React', 'Next.js', 'TypeScript'],
  
  // 작성자 정보
  authors: [{ name: '시진 전' }],
  creator: '시진 전',
  
  // 기본 URL (OG 이미지 등에 사용)
  metadataBase: new URL('https://notion-portfolio-pi.vercel.app'),
  
  // Open Graph (소셜 미디어 공유)
  openGraph: {
    title: '시진 전 - Frontend Developer',
    description: '프론트엔드 개발자 시진 전의 포트폴리오',
    type: 'website',
    locale: 'ko_KR',
    siteName: '시진 전 포트폴리오',
    images: ['/og-image.png'], // OG 이미지 추가 권장
  },
  
  // Twitter 카드
  twitter: {
    card: 'summary_large_image',
    title: '시진 전 - Frontend Developer',
    description: '프론트엔드 개발자 시진 전의 포트폴리오',
    creator: '@your_twitter_handle',
    images: ['/og-image.png'],
  },
  
  // 검증 코드 (Google Search Console, Naver 등)
  verification: {
    google: 'your-google-verification-code',
    // naver: 'your-naver-verification-code',
  },
  
  // robots.txt
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

**언제 수정?**
- 사이트 전체의 기본 정보 변경
- 도메인 변경
- Open Graph 이미지 추가
- Google Search Console 인증

---

### 2. 홈 페이지 SEO

**파일**: `src/app/page.tsx`

현재는 metadata가 없어서 `layout.tsx`의 기본값을 사용합니다.

**개선 방법**: 홈 페이지 전용 metadata 추가

```typescript
// src/app/page.tsx
import { Metadata } from 'next';
import { MainLayout } from '@/components/MainLayout';

// ✅ 추가
export const metadata: Metadata = {
  title: '홈',  // template 적용: "홈 | 시진 전"
  description: 'Notion과 AI 도구 전문가, 시진 전의 포트폴리오입니다.',
  openGraph: {
    title: '시진 전 - Notion & AI 전문가',
    description: 'Notion과 AI 도구를 활용한 업무 최적화 전문가',
    images: ['/images/home-og.png'],
  },
};

export default function HomePage() {
  return <MainLayout />;
}
```

---

### 3. 소개 페이지 SEO

**파일**: `src/app/about/page.tsx`

✅ 이미 `generateMetadata` 함수가 있습니다. Notion 데이터를 기반으로 자동 생성됩니다.

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await loadAboutData();
  
  return {
    title: aboutData?.title || '소개',
    description: aboutData?.metaDescription || '',
    // ✅ 추가 가능
    openGraph: {
      title: aboutData?.title || '소개',
      description: aboutData?.metaDescription || '',
      type: 'profile',
      images: aboutData?.thumbnail ? [aboutData.thumbnail] : [],
    },
  };
}
```

**수정 방법**:
- Notion 데이터베이스의 About 페이지에서 `Title`, `MetaDescription` 수정
- 또는 위 코드에 직접 Open Graph 정보 추가

---

### 4. 프로젝트 상세 페이지 SEO

**파일**: `src/app/projects/[slug]/page.tsx`

✅ 이미 완벽하게 구현되어 있습니다!

```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadPageData(slug);
  
  if (!project) {
    return { title: 'Not Found' };
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

**수정 방법**:
- Notion 데이터베이스에서 각 프로젝트의 `Title`, `MetaDescription`, `Thumbnail` 수정
- `npm run sync` 실행하여 데이터 동기화

---

## 🎯 추가 SEO 개선 사항

### 1. OG 이미지 생성

**위치**: `public/og-image.png`

권장 크기: 1200x630px

```typescript
// src/app/layout.tsx
openGraph: {
  images: ['/og-image.png'],
}
```

### 2. 파비콘 추가

**위치**: `src/app/` 폴더에 아래 파일들 추가

```
src/app/
  ├── favicon.ico          (32x32)
  ├── icon.png             (512x512)
  ├── apple-icon.png       (180x180)
```

Next.js가 자동으로 `<head>`에 추가합니다.

### 3. Sitemap (이미 구현됨 ✅)

**파일**: `src/app/sitemap.ts`

현재 코드:
```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const index = await loadIndex();
  const projects = index.pagesByType.projects;
  
  const projectUrls = projects.map((project) => ({
    url: `https://notion-portfolio-pi.vercel.app/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://notion-portfolio-pi.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://notion-portfolio-pi.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
```

**도메인 변경 시**: URL을 실제 도메인으로 수정하고 `metadataBase`도 함께 수정

### 4. robots.txt (이미 있음 ✅)

**파일**: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://notion-portfolio-pi.vercel.app/sitemap.xml
```

**도메인 변경 시**: Sitemap URL 수정

### 5. JSON-LD 구조화 데이터 (추천)

**추가 위치**: `src/app/layout.tsx`

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '전시진',
    jobTitle: 'Notion & AI 전문가',
    url: 'https://notion-portfolio-pi.vercel.app',
    sameAs: [
      'https://github.com/sijinjeon',
      'https://www.linkedin.com/in/sijinjeon/',
      'https://www.threads.com/@sireal_co',
    ],
  };

  return (
    <html lang="ko" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

---

## 📊 SEO 체크리스트

### 필수 항목
- [x] 페이지별 고유한 title
- [x] 페이지별 고유한 description
- [x] Open Graph 이미지
- [ ] Favicon (추가 필요)
- [x] Sitemap
- [x] robots.txt
- [ ] Google Search Console 등록
- [ ] Naver Search Advisor 등록

### 권장 항목
- [ ] 구조화 데이터 (JSON-LD)
- [ ] Twitter 카드
- [ ] 정규 URL (canonical)
- [ ] 대체 언어 (hreflang)
- [ ] 성능 최적화 (Core Web Vitals)

---

## 🔍 SEO 테스트 도구

### 메타데이터 확인
```bash
# 빌드 후 HTML 확인
npm run build
npm run start

# 브라우저에서 우클릭 > 페이지 소스 보기
```

### 온라인 도구
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Meta Tags**: https://metatags.io/
3. **Open Graph Debugger**: https://www.opengraph.xyz/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator

---

## 💡 빠른 수정 예시

### 예시 1: 기본 제목 변경
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: '전시진 - Notion & AI 전문가',  // ← 여기 수정
    template: '%s | 전시진',
  },
  // ...
};
```

### 예시 2: 설명 변경
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  // ...
  description: 'Notion과 AI 도구를 활용한 업무 자동화 및 최적화 전문가',
  // ...
};
```

### 예시 3: OG 이미지 추가
```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  // ...
  openGraph: {
    // ...
    images: ['/og-image.png'],  // ← public/og-image.png 파일 추가
  },
};
```

---

## 🚀 변경 후 배포 절차

1. **로컬 테스트**
   ```bash
   npm run build
   npm run start
   ```

2. **메타데이터 확인**
   - 브라우저에서 페이지 소스 보기
   - `<head>` 섹션의 meta 태그 확인

3. **Git 커밋 & 푸시**
   ```bash
   git add src/app/layout.tsx
   git commit -m "feat: SEO 메타데이터 개선"
   git push
   ```

4. **배포 후 확인**
   - Open Graph Debugger로 확인
   - Google Search Console에서 색인 요청

---

**작성일**: 2025-01-19  
**최종 수정**: 2025-01-19

