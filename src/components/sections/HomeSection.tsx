'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, TrendingUp, Users, FileText } from 'lucide-react';
import type { PageData } from '@/types';

export function HomeSection() {
  const [recentProjects, setRecentProjects] = useState<PageData[]>([]);
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        // 인덱스에서 프로젝트 목록 가져오기
        const indexResponse = await fetch('/data/index.json');
        const indexData = await indexResponse.json();
        const projectSummaries = indexData.pagesByType?.projects || [];
        
        // 전체 프로젝트 목록 저장 (통계용)
        setAllProjects(projectSummaries);
        
        // 최근 6개 프로젝트의 상세 데이터 가져오기 (metaDescription 포함)
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

  // 통계 데이터 계산
  const totalProjects = allProjects.length;
  const categories = Array.from(new Set(allProjects.map(p => p.category).filter(Boolean)));
  const recentCount = allProjects.filter(p => {
    const projectDate = new Date(p.publishDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return projectDate >= thirtyDaysAgo;
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Total Projects
            </CardTitle>
            <FileText className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">{totalProjects}</div>
            <p className="text-xs text-slate-500">
              All completed projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Recent Projects
            </CardTitle>
            <TrendingUp className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">{recentCount}</div>
            <p className="text-xs text-slate-500">
              +{recentCount} from last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Categories
            </CardTitle>
            <Users className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">{categories.length}</div>
            <p className="text-xs text-slate-500">
              Different project types
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* 프로젝트 피드 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Projects</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="#projects">
              View All
              <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {recentProjects.map((project) => (
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
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}