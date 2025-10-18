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

