# 🌐 Apache2 서버 설정 가이드 - NeighborlyOne

## 📋 현재 상황
- ✅ Apache2가 이미 설치되어 있음
- ✅ 다른 사이트들이 이미 실행 중
- 📁 배포 경로: `/var/www/neighborlyone.com`
- 🔌 Node.js 앱 포트: 4000

## 🎯 목표
Apache 가상 호스트를 설정해서 `neighborlyone.com` → `http://localhost:4000` 프록시

---

## 🚀 배포 단계

### Step 1: 서버 접속
```bash
ssh jaeminkoo@34.26.14.36
```

### Step 2: 필요한 Apache 모듈 활성화
```bash
# Proxy 모듈들 활성화
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl

# Apache 재시작
sudo systemctl restart apache2
```

### Step 3: 프로젝트 클론
```bash
# /var/www/ 디렉토리로 이동
cd /var/www/

# 리포지토리 클론
sudo git clone https://github.com/jaeminkoo-ui/neighborlyone.git neighborlyone.com

# 소유권 변경
sudo chown -R jaeminkoo:jaeminkoo /var/www/neighborlyone.com

# 프로젝트 디렉토리로 이동
cd /var/www/neighborlyone.com
```

### Step 4: 환경 변수 설정
```bash
nano .env
```

다음 내용 입력:
```env
# Database Configuration
DATABASE_URL=postgresql://postgres:2151Lemoine!@db.qfdpjrsohrdvmsklfuyv.supabase.co:5432/postgres

# Server Configuration
PORT=4000
NODE_ENV=production
```

저장: `Ctrl+X`, `Y`, `Enter`

### Step 5: Node.js 의존성 설치 및 빌드
```bash
# 의존성 설치
npm install --legacy-peer-deps

# 앱 빌드
npm run build
```

### Step 6: PM2로 앱 시작
```bash
# PM2로 앱 시작
pm2 start npm --name "neighborlyone-web" -- start

# PM2 설정 저장
pm2 save

# 서버 재시작 시 자동 시작 설정
pm2 startup
# 출력된 명령어를 복사해서 실행

# 상태 확인
pm2 status
```

### Step 7: Apache 가상 호스트 설정
```bash
# 설정 파일 다운로드
cd /etc/apache2/sites-available/
sudo wget https://raw.githubusercontent.com/jaeminkoo-ui/neighborlyone/main/apache-neighborlyone.conf

# 또는 직접 생성
sudo nano /etc/apache2/sites-available/neighborlyone.conf
```

설정 파일 내용 (위에서 만든 `apache-neighborlyone.conf` 파일 참조):
```apache
<VirtualHost *:80>
    ServerName neighborlyone.com
    ServerAlias www.neighborlyone.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:4000/
    ProxyPassReverse / http://localhost:4000/
    
    ErrorLog ${APACHE_LOG_DIR}/neighborlyone-error.log
    CustomLog ${APACHE_LOG_DIR}/neighborlyone-access.log combined
</VirtualHost>
```

### Step 8: 사이트 활성화
```bash
# 사이트 활성화
sudo a2ensite neighborlyone.conf

# Apache 설정 테스트
sudo apache2ctl configtest

# Apache 재시작
sudo systemctl reload apache2
```

### Step 9: 확인
```bash
# 앱이 4000 포트에서 실행 중인지 확인
curl http://localhost:4000

# PM2 상태 확인
pm2 status

# Apache 상태 확인
sudo systemctl status apache2
```

브라우저에서 접속:
- **도메인 설정 전:** http://34.26.14.36
- **도메인 설정 후:** http://neighborlyone.com

---

## 🔄 업데이트 방법

### 간단한 업데이트 스크립트
```bash
cd /var/www/neighborlyone.com

# 최신 코드 받기
git pull origin main

# 의존성 업데이트
npm install --legacy-peer-deps

# 빌드
npm run build

# 앱 재시작
pm2 restart neighborlyone-web

# 상태 확인
pm2 logs neighborlyone-web --lines 50
```

### 자동 업데이트 스크립트 생성
```bash
nano /var/www/neighborlyone.com/update.sh
```

내용:
```bash
#!/bin/bash
cd /var/www/neighborlyone.com
git pull origin main
npm install --legacy-peer-deps
npm run build
pm2 restart neighborlyone-web
pm2 logs neighborlyone-web --lines 20
```

실행 권한:
```bash
chmod +x /var/www/neighborlyone.com/update.sh
```

사용:
```bash
/var/www/neighborlyone.com/update.sh
```

---

## 🔒 SSL 인증서 설정 (Let's Encrypt)

### Certbot 설치
```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

### SSL 인증서 받기
```bash
# 도메인이 이미 A 레코드로 서버 IP를 가리키고 있어야 함
sudo certbot --apache -d neighborlyone.com -d www.neighborlyone.com
```

이메일 입력 및 약관 동의 후 자동으로 설정됩니다!

### 자동 갱신 설정 (이미 설정되어 있음)
```bash
# 갱신 테스트
sudo certbot renew --dry-run
```

이제 https://neighborlyone.com 으로 접속 가능!

---

## 🐛 문제 해결

### 1. 503 Service Unavailable
```bash
# Node.js 앱이 실행 중인지 확인
pm2 status

# 앱이 없으면 시작
cd /var/www/neighborlyone.com
pm2 start npm --name "neighborlyone-web" -- start
```

### 2. Apache 에러
```bash
# Apache 로그 확인
sudo tail -f /var/log/apache2/neighborlyone-error.log

# Apache 설정 테스트
sudo apache2ctl configtest

# Apache 재시작
sudo systemctl restart apache2
```

### 3. 포트 충돌
```bash
# 4000 포트 사용 확인
sudo lsof -i :4000

# 다른 프로세스가 사용 중이면 종료하거나
# .env 파일에서 다른 포트로 변경
```

### 4. 권한 문제
```bash
# 소유권 수정
sudo chown -R jaeminkoo:jaeminkoo /var/www/neighborlyone.com

# 권한 수정
sudo chmod -R 755 /var/www/neighborlyone.com
```

### 5. PM2 로그 확인
```bash
# 실시간 로그
pm2 logs neighborlyone-web

# 최근 100줄
pm2 logs neighborlyone-web --lines 100

# 에러만 보기
pm2 logs neighborlyone-web --err
```

---

## 📊 모니터링

### Apache 상태
```bash
# Apache 상태
sudo systemctl status apache2

# 접속 로그 (실시간)
sudo tail -f /var/log/apache2/neighborlyone-access.log

# 에러 로그 (실시간)
sudo tail -f /var/log/apache2/neighborlyone-error.log
```

### PM2 모니터링
```bash
# 대시보드
pm2 monit

# 상태 확인
pm2 status

# 로그
pm2 logs neighborlyone-web
```

### 리소스 사용량
```bash
# 메모리 및 CPU
pm2 monit

# 디스크 사용량
df -h

# 프로세스 확인
htop
```

---

## 📁 디렉토리 구조

```
/var/www/neighborlyone.com/
├── src/                    # 소스 코드
├── build/                  # 빌드된 파일
│   └── client/            # 클라이언트 정적 파일
├── node_modules/           # 의존성
├── .env                    # 환경 변수
├── .git/                   # Git 저장소
├── package.json
└── update.sh               # 업데이트 스크립트
```

```
/etc/apache2/
├── sites-available/
│   └── neighborlyone.conf     # 가상 호스트 설정
├── sites-enabled/
│   └── neighborlyone.conf     # 활성화된 사이트 (심볼릭 링크)
└── apache2.conf              # 메인 설정
```

---

## 🔥 Apache 가상 호스트 관리

### 사이트 비활성화
```bash
sudo a2dissite neighborlyone.conf
sudo systemctl reload apache2
```

### 사이트 활성화
```bash
sudo a2ensite neighborlyone.conf
sudo systemctl reload apache2
```

### 모든 가상 호스트 확인
```bash
# 사용 가능한 사이트
ls -la /etc/apache2/sites-available/

# 활성화된 사이트
ls -la /etc/apache2/sites-enabled/

# Apache 설정 확인
apache2ctl -S
```

---

## 🌐 도메인 설정

### DNS 레코드 추가
도메인 등록 업체(예: Namecheap, GoDaddy)에서:

**A 레코드:**
```
Type: A
Host: @
Value: 34.26.14.36
TTL: Automatic
```

**CNAME 레코드 (www):**
```
Type: CNAME
Host: www
Value: neighborlyone.com
TTL: Automatic
```

DNS 전파는 최대 48시간 걸릴 수 있지만 보통 몇 분~몇 시간이면 됩니다.

### 확인
```bash
# DNS 확인
nslookup neighborlyone.com
dig neighborlyone.com

# 서버에서 테스트
curl -H "Host: neighborlyone.com" http://localhost
```

---

## ✅ 체크리스트

배포 완료 후 확인:

- [ ] Node.js 앱이 포트 4000에서 실행 중 (`curl http://localhost:4000`)
- [ ] PM2 프로세스 활성 (`pm2 status`)
- [ ] Apache 프록시 설정 완료 (`apache2ctl configtest`)
- [ ] 가상 호스트 활성화 (`a2ensite`)
- [ ] Apache가 실행 중 (`systemctl status apache2`)
- [ ] 브라우저에서 접속 가능 (http://34.26.14.36)
- [ ] 도메인 DNS 설정 (선택사항)
- [ ] SSL 인증서 설치 (선택사항)
- [ ] PM2 자동 시작 설정 (`pm2 startup`)
- [ ] 로그 확인 (`pm2 logs`, Apache 로그)

---

## 🆘 긴급 상황

### 사이트가 다운되었을 때

```bash
# 1. PM2 확인 및 재시작
pm2 restart neighborlyone-web

# 2. Apache 확인 및 재시작
sudo systemctl status apache2
sudo systemctl restart apache2

# 3. 로그 확인
pm2 logs neighborlyone-web --lines 50
sudo tail -100 /var/log/apache2/neighborlyone-error.log

# 4. 포트 확인
sudo lsof -i :4000
sudo lsof -i :80
```

### 롤백 (이전 버전으로)

```bash
cd /var/www/neighborlyone.com
git log --oneline  # 커밋 히스토리 확인
git reset --hard <commit-hash>
npm install --legacy-peer-deps
npm run build
pm2 restart neighborlyone-web
```

---

## 📞 지원

**GitHub:** https://github.com/jaeminkoo-ui/neighborlyone
**로그 위치:**
- Apache: `/var/log/apache2/neighborlyone-*.log`
- PM2: `~/.pm2/logs/`
- Application: `/var/www/neighborlyone.com/logs/`

**유용한 명령어:**
```bash
pm2 status                          # PM2 상태
pm2 logs neighborlyone-web          # 앱 로그
sudo systemctl status apache2       # Apache 상태
apache2ctl -S                       # Apache 가상 호스트 목록
```

---

**배포 날짜:** _____________________
**서버 IP:** 34.26.14.36
**배포 경로:** /var/www/neighborlyone.com
**포트:** 4000
**도메인:** neighborlyone.com

