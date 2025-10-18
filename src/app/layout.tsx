// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: '시진 전 - Frontend Developer',
    template: '%s | 시진 전',
  },
  description: '프론트엔드 개발자 시진 전의 포트폴리오',
  keywords: ['포트폴리오', '프론트엔드', '개발자', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: '시진 전' }],
  creator: '시진 전',
  metadataBase: new URL('https://notion-portfolio-pi.vercel.app'),
  openGraph: {
    title: '시진 전 - Frontend Developer',
    description: '프론트엔드 개발자 시진 전의 포트폴리오',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

