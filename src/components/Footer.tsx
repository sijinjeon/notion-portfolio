// src/components/Footer.tsx

import Link from 'next/link';
import { loadFooterData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default async function Footer() {
  const footerData = await loadFooterData();
  
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {footerData ? (
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: footerData.content }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Default Footer */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Portfolio
              </h3>
              <p className="text-slate-600">
                Notion으로 관리하는 개인 포트폴리오
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                링크
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-slate-600 hover:text-slate-900">
                    홈
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-600 hover:text-slate-900">
                    소개
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                소셜
              </h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  GitHub
                </a>
                <a href="#" className="text-slate-600 hover:text-slate-900">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        <div className="text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

