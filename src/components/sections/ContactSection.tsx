'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          연락하기
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 연락처 정보 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                연락처 정보
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <a 
                    href="mailto:sijin@example.com" 
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    sijin@example.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-slate-500" />
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-slate-500" />
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-slate-500" />
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 메시지 폼 */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                메시지 보내기
              </h2>
              <p className="text-slate-600 mb-4">
                프로젝트 문의나 협업 제안이 있으시면 언제든 연락주세요.
              </p>
              <Button 
                className="w-full"
                onClick={() => window.location.href = 'mailto:sijin@example.com'}
              >
                <Mail className="h-4 w-4 mr-2" />
                이메일로 연락하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

