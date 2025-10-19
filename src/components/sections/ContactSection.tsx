'use client';

import { useEffect, useState } from 'react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import type { PageData } from '@/types';

export function ContactSection() {
  const [profileData, setProfileData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        // profile 페이지 로드 (contact와 profile 통합)
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

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 min-h-[60vh]">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Contact me
        </h1>
        {profileData ? (
          <div className="prose prose-lg prose-slate max-w-none">
            <MarkdownRenderer content={profileData.content} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 mb-2">연락처 정보를 준비 중입니다.</p>
            <p className="text-sm text-slate-400">Notion 데이터베이스에 Profile 페이지를 추가해주세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
