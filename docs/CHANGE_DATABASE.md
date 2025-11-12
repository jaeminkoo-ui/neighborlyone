# 🔄 데이터베이스 연결 변경 가이드 / Database Connection Change Guide

## 🇰🇷 한국어

### 📋 현재 상태 확인

현재 연결된 데이터베이스:
- **로컬**: `.env` 파일의 `DATABASE_URL` 확인
- **서버**: `/var/www/neighborlyone.com/.env` 파일의 `DATABASE_URL` 확인

### 🔄 데이터베이스 연결 변경 방법

#### 방법 1: 로컬 환경 변경

```bash
# 1. .env 파일 열기
nano .env
# 또는
code .env

# 2. DATABASE_URL 수정
# 기존:
# DATABASE_URL=postgresql://postgres:old-password@old-host:5432/postgres

# 새로운:
# DATABASE_URL=postgresql://postgres:new-password@new-host:5432/postgres

# 3. 저장 후 개발 서버 재시작
# (개발 서버가 실행 중이면 자동으로 재시작됨)
```

#### 방법 2: 서버 환경 변경 (원격)

```bash
# 서버에 SSH 접속
ssh jaeminkoo@34.26.14.36

# 프로젝트 디렉토리로 이동
cd /var/www/neighborlyone.com

# .env 파일 편집
nano .env

# DATABASE_URL 수정 후 저장

# PM2 재시작
pm2 restart neighborlyone-web

# 연결 확인
pm2 logs neighborlyone-web
```

#### 방법 3: 자동 스크립트 사용 (서버)

```bash
# 서버에서 실행
cd /var/www/neighborlyone.com
./change-database.sh
```

### 📝 Connection String 형식

#### Supabase
```
postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

#### 일반 PostgreSQL
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

#### 예시
```
# Supabase
postgresql://postgres.abcdefgh:MyPassword123@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# 로컬 PostgreSQL
postgresql://postgres:password@localhost:5432/neighborlyone

# 원격 PostgreSQL
postgresql://user:pass@db.example.com:5432/mydb
```

### ⚠️ 주의사항

1. **비밀번호 특수문자**: URL 인코딩 필요
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `&` → `%26`

2. **SSL 연결**: Supabase는 SSL 필수
   ```javascript
   // src/app/api/utils/sql.js에서 자동으로 SSL 사용
   ssl: 'require'
   ```

3. **데이터 마이그레이션**: 기존 데이터를 새 DB로 옮기려면
   ```bash
   # 기존 DB 백업
   pg_dump "old-connection-string" > backup.sql
   
   # 새 DB로 복원
   psql "new-connection-string" < backup.sql
   ```

### 🧪 연결 테스트

#### 로컬에서 테스트
```bash
# 개발 서버 실행
npm run dev

# 다른 터미널에서 테스트
curl http://localhost:4000/api/db/init
```

#### 서버에서 테스트
```bash
# API 엔드포인트 호출
curl -X POST http://localhost:4000/api/db/init

# 또는 브라우저에서
# http://neighborlyone.com/api/db/init
```

### 🔍 문제 해결

#### 연결 실패 시

1. **Connection String 확인**
   ```bash
   # .env 파일 확인
   cat .env | grep DATABASE_URL
   ```

2. **네트워크 연결 확인**
   ```bash
   # 호스트 접근 가능 여부 확인
   ping db.example.com
   ```

3. **방화벽 확인**
   - Supabase: IP 화이트리스트 확인
   - 일반 PostgreSQL: 포트 5432 오픈 확인

4. **로그 확인**
   ```bash
   # 서버 로그
   pm2 logs neighborlyone-web
   
   # 또는
   tail -f ~/.pm2/logs/neighborlyone-web-error.log
   ```

---

## 🇺🇸 English

### 📋 Check Current Status

Current database connection:
- **Local**: Check `DATABASE_URL` in `.env` file
- **Server**: Check `DATABASE_URL` in `/var/www/neighborlyone.com/.env` file

### 🔄 How to Change Database Connection

#### Method 1: Local Environment

```bash
# 1. Open .env file
nano .env
# or
code .env

# 2. Update DATABASE_URL
# Old:
# DATABASE_URL=postgresql://postgres:old-password@old-host:5432/postgres

# New:
# DATABASE_URL=postgresql://postgres:new-password@new-host:5432/postgres

# 3. Restart development server
# (Auto-restarts if dev server is running)
```

#### Method 2: Server Environment (Remote)

```bash
# SSH to server
ssh jaeminkoo@34.26.14.36

# Navigate to project directory
cd /var/www/neighborlyone.com

# Edit .env file
nano .env

# Update DATABASE_URL and save

# Restart PM2
pm2 restart neighborlyone-web

# Check connection
pm2 logs neighborlyone-web
```

#### Method 3: Use Automated Script (Server)

```bash
# Run on server
cd /var/www/neighborlyone.com
./change-database.sh
```

### 📝 Connection String Format

#### Supabase
```
postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

#### Standard PostgreSQL
```
postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

### ⚠️ Important Notes

1. **Special Characters in Password**: URL encoding required
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`
   - `&` → `%26`

2. **SSL Connection**: Supabase requires SSL
   ```javascript
   // Automatically uses SSL in src/app/api/utils/sql.js
   ssl: 'require'
   ```

3. **Data Migration**: To move existing data to new DB
   ```bash
   # Backup old DB
   pg_dump "old-connection-string" > backup.sql
   
   # Restore to new DB
   psql "new-connection-string" < backup.sql
   ```

### 🧪 Test Connection

#### Local Testing
```bash
# Start dev server
npm run dev

# Test in another terminal
curl http://localhost:4000/api/db/init
```

#### Server Testing
```bash
# Call API endpoint
curl -X POST http://localhost:4000/api/db/init

# Or in browser
# http://neighborlyone.com/api/db/init
```

