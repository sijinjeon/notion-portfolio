'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PageData } from '@/types';

export function HomeSection() {
  const [homeData, setHomeData] = useState<PageData | null>(null);
  const [recentProjects, setRecentProjects] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // 실제로는 API 또는 데이터 파일에서 로드
        // 임시로 빈 데이터 사용
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
    <section className="space-y-12">
      {/* Hero 섹션 */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          안녕하세요, <span className="text-blue-600">시진</span>입니다
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          프론트엔드 개발자로서 사용자 경험을 중시하며, 
          창의적이고 효율적인 웹 솔루션을 만듭니다.
        </p>
      </div>
      
      {/* 최근 프로젝트 */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          최근 프로젝트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentProjects.length > 0 ? (
            recentProjects.slice(0, 4).map((project) => (
              <Card key={project.slug} className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200">
                <CardContent className="p-0">
                  {project.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <Image 
                        src={project.thumbnail}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {project.category && (
                      <Badge className="bg-blue-50 text-blue-600 mb-3">
                        {project.category}
                      </Badge>
                    )}
                    
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    {project.metaDescription && (
                      <p className="text-slate-600 line-clamp-2 mb-4">
                        {project.metaDescription}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time>{new Date(project.publishDate).toLocaleDateString('ko-KR')}</time>
                      </div>
                      <span className="text-blue-500 group-hover:text-blue-600 flex items-center gap-1">
                        자세히 보기 <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-slate-500">아직 프로젝트가 없습니다.</p>
              <p className="text-sm text-slate-400 mt-2">Notion 데이터베이스에 프로젝트를 추가해주세요.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

