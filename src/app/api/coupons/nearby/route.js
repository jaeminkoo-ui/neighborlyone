import sql from "../../utils/sql.js";

// GET nearby coupons based on latitude/longitude
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const lat = parseFloat(url.searchParams.get("lat"));
    const lng = parseFloat(url.searchParams.get("lng"));
    const radius = parseFloat(url.searchParams.get("radius") || "10"); // in km
    const category = url.searchParams.get("category");

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: "Latitude and longitude are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Haversine formula for distance calculation
    // 6371 is Earth's radius in km
    let query;
    
    if (category) {
      query = sql`
        SELECT 
          c.*,
          b.name as business_name,
          CONCAT(b.street_address_1, ', ', b.city, ', ', b.state, ' ', b.postal_code) as business_address,
          b.street_address_1,
          b.street_address_2,
          b.city,
          b.state,
          b.postal_code,
          b.latitude,
          b.longitude,
          b.category as business_category,
          b.phone as business_phone,
          (
            6371 * acos(
              cos(radians(${lat})) * cos(radians(b.latitude)) *
              cos(radians(b.longitude) - radians(${lng})) +
              sin(radians(${lat})) * sin(radians(b.latitude))
            )
          ) AS distance,
          (SELECT COUNT(*) FROM coupon_impressions WHERE coupon_id = c.id) as impressions,
          (SELECT COUNT(*) FROM saved_coupons WHERE coupon_id = c.id) as saves,
          (SELECT COUNT(*) FROM coupon_redemptions WHERE coupon_id = c.id) as redemptions
        FROM coupons c
        JOIN businesses b ON c.business_id = b.id
        WHERE c.is_active = true
        AND c.expiration_date >= CURRENT_DATE
        AND c.category = ${category}
        HAVING distance <= ${radius}
        ORDER BY distance ASC
      `;
    } else {
      query = sql`
        SELECT 
          c.*,
          b.name as business_name,
          CONCAT(b.street_address_1, ', ', b.city, ', ', b.state, ' ', b.postal_code) as business_address,
          b.street_address_1,
          b.street_address_2,
          b.city,
          b.state,
          b.postal_code,
          b.latitude,
          b.longitude,
          b.category as business_category,
          b.phone as business_phone,
          (
            6371 * acos(
              cos(radians(${lat})) * cos(radians(b.latitude)) *
              cos(radians(b.longitude) - radians(${lng})) +
              sin(radians(${lat})) * sin(radians(b.latitude))
            )
          ) AS distance,
          (SELECT COUNT(*) FROM coupon_impressions WHERE coupon_id = c.id) as impressions,
          (SELECT COUNT(*) FROM saved_coupons WHERE coupon_id = c.id) as saves,
          (SELECT COUNT(*) FROM coupon_redemptions WHERE coupon_id = c.id) as redemptions
        FROM coupons c
        JOIN businesses b ON c.business_id = b.id
        WHERE c.is_active = true
        AND c.expiration_date >= CURRENT_DATE
        HAVING distance <= ${radius}
        ORDER BY distance ASC
      `;
    }

    const coupons = await query;

    return new Response(JSON.stringify(coupons), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching nearby coupons:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}







