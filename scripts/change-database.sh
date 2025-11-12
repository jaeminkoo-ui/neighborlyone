#!/bin/bash

# Database Connection Change Script
# 데이터베이스 연결 변경 스크립트

echo "🔄 데이터베이스 연결 변경"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 프로젝트 디렉토리 찾기
if [ -d "/var/www/neighborlyone.com" ]; then
    PROJECT_DIR="/var/www/neighborlyone.com"
elif [ -d "$HOME/neighborlyone.com/apps/web" ]; then
    PROJECT_DIR="$HOME/neighborlyone.com/apps/web"
elif [ -f ".env" ]; then
    PROJECT_DIR="$(pwd)"
else
    echo -e "${RED}❌ 프로젝트 디렉토리를 찾을 수 없습니다.${NC}"
    echo "수동으로 디렉토리를 지정하세요: cd /path/to/project"
    exit 1
fi

cd "$PROJECT_DIR"
echo -e "${BLUE}📁 작업 디렉토리: $PROJECT_DIR${NC}"
echo ""

# 현재 DATABASE_URL 확인
if [ -f .env ]; then
    CURRENT_DB=$(grep "^DATABASE_URL=" .env | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [ -n "$CURRENT_DB" ]; then
        echo -e "${BLUE}현재 데이터베이스:${NC}"
        # 비밀번호 부분 마스킹
        MASKED_DB=$(echo "$CURRENT_DB" | sed 's/:[^@]*@/:***@/')
        echo -e "  ${YELLOW}$MASKED_DB${NC}"
        echo ""
    fi
else
    echo -e "${YELLOW}⚠️  .env 파일이 없습니다. 새로 생성합니다.${NC}"
    echo ""
fi

# 새로운 DATABASE_URL 입력
echo -e "${BLUE}새로운 데이터베이스 연결 문자열을 입력하세요:${NC}"
echo -e "${YELLOW}형식: postgresql://user:password@host:port/database${NC}"
echo ""
read -p "DATABASE_URL: " NEW_DATABASE_URL

if [ -z "$NEW_DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL이 비어있습니다.${NC}"
    exit 1
fi

echo ""

# 확인
echo -e "${BLUE}입력한 연결 문자열:${NC}"
MASKED_NEW=$(echo "$NEW_DATABASE_URL" | sed 's/:[^@]*@/:***@/')
echo -e "  ${YELLOW}$MASKED_NEW${NC}"
echo ""
read -p "이 연결 문자열로 변경하시겠습니까? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}취소되었습니다.${NC}"
    exit 0
fi

# .env 파일 업데이트
if [ -f .env ]; then
    # DATABASE_URL이 있으면 업데이트, 없으면 추가
    if grep -q "^DATABASE_URL=" .env; then
        # 기존 DATABASE_URL 업데이트
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|^DATABASE_URL=.*|DATABASE_URL=$NEW_DATABASE_URL|" .env
        else
            # Linux
            sed -i "s|^DATABASE_URL=.*|DATABASE_URL=$NEW_DATABASE_URL|" .env
        fi
        echo -e "${GREEN}✅ DATABASE_URL 업데이트 완료${NC}"
    else
        # DATABASE_URL 추가
        echo "DATABASE_URL=$NEW_DATABASE_URL" >> .env
        echo -e "${GREEN}✅ DATABASE_URL 추가 완료${NC}"
    fi
else
    # .env 파일 생성
    cat > .env << EOF
DATABASE_URL=$NEW_DATABASE_URL
NODE_ENV=${NODE_ENV:-production}
PORT=${PORT:-4000}
EOF
    echo -e "${GREEN}✅ .env 파일 생성 완료${NC}"
fi

# 파일 권한 설정
chmod 600 .env
echo -e "${GREEN}🔒 파일 권한 설정 완료 (600)${NC}"
echo ""

# 연결 테스트 (선택사항)
read -p "데이터베이스 연결을 테스트하시겠습니까? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🧪 연결 테스트 중...${NC}"
    
    # Node.js로 간단한 연결 테스트
    node -e "
    const postgres = require('postgres');
    const sql = postgres('$NEW_DATABASE_URL', { max: 1, ssl: 'require' });
    sql\`SELECT 1 as test\`.then(() => {
        console.log('✅ 연결 성공!');
        process.exit(0);
    }).catch((err) => {
        console.log('❌ 연결 실패:', err.message);
        process.exit(1);
    });
    " 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 데이터베이스 연결 성공!${NC}"
    else
        echo -e "${RED}❌ 데이터베이스 연결 실패${NC}"
        echo -e "${YELLOW}⚠️  연결 문자열을 다시 확인해주세요.${NC}"
    fi
    echo ""
fi

# PM2 재시작 (서버인 경우)
if command -v pm2 &> /dev/null && [ -d "/var/www" ] || [ -d "$HOME/neighborlyone.com" ]; then
    echo -e "${BLUE}🔄 PM2 애플리케이션 재시작 중...${NC}"
    pm2 restart neighborlyone-web 2>/dev/null || pm2 restart all
    echo -e "${GREEN}✅ PM2 재시작 완료${NC}"
    echo ""
    echo -e "${BLUE}📊 PM2 상태:${NC}"
    pm2 list
    echo ""
fi

echo "================================"
echo -e "${GREEN}✅ 데이터베이스 연결 변경 완료!${NC}"
echo "================================"
echo ""
echo "다음 단계:"
echo "1. 애플리케이션이 정상 작동하는지 확인"
echo "2. 필요시 데이터베이스 초기화:"
echo "   curl -X POST http://localhost:4000/api/db/init"
echo ""
echo "📝 로그 확인:"
if command -v pm2 &> /dev/null; then
    echo "   pm2 logs neighborlyone-web"
else
    echo "   개발 서버 로그를 확인하세요"
fi
echo ""

