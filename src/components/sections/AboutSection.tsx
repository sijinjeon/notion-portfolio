'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { User, Calendar, MapPin, Mail, Github, Linkedin, Twitter, Award, Briefcase } from 'lucide-react';
import type { PageData } from '@/types';

export function AboutSection() {
  const [aboutData, setAboutData] = useState<PageData | null>(null);
  const [profileData, setProfileData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // About 데이터 로드
        const aboutResponse = await fetch('/data/pages/about.json');
        if (aboutResponse.ok) {
          const about = await aboutResponse.json();
          setAboutData(about);
        }

        // Profile 데이터 로드 (연락처 정보용)
        const profileResponse = await fetch('/data/pages/profile.json');
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setProfileData(profile);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        {/* 헤더 스켈레톤 */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* 통계 카드 스켈레톤 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 콘텐츠 스켈레톤 */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">About me</h1>
        <p className="text-slate-500 text-sm">소개합니다</p>
      </div>

      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Experience
            </CardTitle>
            <Briefcase className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">5+</div>
            <p className="text-xs text-slate-500">
              Years in business process optimization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Location
            </CardTitle>
            <MapPin className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">Seoul</div>
            <p className="text-xs text-slate-500">
              South Korea
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-slate-600">
              Specialization
            </CardTitle>
            <Award className="h-3 w-3 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">No-Code</div>
            <p className="text-xs text-slate-500">
              Automation & Process Optimization
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* 메인 콘텐츠 */}
      <div className="space-y-8">
        {/* 소개 콘텐츠 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-4 w-4" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aboutData ? (
              <div className="prose prose-slate max-w-none">
                <MarkdownRenderer content={aboutData.content} />
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">소개 페이지를 준비 중입니다.</p>
                <p className="text-sm text-slate-300">Notion 데이터베이스에 About 페이지를 추가해주세요.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 연락처 및 스킬 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-4 w-4" />
              Contact Information
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData ? (
                <div className="prose prose-sm prose-slate max-w-none">
                  <MarkdownRenderer content={profileData.content} />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">milk@sireal.co</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Seoul, South Korea</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Github className="h-4 w-4" />
              Social Links
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">
                  <Github className="h-3 w-3 mr-1" />
                  GitHub
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">
                  <Linkedin className="h-3 w-3 mr-1" />
                  LinkedIn
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">
                  <Twitter className="h-3 w-3 mr-1" />
                  Threads
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 스킬 및 전문 분야 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-4 w-4" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Business Process Optimization</Badge>
              <Badge variant="secondary">No-Code Automation</Badge>
              <Badge variant="secondary">AI Integration</Badge>
              <Badge variant="secondary">Notion Consulting</Badge>
              <Badge variant="secondary">Workflow Design</Badge>
              <Badge variant="secondary">Team Collaboration</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}