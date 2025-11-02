-- ===================================
-- Neighborly One - Complete Database Setup
-- Run this in Supabase SQL Editor
-- ===================================

-- Drop existing tables (if any)
DROP TABLE IF EXISTS coupon_impressions CASCADE;
DROP TABLE IF EXISTS saved_coupons CASCADE;
DROP TABLE IF EXISTS coupon_redemptions CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===================================
-- CREATE TABLES
-- ===================================

-- Users table (customers and business owners)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(20) DEFAULT 'customer', -- 'customer' or 'business_owner'
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  hours VARCHAR(255),
  category VARCHAR(100), -- Food, Café, Beauty, Shopping, Fitness, Services, Others
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupons table
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(50), -- 'percentage', 'fixed_amount', 'bogo', etc.
  discount_value VARCHAR(50), -- '50%', '$10', 'BOGO', etc.
  category VARCHAR(100), -- Food, Café, Beauty, Shopping, Fitness, Services, Others
  terms TEXT,
  coupon_code VARCHAR(100),
  usage_limit INTEGER DEFAULT 0, -- 0 = unlimited
  usage_count INTEGER DEFAULT 0,
  expiration_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupon redemptions table (tracking usage)
CREATE TABLE coupon_redemptions (
  id SERIAL PRIMARY KEY,
  coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(coupon_id, user_id) -- Each user can only redeem a coupon once
);

-- Saved coupons table (user's favorites)
CREATE TABLE saved_coupons (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, coupon_id)
);

-- Coupon impressions table (tracking views)
CREATE TABLE coupon_impressions (
  id SERIAL PRIMARY KEY,
  coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- CREATE INDEXES
-- ===================================

CREATE INDEX idx_businesses_owner ON businesses(owner_id);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_location ON businesses(latitude, longitude);

CREATE INDEX idx_coupons_business ON coupons(business_id);
CREATE INDEX idx_coupons_category ON coupons(category);
CREATE INDEX idx_coupons_active ON coupons(is_active);
CREATE INDEX idx_coupons_expiration ON coupons(expiration_date);

CREATE INDEX idx_redemptions_coupon ON coupon_redemptions(coupon_id);
CREATE INDEX idx_redemptions_user ON coupon_redemptions(user_id);

CREATE INDEX idx_saved_coupons_user ON saved_coupons(user_id);
CREATE INDEX idx_saved_coupons_coupon ON saved_coupons(coupon_id);

CREATE INDEX idx_impressions_coupon ON coupon_impressions(coupon_id);

-- ===================================
-- INSERT SAMPLE DATA
-- ===================================

-- Sample Business Owner 1: Mario's Pizzeria
INSERT INTO users (email, name, phone, role, location)
VALUES ('owner@marios.com', 'Mario Rossi', '(555) 123-4567', 'business_owner', 'San Francisco, CA');

INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
VALUES (
  (SELECT id FROM users WHERE email = 'owner@marios.com'),
  'Mario''s Pizzeria',
  'Authentic Italian pizza made with fresh ingredients. Family-owned since 1985.',
  '123 Main Street, San Francisco, CA 94102',
  '(555) 123-4567',
  'Food',
  'Mon-Sun: 11am-10pm',
  37.7749,
  -122.4194,
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop'
);

INSERT INTO coupons (business_id, title, description, discount_type, discount_value, category, coupon_code, expiration_date, is_active, image_url)
VALUES 
(
  (SELECT id FROM businesses WHERE name = 'Mario''s Pizzeria'),
  '50% Off Pizza',
  'Get 50% off any large pizza',
  'percentage',
  '50%',
  'Food',
  'PIZZA50',
  '2025-12-31',
  true,
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop'
),
(
  (SELECT id FROM businesses WHERE name = 'Mario''s Pizzeria'),
  'Buy 1 Get 1 Free',
  'Buy any pizza and get another one free',
  'bogo',
  'BOGO',
  'Food',
  'PIZZABOGO',
  '2025-12-31',
  true,
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop'
);

-- Sample Business Owner 2: Local Brew Cafe
INSERT INTO users (email, name, phone, role, location)
VALUES ('owner@localbrew.com', 'Sarah Johnson', '(555) 456-7890', 'business_owner', 'San Francisco, CA');

INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
VALUES (
  (SELECT id FROM users WHERE email = 'owner@localbrew.com'),
  'Local Brew Cafe',
  'Cozy neighborhood coffee shop with artisan coffee and fresh pastries.',
  '456 Oak Avenue, San Francisco, CA 94103',
  '(555) 456-7890',
  'Café',
  'Mon-Fri: 7am-6pm, Sat-Sun: 8am-4pm',
  37.7699,
  -122.4148,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop'
);

INSERT INTO coupons (business_id, title, description, discount_type, discount_value, category, coupon_code, expiration_date, is_active, image_url)
VALUES (
  (SELECT id FROM businesses WHERE name = 'Local Brew Cafe'),
  'Buy 1 Get 1 Free Coffee',
  'Buy any coffee and get another one free',
  'bogo',
  'BOGO',
  'Café',
  'COFFEE2FOR1',
  '2025-12-25',
  true,
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop'
);

-- Sample Business Owner 3: Style Studio
INSERT INTO users (email, name, phone, role, location)
VALUES ('owner@stylestudio.com', 'Emily Chen', '(555) 234-5678', 'business_owner', 'San Francisco, CA');

INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
VALUES (
  (SELECT id FROM users WHERE email = 'owner@stylestudio.com'),
  'Style Studio',
  'Professional haircut and styling services by experienced stylists.',
  '789 Market Street, San Francisco, CA 94104',
  '(555) 234-5678',
  'Beauty',
  'Tue-Sat: 9am-7pm',
  37.7858,
  -122.4064,
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop'
);

INSERT INTO coupons (business_id, title, description, discount_type, discount_value, category, coupon_code, expiration_date, is_active, image_url)
VALUES (
  (SELECT id FROM businesses WHERE name = 'Style Studio'),
  '30% Off Haircut',
  'Professional haircut and styling',
  'percentage',
  '30%',
  'Beauty',
  'HAIR30',
  '2025-12-27',
  true,
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop'
);

-- Sample Customer
INSERT INTO users (email, name, phone, role, location)
VALUES ('john.doe@email.com', 'John Doe', '(555) 987-6543', 'customer', 'San Francisco, CA');

-- ===================================
-- VERIFICATION QUERIES
-- ===================================

-- Check what was created
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Businesses', COUNT(*) FROM businesses
UNION ALL
SELECT 'Coupons', COUNT(*) FROM coupons
UNION ALL
SELECT 'Coupon Redemptions', COUNT(*) FROM coupon_redemptions
UNION ALL
SELECT 'Saved Coupons', COUNT(*) FROM saved_coupons
UNION ALL
SELECT 'Coupon Impressions', COUNT(*) FROM coupon_impressions;

-- View all coupons with business info
SELECT 
  c.id,
  c.title,
  c.discount_value,
  c.category,
  b.name as business_name,
  c.expiration_date,
  c.is_active
FROM coupons c
JOIN businesses b ON c.business_id = b.id
ORDER BY c.created_at DESC;


