// src/app/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { loadPageData, loadIndex } from '@/lib/data';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await loadPageData(slug);
  
  if (!project || project.pageType !== 'Project') {
    notFound();
  }
  
  const formattedDate = new Date(project.publishDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={project.publishDate}>{formattedDate}</time>
          </div>
          
          {project.category && (
            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
              {project.category}
            </Badge>
          )}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          {project.title}
        </h1>
        
        {/* Description */}
        {project.metaDescription && (
          <p className="text-xl text-slate-600 leading-relaxed">
            {project.metaDescription}
          </p>
        )}
        
        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-200 text-slate-600"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      
      {/* Content */}
      <div className="mb-12">
        <MarkdownRenderer content={project.content} />
      </div>
      
      {/* Navigation */}
      <nav className="pt-8 border-t border-slate-200">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
      </nav>
    </article>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const index = await loadIndex();
    
    const projects = index.pagesByType.projects.map((project) => ({
      slug: project.slug,
    }));
    
    // 프로젝트가 없으면 빈 배열 반환 (빌드는 성공하지만 페이지는 생성되지 않음)
    return projects.length > 0 ? projects : [];
  } catch (error) {
    console.warn('Failed to load projects for generateStaticParams:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadPageData(slug);
  
  if (!project) {
    return {
      title: 'Not Found',
    };
  }
  
  return {
    title: project.title,
    description: project.metaDescription,
    openGraph: {
      title: project.title,
      description: project.metaDescription,
      type: 'article',
      publishedTime: project.publishDate,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.metaDescription,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

