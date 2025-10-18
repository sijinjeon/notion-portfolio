'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { HomeSection } from '@/components/sections/HomeSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

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
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 ml-0 md:ml-80 pt-16 md:pt-0">
          <div className="p-6 md:p-12">
            {renderActiveSection()}
          </div>
        </main>
    </div>
  );
}

