#!/bin/bash

# Local Environment Test Script
# 로컬 환경 테스트 스크립트

echo "🧪 NeighborlyOne 로컬 환경 테스트"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0

# Test function
test_check() {
    local name="$1"
    local command="$2"
    
    echo -n "Testing: $name... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((FAILED++))
        return 1
    fi
}

# 1. Check Node.js
echo -e "${BLUE}[1/8]${NC} Node.js 확인..."
test_check "Node.js installed" "command -v node"
if [ $? -eq 0 ]; then
    NODE_VERSION=$(node -v)
    echo "  Version: $NODE_VERSION"
fi
echo ""

# 2. Check npm
echo -e "${BLUE}[2/8]${NC} npm 확인..."
test_check "npm installed" "command -v npm"
echo ""

# 3. Check dependencies
echo -e "${BLUE}[3/8]${NC} 의존성 확인..."
test_check "node_modules exists" "[ -d node_modules ]"
if [ $? -eq 0 ]; then
    MODULE_COUNT=$(find node_modules -maxdepth 1 -type d | wc -l)
    echo "  Installed packages: $MODULE_COUNT"
fi
echo ""

# 4. Check .env file
echo -e "${BLUE}[4/8]${NC} 환경 변수 파일 확인..."
test_check ".env file exists" "[ -f .env ]"
if [ $? -eq 0 ]; then
    if grep -q "DATABASE_URL" .env 2>/dev/null; then
        echo -e "  ${GREEN}✓ DATABASE_URL 설정됨${NC}"
    else
        echo -e "  ${YELLOW}⚠ DATABASE_URL이 설정되지 않음${NC}"
    fi
    
    if grep -q "NODE_ENV" .env 2>/dev/null; then
        NODE_ENV=$(grep NODE_ENV .env | cut -d'=' -f2)
        echo "  NODE_ENV: $NODE_ENV"
    fi
fi
echo ""

# 5. Check port availability
echo -e "${BLUE}[5/8]${NC} 포트 확인..."
if lsof -ti:4000 > /dev/null 2>&1; then
    echo -e "  ${YELLOW}⚠ Port 4000 is in use${NC}"
    PID=$(lsof -ti:4000)
    echo "  Process ID: $PID"
else
    echo -e "  ${GREEN}✓ Port 4000 is available${NC}"
fi
echo ""

# 6. Check build files
echo -e "${BLUE}[6/8]${NC} 빌드 파일 확인..."
test_check "build directory exists" "[ -d build ]"
echo ""

# 7. Test database connection (if DATABASE_URL is set)
echo -e "${BLUE}[7/8]${NC} 데이터베이스 연결 테스트..."
if [ -f .env ] && grep -q "DATABASE_URL" .env; then
    DATABASE_URL=$(grep DATABASE_URL .env | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [ -n "$DATABASE_URL" ] && [ "$DATABASE_URL" != "postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" ]; then
        echo -e "  ${BLUE}Testing connection...${NC}"
        # Simple connection test using node
        node -e "
        const postgres = require('postgres');
        const sql = postgres('$DATABASE_URL', { max: 1, ssl: 'require' });
        sql\`SELECT 1\`.then(() => {
            console.log('  ✓ Database connection successful');
            process.exit(0);
        }).catch((err) => {
            console.log('  ✗ Database connection failed:', err.message);
            process.exit(1);
        });
        " 2>/dev/null
        if [ $? -eq 0 ]; then
            ((PASSED++))
        else
            ((FAILED++))
        fi
    else
        echo -e "  ${YELLOW}⚠ DATABASE_URL이 설정되지 않았거나 기본값입니다${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠ .env 파일 또는 DATABASE_URL을 찾을 수 없습니다${NC}"
fi
echo ""

# 8. Check package.json scripts
echo -e "${BLUE}[8/8]${NC} npm 스크립트 확인..."
test_check "package.json exists" "[ -f package.json ]"
if [ $? -eq 0 ]; then
    if grep -q '"dev"' package.json; then
        echo -e "  ${GREEN}✓ 'dev' script available${NC}"
    fi
    if grep -q '"build"' package.json; then
        echo -e "  ${GREEN}✓ 'build' script available${NC}"
    fi
fi
echo ""

# Summary
echo "=================================="
echo "테스트 결과 요약"
echo "=================================="
echo -e "${GREEN}통과: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}실패: $FAILED${NC}"
else
    echo -e "${GREEN}실패: $FAILED${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ 모든 테스트 통과! 로컬 개발 환경이 준비되었습니다.${NC}"
    echo ""
    echo "다음 명령어로 개발 서버를 시작하세요:"
    echo -e "  ${BLUE}npm run dev${NC}"
    echo ""
    echo "브라우저에서 접속:"
    echo -e "  ${BLUE}http://localhost:4000${NC}"
else
    echo -e "${YELLOW}⚠ 일부 테스트가 실패했습니다. 위의 오류를 확인하고 수정해주세요.${NC}"
    echo ""
    echo "도움말:"
    echo "  - 의존성 설치: ${BLUE}npm install --legacy-peer-deps${NC}"
    echo "  - .env 파일 설정: ${BLUE}./setup-local.sh${NC}"
    echo "  - 자세한 가이드: ${BLUE}README.local.md${NC}"
fi
echo ""


