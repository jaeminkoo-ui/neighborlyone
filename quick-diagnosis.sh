#!/bin/bash
# 서버 SSH 터미널에 복사-붙여넣기해서 실행하세요

echo "🔍 Neighborly One - 빠른 진단"
echo "================================"
echo ""

echo "1️⃣ 현재 실행 중인 Node.js 프로세스:"
ps aux | grep node | grep -v grep || echo "  ❌ Node 프로세스 없음"
echo ""

echo "2️⃣ 개발 서버 확인 (HIGH CPU 원인):"
DEV_PROC=$(ps aux | grep -E "(vite|react-router dev|npm.*dev)" | grep -v grep)
if [ -z "$DEV_PROC" ]; then
  echo "  ✅ 개발 서버 실행 중이지 않음 (정상)"
else
  echo "  ⚠️  WARNING: 개발 서버가 실행 중입니다!"
  echo "$DEV_PROC"
  echo ""
  echo "  👉 중지 명령어: pkill -f 'react-router dev'"
fi
echo ""

echo "3️⃣ CPU 사용량 Top 5:"
ps aux --sort=-%cpu | head -6
echo ""

echo "4️⃣ 메모리 사용량 Top 5:"
ps aux --sort=-%mem | head -6
echo ""

echo "5️⃣ 포트 사용 확인:"
sudo netstat -tlnp 2>/dev/null | grep -E ':(4000|5173|3000)' || sudo ss -tlnp 2>/dev/null | grep -E ':(4000|5173|3000)' || echo "  포트 확인 실패"
echo ""

echo "6️⃣ 시스템 리소스:"
free -h
echo ""

echo "================================"
echo "진단 완료!"






