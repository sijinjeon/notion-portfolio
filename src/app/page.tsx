// src/app/page.tsx

import { loadHomeData, loadAllProjects } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export const dynamic = 'force-static';

export default async function HomePage() {
  const homeData = await loadHomeData();
  const projects = await loadAllProjects();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="mb-16">
        {homeData ? (
          <>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              {homeData.title}
            </h1>
            {homeData.metaDescription && (
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
                {homeData.metaDescription}
              </p>
            )}
            {homeData.content && (
              <div className="prose prose-lg max-w-3xl">
                <MarkdownRenderer content={homeData.content} />
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              안녕하세요, 저는 [이름]입니다
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
              [직업/분야]로 활동하며 [설명]을 하고 있습니다.
            </p>
          </>
        )}
      </section>
      
      {/* Projects Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-8">
          프로젝트
        </h2>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500">
              아직 게시된 프로젝트가 없습니다.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Notion 데이터베이스에 프로젝트를 추가해주세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export async function generateMetadata() {
  const homeData = await loadHomeData();
  
  return {
    title: homeData?.title || 'Portfolio',
    description: homeData?.metaDescription || 'Notion으로 관리하는 개인 포트폴리오',
  };
}

