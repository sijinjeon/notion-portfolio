# 프로젝트 설정 완료 안내

## ✅ 완료된 작업

### Phase 1-8: 코드 구현 완료
모든 필수 코드와 설정 파일이 생성되었습니다.

- ✅ Next.js 프로젝트 설정
- ✅ TypeScript 타입 정의
- ✅ shadcn UI 컴포넌트
- ✅ Notion API 연동 로직
- ✅ 페이지 컴포넌트 (Home, Project, About)
- ✅ 동기화 스크립트
- ✅ GitHub Actions 워크플로우
- ✅ Webhook API

## 📋 다음 단계: Phase 9 - Notion 설정

이제 **Notion에서 직접 설정**해야 하는 단계입니다.

### 1. Notion Integration Token 발급

1. https://www.notion.so/my-integrations 접속
2. **"+ New integration"** 클릭
3. 설정:
   - Name: "Portfolio Sync"
   - Associated workspace: 본인 Workspace 선택
   - Type: Internal
4. **Submit** 클릭
5. **Internal Integration Token** 복사
6. `.env.local` 파일의 `NOTION_API_KEY`에 붙여넣기

### 2. Notion 데이터베이스 생성

1. Notion에서 새 페이지 생성
2. `/database` 입력 → **Database - Full page** 선택
3. 데이터베이스 이름: "Portfolio Content"

### 3. 필수 속성 추가

다음 속성(Property)을 추가하세요:

| 속성명 | 타입 | 옵션 |
|--------|------|------|
| Title | Title | (자동 생성됨) |
| PageType | Select | "Home", "Project", "Footer", "About" |
| Slug | Text | - |
| MetaDescription | Text | - |
| Published | Checkbox | - |
| Category | Select | "Web Development", "Design" 등 |
| Thumbnail | Files & media | - |
| PublishDate | Date | - |
| Tags | Multi-select | "React", "TypeScript" 등 |

### 4. Integration 연결

1. 데이터베이스 페이지 우측 상단 **...** 클릭
2. **Add connections** 클릭
3. "Portfolio Sync" Integration 선택

### 5. 데이터베이스 ID 복사

1. 데이터베이스 페이지를 전체 페이지로 열기
2. URL에서 DATABASE_ID 복사:
   ```
   https://www.notion.so/workspace/[DATABASE_ID]?v=...
   ```
3. `.env.local` 파일의 `NOTION_DATABASE_ID`에 붙여넣기

### 6. 테스트 페이지 생성

#### Home 페이지
- Title: "홈"
- PageType: "Home"
- Slug: "home"
- Published: ✅
- MetaDescription: "개발자의 포트폴리오입니다"

#### Footer 페이지
- Title: "Footer"
- PageType: "Footer"
- Slug: "footer"
- Published: ✅

#### 샘플 프로젝트
- Title: "나의 첫 프로젝트"
- PageType: "Project"
- Slug: "my-first-project"
- Category: "Web Development"
- Tags: "React", "TypeScript"
- PublishDate: 오늘 날짜
- Published: ✅
- MetaDescription: "포트폴리오 웹사이트 구축 프로젝트"

### 7. Webhook Secret 생성

터미널에서 실행하여 랜덤 Secret 생성:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

출력된 값을 복사하여:
1. `.env.local` 파일의 `NOTION_WEBHOOK_SECRET`에 붙여넣기
2. 나중에 Notion 버튼 URL과 Vercel 환경 변수에도 사용

### 8. 동기화 테스트

```bash
# 전체 동기화 실행
npm run sync

# 결과 확인
ls -la data/pages/
cat data/index.json

# 개발 서버 실행
npm run dev
# http://localhost:3000 접속하여 확인
```

## 🚀 GitHub 및 Vercel 배포

### GitHub 저장소 생성

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "feat: initial project setup"

# GitHub에 새 저장소 생성 후
git remote add origin https://github.com/[your-username]/notion-portfolio.git
git branch -M main
git push -u origin main
```

### GitHub Secrets 설정

Settings > Secrets and variables > Actions에서 추가:
- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`

### Vercel 배포

1. https://vercel.com 접속
2. GitHub 저장소 연결
3. Environment Variables 설정:
   - `NOTION_API_KEY`: Notion Integration Token
   - `NOTION_DATABASE_ID`: Notion 데이터베이스 ID
   - `GITHUB_OWNER`: GitHub 사용자명
   - `GITHUB_REPO`: `notion-portfolio`
   - `GITHUB_TOKEN`: GitHub Personal Access Token (`repo` + `workflow` 권한)
   - `NOTION_WEBHOOK_SECRET`: 앞서 생성한 랜덤 문자열
4. Deploy 클릭
5. 배포 완료 후 **도메인 확인** (예: `notion-portfolio-abc123.vercel.app`)

### Notion 버튼 URL 업데이트

배포 후 Notion 데이터베이스 템플릿으로 돌아가서:

1. 버튼 블록의 **Link** 수정:
   ```
   https://[실제_Vercel_도메인]/api/webhook/notion?secret=[실제_Secret]
   ```
   
2. **실제 예시**:
   ```
   https://notion-portfolio-abc123.vercel.app/api/webhook/notion?secret=a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
   ```

3. 템플릿 저장

### 즉시 발행 테스트

1. Notion에서 프로젝트 페이지 열기
2. **"🚀 지금 바로 발행하기"** 버튼 클릭
3. GitHub → Actions 탭에서 워크플로우 실행 확인
4. 1-2분 대기
5. 웹사이트 새로고침하여 반영 확인

## 📚 자세한 가이드

전체 단계별 가이드는 `docs/DEVELOPMENT_GUIDE.md`를 참조하세요.

## 🐛 문제 해결

문제가 발생하면 `docs/DEVELOPMENT_GUIDE.md`의 "부록 D: 통합 트러블슈팅" 섹션을 확인하세요.

---

**현재 상태**: Phase 1-8 완료 ✅  
**다음 단계**: Phase 9 - Notion 설정 (사용자 작업 필요)

