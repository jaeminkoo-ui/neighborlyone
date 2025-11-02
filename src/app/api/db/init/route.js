import sql from "../../utils/sql.js";
import { readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function POST(request) {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, "..", "schema.sql");
    const schema = readFileSync(schemaPath, "utf-8");

    // Execute the schema
    await sql(schema);

    // Insert sample data for testing
    await insertSampleData();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Database initialized successfully with sample data",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database initialization error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
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
  await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('owner@marios.com', 'Mario Rossi', '(555) 123-4567', 'business_owner', 'San Francisco, CA')
    ON CONFLICT (email) DO NOTHING
  `;

  const owners = await sql`SELECT id FROM users WHERE email = 'owner@marios.com'`;
  const ownerId = owners[0]?.id;

  if (ownerId) {
    // Insert sample business
    await sql`
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
      ON CONFLICT DO NOTHING
    `;

    const businesses = await sql`SELECT id FROM businesses WHERE name = 'Mario''s Pizzeria'`;
    const businessId = businesses[0]?.id;

    if (businessId) {
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
        ON CONFLICT DO NOTHING
      `;
    }
  }

  // Insert sample customer
  await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('john.doe@email.com', 'John Doe', '(555) 987-6543', 'customer', 'San Francisco, CA')
    ON CONFLICT (email) DO NOTHING
  `;

  // Insert sample café
  await sql`
    INSERT INTO users (email, name, phone, role, location)
    VALUES ('owner@localbrew.com', 'Sarah Johnson', '(555) 456-7890', 'business_owner', 'San Francisco, CA')
    ON CONFLICT (email) DO NOTHING
  `;

  const cafeOwners = await sql`SELECT id FROM users WHERE email = 'owner@localbrew.com'`;
  const cafeOwnerId = cafeOwners[0]?.id;

  if (cafeOwnerId) {
    await sql`
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
      ON CONFLICT DO NOTHING
    `;

    const cafes = await sql`SELECT id FROM businesses WHERE name = 'Local Brew Cafe'`;
    const cafeId = cafes[0]?.id;

    if (cafeId) {
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
        ON CONFLICT DO NOTHING
      `;
    }
  }
}


