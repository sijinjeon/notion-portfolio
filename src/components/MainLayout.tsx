'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { HomeSection } from '@/components/sections/HomeSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';

export function MainLayout() {
  const [activeSection, setActiveSection] = useState('home');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'about':
        return <AboutSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 전체 컨테이너: 1280px 가운데 정렬 */}
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex min-h-screen bg-white shadow-sm">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 pt-16 md:pt-0">
            <div className="p-8 md:p-12 lg:px-16 lg:py-14">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
