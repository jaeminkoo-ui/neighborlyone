#!/bin/bash

# Supabase Database Connection Setup Script
# 서버에서 실행할 스크립트

echo "🔌 Supabase Database 연결 설정"
echo "================================"
echo ""

# 사용자에게 Supabase URL 입력 요청
read -p "Supabase DATABASE_URL을 입력하세요: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL이 비어있습니다."
    exit 1
fi

# 프로젝트 디렉토리로 이동
cd ~/neighborlyone.com/apps/web || cd /var/www/neighborlyone.com || {
    echo "❌ 프로젝트 디렉토리를 찾을 수 없습니다."
    exit 1
}

echo "📁 현재 디렉토리: $(pwd)"

# .env 파일 생성 또는 업데이트
if [ -f .env ]; then
    echo "✏️  기존 .env 파일 업데이트 중..."
    # DATABASE_URL이 이미 있으면 업데이트, 없으면 추가
    if grep -q "DATABASE_URL" .env; then
        sed -i "s|^DATABASE_URL=.*|DATABASE_URL=$DATABASE_URL|" .env
    else
        echo "DATABASE_URL=$DATABASE_URL" >> .env
    fi
else
    echo "📝 새로운 .env 파일 생성 중..."
    cat > .env << EOF
# Supabase Database Connection
DATABASE_URL=$DATABASE_URL

# Production Environment
NODE_ENV=production
PORT=4000
EOF
fi

echo "✅ .env 파일 설정 완료!"
echo ""

# .env 파일 권한 설정 (보안)
chmod 600 .env
echo "🔒 .env 파일 권한 설정 완료 (600)"
echo ""

# 연결 테스트
echo "🧪 데이터베이스 연결 테스트 중..."
echo ""

# PM2로 실행 중인 앱 재시작
if command -v pm2 &> /dev/null; then
    echo "🔄 PM2 애플리케이션 재시작 중..."
    pm2 restart neighborlyone-web || pm2 restart all
    echo "✅ PM2 재시작 완료"
else
    echo "⚠️  PM2가 설치되어 있지 않습니다."
    echo "수동으로 애플리케이션을 재시작해주세요."
fi

echo ""
echo "================================"
echo "✅ Supabase 연결 설정 완료!"
echo ""
echo "다음 단계:"
echo "1. 웹사이트에서 DB 초기화: curl -X POST https://neighborlyone.com/api/db/reset"
echo "2. 또는 브라우저에서 테스트"
echo ""





