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
    <div className="min-h-screen bg-slate-50/50">
      {/* 전체 컨테이너: 1280px 가운데 정렬, 양쪽 여백 */}
      <div className="max-w-[1280px] mx-auto p-6">
        <div className="flex gap-6 h-[calc(100vh-3rem)]">
          {/* 사이드바 - 고정 카드 */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-6 h-[calc(100vh-3rem)] bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
              <Sidebar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>
          
          {/* 메인 콘텐츠 영역 - 카드 스타일 */}
          <div className="flex-1 min-w-0">
            <main className="bg-white rounded-xl shadow-sm border border-slate-200/60 h-[calc(100vh-3rem)] overflow-y-auto">
              <div className="p-8 md:p-12 lg:px-16 lg:py-14">
                {renderActiveSection()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
