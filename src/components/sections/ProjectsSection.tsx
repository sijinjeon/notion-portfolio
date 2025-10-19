'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, Filter, FileText, TrendingUp } from 'lucide-react';
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
  const categories: string[] = ['전체', ...Array.from(new Set(projects.map(p => p.category).filter((c): c is string => Boolean(c))))];
  
  // 필터링된 프로젝트
  const filteredProjects = activeCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // 통계 데이터 계산
  const totalProjects = projects.length;
  const totalCategories = categories.length - 1; // '전체' 제외
  // 올해 프로젝트 수 계산
  const currentYear = new Date().getFullYear();
  const thisYearCount = projects.filter(p => {
    const projectDate = new Date(p.publishDate);
    return projectDate.getFullYear() === currentYear;
  }).length;

  if (loading) {
    return (
      <section className="space-y-8">
        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 필터 스켈레톤 */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>

        {/* 프로젝트 카드 스켈레톤 */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Total Projects
            </CardTitle>
            <FileText className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{totalProjects}</div>
            <p className="text-xs text-slate-500 mt-auto">
              All completed projects
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Categories
            </CardTitle>
            <Filter className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{totalCategories}</div>
            <p className="text-xs text-slate-500 mt-auto">
              Different project types
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Recent Projects
            </CardTitle>
            <TrendingUp className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{thisYearCount}</div>
            <p className="text-xs text-slate-500 mt-auto">
              Projects completed this year
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* 카테고리 필터 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filter by Category</h3>
        </div>
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
      </div>

      <Separator className="my-8" />

      {/* 프로젝트 목록 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {activeCategory === '전체' ? 'All Projects' : `${activeCategory} Projects`}
          </h2>
          <div className="text-xs text-slate-500">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.slug} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <time className="text-sm text-slate-500 font-medium">
                      {new Date(project.publishDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\./g, '/').replace(/\s/g, '').replace(/\/$/, '')}
                    </time>
                    {project.category && (
                      <>
                        <span className="text-slate-300">·</span>
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent>
                {project.metaDescription && (
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {project.metaDescription}
                  </p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}

                <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-16">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">
                {activeCategory === '전체' ? 'No projects found.' : `No projects found in ${activeCategory} category.`}
              </p>
              <p className="text-sm text-slate-300">
                Try selecting a different category or check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}