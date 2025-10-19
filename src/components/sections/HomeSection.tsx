'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowRight, Briefcase, Lightbulb, UserCheck } from 'lucide-react';
import type { PageData } from '@/types';

export function HomeSection() {
  const [recentProjects, setRecentProjects] = useState<PageData[]>([]);
  const [profileData, setProfileData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 인덱스에서 프로젝트 목록 가져오기
        const indexResponse = await fetch('/data/index.json');
        const indexData = await indexResponse.json();
        const projectSummaries = indexData.pagesByType?.projects || [];
        
        // 최근 6개 프로젝트의 상세 데이터 가져오기
        const projectPromises = projectSummaries.slice(0, 6).map(async (summary: any) => {
          const response = await fetch(`/data/pages/${summary.slug}.json`);
          return response.json();
        });
        
        const projects = await Promise.all(projectPromises);
        setRecentProjects(projects);

        // Profile 데이터 로드 (통계 카드 정보용)
        try {
          const profileResponse = await fetch('/data/pages/profile.json');
          const profile = await profileResponse.json();
          setProfileData(profile);
        } catch (error) {
          console.error('Profile 데이터 로드 실패:', error);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Profile에서 통계 카드 정보 파싱
  const parseStatCards = () => {
    if (!profileData?.content) {
      return {
        yearsOfExperience: '5+ years',
        specialization: 'No-Code, Automation',
        currentStatus: 'Available for projects',
      };
    }

    const content = profileData.content;
    const lines = content.split('\n');
    
    let yearsOfExperience = '5+ years';
    let specialization = 'No-Code, Automation';
    let currentStatus = 'Available for projects';

    // "## 🏠 홈 화면 통계 카드 정보" 섹션 찾기
    const statCardIndex = lines.findIndex(line => line.includes('홈 화면 통계 카드 정보'));
    if (statCardIndex === -1) {
      return { yearsOfExperience, specialization, currentStatus };
    }

    // 각 필드 파싱
    for (let i = statCardIndex; i < lines.length && i < statCardIndex + 20; i++) {
      const line = lines[i];
      
      if (line.includes('Years of Experience')) {
        const nextLine = lines[i + 1];
        const match = nextLine?.match(/\*\*(.+?)\*\*/);
        if (match) yearsOfExperience = match[1];
      } else if (line.includes('Specialization')) {
        const nextLine = lines[i + 1];
        const match = nextLine?.match(/\*\*(.+?)\*\*/);
        if (match) specialization = match[1];
      } else if (line.includes('Current Status')) {
        const nextLine = lines[i + 1];
        const match = nextLine?.match(/\*\*(.+?)\*\*/);
        if (match) currentStatus = match[1];
      }
    }

    return { yearsOfExperience, specialization, currentStatus };
  };

  const statCards = parseStatCards();

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
      {/* 통계 카드 섹션 - 개인 브랜딩 중심 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Years of Experience
            </CardTitle>
            <Briefcase className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{statCards.yearsOfExperience}</div>
            <p className="text-xs text-slate-500 mt-auto">
              in business optimization
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Specialization
            </CardTitle>
            <Lightbulb className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{statCards.specialization}</div>
            <p className="text-xs text-slate-500 mt-auto">
              Core expertise areas
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Current Status
            </CardTitle>
            <UserCheck className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between">
            <div className="text-xl font-bold text-slate-900">{statCards.currentStatus}</div>
            <p className="text-xs text-slate-500 mt-auto">
              Ready for new challenges
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