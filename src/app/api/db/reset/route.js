import sql from "../../utils/sql.js";

/**
 * WARNING: This endpoint will DELETE ALL DATA in the database!
 * Use only for development/testing purposes.
 */
export async function POST(request) {
  try {
    console.log("🚨 Starting database reset...");

    // Drop all tables in reverse order (due to foreign keys)
    console.log("Dropping existing tables...");
    
    await sql`DROP TABLE IF EXISTS coupon_impressions CASCADE`;
    await sql`DROP TABLE IF EXISTS saved_coupons CASCADE`;
    await sql`DROP TABLE IF EXISTS coupon_redemptions CASCADE`;
    await sql`DROP TABLE IF EXISTS coupons CASCADE`;
    await sql`DROP TABLE IF EXISTS businesses CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;

    console.log("✅ All tables dropped successfully");

    // Recreate all tables
    console.log("Creating new tables...");

    // Users table
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(20) DEFAULT 'customer',
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Businesses table
    await sql`
      CREATE TABLE businesses (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        address VARCHAR(500) NOT NULL,
        phone VARCHAR(50),
        email VARCHAR(255),
        hours VARCHAR(255),
        category VARCHAR(100),
        image_url TEXT,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Coupons table
    await sql`
      CREATE TABLE coupons (
        id SERIAL PRIMARY KEY,
        business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        discount_type VARCHAR(50),
        discount_value VARCHAR(50),
        category VARCHAR(100),
        terms TEXT,
        coupon_code VARCHAR(100),
        usage_limit INTEGER DEFAULT 0,
        usage_count INTEGER DEFAULT 0,
        expiration_date DATE NOT NULL,
        is_active BOOLEAN DEFAULT true,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Coupon redemptions table
    await sql`
      CREATE TABLE coupon_redemptions (
        id SERIAL PRIMARY KEY,
        coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(coupon_id, user_id)
      )
    `;

    // Saved coupons table
    await sql`
      CREATE TABLE saved_coupons (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
        saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, coupon_id)
      )
    `;

    // Coupon impressions table
    await sql`
      CREATE TABLE coupon_impressions (
        id SERIAL PRIMARY KEY,
        coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("✅ All tables created successfully");

    // Create indexes
    console.log("Creating indexes...");

    await sql`CREATE INDEX idx_businesses_owner ON businesses(owner_id)`;
    await sql`CREATE INDEX idx_businesses_category ON businesses(category)`;
    await sql`CREATE INDEX idx_businesses_location ON businesses(latitude, longitude)`;
    await sql`CREATE INDEX idx_coupons_business ON coupons(business_id)`;
    await sql`CREATE INDEX idx_coupons_category ON coupons(category)`;
    await sql`CREATE INDEX idx_coupons_active ON coupons(is_active)`;
    await sql`CREATE INDEX idx_coupons_expiration ON coupons(expiration_date)`;
    await sql`CREATE INDEX idx_redemptions_coupon ON coupon_redemptions(coupon_id)`;
    await sql`CREATE INDEX idx_redemptions_user ON coupon_redemptions(user_id)`;
    await sql`CREATE INDEX idx_saved_coupons_user ON saved_coupons(user_id)`;
    await sql`CREATE INDEX idx_saved_coupons_coupon ON saved_coupons(coupon_id)`;
    await sql`CREATE INDEX idx_impressions_coupon ON coupon_impressions(coupon_id)`;

    console.log("✅ Indexes created successfully");

    // Insert sample data
    console.log("Inserting sample data...");
    await insertSampleData();

    console.log("🎉 Database reset completed successfully!");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Database reset and initialized successfully with sample data",
        tables: [
          "users",
          "businesses",
          "coupons",
          "coupon_redemptions",
          "saved_coupons",
          "coupon_impressions",
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Database reset error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function insertSampleData() {
  // Insert sample business owner
  const ownerResult = await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('owner@marios.com', 'Mario Rossi', '(555) 123-4567', 'business_owner', 'San Francisco, CA')
    RETURNING id
  `;
  const ownerId = ownerResult[0].id;

  // Insert sample business
  const businessResult = await sql`
    INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
    VALUES (
      ${ownerId},
      'Mario''s Pizzeria',
      'Authentic Italian pizza made with fresh ingredients. Family-owned since 1985.',
      '123 Main Street, San Francisco, CA 94102',
      '(555) 123-4567',
      'Food',
      'Mon-Sun: 11am-10pm',
      37.7749,
      -122.4194,
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop'
    )
    RETURNING id
  `;
  const businessId = businessResult[0].id;

  // Insert sample coupons
  await sql`
    INSERT INTO coupons (
      business_id, title, description, discount_type, discount_value, 
      category, coupon_code, expiration_date, is_active, image_url
    )
    VALUES 
    (
      ${businessId},
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
      ${businessId},
      'Buy 1 Get 1 Free',
      'Buy any pizza and get another one free',
      'bogo',
      'BOGO',
      'Food',
      'PIZZABOGO',
      '2025-12-31',
      true,
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop'
    )
  `;

  // Insert sample customer
  const customerResult = await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('john.doe@email.com', 'John Doe', '(555) 987-6543', 'customer', 'San Francisco, CA')
    RETURNING id
  `;

  // Insert sample café owner
  const cafeOwnerResult = await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('owner@localbrew.com', 'Sarah Johnson', '(555) 456-7890', 'business_owner', 'San Francisco, CA')
    RETURNING id
  `;
  const cafeOwnerId = cafeOwnerResult[0].id;

  // Insert café business
  const cafeResult = await sql`
    INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
    VALUES (
      ${cafeOwnerId},
      'Local Brew Cafe',
      'Cozy neighborhood coffee shop with artisan coffee and fresh pastries.',
      '456 Oak Avenue, San Francisco, CA 94103',
      '(555) 456-7890',
      'Café',
      'Mon-Fri: 7am-6pm, Sat-Sun: 8am-4pm',
      37.7699,
      -122.4148,
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop'
    )
    RETURNING id
  `;
  const cafeId = cafeResult[0].id;

  // Insert café coupon
  await sql`
    INSERT INTO coupons (
      business_id, title, description, discount_type, discount_value,
      category, coupon_code, expiration_date, is_active, image_url
    )
    VALUES (
      ${cafeId},
      'Buy 1 Get 1 Free Coffee',
      'Buy any coffee and get another one free',
      'bogo',
      'BOGO',
      'Café',
      'COFFEE2FOR1',
      '2025-12-25',
      true,
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop'
    )
  `;

  // Insert sample beauty salon
  const beautySalonOwnerResult = await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('owner@stylestudio.com', 'Emily Chen', '(555) 234-5678', 'business_owner', 'San Francisco, CA')
    RETURNING id
  `;
  const beautySalonOwnerId = beautySalonOwnerResult[0].id;

  const beautySalonResult = await sql`
    INSERT INTO businesses (owner_id, name, description, address, phone, category, hours, latitude, longitude, image_url)
    VALUES (
      ${beautySalonOwnerId},
      'Style Studio',
      'Professional haircut and styling services by experienced stylists.',
      '789 Market Street, San Francisco, CA 94104',
      '(555) 234-5678',
      'Beauty',
      'Tue-Sat: 9am-7pm',
      37.7858,
      -122.4064,
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop'
    )
    RETURNING id
  `;
  const beautySalonId = beautySalonResult[0].id;

  await sql`
    INSERT INTO coupons (
      business_id, title, description, discount_type, discount_value,
      category, coupon_code, expiration_date, is_active, image_url
    )
    VALUES (
      ${beautySalonId},
      '30% Off Haircut',
      'Professional haircut and styling',
      'percentage',
      '30%',
      'Beauty',
      'HAIR30',
      '2025-12-27',
      true,
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop'
    )
  `;

  console.log("✅ Sample data inserted successfully");
}


