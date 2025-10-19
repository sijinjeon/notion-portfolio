# 🚀 빠른 시작 가이드

## ✅ 현재 상태

**모든 코드 구현 완료!** Phase 1-8까지의 모든 개발 작업이 끝났습니다.

---

## 📋 다음 3단계만 하면 완성!

### 1️⃣ Notion 설정 (10분)

#### A. Integration 생성
1. https://www.notion.so/my-integrations 접속
2. **+ New integration** 클릭
3. Name: `Portfolio Sync`, Type: Internal
4. **Internal Integration Token** 복사

#### B. 데이터베이스 생성
1. Notion에서 `/database` → Full page
2. 이름: `Portfolio Content`
3. 필수 속성 추가 (9개):
   - Title (자동)
   - **PageType** (Select): "Home", "Project", "Footer", "About"
   - Slug (Text)
   - MetaDescription (Text)
   - Published (Checkbox)
   - Category (Select)
   - Thumbnail (Files)
   - PublishDate (Date)
   - Tags (Multi-select)

#### C. 연결 및 ID 복사
1. 데이터베이스에 Integration 연결
2. URL에서 데이터베이스 ID 복사

#### D. 환경 변수 설정
`.env.local` 파일 수정:
```bash
NOTION_API_KEY=복사한_Integration_Token
NOTION_DATABASE_ID=복사한_데이터베이스_ID
NOTION_WEBHOOK_SECRET=아래_명령어로_생성
```

**Secret 생성**:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2️⃣ 테스트 페이지 생성 (5분)

Notion 데이터베이스에서:

**Home 페이지**:
- Title: `홈`, PageType: `Home`, Slug: `home`, Published: ✅

**Footer 페이지**:
- Title: `Footer`, PageType: `Footer`, Slug: `footer`, Published: ✅

**샘플 프로젝트**:
- Title: `나의 첫 프로젝트`
- PageType: `Project`
- Slug: `my-first-project`
- Category: `Web Development`
- Published: ✅
- PublishDate: 오늘 날짜

### 3️⃣ 동기화 테스트 (2분)

```bash
# Notion 데이터 동기화
npm run sync

# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3000
```

---

## 🎯 성공 확인

✅ 터미널에 다음과 같이 출력되면 성공:
```
✅ Full sync completed
   Home: ✓
   Projects: 1
   Footer: ✓
```

✅ 웹사이트에서 확인:
- 메인 페이지에 프로젝트 카드 보임
- 프로젝트 클릭 → 상세 페이지 이동
- Footer 표시됨

---

## 🚀 배포 (선택)

### GitHub 푸시
```bash
git add .
git commit -m "feat: complete notion portfolio"
git push origin main
```

### Vercel 배포
1. https://vercel.com → Import Project
2. GitHub 저장소 선택
3. 환경 변수 설정 (6개 필요)
4. Deploy!

### Notion 버튼 설정
배포 후 Notion 템플릿에 버튼 추가:
```
https://[Vercel도메인]/api/webhook/notion?secret=[Secret]
```

**자세한 내용**: `NOTION_BUTTON_URL.md` 참조

---

## 📚 문서 가이드

| 문서 | 용도 |
|------|------|
| **QUICK_START.md** (현재 문서) | 가장 빠른 시작 |
| **SETUP_GUIDE.md** | 상세 설정 가이드 |
| **PHASE_9_NOTION_SETUP.md** | Notion 설정 집중 가이드 |
| **NOTION_BUTTON_URL.md** | 버튼 URL 설정 방법 |
| **docs/DEVELOPMENT_GUIDE.md** | 전체 개발 가이드 (3,600줄) |

---

## ⚡ 요약

```
1. Notion 설정 (10분)
   → Integration + 데이터베이스 + 환경 변수

2. 테스트 페이지 생성 (5분)
   → Home + Footer + 샘플 프로젝트

3. 동기화 테스트 (2분)
   → npm run sync + npm run dev

✨ 완성!
```

**총 소요 시간**: 약 17분 ⏱️

---

**다음**: `SETUP_GUIDE.md` 또는 `PHASE_9_NOTION_SETUP.md`를 열어서 따라하세요! 📖

