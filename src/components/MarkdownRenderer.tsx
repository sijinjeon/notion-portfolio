// src/components/MarkdownRenderer.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Notion 컬럼 구조를 지원하기 위한 전처리
  const processedContent = content
    // Notion의 통계 숫자를 카드 형태로 변환
    .replace(/## (\d+%)\n\n([^\n]+)/g, (_, percentage, description) => {
      return `<div class="notion-stat-card">
        <div class="notion-stat-number">${percentage}</div>
        <div class="notion-stat-description">${description}</div>
      </div>`;
    })
    // Notion의 섹션 구분을 더 명확하게
    .replace(/## 💼 Experience & Activities/g, '<h2 class="notion-section-title">💼 Experience & Activities</h2>')
    .replace(/## PROJECT/g, '<h2 class="notion-section-title">PROJECT</h2>')
    .replace(/## Skills/g, '<h2 class="notion-section-title">Skills</h2>')
    .replace(/### 📚 Lectures & Books/g, '<h3 class="notion-subsection-title">📚 Lectures & Books</h3>')
    .replace(/### 🏆 Certifications and Awards/g, '<h3 class="notion-subsection-title">🏆 Certifications and Awards</h3>')
    .replace(/### 🎓 Education/g, '<h3 class="notion-subsection-title">🎓 Education</h3>')
    // Notion의 회사 정보를 카드 형태로 변환
    .replace(/\*\*회사 이름:\*\* \*\*([^*]+)\*\*\n\n- \*\*직무:\*\* ([^\n]+)\n- \*\*기간:\*\* ([^\n]+)\n- \*\*역할:\*\* ([^\n]+)\n- \*\*성과:\*\* ([^\n]+)/g, 
      (_, company, position, period, role, achievement) => {
        return `<div class="notion-experience-card">
          <h4 class="notion-company-name">${company}</h4>
          <div class="notion-experience-details">
            <div class="notion-experience-item"><strong>직무:</strong> ${position}</div>
            <div class="notion-experience-item"><strong>기간:</strong> ${period}</div>
            <div class="notion-experience-item"><strong>역할:</strong> ${role}</div>
            <div class="notion-experience-item"><strong>성과:</strong> ${achievement}</div>
          </div>
        </div>`;
      })
    // Notion의 강의/도서 정보를 카드 형태로 변환
    .replace(/- \*\*제목:\*\* ([^\n]+)\n\n    \*\*저자\/강사:\*\* ([^\n]+)\n\n\n    \*\*설명:\*\* ([^\n]+)/g,
      (_, title, author, description) => {
        return `<div class="notion-book-card">
          <h4 class="notion-book-title">${title}</h4>
          <div class="notion-book-author">저자/강사: ${author}</div>
          <div class="notion-book-description">${description}</div>
        </div>`;
      });

  return (
    <div className="prose prose-lg prose-slate max-w-none notion-content">
      <style jsx>{`
        .notion-content {
          line-height: 1.8;
        }
        
        .notion-stat-card {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          margin: 1rem 0.5rem;
          min-width: 150px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .notion-stat-number {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .notion-stat-description {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        .notion-section-title {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 2rem 0 1rem 0;
          font-size: 1.8rem;
          font-weight: bold;
        }
        
        .notion-subsection-title {
          color: #4f46e5;
          margin: 1.5rem 0 1rem 0;
          font-size: 1.4rem;
          font-weight: bold;
        }
        
        .notion-experience-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .notion-company-name {
          color: #1e293b;
          font-size: 1.3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        
        .notion-experience-details {
          display: grid;
          gap: 0.5rem;
        }
        
        .notion-experience-item {
          color: #475569;
          line-height: 1.6;
        }
        
        .notion-book-card {
          background: #fef3c7;
          border: 1px solid #f59e0b;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem 0;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
        }
        
        .notion-book-title {
          color: #92400e;
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .notion-book-author {
          color: #a16207;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .notion-book-description {
          color: #78350f;
          line-height: 1.6;
        }
      `}</style>
      
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark as any}
                language={match[1]}
                PreTag="div"
                className="rounded-lg"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt }) {
            if (!src || typeof src !== 'string') {
              return null;
            }
            return (
              <Image
                src={src}
                alt={alt || ''}
                width={800}
                height={400}
                className="rounded-lg shadow-md max-w-full h-auto"
                loading="lazy"
              />
            );
          },
          a({ href, children }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-blue-500 hover:text-blue-600 underline underline-offset-4"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;

