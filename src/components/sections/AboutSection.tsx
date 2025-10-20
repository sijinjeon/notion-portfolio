'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { User } from 'lucide-react';
import type { PageData } from '@/types';

export function AboutSection() {
  const [aboutData, setAboutData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // About 데이터 로드
        const aboutResponse = await fetch('/data/pages/about.json');
        if (aboutResponse.ok) {
          const about = await aboutResponse.json();
          setAboutData(about);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  return (
    <section>
      {/* 메인 콘텐츠 - 모바일 최적화된 Prose */}
      {aboutData ? (
        <div className="prose prose-slate prose-sm md:prose-base max-w-none">
          <MarkdownRenderer content={aboutData.content} />
        </div>
      ) : (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">소개 페이지를 준비 중입니다.</p>
          <p className="text-sm text-slate-300">Notion 데이터베이스에 About 페이지를 추가해주세요.</p>
        </div>
      )}
    </section>
  );
}