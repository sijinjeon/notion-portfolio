'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Home, Briefcase, User, Github, Linkedin, Twitter, Menu, Mail, MapPin } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import type { PageData } from '@/types';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface SidebarContentProps extends SidebarProps {
  profileData: PageData | null;
  loading: boolean;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        // profile 페이지 로드
        const response = await fetch('/data/pages/profile.json');
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error('Profile 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProfileData();
  }, []);

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
              profileData={profileData}
              loading={loading}
            />
          </aside>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <aside className="w-80 bg-slate-50 border-r border-slate-200 hidden md:block">
        <SidebarContent 
          activeSection={activeSection} 
          onSectionChange={onSectionChange}
          profileData={profileData}
          loading={loading}
        />
      </aside>
    </>
  );
}

function SidebarContent({ activeSection, onSectionChange, profileData, loading }: SidebarContentProps) {
  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'projects', label: '프로젝트', icon: Briefcase },
    { id: 'about', label: '소개', icon: User },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 프로필 섹션 */}
      <div className="p-6 border-b border-slate-200">
        {loading ? (
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-4"></div>
            <div className="h-5 bg-slate-200 rounded w-24 mx-auto mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-32 mx-auto mb-4"></div>
            <div className="flex justify-center gap-2">
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : profileData ? (
          <>
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/profile.jpg"
                alt={profileData.title}
                fill
                className="rounded-full object-cover ring-2 ring-slate-200 ring-offset-2"
                priority
                sizes="80px"
              />
            </div>
            
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-slate-900 mb-3">
                {profileData.title}
              </h1>
              
              {/* 노션에서 가져온 연락처 정보 */}
              <div className="text-sm text-slate-600 leading-relaxed mb-4 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">milk@sireal.co</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">Seoul, South Korea</span>
                </div>
              </div>
              
              {/* 소셜 링크 */}
              <div className="flex justify-center gap-2">
                <a
                  href="https://github.com/sijinjeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sijinjeon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn
                </a>
                <a
                  href="https://www.threads.com/@sireal_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Twitter className="h-3 w-3" />
                  Threads
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src="/profile.jpg"
                alt="전시진"
                fill
                className="rounded-full object-cover ring-2 ring-slate-200 ring-offset-2"
                priority
                sizes="80px"
              />
            </div>
            
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-slate-900 mb-3">
                전시진
              </h1>
              
              {/* 연락처 정보 */}
              <div className="text-sm text-slate-600 leading-relaxed mb-4 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">milk@sireal.co</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-xs">Seoul, South Korea</span>
                </div>
              </div>
              
              {/* 소셜 링크 */}
              <div className="flex justify-center gap-2">
                <a
                  href="https://github.com/sijinjeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sijinjeon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn
                </a>
                <a
                  href="https://www.threads.com/@sireal_co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
                >
                  <Twitter className="h-3 w-3" />
                  Threads
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <button 
                  className={`w-full text-left px-3 py-2.5 rounded-md transition-all flex items-center gap-3 group relative ${
                    isActive 
                      ? 'bg-slate-900 text-white font-medium shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* 하단 정보 */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-center text-xs text-slate-400">
          <p>© 2025 전시진</p>
          <p className="mt-1">Built with Cursor & Notion</p>
        </div>
      </div>
    </div>
  );
}

