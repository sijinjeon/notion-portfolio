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
    default: '전시진 - Notion & 업무 자동화 전문가 | SIREAL',
    template: '%s | 전시진',
  },
  description: 'Notion과 노코드 도구를 활용한 업무 자동화, 협업 시스템 구축, 데이터 관리 전문가. 반복 업무를 자동화하고 팀 협업을 효율화하세요.',
  keywords: [
    'Notion',
    '노션',
    '업무 자동화',
    '노코드',
    'No-Code',
    '협업 도구',
    '컨설팅',
    '노션 컨설팅',
    '업무 효율화',
    '데이터 관리',
    'SIREAL',
    '시리얼',
    '전시진',
  ],
  authors: [{ name: '전시진', url: 'https://www.sireal.co' }],
  creator: '전시진',
  publisher: 'SIREAL',
  metadataBase: new URL('https://notion-portfolio-pi.vercel.app'),
  openGraph: {
    title: '전시진 - Notion & 업무 자동화 전문가',
    description: 'Notion과 노코드 도구로 업무를 더 쉽게. 반복 업무 자동화, 협업 시스템 구축, 데이터 관리 컨설팅',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'SIREAL - 전시진 포트폴리오',
    url: 'https://notion-portfolio-pi.vercel.app',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 800,
        alt: '전시진 프로필',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '전시진 - Notion & 업무 자동화 전문가',
    description: '반복 업무를 자동화하고 협업을 효율화하세요',
    creator: '@sijin90',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

