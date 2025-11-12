# 🚀 즉시 배포 가이드 / Quick Deployment Guide

## 🇰🇷 한국어

### 현재 상태
- ✅ 빌드 테스트 완료 (성공)
- 📝 변경사항: 70개 파일
- 📦 Git 저장소: 설정됨

### 배포 방법

#### 방법 1: 원격 서버에 SSH로 배포 (추천)

```bash
# 1. 로컬에서 변경사항 커밋 및 푸시
git add .
git commit -m "Deploy: 로컬 테스트 환경 설정 및 배포 준비"
git push origin main

# 2. 서버에 SSH 접속
ssh jaeminkoo@34.26.14.36

# 3. 서버에서 업데이트 스크립트 실행
cd /var/www/neighborlyone.com
./update-production.sh
```

#### 방법 2: 로컬에서 원격 배포 스크립트 실행

```bash
# 서버에 직접 배포 스크립트 실행
ssh jaeminkoo@34.26.14.36 "cd /var/www/neighborlyone.com && ./update-production.sh"
```

### 배포 전 확인사항

- [ ] 변경사항 커밋 완료
- [ ] GitHub에 푸시 완료
- [ ] 빌드 테스트 성공 (완료 ✅)
- [ ] 서버 `.env` 파일에 DATABASE_URL 설정 확인

---

## 🇺🇸 English

### Current Status
- ✅ Build test completed (success)
- 📝 Changes: 70 files
- 📦 Git repository: configured

### Deployment Methods

#### Method 1: Deploy via SSH (Recommended)

```bash
# 1. Commit and push changes from local
git add .
git commit -m "Deploy: Local test environment setup and deployment preparation"
git push origin main

# 2. SSH to server
ssh jaeminkoo@34.26.14.36

# 3. Run update script on server
cd /var/www/neighborlyone.com
./update-production.sh
```

#### Method 2: Run deployment script remotely from local

```bash
# Execute deployment script directly on server
ssh jaeminkoo@34.26.14.36 "cd /var/www/neighborlyone.com && ./update-production.sh"
```

### Pre-deployment Checklist

- [ ] Changes committed
- [ ] Pushed to GitHub
- [ ] Build test successful (Done ✅)
- [ ] Server `.env` file has DATABASE_URL configured

