#!/bin/bash

# Supabase Database Connection - Quick Setup
# 서버에서 이 스크립트를 실행하세요

echo "🔌 Supabase 데이터베이스 연결 설정 중..."
echo ""

# 프로젝트 디렉토리 찾기
if [ -d "/var/www/neighborlyone.com" ]; then
    PROJECT_DIR="/var/www/neighborlyone.com"
elif [ -d "$HOME/neighborlyone.com/apps/web" ]; then
    PROJECT_DIR="$HOME/neighborlyone.com/apps/web"
else
    echo "❌ 프로젝트 디렉토리를 찾을 수 없습니다."
    echo "수동으로 디렉토리를 지정하세요: cd /path/to/project"
    exit 1
fi

cd "$PROJECT_DIR"
echo "📁 작업 디렉토리: $PROJECT_DIR"
echo ""

# .env 파일 생성
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres
NODE_ENV=production
PORT=4000
EOF

echo "✅ .env 파일 생성 완료"

# 파일 권한 설정
chmod 600 .env
echo "🔒 파일 권한 설정 완료 (600)"
echo ""

# PM2 재시작
if command -v pm2 &> /dev/null; then
    echo "🔄 PM2 애플리케이션 재시작 중..."
    pm2 restart all
    echo "✅ PM2 재시작 완료"
    echo ""
    echo "📊 PM2 상태:"
    pm2 list
else
    echo "⚠️  PM2가 설치되어 있지 않습니다."
fi

echo ""
echo "================================"
echo "✅ Supabase 연결 설정 완료!"
echo "================================"
echo ""
echo "다음 단계:"
echo "1. 데이터베이스 초기화:"
echo "   curl -X POST https://neighborlyone.com/api/db/reset"
echo ""
echo "2. 로그 확인:"
echo "   pm2 logs"
echo ""





