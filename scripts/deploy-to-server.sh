#!/bin/bash

# Neighborly One - Server Deployment Script
# 서버로 새 파일들을 배포하는 스크립트

set -e  # Exit on error

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 서버 정보
SERVER_USER="jaeminkoo"
SERVER_IP="34.26.14.36"
SERVER_PATH="/var/www/neighborlyone.com"
LOCAL_PATH="/Users/jaeminkoo/neione/web"

echo -e "${GREEN}🚀 Neighborly One - 서버 배포 시작${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. 서버 연결 테스트
echo -e "${YELLOW}1️⃣ 서버 연결 테스트...${NC}"
if ssh -o ConnectTimeout=10 ${SERVER_USER}@${SERVER_IP} "echo '✅ 서버 연결 성공'"; then
    echo -e "${GREEN}✅ 서버 연결 성공${NC}"
else
    echo -e "${RED}❌ 서버 연결 실패${NC}"
    exit 1
fi
echo ""

# 2. 기존 파일 백업
echo -e "${YELLOW}2️⃣ 서버의 기존 파일 백업...${NC}"
BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    if [ -d 'src' ]; then \
        echo '기존 파일 백업 중...'; \
        mkdir -p ~/backups; \
        tar -czf ~/backups/${BACKUP_NAME}.tar.gz . 2>/dev/null || true; \
        echo '✅ 백업 완료: ~/backups/${BACKUP_NAME}.tar.gz'; \
    else \
        echo '⚠️  기존 파일 없음 (새로운 배포)'; \
    fi"
echo ""

# 3. PM2 프로세스 중지
echo -e "${YELLOW}3️⃣ 실행 중인 서비스 중지...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    pm2 stop neighborlyone-web 2>/dev/null || echo '⚠️  실행 중인 프로세스 없음'; \
    pm2 delete neighborlyone-web 2>/dev/null || true"
echo ""

# 4. 기존 파일 삭제
echo -e "${YELLOW}4️⃣ 서버의 기존 파일 삭제...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    echo '기존 파일 삭제 중...'; \
    rm -rf * .* 2>/dev/null || true; \
    echo '✅ 기존 파일 삭제 완료'"
echo ""

# 5. 새 파일 업로드
echo -e "${YELLOW}5️⃣ 새 파일들을 서버에 업로드...${NC}"
echo "업로드 중... (시간이 걸릴 수 있습니다)"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.react-router' \
    --exclude 'build' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude '*.log' \
    --exclude 'deploy-to-server.sh' \
    ${LOCAL_PATH}/ ${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/

echo -e "${GREEN}✅ 파일 업로드 완료${NC}"
echo ""

# 6. 서버에서 의존성 설치 및 빌드
echo -e "${YELLOW}6️⃣ 서버에서 의존성 설치 및 빌드...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    echo '📦 의존성 설치 중...'; \
    npm ci --legacy-peer-deps; \
    echo ''; \
    echo '🔨 프로젝트 빌드 중...'; \
    NODE_ENV=production npm run build"
echo -e "${GREEN}✅ 빌드 완료${NC}"
echo ""

# 7. PM2로 서비스 시작
echo -e "${YELLOW}7️⃣ PM2로 서비스 시작...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    pm2 start ecosystem.config.cjs; \
    pm2 save; \
    echo ''; \
    pm2 status"
echo ""

# 8. 배포 완료
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ 배포 완료!${NC}"
echo ""
echo "🌐 사이트 확인: https://neighborlyone.com"
echo ""
echo "유용한 명령어:"
echo "  ssh ${SERVER_USER}@${SERVER_IP}  # 서버 접속"
echo "  pm2 logs                          # 로그 확인"
echo "  pm2 monit                         # 리소스 모니터링"
echo "  pm2 restart neighborlyone-web     # 재시작"
echo ""
echo "백업 파일 위치: ~/backups/${BACKUP_NAME}.tar.gz"
echo ""

