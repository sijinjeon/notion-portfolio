# 📊 통계 카드 개선 프로젝트 문서

## 🎯 프로젝트 개요

### 문제점
- 홈 화면과 프로젝트 페이지에서 동일한 3개 통계 카드 사용
- Total Projects, Recent Projects, Categories가 중복으로 표시
- 각 페이지의 목적에 맞지 않는 정보 제공

### 해결방안
- 각 페이지의 목적에 맞는 차별화된 통계 카드 구성
- 홈 화면: 개인 브랜딩 중심 정보
- 프로젝트 페이지: 프로젝트 탐색 중심 정보
- 모든 홈 화면 정보를 노션 Profile에서 중앙 관리

---

## 🏠 홈 화면 통계 카드 (개인 브랜딩 중심)

### 목적
방문자에게 "이 사람의 전문성, 전문 분야, 현재 상태"를 빠르게 전달

### 최종 구성

#### 1. ⏰ Years of Experience
- **값**: 5+ years
- **목적**: 경력과 전문성 수준 어필
- **데이터 소스**: 노션 Profile 페이지
- **아이콘**: `Briefcase`
- **설명**: "Years in business process optimization"

#### 2. 🎯 Specialization
- **값**: No-Code, Automation
- **목적**: 핵심 전문 분야와 차별화 포인트 강조
- **데이터 소스**: 노션 Profile 페이지
- **아이콘**: `Lightbulb`
- **설명**: "Core expertise areas"

#### 3. 🟢 Current Status
- **값**: Available for projects
- **목적**: 현재 상태와 즉시 협업 가능성 강조
- **데이터 소스**: 노션 Profile 페이지
- **아이콘**: `UserCheck` 또는 `Clock`
- **설명**: "Ready for new challenges"

---

## 📁 프로젝트 페이지 통계 카드 (탐색 중심)

### 목적
프로젝트 탐색과 분석에 특화된 정보 제공

### 최종 구성

#### 1. 📊 Total Projects
- **값**: 12개 (동적 계산)
- **목적**: 전체 프로젝트 규모 파악
- **데이터 소스**: 노션 DB 동적 계산
- **아이콘**: `FileText`
- **설명**: "All completed projects"
- **변경사항**: 기존 유지

#### 2. 📈 Recent Projects ⭐ 변경사항
- **값**: 올해 12개 (동적 계산)
- **목적**: 올해의 활동량과 최신성 강조
- **데이터 소스**: 올해(2025년) 프로젝트 수 계산
- **아이콘**: `TrendingUp`
- **설명**: "Projects completed this year"
- **변경사항**: "최근 30일" → **"올해"**

#### 3. 🏷️ Categories
- **값**: 6개 (동적 계산)
- **목적**: 탐색 가능한 카테고리 수 안내
- **데이터 소스**: `Array.from(new Set(projects.map(p => p.category)))`
- **아이콘**: `Users`
- **설명**: "Different project types"
- **변경사항**: 기존 유지

---

## 📝 노션 Profile 페이지 구조

### 현재 구조
```
📧 milk@sireal.co

[**LinkedIn**](https://www.linkedin.com/in/sijinjeon/) **|** [**GitHub**](https://github.com/sijinjeon) **|** [**Threads**](https://www.threads.com/@sireal_co)

Seoul, South Korea
```

### 추가된 구조
```
📧 milk@sireal.co

[**LinkedIn**](https://www.linkedin.com/in/sijinjeon/) **|** [**GitHub**](https://github.com/sijinjeon) **|** [**Threads**](https://www.threads.com/@sireal_co)

Seoul, South Korea

---

## 🏠 홈 화면 통계 카드 정보

### ⏰ Years of Experience
**5+ years**

### 🎯 Specialization  
**No-Code, Automation**

### 🟢 Current Status
**Available for projects**
```

---

## 🔄 데이터 소스 및 동기화

### 홈 화면
- **Years of Experience**: 노션 Profile 페이지에서 파싱
- **Specialization**: 노션 Profile 페이지에서 파싱
- **Current Status**: 노션 Profile 페이지에서 파싱

### 프로젝트 페이지
- **Total Projects**: 노션 DB 동적 계산
- **Recent Projects**: 올해(2025년) 기준 필터링
- **Categories**: 노션 DB 동적 계산

---

## 🛠️ 구현 요구사항

### 노션 Profile 파싱 로직
1. **구분선 찾기**: `---` 이후의 내용 파싱
2. **섹션 제목 확인**: `## 🏠 홈 화면 통계 카드 정보`
3. **각 필드 파싱**:
   - `### ⏰ Years of Experience` → `**5+ years**` 추출
   - `### 🎯 Specialization` → `**No-Code, Automation**` 추출
   - `### 🟢 Current Status` → `**Available for projects**` 추출

### 폴백 처리
- 노션 데이터 로드 실패 시 기본값 표시
- 필드가 없을 경우 기본값 사용
- 파싱 오류 시 기존 하드코딩 값 사용

### 프로젝트 페이지 수정
- Recent Projects 계산 로직을 30일 → 올해(2025년) 기준으로 변경
- `new Date().getFullYear()` 기준으로 필터링

---

## 🎨 디자인 일관성

### 공통 사항
- **레이아웃**: 두 페이지 모두 3개 카드 유지
- **아이콘**: 각 정보의 특성에 맞는 Lucide 아이콘 사용
- **색상**: 기존 slate 색상 팔레트 유지
- **반응형**: 모바일에서도 적절한 크기로 표시
- **타이포그래피**: 기존 텍스트 크기와 스타일 유지

### 카드 구조
- **CardHeader**: 아이콘 + 제목
- **CardContent**: 큰 숫자 + 설명 텍스트
- **간격**: `gap-4` (기존 `gap-6`에서 축소)
- **아이콘 크기**: `h-3 w-3` (기존 `h-4 w-4`에서 축소)

---

## 📈 예상 효과

### 홈 화면
- ✅ **개인 브랜딩 강화**: 전문성, 전문분야, 현재 상태 명확화
- ✅ **차별화**: 프로젝트 페이지와 완전히 다른 정보 제공
- ✅ **중앙 관리**: 모든 정보를 노션에서 실시간 관리
- ✅ **유연성**: 필요시 즉시 정보 업데이트 가능

### 프로젝트 페이지
- ✅ **의미있는 통계**: 올해 프로젝트 수로 더 의미있는 정보 제공
- ✅ **탐색 중심**: 프로젝트 탐색에 특화된 정보 유지
- ✅ **일관성**: 기존 구조 유지하면서 개선

---

## 🚀 구현 우선순위

### Phase 1: 노션 연동
1. **노션 Profile 페이지 업데이트**: 새로운 필드들 추가 ✅ (완료)
2. **홈 화면 파싱 로직**: 노션 Profile에서 통계 카드 정보 추출
3. **폴백 처리**: 오류 상황 대응 로직 구현

### Phase 2: 프로젝트 페이지 수정
4. **프로젝트 페이지 Recent Projects**: 올해 기준 계산 로직 수정
5. **동기화 테스트**: 노션 업데이트 시 웹사이트 반영 확인

### Phase 3: 최적화
6. **성능 최적화**: 불필요한 API 호출 최소화
7. **에러 핸들링**: 다양한 오류 상황 대응
8. **사용자 테스트**: 실제 사용자 피드백 수집

---

## 📋 체크리스트

### 노션 설정
- [x] Profile 페이지에 통계 카드 정보 섹션 추가
- [x] Years of Experience 필드 추가
- [x] Specialization 필드 추가
- [x] Current Status 필드 추가

### 개발 작업
- [ ] 홈 화면 통계 카드 UI 수정
- [ ] 노션 Profile 파싱 로직 구현
- [ ] 프로젝트 페이지 Recent Projects 로직 수정
- [ ] 폴백 처리 로직 구현
- [ ] 동기화 테스트

### 테스트
- [ ] 노션 업데이트 시 웹사이트 반영 확인
- [ ] 다양한 오류 상황 테스트
- [ ] 모바일 반응형 테스트
- [ ] 성능 테스트

---

## 📞 연락처 및 지원

- **프로젝트 담당자**: 전시진
- **이메일**: milk@sireal.co
- **노션**: Profile 페이지에서 실시간 관리
- **업데이트**: 노션 Profile 수정 시 자동 동기화

---

*이 문서는 2025년 10월 19일 기준으로 작성되었으며, 프로젝트 진행에 따라 업데이트됩니다.*
