// src/lib/errors.ts

export class NotionApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'NotionApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class SyncError extends Error {
  constructor(
    message: string,
    public pageId?: string
  ) {
    super(message);
    this.name = 'SyncError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 중앙집중식 에러 핸들러
 */
export function handleError(error: unknown): void {
  if (error instanceof NotionApiError) {
    console.error(`[Notion API Error] ${error.code}:`, {
      message: error.message,
      statusCode: error.statusCode,
    });
    
    if (error.statusCode === 429) {
      console.error('⚠️  Rate limited. Please wait before retrying.');
    }
  } else if (error instanceof SyncError) {
    console.error('[Sync Error]:', {
      message: error.message,
      pageId: error.pageId,
    });
  } else if (error instanceof ValidationError) {
    console.error('[Validation Error]:', {
      message: error.message,
      field: error.field,
    });
  } else if (error instanceof Error) {
    console.error('[Unknown Error]:', error.message);
    console.error(error.stack);
  } else {
    console.error('[Unexpected Error]:', error);
  }
}

