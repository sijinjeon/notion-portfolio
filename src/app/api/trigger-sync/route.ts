// src/app/api/trigger-sync/route.ts
// Notion 페이지에서 직접 트리거할 수 있는 간단한 엔드포인트

import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub Actions 전체 동기화 트리거
 */
async function triggerFullSync() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  
  if (!owner || !repo || !token) {
    throw new Error('GitHub configuration missing');
  }
  
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/scheduled-sync.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main',
      }),
    }
  );
  
  return response;
}

/**
 * GET /api/trigger-sync - 전체 동기화 트리거
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📥 Trigger sync request received');
    
    // 1. Secret 검증
    const urlSecret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.NOTION_WEBHOOK_SECRET;
    
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Server configuration error: NOTION_WEBHOOK_SECRET not set' },
        { status: 500 }
      );
    }
    
    if (!urlSecret || urlSecret !== expectedSecret) {
      console.error('❌ Invalid secret');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret' },
        { status: 401 }
      );
    }
    
    // 2. GitHub Actions 전체 동기화 트리거
    console.log('🚀 Triggering full sync...');
    const githubResponse = await triggerFullSync();
    
    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('❌ GitHub API error:', errorText);
      throw new Error(`GitHub API failed: ${githubResponse.status} - ${errorText}`);
    }
    
    console.log('✅ Full sync triggered successfully');
    
    // 3. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'Full sync triggered successfully',
      timestamp: new Date().toISOString(),
      info: 'The site will be updated in about 1-2 minutes',
    });
    
  } catch (error: any) {
    console.error('❌ Trigger sync error:', error);
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

