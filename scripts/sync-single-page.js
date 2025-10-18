// scripts/sync-single-page.js

require('dotenv').config({ path: '.env.local' });

const fs = require('fs').promises;
const path = require('path');
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

/**
 * Notion 속성값 추출
 */
function getPropertyValue(page, propertyName) {
  const property = page.properties[propertyName];
  
  if (!property) return null;
  
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
      return property.multi_select.map(item => item.name);
    case 'date':
      return property.date?.start || null;
    case 'files':
      return property.files[0]?.external?.url || 
             property.files[0]?.file?.url || null;
    default:
      return null;
  }
}

/**
 * 페이지 데이터 변환
 */
async function convertPageToData(page, n2m) {
  const blocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(blocks);
  
  const pageType = getPropertyValue(page, 'PageType');
  let slug = getPropertyValue(page, 'Slug');
  
  // PageType에 따른 기본 slug
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
    title: getPropertyValue(page, 'Title'),
    metaDescription: getPropertyValue(page, 'MetaDescription') || '',
    category: getPropertyValue(page, 'Category'),
    tags: getPropertyValue(page, 'Tags') || [],
    thumbnail: getPropertyValue(page, 'Thumbnail'),
    publishDate: getPropertyValue(page, 'PublishDate') || new Date().toISOString(),
    lastEditedTime: page.last_edited_time,
    published: getPropertyValue(page, 'Published'),
    content: markdown.parent,
  };
}

async function syncSinglePage() {
  const pageId = process.env.PAGE_ID;
  
  if (!pageId) {
    console.error('❌ PAGE_ID environment variable is required');
    process.exit(1);
  }
  
  console.log(`📄 Fetching page: ${pageId}`);
  
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const n2m = new NotionToMarkdown({ notionClient: notion });
    
    const page = await notion.pages.retrieve({ page_id: pageId });
    const pageData = await convertPageToData(page, n2m);
    
    const filePath = path.join(
      process.cwd(),
      'data',
      'pages',
      `${pageData.slug}.json`
    );
    
    const publicFilePath = path.join(
      process.cwd(),
      'public',
      'data',
      'pages',
      `${pageData.slug}.json`
    );
    
    // Published가 false면 파일 삭제
    if (!pageData.published) {
      console.log('🗑️  Page is unpublished, removing file');
      try {
        await fs.unlink(filePath);
        await fs.unlink(publicFilePath);
        console.log('✅ File removed');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        console.log('ℹ️  File already removed');
      }
      return;
    }
    
    // JSON 파일로 저장 (data와 public 폴더 모두)
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.mkdir(path.dirname(publicFilePath), { recursive: true });
    
    await fs.writeFile(
      filePath,
      JSON.stringify(pageData, null, 2),
      'utf-8'
    );
    
    await fs.writeFile(
      publicFilePath,
      JSON.stringify(pageData, null, 2),
      'utf-8'
    );
    
    console.log(`✅ Page synced: ${pageData.title}`);
    console.log(`   Slug: ${pageData.slug}`);
    console.log(`   PageType: ${pageData.pageType}`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

syncSinglePage();

