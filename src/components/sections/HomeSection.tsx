'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { PageData } from '@/types';

export function HomeSection() {
  const [recentProjects, setRecentProjects] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        // 인덱스에서 프로젝트 목록 가져오기
        const indexResponse = await fetch('/data/index.json');
        const indexData = await indexResponse.json();
        const projectSummaries = indexData.pagesByType?.projects || [];
        
        // 각 프로젝트의 상세 데이터 가져오기 (metaDescription 포함)
        const projectPromises = projectSummaries.slice(0, 6).map(async (summary: any) => {
          const response = await fetch(`/data/pages/${summary.slug}.json`);
          return response.json();
        });
        
        const projects = await Promise.all(projectPromises);
        setRecentProjects(projects);
      } catch (error) {
        console.error('프로젝트 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-16">
      {/* 프로젝트 피드 */}
      <div className="space-y-16">
        {recentProjects.map((project) => (
          <article key={project.slug} className="group">
            {/* 날짜와 카테고리 */}
            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs text-slate-400 font-medium tracking-wide">
                {new Date(project.publishDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).replace(/\./g, '/').replace(/\s/g, '').replace(/\/$/, '')}
              </time>
              {project.category && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                    {project.category}
                  </span>
                </>
              )}
            </div>

            {/* 제목 */}
            <h2 className="text-4xl font-bold text-slate-900 mb-6 group-hover:text-slate-700 transition-colors leading-tight">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h2>

            {/* 설명 */}
            {project.metaDescription && (
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
                {project.metaDescription}
              </p>
            )}

            {/* 태그 */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs font-medium border-slate-300 text-slate-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Read more 링크 */}
            <Link 
              href={`/projects/${project.slug}`}
              className="inline-flex items-center text-sm font-semibold text-slate-900 hover:gap-3 gap-2 transition-all group/link"
            >
              Read more
              <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* 구분선 */}
            <div className="mt-16 border-b border-slate-100"></div>
          </article>
        ))}
      </div>
    </section>
  );
}
