# Neighborly One - Production Deployment Guide

## 🔍 서버 리소스 급증 문제 원인 (Server Resource Spike Issues)

### 발견된 문제점:

1. **개발 모드로 프로덕션 실행**
   - `npm run dev`는 개발 전용이며 다음을 포함합니다:
     - Hot Module Replacement (HMR)
     - 파일 워칭 (File watching)
     - Source maps 생성
     - 디버깅 도구
   - 이러한 기능들이 지속적으로 CPU와 메모리를 사용

2. **과도한 Prerendering**
   - `prerender: ['/*?']` 설정이 모든 페이지를 빌드 시 렌더링 시도
   - 동적 라우트와 API 엔드포인트까지 렌더링하려고 시도
   - **해결**: 해당 설정 제거됨

3. **서버 Warmup 설정**
   - 모든 클라이언트 파일을 미리 로드하여 초기 메모리 사용량 증가

## ✅ 해결 방법 (Solutions)

### 구글 클라우드 서버에서 실행할 명령:

```bash
# 1. 프로젝트 디렉토리로 이동
cd /path/to/neighborlyone.com/apps/web

# 2. 모든 개발 서버 프로세스 중지
pkill -f "react-router dev" || pkill -f "vite" || pkill -f "node"

# 3. PM2 설치 (아직 설치하지 않았다면)
npm install -g pm2

# 4. 배포 스크립트 실행
./deploy.sh

# 또는 수동으로:
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

### PM2 유용한 명령어:

```bash
# 상태 확인
pm2 status

# 로그 보기
pm2 logs

# 리소스 모니터링
pm2 monit

# 재시작
pm2 restart neighborlyone-web

# 중지
pm2 stop neighborlyone-web

# 삭제
pm2 delete neighborlyone-web
```

## 🔧 Configuration Changes

### 1. React Router Config (`react-router.config.ts`)
```typescript
// ❌ Before (문제 발생)
export default {
  appDirectory: './src/app',
  ssr: true,
  prerender: ['/*?'],  // 모든 페이지 프리렌더링
}

// ✅ After (최적화)
export default {
  appDirectory: './src/app',
  ssr: true,
  // prerender 제거 - 필요시 특정 페이지만 지정
}
```

### 2. Environment Variables

서버에 다음 환경변수가 설정되어 있는지 확인:

```bash
# .env 파일 또는 시스템 환경변수
NODE_ENV=production
DATABASE_URL=postgresql://...
PORT=4000
```

## 📊 리소스 최적화 팁

### 1. Node.js 메모리 제한
필요시 Node.js 힙 메모리 제한:
```bash
# ecosystem.config.cjs에 추가
node_args: '--max-old-space-size=2048'
```

### 2. 클러스터 모드 조정
```javascript
// ecosystem.config.cjs
instances: 2,  // 'max' 대신 고정 수치 사용
```

### 3. 데이터베이스 연결 풀링
Supabase는 Connection Pooler를 제공하며,
많은 요청이 있다면 Session Pooler 또는 Transaction Pooler 사용 권장

## 🚨 트러블슈팅

### 문제: 여전히 CPU/메모리 사용량이 높음

1. **실행 중인 프로세스 확인**
   ```bash
   ps aux | grep node
   ps aux | grep react-router
   ```

2. **포트 확인**
   ```bash
   lsof -i :4000
   netstat -tulpn | grep :4000
   ```

3. **로그 확인**
   ```bash
   pm2 logs --lines 100
   tail -f logs/combined.log
   ```

4. **메모리 누수 체크**
   ```bash
   pm2 monit
   # 또는
   top -p $(pgrep -f "node")
   ```

### 문제: 빌드 실패

```bash
# 캐시 정리 후 재시도
rm -rf node_modules
rm -rf .react-router
rm -rf build
npm install
npm run build
```

## 📝 체크리스트

서버 배포 전 확인사항:
- [ ] `NODE_ENV=production` 설정됨
- [ ] `.env` 파일에 올바른 `DATABASE_URL` 설정
- [ ] `npm run build` 성공
- [ ] 개발 서버(`npm run dev`) 중지됨
- [ ] PM2로 프로덕션 서버 실행
- [ ] 방화벽에서 포트 4000 오픈
- [ ] 도메인이 서버 IP를 가리킴
- [ ] SSL/HTTPS 설정 (Nginx/Caddy 사용 권장)

## 🔐 보안 권장사항

1. **환경변수 보호**
   ```bash
   chmod 600 .env
   ```

2. **Reverse Proxy 사용 (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name neighborlyone.com;
       
       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Rate Limiting**
   API 엔드포인트에 rate limiting 추가 고려

## 📞 Support

문제가 지속되면:
1. PM2 로그 확인: `pm2 logs`
2. 시스템 리소스 확인: `htop` or `top`
3. 네트워크 연결 확인: `netstat -an`


