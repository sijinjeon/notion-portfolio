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
 * POST /api/webhook/notion
 */
export async function POST(request: NextRequest) {
  try {
    // 1. URL 파라미터에서 secret 검증 (Notion 버튼 방식)
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
    const payload: NotionWebhookPayload = JSON.parse(body);
    
    // 3. page_id 검증
    const { page_id } = payload;
    if (!page_id) {
      return NextResponse.json(
        { error: 'Missing page_id' },
        { status: 400 }
      );
    }
    
    // 4. GitHub Actions 트리거
    const githubResponse = await triggerGitHubAction(page_id);
    
    if (!githubResponse.ok) {
      throw new Error('Failed to trigger GitHub Action');
    }
    
    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered',
      page_id: page_id,
    });
    
  } catch (error: any) {
    console.error('Webhook error:', error);
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

