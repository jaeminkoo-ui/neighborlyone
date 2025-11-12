-- Fix discount_type constraint in Supabase
-- Run this in Supabase SQL Editor

-- 1. First, check current discount_type values
SELECT DISTINCT discount_type FROM coupons;

-- 2. Update any existing 'percentage' to 'percent' and 'fixed_amount' to 'amount'
UPDATE coupons 
SET discount_type = 'percent' 
WHERE discount_type = 'percentage';

UPDATE coupons 
SET discount_type = 'amount' 
WHERE discount_type = 'fixed_amount';

-- 3. Add CHECK constraint (if it doesn't exist)
ALTER TABLE coupons 
DROP CONSTRAINT IF EXISTS coupons_discount_type_check;

ALTER TABLE coupons 
ADD CONSTRAINT coupons_discount_type_check 
CHECK (discount_type IN ('percent', 'amount', 'free_item', 'bogo'));

-- 4. Verify the constraint was added
SELECT 
  conname AS constraint_name,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'coupons'::regclass
AND conname LIKE '%discount_type%';


