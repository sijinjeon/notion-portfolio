# Notion 웹훅 문제 해결 가이드

## 🔍 문제 분석

### Notion 버튼의 한계
1. **Notion 버튼은 실제 웹훅이 아님**: Notion 버튼은 단순히 URL을 여는 기능만 제공합니다 (GET 요청).
2. **page_id를 자동으로 전달하지 않음**: 버튼에서는 현재 페이지의 ID를 자동으로 포함하지 않습니다.
3. **POST 요청 불가**: 버튼은 GET 요청만 보냅니다.

## ✅ 해결 방법

### 방법 1: 전체 동기화 트리거 (권장)

가장 간단하고 안정적인 방법입니다.

#### Notion 버튼 URL 설정
```
https://notion-portfolio-pi.vercel.app/api/trigger-sync?secret=d32af2296c0dbe7117b5aa2439c6803b
```

#### 작동 방식
1. Notion 버튼 클릭
2. GET 요청이 `/api/trigger-sync`로 전송됨
3. Secret 검증 후 GitHub Actions의 **scheduled-sync 워크플로우** 트리거
4. 전체 데이터베이스 동기화 실행
5. 약 1-2분 후 웹사이트 업데이트 완료

#### 장점
- ✅ 구현이 간단함
- ✅ 모든 변경사항 반영 보장
- ✅ 추가 설정 불필요

#### 단점
- 전체 DB를 동기화하므로 단일 페이지 업데이트보다 시간이 약간 더 걸림

---

### 방법 2: 페이지별 개별 트리거 (고급)

특정 페이지만 업데이트하려면 page_id를 URL에 포함해야 합니다.

#### Notion 버튼 URL 설정
각 페이지마다 **고유한 page_id**를 수동으로 URL에 추가해야 합니다:

```
https://notion-portfolio-pi.vercel.app/api/webhook/notion?page_id=YOUR_PAGE_ID_HERE&secret=d32af2296c0dbe7117b5aa2439c6803b
```

#### Page ID 찾는 방법
1. Notion 페이지를 전체 페이지로 열기
2. 브라우저 URL 확인:
   ```
   https://www.notion.so/workspace/PAGE_ID?v=...
   ```
3. 32자 영숫자 부분이 page_id입니다
4. 하이픈(-)을 제거하거나 그대로 사용

#### 예시
```
https://notion-portfolio-pi.vercel.app/api/webhook/notion?page_id=290925235e34805987c0c526a49bad45&secret=d32af2296c0dbe7117b5aa2439c6803b
```

#### 장점
- ✅ 특정 페이지만 빠르게 업데이트
- ✅ API 호출 최소화

#### 단점
- ❌ 각 페이지마다 URL을 수동으로 설정해야 함
- ❌ 페이지 ID를 찾아야 하는 번거로움

---

### 방법 3: 자동 동기화에만 의존 (가장 간단)

버튼 없이 10분마다 자동 동기화되는 것에만 의존하는 방법입니다.

#### 설정
- 특별한 설정 불필요
- GitHub Actions의 `scheduled-sync.yml`이 10분마다 자동 실행

#### 장점
- ✅ 가장 간단함
- ✅ 자동화되어 신경 쓸 필요 없음

#### 단점
- ❌ 최대 10분 대기 필요

---

## 🚀 권장 설정

### 1단계: Notion 데이터베이스 템플릿 설정

1. Notion 데이터베이스 열기
2. 우측 상단 **↓** → **Templates** → **New template** 또는 기존 템플릿 편집
3. 템플릿 본문 상단에 `/button` 입력
4. 버튼 설정:
   - **Button text**: 🚀 지금 바로 동기화하기
   - **Link**: 
     ```
     https://notion-portfolio-pi.vercel.app/api/trigger-sync?secret=d32af2296c0dbe7117b5aa2439c6803b
     ```
   - **Style**: Primary

### 2단계: Vercel 환경 변수 확인

Vercel Dashboard에서 다음 환경 변수가 설정되어 있는지 확인:

- ✅ `NOTION_WEBHOOK_SECRET`: `d32af2296c0dbe7117b5aa2439c6803b`
- ✅ `GITHUB_OWNER`: GitHub 사용자명
- ✅ `GITHUB_REPO`: `notion-portfolio`
- ✅ `GITHUB_TOKEN`: GitHub Personal Access Token (workflow 권한 필요)

### 3단계: GitHub Actions 권한 확인

1. GitHub 저장소 → **Settings** → **Actions** → **General**
2. **Workflow permissions**:
   - ✅ "Read and write permissions" 선택
   - ✅ "Allow GitHub Actions to create and approve pull requests" 체크

### 4단계: 테스트

1. Notion 페이지에서 "🚀 지금 바로 동기화하기" 버튼 클릭
2. 브라우저에 JSON 응답이 표시됨:
   ```json
   {
     "success": true,
     "message": "Full sync triggered successfully",
     "timestamp": "2025-10-18T...",
     "info": "The site will be updated in about 1-2 minutes"
   }
   ```
3. GitHub Actions 탭에서 워크플로우 실행 확인
4. 1-2분 후 웹사이트 새로고침

---

## 🐛 트러블슈팅

### 문제: "Unauthorized - Invalid secret"

**원인**: Secret이 일치하지 않음

**해결**:
1. Vercel 환경 변수 확인
2. 버튼 URL의 secret 파라미터 확인
3. 일치하는지 확인

### 문제: "GitHub configuration missing"

**원인**: GitHub 환경 변수가 설정되지 않음

**해결**:
Vercel에서 다음 환경 변수 추가:
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_TOKEN`

### 문제: "Resource not accessible by integration"

**원인**: GitHub Personal Access Token 권한 부족

**해결**:
1. GitHub → Settings → Developer settings → Personal access tokens
2. 새 토큰 생성:
   - ✅ `repo` 권한
   - ✅ `workflow` 권한
3. Vercel 환경 변수 업데이트

### 문제: 버튼 클릭 후 에러 페이지

**원인**: GET 핸들러가 없거나 오류 발생

**해결**:
1. Vercel Function 로그 확인:
   - Vercel Dashboard → Project → Functions → Logs
2. 에러 메시지 확인
3. 필요한 환경 변수 추가

---

## 📖 추가 정보

### Notion Automation 사용 (미래 옵션)

Notion이 공식 Automation 기능을 출시하면, 더 강력한 웹훅 통합이 가능할 것입니다.
현재는 Notion API의 제한사항으로 인해 버튼 방식의 한계가 있습니다.

### 대안: Zapier/Make.com 사용

더 복잡한 워크플로우가 필요하다면:
1. Zapier 또는 Make.com에서 Notion 트리거 설정
2. Webhook으로 POST 요청 전송
3. `/api/webhook/notion` POST 엔드포인트 사용

---

**최종 권장 사항**: 
**방법 1 (전체 동기화 트리거)**을 사용하는 것이 가장 간단하고 안정적입니다! 🎯

