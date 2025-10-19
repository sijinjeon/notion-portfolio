# Phase 9: Notion 통합 완성 가이드

## 📋 개요

이 단계는 **Notion에서 직접 설정**하는 단계입니다. 코드는 이미 모두 완성되어 있으므로, 이제 Notion 측 설정만 완료하면 전체 시스템이 작동합니다.

**예상 소요 시간**: 40분

---

## Step 1: Notion Integration 생성

### 1-1. Integration 페이지 접속
- https://www.notion.so/my-integrations 접속

### 1-2. New Integration 생성
1. **"+ New integration"** 클릭
2. 설정:
   - **Name**: `Portfolio Sync` (또는 원하는 이름)
   - **Associated workspace**: 본인 Workspace 선택
   - **Type**: Internal
3. **Submit** 클릭

### 1-3. API 키 복사
1. **Internal Integration Token** 복사
   ```
   secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
2. 프로젝트의 `.env.local` 파일을 열어 다음 줄 수정:
   ```bash
   NOTION_API_KEY=secret_여기에_복사한_토큰_붙여넣기
   ```

---

## Step 2: Notion 데이터베이스 생성

### 2-1. 데이터베이스 생성
1. Notion에서 새 페이지 생성
2. `/database` 입력
3. **Database - Full page** 선택
4. 데이터베이스 이름: `Portfolio Content`

### 2-2. 필수 속성 추가

데이터베이스 상단의 속성 영역에서 다음 속성들을 추가하세요:

#### 속성 추가 방법
- 우측 끝 **+** 버튼 클릭
- 속성 타입 선택
- 속성명 입력

#### 필수 속성 목록

| 순서 | 속성명 | 타입 | 설명 |
|------|--------|------|------|
| 1 | `Title` | Title | 자동 생성됨 (수정 불필요) |
| 2 | `PageType` | Select | **반드시 추가!** |
| 3 | `Slug` | Text | URL 경로 |
| 4 | `MetaDescription` | Text | SEO 설명 |
| 5 | `Published` | Checkbox | 게시 여부 |
| 6 | `Category` | Select | 카테고리 |
| 7 | `Thumbnail` | Files & media | 썸네일 이미지 |
| 8 | `PublishDate` | Date | 게시 날짜 |
| 9 | `Tags` | Multi-select | 태그 |

### 2-3. PageType 옵션 설정 (중요!)

`PageType` 속성을 클릭하여 다음 옵션들을 추가하세요:

1. `PageType` 속성 클릭
2. **Edit property** 클릭
3. 다음 옵션 추가:
   - `Home` (색상: Blue)
   - `Project` (색상: Green)
   - `Footer` (색상: Gray)
   - `About` (색상: Purple)

---

## Step 3: Integration 연결

1. 데이터베이스 페이지 우측 상단 **...** 클릭
2. **Add connections** 클릭
3. 앞서 생성한 "Portfolio Sync" Integration 선택
4. **Confirm** 클릭

---

## Step 4: 데이터베이스 ID 복사

1. 데이터베이스 페이지를 **전체 페이지**로 열기
2. 브라우저 주소창의 URL 확인:
   ```
   https://www.notion.so/workspace/[DATABASE_ID]?v=...
   ```
3. `DATABASE_ID` 부분 복사 (32자 영숫자, 하이픈 포함)
4. 프로젝트의 `.env.local` 파일 수정:
   ```bash
   NOTION_DATABASE_ID=여기에_복사한_ID_붙여넣기
   ```

---

## Step 5: 샘플 페이지 생성

### 5-1. Home 페이지

1. 데이터베이스에서 **New** 클릭
2. 속성 설정:
   - **Title**: `홈`
   - **PageType**: `Home` 선택
   - **Slug**: `home`
   - **Published**: ✅ 체크
   - **MetaDescription**: `개발자의 포트폴리오입니다`
3. 본문 작성 (선택):
   ```
   안녕하세요! 저는 풀스택 개발자입니다.
   
   사용자 중심의 웹 애플리케이션을 만드는 것을 좋아합니다.
   ```

### 5-2. Footer 페이지

1. **New** 클릭
2. 속성:
   - **Title**: `Footer`
   - **PageType**: `Footer` 선택
   - **Slug**: `footer`
   - **Published**: ✅ 체크
3. 본문:
   ```
   © 2025 홍길동. All rights reserved.
   
   [GitHub](https://github.com/username) | [LinkedIn](https://linkedin.com/in/username)
   ```

### 5-3. 샘플 프로젝트

1. **New** 클릭
2. 속성:
   - **Title**: `나의 첫 프로젝트`
   - **PageType**: `Project` 선택
   - **Slug**: `my-first-project`
   - **Category**: `Web Development` (새로 추가)
   - **Tags**: `React`, `TypeScript`, `Next.js` (새로 추가)
   - **PublishDate**: 오늘 날짜 선택
   - **Published**: ✅ 체크
   - **MetaDescription**: `Notion과 Next.js로 만든 포트폴리오 웹사이트`
   - **Thumbnail**: 이미지 업로드 (선택)

3. 본문 작성:
   ```markdown
   # 프로젝트 개요
   
   이 프로젝트는 Notion을 CMS로 활용하여 자동으로 포트폴리오 웹사이트를 생성하는 시스템입니다.
   
   ## 주요 기능
   
   - Notion 데이터 자동 동기화
   - 정적 사이트 생성 (SSG)
   - shadcn UI 디자인 시스템
   - 즉시 발행 버튼
   
   ## 기술 스택
   
   - Next.js 15
   - TypeScript
   - Tailwind CSS
   - shadcn UI
   - Notion API
   
   ## 코드 예시
   
   ```typescript
   export default function HomePage() {
     return <div>Hello World</div>;
   }
   ```
   ```

---

## Step 6: Notion 버튼 블록 추가 (즉시 발행용)

### 6-1. 데이터베이스 템플릿 편집

1. 데이터베이스 우측 상단 **↓** 클릭
2. **Edit database** → **Templates** 선택
3. 기존 템플릿 편집 또는 **+ New template** 생성

### 6-2. 버튼 블록 추가

템플릿 본문 상단에:

1. `/button` 입력
2. 버튼 설정:
   - **Button text**: `🚀 지금 바로 발행하기`
   - **Button style**: Primary
   - **Link**: 다음 형식으로 입력
     ```
     https://your-domain.vercel.app/api/webhook/notion?secret=your-secret-key
     ```

### 6-3. URL 구성 요소

**중요**: Vercel 배포 후 실제 도메인과 Secret으로 변경해야 합니다!

```
https://[Vercel 도메인]/api/webhook/notion?secret=[NOTION_WEBHOOK_SECRET]
```

**예시**:
```
https://notion-portfolio-abc123.vercel.app/api/webhook/notion?secret=a3f8d9c2e1b4f6a8
```

**구성 요소**:
- `Vercel 도메인`: Phase 8에서 Vercel 배포 후 확인
- `NOTION_WEBHOOK_SECRET`: `.env.local`에 설정한 값과 동일하게

### 6-4. Secret 생성 (아직 안 했다면)

터미널에서 실행:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

출력된 값을:
1. `.env.local`의 `NOTION_WEBHOOK_SECRET`에 설정
2. Notion 버튼 URL의 `secret=` 뒤에 붙이기
3. Vercel 환경 변수에도 동일하게 설정

---

## Step 7: 동기화 테스트

### 7-1. 로컬 동기화

터미널에서 다음 명령 실행:

```bash
# Notion 데이터 동기화
npm run sync
```

**성공 시 출력 예시**:
```
🔄 Starting full database sync...
📊 Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
📚 Found 3 published pages
  ✅ 홈 (Home)
  ✅ Footer (Footer)
  ✅ 나의 첫 프로젝트 (Project)

✅ Full sync completed
   Home: ✓
   Projects: 1
   Footer: ✓
   About: ✗
```

### 7-2. 데이터 파일 확인

```bash
# 생성된 파일 확인
ls -la data/pages/

# 출력 예시:
# home.json
# footer.json
# my-first-project.json

# 인덱스 파일 확인
cat data/index.json
```

### 7-3. 웹사이트 확인

```bash
# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속:
- ✅ 메인 페이지에 프로젝트 카드 표시되는지 확인
- ✅ 프로젝트 카드 클릭 → 상세 페이지 이동 확인
- ✅ Footer에 내용 표시되는지 확인

---

## ✅ Phase 9 완료 체크리스트

- [ ] Notion Integration 생성 완료
- [ ] Integration Token을 `.env.local`에 설정
- [ ] Notion 데이터베이스 생성
- [ ] 모든 필수 속성 추가 (9개)
- [ ] PageType 옵션 설정 (Home, Project, Footer, About)
- [ ] Integration 연결 완료
- [ ] 데이터베이스 ID를 `.env.local`에 설정
- [ ] Home 페이지 생성 (PageType: Home, Published: ✅)
- [ ] Footer 페이지 생성 (PageType: Footer, Published: ✅)
- [ ] 샘플 프로젝트 생성 (PageType: Project, Published: ✅)
- [ ] `npm run sync` 실행 성공
- [ ] `data/pages/` 디렉토리에 JSON 파일 생성 확인
- [ ] `npm run dev` 실행하여 웹사이트 확인

---

## 🐛 문제 해결

### 문제: `NOTION_API_KEY is not defined`

**해결**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 내용이 올바른지 확인:
   ```bash
   NOTION_API_KEY=secret_xxx...
   NOTION_DATABASE_ID=xxx...
   ```
3. 개발 서버 재시작

### 문제: `Found 0 published pages`

**해결**:
1. Notion 데이터베이스에 최소 1개 이상의 페이지가 있는지 확인
2. 해당 페이지의 `Published` 속성이 ✅ 체크되어 있는지 확인
3. Integration이 데이터베이스에 연결되어 있는지 확인

### 문제: 속성을 찾을 수 없음

**해결**:
1. 속성 이름 대소문자가 정확한지 확인:
   - ✅ `PageType` (대소문자 구분!)
   - ❌ `pageType` 또는 `pagetype`
2. 모든 필수 속성이 추가되었는지 확인

---

## 🚀 다음 단계: GitHub & Vercel 배포

Phase 9를 완료했다면, `docs/DEVELOPMENT_GUIDE.md`의 **Phase 7-8**을 참조하여:

1. GitHub 저장소 생성 및 푸시
2. GitHub Secrets 설정
3. Vercel 프로젝트 연결
4. 환경 변수 설정
5. 배포 완료!

---

**현재 위치**: Phase 9  
**다음 단계**: Notion 데이터베이스 설정 → 동기화 테스트 → GitHub/Vercel 배포

