#!/bin/bash

# Local Development Setup Script
# 로컬 개발 환경 설정 스크립트

echo "🚀 NeighborlyOne 로컬 개발 환경 설정"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "   Node.js v20 이상을 설치해주세요: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js 버전이 낮습니다. (현재: $(node -v))"
    echo "   Node.js v18 이상을 권장합니다."
fi

echo "✅ Node.js 확인: $(node -v)"
echo ""

# Install dependencies
echo "📦 의존성 설치 중..."
if ! npm install --legacy-peer-deps; then
    echo "❌ 의존성 설치 실패"
    exit 1
fi
echo "✅ 의존성 설치 완료"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "⚠️  .env 파일이 이미 존재합니다."
    read -p "덮어쓰시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ 기존 .env 파일을 유지합니다."
        exit 0
    fi
fi

# Create .env file
echo "📝 .env 파일 생성 중..."
cat > .env << 'EOF'
# Database Configuration
# Supabase Database Connection String
# Get this from: https://supabase.com/dashboard > Settings > Database > Connection string (URI mode)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Environment
NODE_ENV=development

# Server Port (optional - defaults to 4000)
PORT=4000
EOF

echo "✅ .env 파일 생성 완료"
echo ""
echo "⚠️  중요: .env 파일을 열어 DATABASE_URL을 실제 Supabase 연결 문자열로 수정해주세요!"
echo ""
echo "다음 단계:"
echo "1. .env 파일을 열어 DATABASE_URL 수정"
echo "2. npm run dev 실행"
echo ""
echo "📖 자세한 내용은 README.local.md를 참고하세요."


