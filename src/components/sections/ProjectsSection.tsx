'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PageData } from '@/types';

export function ProjectsSection() {
  const [projects, setProjects] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    async function loadProjects() {
      try {
        // 인덱스에서 프로젝트 목록 가져오기
        const indexResponse = await fetch('/data/index.json');
        const indexData = await indexResponse.json();
        const projectSummaries = indexData.pagesByType?.projects || [];
        
        // 각 프로젝트의 상세 데이터 가져오기
        const projectPromises = projectSummaries.map(async (summary: any) => {
          const response = await fetch(`/data/pages/${summary.slug}.json`);
          return response.json();
        });
        
        const projectList = await Promise.all(projectPromises);
        
        // 날짜순으로 정렬 (최신순)
        projectList.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        
        setProjects(projectList);
      } catch (error) {
        console.error('프로젝트 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  // 카테고리 목록 생성
  const categories = ['전체', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  
  // 필터링된 프로젝트
  const filteredProjects = activeCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="space-y-1">
        {filteredProjects.map((project) => (
          <Link 
            key={project.slug}
            href={`/projects/${project.slug}`} 
            className="block group hover:bg-slate-50 rounded-lg transition-colors"
          >
            <article className="py-6 px-6">
              {/* 제목과 날짜 */}
              <div className="flex items-start justify-between gap-6 mb-3">
                <h2 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors flex-1 leading-tight">
                  {project.title}
                </h2>
                <time className="text-xs text-slate-400 whitespace-nowrap font-medium tracking-wide">
                  {new Date(project.publishDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\./g, '/').replace(/\s/g, '').replace(/\/$/, '')}
                </time>
              </div>

              {/* 설명 */}
              {project.metaDescription && (
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  {project.metaDescription}
                </p>
              )}

              {/* 카테고리와 태그 */}
              <div className="flex flex-wrap items-center gap-2">
                {project.category && (
                  <Badge variant="secondary" className="text-xs font-medium">
                    {project.category}
                  </Badge>
                )}
                {project.tags && project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs font-normal border-slate-200 text-slate-500">
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-slate-400">
            {activeCategory === '전체' ? '프로젝트가 없습니다.' : `${activeCategory} 카테고리의 프로젝트가 없습니다.`}
          </p>
        </div>
      )}
    </section>
  );
}
