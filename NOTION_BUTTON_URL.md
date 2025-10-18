# Notion 버튼 URL 설정 가이드

## 📌 빠른 참조

### Notion 버튼 URL 형식

```
https://[Vercel_도메인]/api/webhook/notion?secret=[Secret_키]
```

---

## 🔑 1. Secret 키 생성

### 방법 1: 터미널에서 생성 (권장)

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

**출력 예시**:
```
a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
```

### 방법 2: 간단한 문자열

```bash
# 개발/테스트용으로 간단하게
NOTION_WEBHOOK_SECRET=my-portfolio-secret-2025
```

---

## 🌐 2. Vercel 도메인 확인

### Vercel 배포 후 도메인 복사

1. https://vercel.com → Project 선택
2. **Deployments** 탭 → 최신 배포 클릭
3. **Domains** 섹션에서 도메인 복사

**도메인 예시**:
```
notion-portfolio-abc123.vercel.app
```

---

## 🔗 3. 최종 URL 조합

### 형식

```
https://[복사한_도메인]/api/webhook/notion?secret=[생성한_Secret]
```

### 실제 예시

```
https://notion-portfolio-abc123.vercel.app/api/webhook/notion?secret=a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
```

---

## 📝 4. Notion에 설정

### 4-1. 데이터베이스 템플릿 편집

1. Notion 데이터베이스 우측 상단 **↓** 클릭
2. **Edit database** → **Templates**
3. 기존 템플릿 편집 또는 새 템플릿 생성

### 4-2. 버튼 블록 추가

1. 템플릿 본문 상단에 `/button` 입력
2. 버튼 설정:
   ```
   Button text: 🚀 지금 바로 발행하기
   Button style: Primary
   Link: 위에서 조합한 전체 URL 붙여넣기
   ```

### 4-3. 예시 스크린샷

```
┌─────────────────────────────────────────┐
│ Button Block Settings                   │
├─────────────────────────────────────────┤
│ Text: 🚀 지금 바로 발행하기             │
│ Style: ● Primary  ○ Secondary           │
│ Link: https://notion-portfolio-abc...   │
│       ...notion?secret=a3f8d9c2e1b4... │
└─────────────────────────────────────────┘
```

---

## ✅ 5. 환경 변수 설정 확인

같은 Secret을 **세 곳**에 설정해야 합니다:

### 로컬 개발 (.env.local)
```bash
NOTION_WEBHOOK_SECRET=a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
```

### Vercel 환경 변수
```
Name: NOTION_WEBHOOK_SECRET
Value: a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
Environment: Production
```

### Notion 버튼 URL
```
?secret=a3f8d9c2e1b4f6a8d9c2e1b4f6a8d9c2
```

⚠️ **중요**: 세 곳 모두 **정확히 동일한 값**이어야 합니다!

---

## 🧪 6. 테스트

### 버튼 클릭 후 확인 사항

1. **즉시 (1초 이내)**:
   - Notion 버튼 클릭 → 새 탭이 열림
   - JSON 응답 확인:
     ```json
     {
       "success": true,
       "message": "Deployment triggered",
       "page_id": "xxx-xxx-xxx"
     }
     ```

2. **GitHub Actions (10초 이내)**:
   - GitHub → Actions 탭 접속
   - "On-Demand Notion Sync" 워크플로우 실행 중 확인
   
3. **웹사이트 업데이트 (1-2분 이내)**:
   - Vercel → Deployments 탭에서 새 배포 확인
   - 웹사이트 새로고침하여 내용 반영 확인

---

## 🐛 문제 해결

### 문제: 401 Unauthorized

```json
{ "error": "Unauthorized - Invalid secret" }
```

**해결**:
1. `.env.local`의 `NOTION_WEBHOOK_SECRET` 확인
2. Vercel 환경 변수의 `NOTION_WEBHOOK_SECRET` 확인
3. Notion 버튼 URL의 `?secret=` 파라미터 확인
4. **세 값이 모두 동일한지** 확인
5. Vercel 재배포: Dashboard → Deployments → ⋯ → Redeploy

### 문제: 400 Bad Request

```json
{ "error": "Missing page_id" }
```

**해결**:
- Notion 버튼이 올바른 페이지에서 클릭되었는지 확인
- 버튼이 데이터베이스 템플릿에 있는지 확인 (개별 페이지에 있어야 page_id 전달)

### 문제: 500 Internal Server Error

**해결**:
1. Vercel Functions → Logs 확인
2. GitHub 환경 변수 확인:
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_TOKEN`
3. GitHub Token 권한 확인 (`repo` + `workflow`)

---

## 📋 체크리스트

버튼 설정 전:
- [ ] Secret 생성 완료
- [ ] `.env.local`에 Secret 설정
- [ ] Vercel에 배포 완료
- [ ] Vercel 도메인 확인
- [ ] Vercel 환경 변수에 Secret 설정

Notion 버튼 설정:
- [ ] 데이터베이스 템플릿 편집
- [ ] 버튼 블록 추가
- [ ] URL에 Vercel 도메인 포함
- [ ] URL에 `?secret=` 파라미터 포함
- [ ] 템플릿 저장

테스트:
- [ ] 버튼 클릭 → 성공 JSON 응답 확인
- [ ] GitHub Actions 실행 확인
- [ ] 1-2분 후 웹사이트 업데이트 확인

---

## 📞 도움이 필요하신가요?

- **전체 가이드**: `docs/DEVELOPMENT_GUIDE.md` Phase 8-9
- **상세 설정**: `PHASE_9_NOTION_SETUP.md`
- **트러블슈팅**: `docs/DEVELOPMENT_GUIDE.md` 부록 D

---

**핵심**: Notion 버튼 URL은 `https://도메인/api/webhook/notion?secret=키` 형식입니다! 🎯

