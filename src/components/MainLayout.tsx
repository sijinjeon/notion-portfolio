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
      {/* 전체 컨테이너: 모바일 16px, 데스크톱 24px 여백 */}
      <div className="max-w-[1280px] mx-auto p-4 md:p-6">
        {/* 모바일: 단일 컬럼, 데스크톱: flex 레이아웃 (기존 유지) */}
        <div className="md:flex md:gap-6 md:h-[calc(100vh-3rem)]">
          {/* 사이드바 - 모바일: 숨김, 데스크톱: 표시 (기존 스타일 유지) */}
          <div className="hidden md:block md:w-80 md:flex-shrink-0">
            <div className="sticky top-6 h-[calc(100vh-3rem)] bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
              <Sidebar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>
          
          {/* 메인 콘텐츠 영역 - 모바일: 전체 너비, 데스크톱: flex-1 (기존 유지) */}
          <div className="flex-1 min-w-0">
            {/* 모바일: 상단 패딩 64px (헤더 공간), 데스크톱: 패딩 없음 */}
            <main className="pt-16 md:pt-0 bg-white rounded-xl shadow-sm border border-slate-200/60 min-h-screen md:h-[calc(100vh-3rem)] overflow-y-auto">
              {/* 모바일: 24px, 데스크톱: 기존 패딩 유지 */}
              <div className="p-6 md:p-8 lg:px-16 lg:py-14">
                {renderActiveSection()}
              </div>
            </main>
          </div>
        </div>
      </div>
      
      {/* 모바일 사이드바 (Sidebar 컴포넌트 내부에서 렌더링) */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
    </div>
  );
}
