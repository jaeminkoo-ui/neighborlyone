-- ============================================
-- Fix Category Data in businesses Table
-- ============================================
-- 웹 앱에서 잘못 입력된 카테고리를 iOS 앱 형식에 맞게 수정

-- 1. "Food" → "Foods"
UPDATE businesses 
SET category = 'Foods', updated_at = NOW()
WHERE category = 'Food';

-- 2. "Café" → "Cafe"
UPDATE businesses 
SET category = 'Cafe', updated_at = NOW()
WHERE category = 'Café';

-- 3. "Services" → "Service"
UPDATE businesses 
SET category = 'Service', updated_at = NOW()
WHERE category = 'Services';

-- 4. 수정된 결과 확인
SELECT id, name, category, updated_at 
FROM businesses 
ORDER BY updated_at DESC;

-- 5. 카테고리별 개수 확인
SELECT category, COUNT(*) as count
FROM businesses
GROUP BY category
ORDER BY category;


