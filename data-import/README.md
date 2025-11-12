# 데이터 임포트 가이드

## 📋 개요

CSV 파일을 이용하여 대량의 테스트 데이터를 Supabase에 업로드하는 가이드입니다.

---

## 📁 파일 구조

```
data-import/
├── businesses_template.csv      # 비즈니스 데이터 템플릿
├── coupons_template.csv         # 쿠폰 데이터 템플릿
├── csv-to-sql.cjs               # CSV → SQL 변환 스크립트
├── README.md                    # 상세 가이드
└── QUICKSTART.md                # 빠른 시작 가이드
```

---

## 📊 1. Businesses (비즈니스) CSV 필드

### 필수 필드 (Required)

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| `name` | String(255) | 비즈니스 이름 | "101 Chicken" |
| `category` | String(50) | 카테고리 | "Foods", "Cafe", "Beauty", "Shopping", "Fitness", "Service", "Others" |
| `phone` | String(20) | 전화번호 | "808-123-4567" |
| `street_address_1` | String(255) | 주소 1 | "2151 Lemoine Ave" |
| `city` | String(100) | 도시 | "Fort Lee" |
| `state` | String(50) | 주 | "NJ" |
| `postal_code` | String(20) | 우편번호 | "07024" |
| `latitude` | Decimal(10,8) | 위도 | 40.8515 |
| `longitude` | Decimal(11,8) | 경도 | -73.9701 |

### 선택 필드 (Optional)

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| `email` | String(255) | 이메일 | "info@101chicken.com" |
| `description` | Text(200자 이하) | 설명 | "Award Winning Korean Fried Chicken" |
| `logo_url` | Text | 로고 이미지 URL | "https://example.com/logo.jpg" |
| `cover_image_url` | Text | 커버 이미지 URL | "https://example.com/cover.jpg" |
| `hours` | JSON | 영업 시간 (JSON 형식) | 아래 참조 |

### Hours (영업시간) JSON 포맷

```json
{
  "monday": "10:00-22:00",
  "tuesday": "10:00-22:00", 
  "wednesday": "10:00-22:00",
  "thursday": "10:00-22:00",
  "friday": "10:00-23:00",
  "saturday": "10:00-23:00",
  "sunday": "10:00-21:00"
}
```

또는 휴무일:
```json
{
  "sunday": "Closed"
}
```

---

## 🎫 2. Coupons (쿠폰) CSV 필드

### 필수 필드 (Required)

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| `business_name` | String(255) | 비즈니스 이름 (businesses.csv의 name과 일치) | "101 Chicken" |
| `title` | String(255) | 쿠폰 제목 | "20% Off All Chicken" |
| `code` | String(50) | 쿠폰 코드 | "CHICKEN20" |
| `discount_type` | String(20) | 할인 타입 | "percent", "amount", "free_item", "bogo" |
| `expiration_date` | Date | 만료일 | "2025-12-31" |

### 선택 필드 (Optional)

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| `description` | Text | 쿠폰 설명 | "Get 20% discount on all menu items" |
| `discount_value` | Decimal(10,2) | 할인 값 | 20 (percent), 5 (amount), 0 (free_item/bogo) |
| `start_date` | Date | 시작일 | "2025-11-08" |
| `terms_and_conditions` | Text | 이용 약관 | "Valid for dine-in and takeout" |

### Discount Type 설명

- **`percent`**: 퍼센트 할인 (예: 20% 할인)
  - `discount_value`: 20
- **`amount`**: 금액 할인 (예: $5 할인)
  - `discount_value`: 5
- **`free_item`**: 무료 아이템
  - `discount_value`: 0
- **`bogo`**: Buy One Get One Free
  - `discount_value`: 0

---

## 🚀 3. CSV 작성 방법

### Google Sheets 사용

1. **새 스프레드시트 생성**
2. **첫 번째 행에 필드명 입력** (정확히 일치해야 함)
3. **두 번째 행부터 데이터 입력**
4. **파일 → 다운로드 → CSV (.csv)**

### Excel 사용

1. **새 통합 문서 생성**
2. **첫 번째 행에 필드명 입력**
3. **두 번째 행부터 데이터 입력**
4. **파일 → 다른 이름으로 저장 → CSV (쉼표로 분리) (*.csv)**

---

## ⚠️ 주의사항

### 1. 텍스트에 쉼표(,)가 있는 경우

따옴표로 감싸야 합니다:
```
"Award Winning Korean Fried Chicken, Best in Town"
```

### 2. JSON 데이터 (hours)

큰따옴표로 감싸고, 내부 큰따옴표는 두 개로 표시:
```
"{""monday"": ""10:00-22:00"", ""tuesday"": ""10:00-22:00""}"
```

### 3. 날짜 형식

YYYY-MM-DD 형식 사용:
```
2025-12-31
```

### 4. 카테고리

정확한 카테고리 이름 사용:
- Foods
- Cafe
- Beauty
- Shopping
- Fitness
- Service
- Others

---

## 📥 4. 데이터 업로드 방법

### 방법 1: SQL 스크립트 생성 (추천)

```bash
# CSV → SQL 변환
node csv-to-sql.cjs businesses_template.csv > businesses.sql
node csv-to-sql.cjs coupons_template.csv > coupons.sql

# Supabase SQL Editor에서 실행
```

### 방법 2: Supabase Dashboard 사용

1. **Supabase Dashboard → Table Editor**
2. **테이블 선택 (businesses 또는 coupons)**
3. **Import data from CSV**
4. **CSV 파일 업로드**

---

## 📝 샘플 데이터

템플릿 파일에 3-5개의 샘플 데이터가 포함되어 있습니다.
실제 데이터 입력 시 참고하세요!

---

## 🔍 데이터 검증

업로드 후 다음 쿼리로 확인:

```sql
-- 비즈니스 개수 확인
SELECT COUNT(*) FROM businesses;

-- 쿠폰 개수 확인
SELECT COUNT(*) FROM coupons;

-- 비즈니스별 쿠폰 개수
SELECT b.name, COUNT(c.id) as coupon_count
FROM businesses b
LEFT JOIN coupons c ON c.business_id = b.id
GROUP BY b.id, b.name
ORDER BY coupon_count DESC;
```

---

## 💡 팁

1. **소량 테스트 먼저**: 3-5개 데이터로 테스트 후 대량 업로드
2. **백업**: 기존 데이터 백업 후 진행
3. **ID 참조**: 쿠폰은 business_name으로 연결 (스크립트가 자동 변환)
4. **이미지 URL**: 실제 사용 가능한 URL 사용 권장

---

## 🆘 문제 해결

### CSV 인코딩 오류
- UTF-8로 저장 확인

### 날짜 형식 오류  
- YYYY-MM-DD 형식 확인

### JSON 파싱 오류
- 큰따옴표 이스케이프 확인 (`""`)

### 카테고리 오류
- 대소문자 정확히 일치 확인

---

**준비되셨으면 CSV 파일을 작성하시고 업로드하세요!** 🚀

