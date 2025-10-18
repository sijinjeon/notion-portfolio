// src/app/api/webhook/notion/route.ts

import { NextRequest, NextResponse } from 'next/server';

interface NotionWebhookPayload {
  page_id: string;
  workspace_id?: string;
  timestamp?: string;
}

/**
 * GitHub Actions 트리거
 */
async function triggerGitHubAction(pageId: string) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  
  if (!owner || !repo || !token) {
    throw new Error('GitHub configuration missing');
  }
  
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/dispatches`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'notion-webhook',
        client_payload: {
          page_id: pageId,
          timestamp: new Date().toISOString(),
        },
      }),
    }
  );
  
  return response;
}

/**
 * GET /api/webhook/notion - Notion 버튼용
 * Notion 버튼은 POST가 아닌 GET 요청을 보내므로, GET 핸들러를 추가
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📥 GET webhook received');
    
    // 1. URL 파라미터에서 secret과 page_id 추출
    const urlSecret = request.nextUrl.searchParams.get('secret');
    const pageId = request.nextUrl.searchParams.get('page_id');
    const expectedSecret = process.env.NOTION_WEBHOOK_SECRET;
    
    console.log('🔑 Secret provided:', !!urlSecret);
    console.log('📄 Page ID provided:', pageId);
    
    // 2. Secret 검증
    if (!expectedSecret) {
      console.warn('⚠️ NOTION_WEBHOOK_SECRET not configured');
    } else if (!urlSecret || urlSecret !== expectedSecret) {
      console.error('❌ Invalid or missing secret in URL');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret' },
        { status: 401 }
      );
    }
    
    // 3. page_id 검증
    if (!pageId) {
      console.error('❌ Missing page_id parameter');
      return NextResponse.json(
        { 
          error: 'Missing page_id parameter',
          usage: 'Add ?page_id=YOUR_PAGE_ID&secret=YOUR_SECRET to the URL'
        },
        { status: 400 }
      );
    }
    
    // 4. GitHub Actions 트리거
    console.log('🚀 Triggering GitHub Actions for page:', pageId);
    const githubResponse = await triggerGitHubAction(pageId);
    
    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('❌ GitHub API error:', errorText);
      throw new Error(`GitHub API failed: ${githubResponse.status}`);
    }
    
    console.log('✅ GitHub Action triggered successfully');
    
    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered successfully',
      page_id: pageId,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/webhook/notion - 외부 Webhook 서비스용
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📥 POST webhook received');
    
    // 1. URL 파라미터에서 secret 검증
    const urlSecret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.NOTION_WEBHOOK_SECRET;
    
    if (!expectedSecret) {
      console.warn('⚠️ NOTION_WEBHOOK_SECRET not configured');
    } else if (!urlSecret || urlSecret !== expectedSecret) {
      console.error('❌ Invalid or missing secret in URL');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret' },
        { status: 401 }
      );
    }
    
    // 2. 요청 본문 파싱
    const body = await request.text();
    console.log('📦 Request body:', body);
    
    const payload: NotionWebhookPayload = JSON.parse(body);
    
    // 3. page_id 검증
    const { page_id } = payload;
    if (!page_id) {
      return NextResponse.json(
        { error: 'Missing page_id in request body' },
        { status: 400 }
      );
    }
    
    // 4. GitHub Actions 트리거
    console.log('🚀 Triggering GitHub Actions for page:', page_id);
    const githubResponse = await triggerGitHubAction(page_id);
    
    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('❌ GitHub API error:', errorText);
      throw new Error(`GitHub API failed: ${githubResponse.status}`);
    }
    
    console.log('✅ GitHub Action triggered successfully');
    
    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered successfully',
      page_id: page_id,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// OPTIONS 메서드 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-notion-signature',
    },
  });
}

