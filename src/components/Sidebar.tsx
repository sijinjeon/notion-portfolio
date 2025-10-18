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
          <h1 className="text-lg font-semibold">시진 전</h1>
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
            alt="시진 전"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            시진 전
          </h1>
          <p className="text-sm text-slate-600 mb-4">
            Frontend Developer
          </p>
          
          {/* 연락처 정보 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Mail className="h-4 w-4" />
              <a href="mailto:sijin@example.com" className="hover:text-slate-900 transition-colors">
                sijin@example.com
              </a>
            </div>
            
            {/* SNS 링크 */}
            <div className="flex justify-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button 
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* 하단 정보 */}
      <div className="p-6 border-t border-slate-200">
        <div className="text-center text-xs text-slate-400">
          <p>© 2025 시진 전</p>
          <p className="mt-1">Built with Next.js & Notion</p>
        </div>
      </div>
    </div>
  );
}

