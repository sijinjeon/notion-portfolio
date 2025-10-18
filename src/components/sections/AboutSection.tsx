'use client';

import { useEffect, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { PageData } from '@/types';

export function AboutSection() {
  const [aboutData, setAboutData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutData() {
      try {
        // 실제로는 API 또는 데이터 파일에서 로드
        setLoading(false);
      } catch (error) {
        console.error('Failed to load about data:', error);
        setLoading(false);
      }
    }
    
    loadAboutData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="animate-pulse">
          <div className="h-10 bg-slate-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          소개
        </h1>
        {aboutData ? (
          <div className="prose prose-lg prose-slate max-w-none">
            <MarkdownRenderer content={aboutData.content} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-2">소개 페이지를 준비 중입니다.</p>
            <p className="text-sm text-slate-400">Notion 데이터베이스에 About 페이지를 추가해주세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}

