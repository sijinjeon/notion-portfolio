// src/lib/notion.ts

import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { PageData, PageType } from '@/types';
import { logger } from './logger';

class NotionService {
  private static instance: NotionService;
  private notion: Client;
  private n2m: NotionToMarkdown;
  
  private constructor() {
    const apiKey = process.env.NOTION_API_KEY;
    
    if (!apiKey) {
      throw new Error('NOTION_API_KEY is not defined');
    }
    
    this.notion = new Client({ auth: apiKey });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
    
    logger.info('NotionService initialized');
  }
  
  /**
   * Singleton 인스턴스 가져오기
   */
  public static getInstance(): NotionService {
    if (!NotionService.instance) {
      NotionService.instance = new NotionService();
    }
    return NotionService.instance;
  }
  
  /**
   * 데이터베이스 전체 쿼리
   */
  async queryDatabase(databaseId: string): Promise<PageData[]> {
    logger.info('Querying database', { databaseId });
    
    try {
      const response = await (this.notion.databases as any).query({
        database_id: databaseId,
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'PublishDate',
            direction: 'descending',
          },
        ],
      });
      
      logger.info(`Found ${response.results.length} published pages`);
      
      const pages = await Promise.all(
        response.results.map((page: any) => this.convertPageToData(page))
      );
      
      return pages;
    } catch (error: any) {
      logger.error('Failed to query database', error);
      throw error;
    }
  }
  
  /**
   * 단일 페이지 가져오기
   */
  async getPage(pageId: string): Promise<PageData> {
    logger.info('Fetching page', { pageId });
    
    try {
      const page = await this.notion.pages.retrieve({ page_id: pageId });
      return await this.convertPageToData(page);
    } catch (error: any) {
      logger.error('Failed to fetch page', error, { pageId });
      throw error;
    }
  }
  
  /**
   * Notion 페이지를 PageData로 변환
   */
  private async convertPageToData(page: any): Promise<PageData> {
    // Get blocks and convert to Markdown
    const blocks = await this.n2m.pageToMarkdown(page.id);
    const markdown = this.n2m.toMarkdownString(blocks);
    
    // Extract PageType
    const pageType = this.getPropertyValue(page, 'PageType') as PageType;
    
    // Generate slug
    let slug = this.getPropertyValue(page, 'Slug') as string;
    if (!slug) {
      switch (pageType) {
        case 'Home':
          slug = 'home';
          break;
        case 'Footer':
          slug = 'footer';
          break;
        case 'About':
          slug = 'about';
          break;
        default:
          slug = page.id;
      }
    }
    
    return {
      id: page.id,
      pageType: pageType || 'Project',
      slug: slug,
      title: this.getPropertyValue(page, 'Title') as string,
      metaDescription: (this.getPropertyValue(page, 'MetaDescription') as string) || '',
      category: this.getPropertyValue(page, 'Category') as string | null,
      tags: (this.getPropertyValue(page, 'Tags') as string[]) || [],
      thumbnail: this.getPropertyValue(page, 'Thumbnail') as string | null,
      publishDate: (this.getPropertyValue(page, 'PublishDate') as string) || new Date().toISOString(),
      lastEditedTime: page.last_edited_time,
      published: this.getPropertyValue(page, 'Published') as boolean,
      content: markdown.parent,
    };
  }
  
  /**
   * Notion 속성값 추출
   */
  private getPropertyValue(page: any, propertyName: string): any {
    const property = page.properties[propertyName];
    
    if (!property) {
      return null;
    }
    
    switch (property.type) {
      case 'title':
        return property.title[0]?.plain_text || '';
        
      case 'rich_text':
        return property.rich_text[0]?.plain_text || '';
        
      case 'checkbox':
        return property.checkbox;
        
      case 'select':
        return property.select?.name || null;
        
      case 'multi_select':
        return property.multi_select.map((item: any) => item.name);
        
      case 'date':
        return property.date?.start || null;
        
      case 'files':
        return property.files[0]?.external?.url || 
               property.files[0]?.file?.url || null;
        
      default:
        return null;
    }
  }
}

export default NotionService;

