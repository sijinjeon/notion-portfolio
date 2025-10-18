// scripts/sync-all-pages.js

require('dotenv').config({ path: '.env.local' });

const fs = require('fs').promises;
const path = require('path');
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

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
async function convertPageToData(page) {
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

/**
 * 전체 동기화 실행
 */
async function syncAllPages() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  if (!databaseId) {
    console.error('❌ NOTION_DATABASE_ID is required');
    process.exit(1);
  }
  
  console.log('🔄 Starting full database sync...');
  console.log(`📊 Database ID: ${databaseId}`);
  
  try {
    // 1. Notion에서 모든 게시된 페이지 가져오기
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
    });
    
    console.log(`📚 Found ${response.results.length} published pages`);
    
    // 2. 각 페이지 변환
    const pages = await Promise.all(
      response.results.map(page => convertPageToData(page))
    );
    
    // 3. 각 페이지를 JSON 파일로 저장
    const dataDir = path.join(process.cwd(), 'data', 'pages');
    await fs.mkdir(dataDir, { recursive: true });
    
    const savedSlugs = new Set();
    
    for (const page of pages) {
      const filePath = path.join(dataDir, `${page.slug}.json`);
      await fs.writeFile(
        filePath,
        JSON.stringify(page, null, 2),
        'utf-8'
      );
      savedSlugs.add(page.slug);
      console.log(`  ✅ ${page.title} (${page.pageType})`);
    }
    
    // 4. 더 이상 존재하지 않는 파일 삭제
    const existingFiles = await fs.readdir(dataDir);
    for (const file of existingFiles) {
      if (!file.endsWith('.json')) continue;
      
      const slug = file.replace('.json', '');
      if (!savedSlugs.has(slug) && slug !== '.gitkeep') {
        await fs.unlink(path.join(dataDir, file));
        console.log(`  🗑️  Removed: ${file}`);
      }
    }
    
    // 5. 인덱스 파일 생성
    const pagesByType = {
      home: pages.find(p => p.pageType === 'Home') || null,
      projects: pages.filter(p => p.pageType === 'Project'),
      footer: pages.find(p => p.pageType === 'Footer') || null,
      about: pages.find(p => p.pageType === 'About') || null,
    };
    
    const index = {
      lastSyncTime: new Date().toISOString(),
      totalPages: pages.length,
      pagesByType: {
        home: pagesByType.home ? {
          id: pagesByType.home.id,
          pageType: pagesByType.home.pageType,
          slug: pagesByType.home.slug,
          title: pagesByType.home.title,
          category: null,
          publishDate: pagesByType.home.publishDate,
          published: pagesByType.home.published,
        } : null,
        projects: pagesByType.projects.map(p => ({
          id: p.id,
          pageType: p.pageType,
          slug: p.slug,
          title: p.title,
          category: p.category,
          publishDate: p.publishDate,
          published: p.published,
        })),
        footer: pagesByType.footer ? {
          id: pagesByType.footer.id,
          pageType: pagesByType.footer.pageType,
          slug: pagesByType.footer.slug,
          title: pagesByType.footer.title,
          category: null,
          publishDate: pagesByType.footer.publishDate,
          published: pagesByType.footer.published,
        } : null,
        about: pagesByType.about ? {
          id: pagesByType.about.id,
          pageType: pagesByType.about.pageType,
          slug: pagesByType.about.slug,
          title: pagesByType.about.title,
          category: null,
          publishDate: pagesByType.about.publishDate,
          published: pagesByType.about.published,
        } : null,
      },
      pages: pages.map(p => ({
        id: p.id,
        pageType: p.pageType,
        slug: p.slug,
        title: p.title,
        category: p.category,
        publishDate: p.publishDate,
        published: p.published,
      })),
    };
    
    await fs.writeFile(
      path.join(process.cwd(), 'data', 'index.json'),
      JSON.stringify(index, null, 2),
      'utf-8'
    );
    
    console.log('\n✅ Full sync completed');
    console.log(`   Home: ${pagesByType.home ? '✓' : '✗'}`);
    console.log(`   Projects: ${pagesByType.projects.length}`);
    console.log(`   Footer: ${pagesByType.footer ? '✓' : '✗'}`);
    console.log(`   About: ${pagesByType.about ? '✓' : '✗'}`);
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 실행
syncAllPages();

