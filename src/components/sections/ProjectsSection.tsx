'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, FileText, TrendingUp, Filter } from 'lucide-react';
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
    <section className="space-y-6 md:space-y-8">
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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

      {/* 카테고리 필터 - 모바일 터치 최적화 */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="text-xs md:text-sm min-h-[44px] md:min-h-auto px-3 md:px-4"
          >
            {category}
          </Button>
        ))}
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

        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <Card key={project.slug} className="group hover:shadow-md hover:border-slate-300 transition-all duration-200">
              <CardContent className="p-4 md:p-5">
                {/* 모바일: 세로 레이아웃, 데스크톱: 가로 레이아웃 */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    {/* 날짜와 카테고리 */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                      <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                      <time className="font-medium">
                        {new Date(project.publishDate).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\./g, '/').replace(/\s/g, '').replace(/\/$/, '')}
                      </time>
                      {project.category && (
                        <>
                          <span className="text-slate-300">·</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0 h-5">
                            {project.category}
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    {/* 제목 */}
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors mb-2 line-clamp-2 md:line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>

                    {/* 태그 라인 */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs font-normal border-slate-300 text-slate-600">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs font-normal border-slate-300 text-slate-500">
                            +{project.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* View Details 버튼 - 모바일: 풀 너비, 데스크톱: 고정 */}
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="w-full md:w-auto text-center md:text-left flex items-center justify-center md:justify-start text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors min-h-[44px] md:min-h-auto md:pt-1"
                  >
                    View Details
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
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