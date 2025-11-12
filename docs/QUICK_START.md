# 🚀 빠른 시작 가이드 / Quick Start Guide

## 🇰🇷 한국어

### 1분 안에 시작하기

```bash
# 1. 프로젝트 디렉토리로 이동
cd /Users/jaeminkoo/Project2025/NeiborlyOne/apps/web

# 2. 환경 테스트 (선택사항)
./test-local.sh

# 3. 개발 서버 시작
npm run dev
```

브라우저에서 **http://localhost:4000** 접속!

---

### 처음 설정하는 경우

```bash
# 자동 설정 스크립트 실행
./setup-local.sh

# .env 파일에 DATABASE_URL 설정 (필요시)
# nano .env

# 개발 서버 시작
npm run dev
```

---

## 🇺🇸 English

### Start in 1 Minute

```bash
# 1. Navigate to project directory
cd /Users/jaeminkoo/Project2025/NeiborlyOne/apps/web

# 2. Test environment (optional)
./test-local.sh

# 3. Start development server
npm run dev
```

Open **http://localhost:4000** in your browser!

---

### First Time Setup

```bash
# Run automatic setup script
./setup-local.sh

# Configure DATABASE_URL in .env file (if needed)
# nano .env

# Start development server
npm run dev
```

---

## 📝 유용한 명령어 / Useful Commands

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npm run typecheck

# 환경 테스트
./test-local.sh

# 로컬 환경 설정
./setup-local.sh
```

---

## 🐛 문제 해결 / Troubleshooting

### 포트 4000이 사용 중인 경우

```bash
# 포트를 사용하는 프로세스 확인
lsof -ti:4000

# 프로세스 종료 (필요시)
kill $(lsof -ti:4000)

# 또는 다른 포트 사용
PORT=4001 npm run dev
```

### 의존성 설치 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 데이터베이스 연결 오류

`.env` 파일의 `DATABASE_URL`을 확인하세요:
- Supabase Dashboard → Settings → Database → Connection string (URI)

---

## 📚 더 자세한 정보

- **로컬 개발 가이드**: `README.local.md`
- **배포 가이드**: `README.deployment.md`


