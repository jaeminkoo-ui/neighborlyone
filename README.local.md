# 로컬 개발 환경 설정 가이드 / Local Development Setup Guide

## 🇰🇷 한국어

### 📋 사전 요구사항

1. **Node.js** (v20 이상 권장)
2. **npm** 또는 **yarn**
3. **Supabase 계정** (데이터베이스 연결용)

### 🚀 빠른 시작

#### 방법 1: 자동 설정 스크립트 사용 (추천)

```bash
# 셋업 스크립트 실행
./setup-local.sh

# 또는
bash setup-local.sh
```

스크립트가 자동으로:
- Node.js 버전 확인
- 의존성 설치
- `.env` 파일 생성

#### 방법 2: 수동 설정

#### 1단계: 의존성 설치

```bash
npm install --legacy-peer-deps
```

> ⚠️ 참고: 일부 패키지 호환성 문제로 `--legacy-peer-deps` 플래그가 필요할 수 있습니다.

#### 2단계: 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# .env 파일 생성
touch .env
```

`.env` 파일을 열어 다음을 설정하세요:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NODE_ENV=development
PORT=4000
```

**Supabase 연결 문자열 가져오기:**
1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. Settings (⚙️) → Database
4. Connection string 섹션에서 **URI** 모드 선택
5. 연결 문자열 복사 (비밀번호 포함)

#### 3단계: 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 브라우저에서 다음 주소로 접속하세요:
- **로컬**: http://localhost:4000
- **네트워크**: http://[your-ip]:4000

### 🗄️ 데이터베이스 초기화 (선택사항)

데이터베이스를 초기화하고 샘플 데이터를 생성하려면:

```bash
# 개발 서버가 실행 중일 때
curl -X POST http://localhost:4000/api/db/init

# 또는 데이터베이스를 리셋하고 샘플 데이터 추가
curl -X POST http://localhost:4000/api/db/reset
```

### 📝 사용 가능한 스크립트

```bash
# 개발 서버 시작 (Hot Reload 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 모드로 실행
npm start

# 타입 체크
npm run typecheck
```

### 🐛 문제 해결

#### 문제 1: "No database connection string" 에러

**원인**: `.env` 파일이 없거나 `DATABASE_URL`이 설정되지 않음

**해결**:
```bash
# .env 파일 확인
cat .env

# DATABASE_URL이 있는지 확인
grep DATABASE_URL .env
```

#### 문제 2: 포트 4000이 이미 사용 중

**원인**: 다른 프로세스가 포트 4000을 사용 중

**해결**:
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :4000

# 프로세스 종료 또는 .env에서 PORT 변경
PORT=4001 npm run dev
```

#### 문제 3: 의존성 설치 실패

**해결**:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 문제 4: 데이터베이스 연결 실패

**원인**: Supabase 연결 문자열이 잘못되었거나 네트워크 문제

**해결**:
1. Supabase Dashboard에서 연결 문자열 재확인
2. 비밀번호가 올바른지 확인
3. Supabase 프로젝트가 활성화되어 있는지 확인

### 🔧 개발 팁

1. **Hot Reload**: 파일 저장 시 자동으로 새로고침됩니다
2. **포트 변경**: `vite.config.ts`의 `server.port` 또는 `.env`의 `PORT` 변경
3. **로깅**: 개발 서버 콘솔에서 API 요청과 에러를 확인할 수 있습니다

---

## 🇺🇸 English

### 📋 Prerequisites

1. **Node.js** (v20 or higher recommended)
2. **npm** or **yarn**
3. **Supabase account** (for database connection)

### 🚀 Quick Start

#### Method 1: Use Automated Setup Script (Recommended)

```bash
# Run setup script
./setup-local.sh

# Or
bash setup-local.sh
```

The script will automatically:
- Check Node.js version
- Install dependencies
- Create `.env` file

#### Method 2: Manual Setup

#### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

> ⚠️ Note: The `--legacy-peer-deps` flag may be required due to some package compatibility issues.

#### Step 2: Configure Environment Variables

Create a `.env` file in the project root and add the following:

```bash
# Create .env file
touch .env
```

Open `.env` and configure:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NODE_ENV=development
PORT=4000
```

**Get Supabase Connection String:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Settings (⚙️) → Database
4. Find Connection string section and select **URI** mode
5. Copy the connection string (including password)

#### Step 3: Run Development Server

```bash
npm run dev
```

Once the server starts, access the application at:
- **Local**: http://localhost:4000
- **Network**: http://[your-ip]:4000

### 🗄️ Database Initialization (Optional)

To initialize the database and create sample data:

```bash
# While development server is running
curl -X POST http://localhost:4000/api/db/init

# Or reset database and add sample data
curl -X POST http://localhost:4000/api/db/reset
```

### 📝 Available Scripts

```bash
# Start development server (with Hot Reload)
npm run dev

# Build for production
npm run build

# Run in production mode
npm start

# Type check
npm run typecheck
```

### 🐛 Troubleshooting

#### Issue 1: "No database connection string" error

**Cause**: `.env` file missing or `DATABASE_URL` not set

**Solution**:
```bash
# Check .env file
cat .env

# Verify DATABASE_URL exists
grep DATABASE_URL .env
```

#### Issue 2: Port 4000 already in use

**Cause**: Another process is using port 4000

**Solution**:
```bash
# Check which process is using the port
lsof -i :4000

# Kill the process or change PORT in .env
PORT=4001 npm run dev
```

#### Issue 3: Dependency installation fails

**Solution**:
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### Issue 4: Database connection fails

**Cause**: Incorrect Supabase connection string or network issue

**Solution**:
1. Verify connection string in Supabase Dashboard
2. Check if password is correct
3. Ensure Supabase project is active

### 🔧 Development Tips

1. **Hot Reload**: Files automatically reload on save
2. **Change Port**: Modify `server.port` in `vite.config.ts` or `PORT` in `.env`
3. **Logging**: Check API requests and errors in the development server console

