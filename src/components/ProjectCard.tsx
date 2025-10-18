// src/components/ProjectCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { PageData } from '@/types';

interface ProjectCardProps {
  project: PageData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.publishDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200 h-full">
        <CardContent className="p-0">
          {/* Thumbnail */}
          {project.thumbnail && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            {project.category && (
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium mb-3">
                {project.category}
              </Badge>
            )}
            
            {/* Title */}
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {project.title}
            </h3>
            
            {/* Description */}
            {project.metaDescription && (
              <p className="text-slate-600 line-clamp-2 mb-4">
                {project.metaDescription}
              </p>
            )}
            
            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={project.publishDate}>{formattedDate}</time>
              </div>
              <span className="text-blue-500 group-hover:text-blue-600 font-medium">
                자세히 보기 →
              </span>
            </div>
            
            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-slate-200 text-slate-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

