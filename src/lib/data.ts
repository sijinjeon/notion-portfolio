// src/lib/data.ts

import fs from 'fs/promises';
import path from 'path';
import { PageData, DatabaseIndex } from '@/types';

/**
 * 데이터베이스 인덱스 로드
 */
export async function loadIndex(): Promise<DatabaseIndex> {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  
  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // 인덱스 파일이 없으면 기본값 반환
    return {
      lastSyncTime: '',
      totalPages: 0,
      pagesByType: {
        home: null,
        projects: [],
        footer: null,
        about: null,
      },
      pages: [],
    };
  }
}

/**
 * 단일 페이지 데이터 로드
 */
export async function loadPageData(slug: string): Promise<PageData | null> {
  const filePath = path.join(process.cwd(), 'data', 'pages', `${slug}.json`);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * 모든 프로젝트 로드
 */
export async function loadAllProjects(): Promise<PageData[]> {
  const index = await loadIndex();
  
  const projects = await Promise.all(
    index.pagesByType.projects.map((summary) => loadPageData(summary.slug))
  );
  
  return projects.filter((p): p is PageData => p !== null);
}

/**
 * Home 페이지 데이터 로드
 */
export async function loadHomeData(): Promise<PageData | null> {
  return await loadPageData('home');
}

/**
 * Footer 데이터 로드
 */
export async function loadFooterData(): Promise<PageData | null> {
  return await loadPageData('footer');
}

/**
 * About 페이지 데이터 로드
 */
export async function loadAboutData(): Promise<PageData | null> {
  return await loadPageData('about');
}

