import sql from "../utils/sql.js";

// GET all active coupons
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const businessId = url.searchParams.get("businessId");

    let query = sql`
      SELECT 
        c.*,
        b.name as business_name,
        b.address as business_address,
        b.latitude,
        b.longitude,
        b.category as business_category,
        (SELECT COUNT(*) FROM coupon_impressions WHERE coupon_id = c.id) as impressions,
        (SELECT COUNT(*) FROM saved_coupons WHERE coupon_id = c.id) as saves,
        (SELECT COUNT(*) FROM coupon_redemptions WHERE coupon_id = c.id) as redemptions
      FROM coupons c
      JOIN businesses b ON c.business_id = b.id
      WHERE c.is_active = true
      AND c.expiration_date >= CURRENT_DATE
    `;

    if (category) {
      query = sql`
        SELECT 
          c.*,
          b.name as business_name,
          b.address as business_address,
          b.latitude,
          b.longitude,
          b.category as business_category,
          (SELECT COUNT(*) FROM coupon_impressions WHERE coupon_id = c.id) as impressions,
          (SELECT COUNT(*) FROM saved_coupons WHERE coupon_id = c.id) as saves,
          (SELECT COUNT(*) FROM coupon_redemptions WHERE coupon_id = c.id) as redemptions
        FROM coupons c
        JOIN businesses b ON c.business_id = b.id
        WHERE c.is_active = true
        AND c.expiration_date >= CURRENT_DATE
        AND c.category = ${category}
      `;
    }

    if (businessId) {
      query = sql`
        SELECT 
          c.*,
          b.name as business_name,
          b.address as business_address,
          b.latitude,
          b.longitude,
          b.category as business_category,
          (SELECT COUNT(*) FROM coupon_impressions WHERE coupon_id = c.id) as impressions,
          (SELECT COUNT(*) FROM saved_coupons WHERE coupon_id = c.id) as saves,
          (SELECT COUNT(*) FROM coupon_redemptions WHERE coupon_id = c.id) as redemptions
        FROM coupons c
        JOIN businesses b ON c.business_id = b.id
        WHERE c.is_active = true
        AND c.expiration_date >= CURRENT_DATE
        AND c.business_id = ${businessId}
      `;
    }

    const coupons = await query;

    return new Response(JSON.stringify(coupons), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST - Create new coupon (for business owners)
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      business_id,
      title,
      description,
      discount_type,
      discount_value,
      category,
      terms,
      coupon_code,
      usage_limit,
      expiration_date,
      image_url,
    } = data;

    const result = await sql`
      INSERT INTO coupons (
        business_id, title, description, discount_type, discount_value,
        category, terms, coupon_code, usage_limit, expiration_date, image_url, is_active
      )
      VALUES (
        ${business_id}, ${title}, ${description}, ${discount_type}, ${discount_value},
        ${category}, ${terms || null}, ${coupon_code}, ${usage_limit || 0}, 
        ${expiration_date}, ${image_url || null}, true
      )
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


