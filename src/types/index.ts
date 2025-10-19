// src/types/index.ts

/**
 * 페이지 타입 정의
 */
export type PageType = "Home" | "Project" | "Footer" | "About" | "Contact" | "Profile";

/**
 * 페이지 데이터 인터페이스
 */
export interface PageData {
  // 기본 속성
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
  
  // SEO
  metaDescription: string;
  
  // 분류 (Project 주로 사용)
  category: string | null;
  tags: string[];
  
  // 미디어
  thumbnail: string | null;
  
  // 날짜
  publishDate: string;
  lastEditedTime: string;
  
  // 상태
  published: boolean;
  
  // 콘텐츠
  content: string;
}

/**
 * 페이지 요약 인터페이스 (목록용)
 */
export interface PageSummary {
  id: string;
  pageType: PageType;
  slug: string;
  title: string;
  category: string | null;
  publishDate: string;
  published: boolean;
}

/**
 * 데이터베이스 인덱스 인터페이스
 */
export interface DatabaseIndex {
  lastSyncTime: string;
  totalPages: number;
  pagesByType: {
    home: PageSummary | null;
    projects: PageSummary[];
    footer: PageSummary | null;
    about: PageSummary | null;
    contact: PageSummary | null;
    profile: PageSummary | null;
  };
  pages: PageSummary[];
}

/**
 * Notion 웹훅 페이로드
 */
export interface NotionWebhookPayload {
  page_id: string;
  workspace_id?: string;
  timestamp?: string;
}

