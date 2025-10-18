'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Home, Briefcase, User, Mail, Github, Linkedin, Twitter, Menu } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface SidebarContentProps extends SidebarProps {}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">전시진</h1>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="사이드바 닫기"
          />
          <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200">
            <SidebarContent 
              activeSection={activeSection} 
              onSectionChange={(section) => {
                onSectionChange(section);
                setMobileMenuOpen(false);
              }} 
            />
          </aside>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 z-10 hidden md:block">
        <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
      </aside>
    </>
  );
}

function SidebarContent({ activeSection, onSectionChange }: SidebarContentProps) {
  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'projects', label: '프로젝트', icon: Briefcase },
    { id: 'about', label: '소개', icon: User },
    { id: 'contact', label: '연락하기', icon: Mail },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 프로필 섹션 */}
      <div className="p-6 border-b border-slate-200">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src="/profile.jpg"
            alt="전시진"
            fill
            className="rounded-full object-cover border-2 border-slate-200"
            priority
            sizes="96px"
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            전시진
          </h1>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            No-Code Automation Consultant |<br />
            Business Process Optimization |<br />
            AI Integration Specialist
          </p>
          
          {/* 연락처 정보 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4" />
              <a href="mailto:milk@sireal.co" className="hover:text-slate-900 transition-colors">
              milk@sireal.co
              </a>
            </div>
            
            {/* SNS 링크 */}
            <div className="flex justify-center gap-2 mt-6">
              <a href="https://github.com/sijinjeon" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/sijinjeon/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.threads.com/@sireal_co" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all" aria-label="Threads">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-6">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button 
                  className={`w-full text-left transition-colors ${
                    isActive 
                      ? 'text-slate-900 font-medium' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-sm tracking-wide uppercase">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* 하단 정보 */}
      <div className="p-6 border-t border-slate-200">
        <div className="text-center text-xs text-slate-400">
          <p>© 2025 전시진</p>
          <p className="mt-1">Built with Cursor & Notion</p>
        </div>
      </div>
    </div>
  );
}

