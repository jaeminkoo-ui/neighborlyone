#!/bin/bash

# Fix build error and deploy
# @rollup/rollup-linux-x64-gnu 에러 수정

set -e

SERVER_USER="jaeminkoo"
SERVER_IP="34.26.14.36"
SERVER_PATH="/var/www/neighborlyone.com"

echo "🔧 서버에서 빌드 에러 수정 중..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ssh ${SERVER_USER}@${SERVER_IP} "cd ${SERVER_PATH} && \
    echo '1️⃣ node_modules 및 package-lock.json 삭제...'; \
    rm -rf node_modules package-lock.json; \
    echo ''; \
    echo '2️⃣ 의존성 재설치...'; \
    npm install --legacy-peer-deps; \
    echo ''; \
    echo '3️⃣ 빌드 재시도...'; \
    NODE_ENV=production npm run build; \
    echo ''; \
    echo '4️⃣ PM2로 서비스 시작...'; \
    pm2 stop neighborlyone-web 2>/dev/null || true; \
    pm2 delete neighborlyone-web 2>/dev/null || true; \
    pm2 start ecosystem.config.cjs; \
    pm2 save; \
    echo ''; \
    pm2 status"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 배포 완료!"
echo ""
echo "🌐 사이트: https://neighborlyone.com"


