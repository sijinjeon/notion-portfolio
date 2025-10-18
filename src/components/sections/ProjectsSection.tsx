'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PageData } from '@/types';

export function ProjectsSection() {
  const [projects, setProjects] = useState<PageData[]>([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        // 실제로는 API 또는 데이터 파일에서 로드
        setLoading(false);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  const categories = ['전체', '웹 개발', '모바일', '디자인'];
  
  const filteredProjects = activeCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-slate-900">
          프로젝트
        </h1>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.slug} className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 h-full">
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
                    
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
            <div className="col-span-3 text-center py-12">
              <p className="text-slate-500">프로젝트를 불러오는 중...</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

