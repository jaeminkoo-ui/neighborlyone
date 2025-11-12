#!/bin/bash

# Neighborly One - Server Diagnosis Script
# 서버에 업로드해서 실행: ./server-diagnosis.sh

echo "======================================"
echo "Neighborly One - Server Diagnosis"
echo "Time: $(date)"
echo "======================================"
echo ""

echo "📊 1. 시스템 리소스 현황"
echo "--------------------------------------"
echo "CPU 및 메모리 사용량:"
top -bn1 | head -5
echo ""
free -h
echo ""

echo "📦 2. 디스크 사용량"
echo "--------------------------------------"
df -h | grep -E "(Filesystem|/$|/home)"
echo ""

echo "🔍 3. Node.js 프로세스 확인"
echo "--------------------------------------"
NODE_PROCESSES=$(ps aux | grep node | grep -v grep)
if [ -z "$NODE_PROCESSES" ]; then
    echo "❌ Node.js 프로세스가 실행 중이지 않습니다."
else
    echo "✅ 실행 중인 Node.js 프로세스:"
    echo "$NODE_PROCESSES"
fi
echo ""

echo "🚀 4. 개발 서버 확인 (문제의 원인!)"
echo "--------------------------------------"
DEV_PROCESSES=$(ps aux | grep -E "(vite|react-router dev|npm run dev)" | grep -v grep)
if [ -z "$DEV_PROCESSES" ]; then
    echo "✅ 개발 서버가 실행 중이지 않습니다. (정상)"
else
    echo "⚠️  WARNING: 개발 서버가 실행 중입니다! (이것이 문제의 원인)"
    echo "$DEV_PROCESSES"
    echo ""
    echo "개발 서버를 중지해야 합니다:"
    echo "  pkill -f 'react-router dev'"
fi
echo ""

echo "🌐 5. 포트 사용 확인"
echo "--------------------------------------"
if command -v netstat &> /dev/null; then
    sudo netstat -tlnp | grep -E ':(4000|5173|3000)' || echo "포트 4000, 5173, 3000이 사용 중이지 않습니다."
elif command -v ss &> /dev/null; then
    sudo ss -tlnp | grep -E ':(4000|5173|3000)' || echo "포트 4000, 5173, 3000이 사용 중이지 않습니다."
else
    echo "netstat 또는 ss 명령어를 찾을 수 없습니다."
fi
echo ""

echo "📊 6. PM2 프로세스 확인"
echo "--------------------------------------"
if command -v pm2 &> /dev/null; then
    pm2 list
    echo ""
    echo "PM2 메모리 사용량:"
    pm2 show neighborlyone-web 2>/dev/null || echo "neighborlyone-web 프로세스를 찾을 수 없습니다."
else
    echo "❌ PM2가 설치되어 있지 않습니다."
    echo "설치: npm install -g pm2"
fi
echo ""

echo "📁 7. 프로젝트 디렉토리 확인"
echo "--------------------------------------"
if [ -d ~/neighborlyone.com/apps/web ]; then
    echo "✅ 프로젝트 디렉토리 존재: ~/neighborlyone.com/apps/web"
    cd ~/neighborlyone.com/apps/web
    
    echo "Build 디렉토리 존재 여부:"
    if [ -d "build" ]; then
        echo "  ✅ build/ 디렉토리 존재"
        ls -lh build/server/index.js 2>/dev/null || echo "  ⚠️  build/server/index.js 없음"
    else
        echo "  ❌ build/ 디렉토리 없음 - npm run build 필요"
    fi
    
    echo ""
    echo "Node modules 설치 여부:"
    if [ -d "node_modules" ]; then
        echo "  ✅ node_modules/ 존재"
    else
        echo "  ❌ node_modules/ 없음 - npm install 필요"
    fi
else
    echo "❌ 프로젝트 디렉토리를 찾을 수 없습니다: ~/neighborlyone.com/apps/web"
    echo "다른 위치를 확인하세요."
fi
echo ""

echo "📝 8. 최근 로그 (있는 경우)"
echo "--------------------------------------"
if [ -f ~/neighborlyone.com/apps/web/logs/combined.log ]; then
    echo "최근 10줄:"
    tail -10 ~/neighborlyone.com/apps/web/logs/combined.log
elif [ -f ~/.pm2/logs/neighborlyone-web-out.log ]; then
    echo "PM2 로그 최근 10줄:"
    tail -10 ~/.pm2/logs/neighborlyone-web-out.log
else
    echo "로그 파일을 찾을 수 없습니다."
fi
echo ""

echo "🌍 9. 환경 변수 확인"
echo "--------------------------------------"
echo "NODE_ENV: ${NODE_ENV:-'not set'}"
if [ -f ~/neighborlyone.com/apps/web/.env ]; then
    echo "✅ .env 파일 존재"
    echo "DATABASE_URL: $(grep -c DATABASE_URL ~/neighborlyone.com/apps/web/.env > /dev/null && echo 'set' || echo 'not set')"
else
    echo "❌ .env 파일 없음"
fi
echo ""

echo "======================================"
echo "🔧 권장 조치사항"
echo "======================================"
echo ""

if [ ! -z "$DEV_PROCESSES" ]; then
    echo "❌ 긴급: 개발 서버 중지 필요!"
    echo "   실행: pkill -f 'react-router dev'"
    echo ""
fi

if [ ! -d ~/neighborlyone.com/apps/web/build ]; then
    echo "📦 프로덕션 빌드 필요"
    echo "   cd ~/neighborlyone.com/apps/web"
    echo "   npm run build"
    echo ""
fi

if ! command -v pm2 &> /dev/null; then
    echo "📦 PM2 설치 필요"
    echo "   npm install -g pm2"
    echo ""
fi

echo "✅ 정상 배포 단계:"
echo "   1. 개발 서버 중지: pkill -f node"
echo "   2. 빌드: cd ~/neighborlyone.com/apps/web && npm run build"
echo "   3. PM2 시작: pm2 start ecosystem.config.cjs"
echo "   4. 상태 확인: pm2 status"
echo "   5. 모니터링: pm2 monit"
echo ""

echo "======================================"
echo "진단 완료: $(date)"
echo "======================================"






