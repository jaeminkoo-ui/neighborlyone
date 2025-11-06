# Supabase Database 연결 가이드

## 🎯 목표
이미 설정된 Supabase 데이터베이스를 neighborlyone.com 서버에 연결하기

---

## 📋 준비물

1. ✅ Supabase 프로젝트 (이미 생성됨)
2. 🔑 Supabase Database Connection String
3. 🖥️ 구글 클라우드 서버 SSH 접근

---

## 🔌 Step 1: Supabase Connection String 가져오기

### Supabase Dashboard에서:

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **Settings** (⚙️) 클릭
4. **Database** 탭 선택
5. **Connection string** 섹션 찾기
6. **URI** 모드 선택
7. 연결 문자열 복사

### Connection String 형식:
```
postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

⚠️ **중요:** `[YOUR-PASSWORD]`를 실제 데이터베이스 비밀번호로 교체해야 합니다!

---

## 🖥️ Step 2: 서버에 연결 설정

### 방법 A: 자동 스크립트 사용 (추천)

```bash
# 1. 서버에 SSH 접속
gcloud compute ssh main-web-server --zone=us-east1-c

# 또는 구글 클라우드 콘솔에서 SSH 버튼 클릭

# 2. 프로젝트 디렉토리로 이동
cd ~/neighborlyone.com/apps/web
# 또는
cd /var/www/neighborlyone.com

# 3. 스크립트 다운로드 및 실행
# (로컬에서 스크립트를 서버로 복사하거나, 아래 방법 B 사용)
```

### 방법 B: 수동 설정 (간단)

```bash
# 1. 서버에 SSH 접속
gcloud compute ssh main-web-server --zone=us-east1-c

# 2. 프로젝트 디렉토리로 이동
cd ~/neighborlyone.com/apps/web
# 또는
cd /var/www/neighborlyone.com

# 3. .env 파일 생성/편집
nano .env

# 4. 다음 내용 입력 (i 키를 눌러 입력 모드):
DATABASE_URL=postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
NODE_ENV=production
PORT=4000

# 5. 저장하고 나가기:
# - Ctrl + X
# - Y (저장 확인)
# - Enter

# 6. 파일 권한 설정 (보안)
chmod 600 .env

# 7. PM2 재시작
pm2 restart neighborlyone-web
# 또는
pm2 restart all

# 8. 확인
pm2 logs
```

---

## 🧪 Step 3: 데이터베이스 연결 테스트

### 터미널에서 테스트:

```bash
# 데이터베이스 초기화 및 샘플 데이터 생성
curl -X POST https://neighborlyone.com/api/db/reset

# 성공 응답 예시:
# {
#   "success": true,
#   "message": "Database reset and initialized successfully with sample data",
#   "tables": ["users", "businesses", "coupons", ...]
# }
```

### 브라우저에서 테스트:

1. https://neighborlyone.com/login 접속
2. 샘플 계정으로 로그인 시도:
   - Email: `owner@marios.com`
   - Password: (설정한 비밀번호 또는 Auth 없이 테스트)

---

## 🔍 트러블슈팅

### 문제 1: "fetch failed" 에러

**원인:** DATABASE_URL이 설정되지 않았거나 잘못됨

**해결:**
```bash
cd /var/www/neighborlyone.com
cat .env  # DATABASE_URL 확인
```

### 문제 2: "authentication failed" 에러

**원인:** Supabase 비밀번호가 틀림

**해결:**
1. Supabase Dashboard → Settings → Database
2. "Reset database password" 클릭
3. 새 비밀번호로 CONNECTION_STRING 업데이트

### 문제 3: PM2 재시작 후에도 변경사항 적용 안됨

**해결:**
```bash
# PM2 완전 재시작
pm2 delete all
cd /var/www/neighborlyone.com
pm2 start ecosystem.config.cjs
pm2 save
```

### 문제 4: Supabase IP 제한

**원인:** Supabase에서 서버 IP를 허용하지 않음

**해결:**
1. Supabase Dashboard → Settings → Database
2. "Connection pooling" 섹션
3. "IPv4" 또는 "Enable IPv6" 확인
4. 필요시 방화벽 규칙 추가

---

## ✅ 연결 확인 체크리스트

- [ ] Supabase 프로젝트 생성 및 활성화됨
- [ ] Connection String 복사됨 (비밀번호 포함)
- [ ] 서버의 `.env` 파일에 `DATABASE_URL` 설정됨
- [ ] PM2 애플리케이션 재시작됨
- [ ] `/api/db/reset` 호출 성공
- [ ] 웹사이트에서 로그인 테스트 성공

---

## 📞 다음 단계

데이터베이스 연결이 완료되면:

1. ✅ 관리자 계정으로 로그인
2. 📝 비즈니스 정보 입력
3. 🎫 쿠폰 생성
4. 🧪 전체 플로우 테스트

---

## 💡 팁

### Supabase Table Editor 사용
- Supabase Dashboard → Table Editor
- 직접 데이터 확인 및 수정 가능
- SQL Editor로 직접 쿼리 실행 가능

### PM2 모니터링
```bash
pm2 monit  # 실시간 리소스 모니터링
pm2 logs   # 로그 확인
pm2 status # 상태 확인
```

### .env 파일 백업
```bash
cp .env .env.backup
```





