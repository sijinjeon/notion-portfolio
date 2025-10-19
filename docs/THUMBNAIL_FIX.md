# 썸네일 이미지 URL 만료 문제 해결

## 문제 설명

### 증상
프로젝트 상세 페이지의 썸네일 이미지가 시간이 지나면 깨지는 문제가 발생했습니다.

### 원인
Notion API에서 반환하는 이미지 URL이 AWS S3의 **임시 서명 URL(Presigned URL)**이었습니다.

```
https://prod-files-secure.s3.us-west-2.amazonaws.com/...?X-Amz-Expires=3600
```

이 URL은 `X-Amz-Expires=3600` 파라미터로 **1시간 후 만료**되어 이미지가 깨지게 됩니다.

## 해결 방법

### 접근 방식
Notion에서 가져온 이미지를 **로컬 파일로 다운로드**하여 `public/images` 폴더에 저장하고, JSON 데이터에는 로컬 경로를 저장하도록 수정했습니다.

### 수정 내용

#### 1. 이미지 다운로드 함수 추가
```javascript
// scripts/sync-all-pages.js
// scripts/sync-single-page.js

async function downloadImage(imageUrl, slug) {
  if (!imageUrl) return null;
  
  // Notion S3 URL이 아니면 그대로 반환 (외부 URL)
  if (!imageUrl.includes('prod-files-secure.s3') && 
      !imageUrl.includes('s3.us-west-2.amazonaws.com')) {
    return imageUrl;
  }
  
  // 파일 확장자 추출 및 로컬 경로 생성
  const ext = path.extname(imageUrl.split('?')[0]) || '.png';
  const filename = `${slug}-thumbnail${ext}`;
  const filePath = path.join(process.cwd(), 'public', 'images', filename);
  
  // 캐시 확인 (이미 다운로드된 파일 재사용)
  try {
    await fs.access(filePath);
    console.log(`    ↻ Using cached thumbnail: ${filename}`);
    return `/images/${filename}`;
  } catch (err) {
    // 파일 없음, 다운로드 진행
  }
  
  // HTTPS 요청으로 이미지 다운로드 및 저장
  const fileStream = await new Promise((resolve, reject) => {
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      resolve(response);
    }).on('error', reject);
  });
  
  const writeStream = require('fs').createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    fileStream.pipe(writeStream);
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
  
  console.log(`    ⬇ Downloaded thumbnail: ${filename}`);
  return `/images/${filename}`;
}
```

#### 2. 페이지 변환 로직 수정
```javascript
async function convertPageToData(page) {
  // ... 기존 코드 ...
  
  // 썸네일 다운로드 (Notion S3 URL -> 로컬 파일)
  const thumbnailUrl = getPropertyValue(page, 'Thumbnail');
  const localThumbnail = await downloadImage(thumbnailUrl, slug);
  
  return {
    // ... 기존 필드 ...
    thumbnail: localThumbnail, // 로컬 경로 또는 외부 URL
  };
}
```

### 변경 전후 비교

**변경 전 (만료되는 URL)**:
```json
{
  "title": "커서 서울 밋업 2회 운영",
  "thumbnail": "https://prod-files-secure.s3.us-west-2.amazonaws.com/f462e2f8-2a8e-4bfb-a91b-33c438bd03a3/43ab712a-06be-4b7c-a7fd-d69785de2d6b/1._youtube_1280x720.png?X-Amz-Expires=3600&..."
}
```

**변경 후 (로컬 경로)**:
```json
{
  "title": "커서 서울 밋업 2회 운영",
  "thumbnail": "/images/cursor-seoul-meetup-2-thumbnail.png"
}
```

## 사용 방법

### 동기화 스크립트 실행
```bash
# 전체 페이지 동기화 (이미지 자동 다운로드)
npm run sync

# 단일 페이지 동기화
PAGE_ID=xxx npm run sync:single
```

### 출력 예시
```
🔄 Starting full database sync...
📚 Found 15 published pages
    ⬇ Downloaded thumbnail: notion-3rd-edition-2025-thumbnail.png
    ⬇ Downloaded thumbnail: cursor-seoul-meetup-2-thumbnail.png
    ↻ Using cached thumbnail: sireal-youtube-launch-thumbnail.png
  ✅ Notion 개정3판: 업무와 일상을 정리하는 새로운 방법 (Project)
  ✅ 커서 서울 밋업 2회 운영 (Project)
  ...
```

## 장점

### 1. URL 만료 문제 해결
- 이미지가 로컬에 저장되어 영구적으로 사용 가능
- 1시간 제한 없음

### 2. 성능 향상
- Next.js Image Optimization 활용 가능
- 빌드 시점에 이미지 최적화
- CDN 캐싱 효과

### 3. 캐싱 지원
- 이미 다운로드된 이미지는 재사용
- 불필요한 네트워크 요청 방지

### 4. 외부 URL 지원
- Notion S3 URL이 아닌 외부 URL은 그대로 유지
- 유연한 이미지 소스 관리

## 파일 구조

```
public/
  images/
    cursor-seoul-meetup-2-thumbnail.png       (802KB)
    notion-3rd-edition-2025-thumbnail.png     (579KB)
    collab-tools-consulting-book-thumbnail.png (801KB)
    ...
  data/
    pages/
      cursor-seoul-meetup-2.json
      notion-3rd-edition-2025.json
      ...
```

## 주의사항

### Git 관리
- `public/images/*.png` 파일들은 Git에 커밋되어야 합니다
- `.gitignore`에서 제외되지 않도록 확인

### 빌드 시점
- Vercel 배포 전에 `npm run sync` 실행 필요
- GitHub Actions에서 자동 동기화 권장

### 디스크 공간
- 썸네일 이미지들이 로컬에 저장됨
- 프로젝트당 평균 500KB ~ 1MB

## 향후 개선 사항

### 1. 자동 최적화
- 다운로드 시 이미지 리사이징
- WebP 형식 변환

### 2. 클라우드 스토리지
- Vercel Blob Storage 활용
- Cloudinary 연동

### 3. 증분 동기화
- 변경된 이미지만 재다운로드
- 해시 기반 중복 제거

---

**작성일**: 2025-01-19  
**작성자**: AI Assistant

