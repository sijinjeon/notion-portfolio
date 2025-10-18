'use client';

import { useEffect, useState } from 'react';
import type { PageData } from '@/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export function HomeSection() {
  const [homeData, setHomeData] = useState<PageData | null>(null);
  const [recentProjects, setRecentProjects] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 홈 데이터 로드
        const homeResponse = await fetch('/data/pages/home.json');
        const homeData = await homeResponse.json();
        setHomeData(homeData);

        // 프로젝트 데이터 로드
        const projectsResponse = await fetch('/data/index.json');
        const projectsData = await projectsResponse.json();
        const projects = projectsData.pagesByType?.projects || [];
        setRecentProjects(projects.slice(0, 4));

        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-12">
        <div className="text-center py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-16">
      {/* Notion 콘텐츠 렌더링 */}
      {homeData && (
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={homeData.content} />
        </div>
      )}
      
      {/* 최근 프로젝트 */}
      {recentProjects.length > 0 && (
        <div className="space-y-8">
          {recentProjects.slice(0, 4).map((project) => (
            <div key={project.slug} className="group border-b border-slate-100 pb-8 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {new Date(project.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    }).toUpperCase()}
                  </span>
                  {project.category && (
                    <span className="text-xs font-medium text-pink-600 uppercase tracking-wider">
                      {project.category}
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">
                {project.title}
              </h3>
              
              {project.metaDescription && (
                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.metaDescription}
                </p>
              )}
              
              <a 
                href="#" 
                className="inline-flex items-center text-slate-900 hover:text-slate-600 transition-colors underline underline-offset-4"
              >
                Read
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

