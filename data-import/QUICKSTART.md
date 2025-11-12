# 🚀 빠른 시작 가이드

대량 테스트 데이터를 빠르게 입력하는 방법입니다.

---

## 📝 1단계: CSV 파일 작성

### Google Sheets 사용 (추천)

1. **Google Sheets 열기**: https://sheets.google.com
2. **템플릿 복사**:
   - Businesses: `businesses_template.csv` 내용 복사
   - Coupons: `coupons_template.csv` 내용 복사
3. **데이터 입력**:
   - 샘플 데이터 참고하여 입력
   - 원하는 만큼 행 추가
4. **다운로드**:
   - 파일 → 다운로드 → CSV (.csv)
   - `my_businesses.csv`, `my_coupons.csv`로 저장

---

## 🔄 2단계: CSV → SQL 변환

```bash
cd /Users/jaeminkoo/neione/web/data-import

# Businesses SQL 생성
node csv-to-sql.cjs my_businesses.csv > businesses.sql

# Coupons SQL 생성  
node csv-to-sql.cjs my_coupons.csv > coupons.sql
```

---

## 📤 3단계: Supabase에 업로드

### 방법 A: Supabase SQL Editor (추천)

1. **Supabase Dashboard 열기**:
   - https://supabase.com/dashboard
   - 프로젝트 선택: `yostonpvnlvmckkcgyru`

2. **SQL Editor 이동**:
   - 좌측 메뉴 → SQL Editor

3. **SQL 실행**:
   ```sql
   -- 1. businesses.sql 내용 복사 → 붙여넣기 → Run
   
   -- 2. coupons.sql 내용 복사 → 붙여넣기 → Run
   ```

### 방법 B: psql 사용

```bash
# Businesses 업로드
psql "postgresql://postgres.yostonpvnlvmckkcgyru:2151Lemoine@aws-1-us-east-2.pooler.supabase.com:5432/postgres" < businesses.sql

# Coupons 업로드
psql "postgresql://postgres.yostonpvnlvmckkcgyru:2151Lemoine@aws-1-us-east-2.pooler.supabase.com:5432/postgres" < coupons.sql
```

---

## ✅ 4단계: 데이터 확인

### Supabase Dashboard에서 확인

1. **Table Editor** → `businesses` 테이블
2. **Table Editor** → `coupons` 테이블

### SQL로 확인

```sql
-- 비즈니스 개수
SELECT COUNT(*) as total_businesses FROM businesses;

-- 쿠폰 개수
SELECT COUNT(*) as total_coupons FROM coupons;

-- 비즈니스별 쿠폰 개수
SELECT 
  b.name as business_name,
  COUNT(c.id) as coupon_count
FROM businesses b
LEFT JOIN coupons c ON c.business_id = b.id
GROUP BY b.id, b.name
ORDER BY coupon_count DESC;
```

---

## 📊 샘플 데이터 생성 예시

### 10개 비즈니스 + 50개 쿠폰 생성

**businesses.csv:**
```csv
name,category,phone,email,description,street_address_1,city,state,postal_code,latitude,longitude
"Joe's Pizza","Foods","212-555-0001","info@joespizza.com","Best NYC Pizza","123 Broadway","New York","NY","10001",40.7589,-73.9851
"Cafe Mocha","Cafe","212-555-0002","hello@cafemocha.com","Fresh roasted coffee","456 5th Ave","New York","NY","10018",40.7549,-73.9840
"Hair Studio","Beauty","212-555-0003","contact@hairstudio.com","Professional styling","789 Madison Ave","New York","NY","10065",40.7654,-73.9654
...
```

**coupons.csv:**
```csv
business_name,title,description,code,discount_type,discount_value,start_date,expiration_date
"Joe's Pizza","20% Off Large Pizza","Save 20% on any large pizza","PIZZA20","percent",20,"2025-11-08","2025-12-31"
"Joe's Pizza","Free Garlic Bread","Free garlic bread with combo","FREEBREAD","free_item",0,"2025-11-08","2025-12-31"
"Cafe Mocha","$3 Off Coffee","Save $3 on specialty coffee","MOCHA3","amount",3,"2025-11-08","2025-12-31"
...
```

---

## ⚡ 대량 데이터 생성 팁

### 1. Excel 수식 활용

```excel
# 연속된 이름 생성
="Restaurant " & ROW()

# 랜덤 전화번호
="212-555-" & TEXT(RANDBETWEEN(1000,9999),"0000")

# 랜덤 날짜 (2025년)
=TEXT(DATE(2025,RANDBETWEEN(11,12),RANDBETWEEN(1,28)),"YYYY-MM-DD")
```

### 2. Google Sheets 함수

```
# 랜덤 카테고리
=CHOOSE(RANDBETWEEN(1,7),"Foods","Cafe","Beauty","Shopping","Fitness","Service","Others")

# 랜덤 할인율
=RANDBETWEEN(10,50)

# 자동 쿠폰 코드
=UPPER(LEFT(A2,5)) & RANDBETWEEN(10,99)
```

---

## 🔍 문제 해결

### CSV 인코딩 문제
```bash
# UTF-8 확인
file -I my_businesses.csv

# 변환 (필요시)
iconv -f ISO-8859-1 -t UTF-8 my_businesses.csv > my_businesses_utf8.csv
```

### SQL 에러 발생 시
```sql
-- 기존 데이터 삭제 (주의!)
DELETE FROM coupons;
DELETE FROM businesses;

-- 다시 시도
```

### 중복 데이터 방지
```sql
-- 중복 확인
SELECT name, COUNT(*) 
FROM businesses 
GROUP BY name 
HAVING COUNT(*) > 1;
```

---

## 💡 추가 팁

1. **소량 테스트**: 처음에는 3-5개만 테스트
2. **백업**: 기존 데이터 백업 후 진행
3. **순서**: 항상 Businesses → Coupons 순서로
4. **이미지**: Unsplash 같은 무료 이미지 서비스 활용

---

## 📞 도움이 필요하면

1. `README.md` 참고
2. 템플릿 파일 샘플 참고
3. 에러 메시지 확인

---

**준비되셨나요? 시작하세요!** 🚀

