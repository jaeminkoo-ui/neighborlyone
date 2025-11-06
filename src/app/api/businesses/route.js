import sql from "../utils/sql.js";

// GET all businesses or businesses by owner
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const ownerId = url.searchParams.get("ownerId");
    const businessId = url.searchParams.get("id");

    if (businessId) {
      // Get specific business with stats
      const business = await sql`
        SELECT 
          b.*,
          u.name as owner_name,
          u.email as owner_email,
          (SELECT COUNT(*) FROM coupons WHERE business_id = b.id) as total_coupons,
          (SELECT COUNT(*) FROM coupons WHERE business_id = b.id AND is_active = true) as active_coupons,
          (SELECT COUNT(*) FROM coupon_impressions ci 
           JOIN coupons c ON ci.coupon_id = c.id 
           WHERE c.business_id = b.id) as total_impressions,
          (SELECT COUNT(*) FROM coupon_redemptions cr 
           JOIN coupons c ON cr.coupon_id = c.id 
           WHERE c.business_id = b.id) as total_redemptions
        FROM businesses b
        JOIN users u ON b.owner_id = u.id
        WHERE b.id = ${businessId}
      `;

      if (business.length === 0) {
        return new Response(
          JSON.stringify({ error: "Business not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify(business[0]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (ownerId) {
      // Get businesses by owner
      const businesses = await sql`
        SELECT 
          b.*,
          (SELECT COUNT(*) FROM coupons WHERE business_id = b.id) as total_coupons,
          (SELECT COUNT(*) FROM coupons WHERE business_id = b.id AND is_active = true) as active_coupons
        FROM businesses b
        WHERE b.owner_id = ${ownerId}
        ORDER BY b.created_at DESC
      `;

      return new Response(JSON.stringify(businesses), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get all businesses
    const businesses = await sql`
      SELECT 
        b.*,
        (SELECT COUNT(*) FROM coupons WHERE business_id = b.id AND is_active = true) as active_coupons
      FROM businesses b
      ORDER BY b.created_at DESC
    `;

    return new Response(JSON.stringify(businesses), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST - Create new business
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      owner_id,
      name,
      description,
      street_address_1,
      street_address_2,
      city,
      state,
      postal_code,
      country,
      phone,
      email,
      hours,
      category,
      cover_image_url,
      latitude,
      longitude,
    } = data;

    const result = await sql`
      INSERT INTO businesses (
        owner_id, name, description, street_address_1, street_address_2, city, state, postal_code, country,
        phone, email, hours, category, cover_image_url, latitude, longitude
      )
      VALUES (
        ${owner_id}, ${name}, ${description || null}, ${street_address_1}, ${street_address_2 || null},
        ${city}, ${state}, ${postal_code}, ${country || 'US'}, ${phone || null},
        ${email || null}, ${hours || null}, ${category}, ${cover_image_url || null},
        ${latitude || null}, ${longitude || null}
      )
      RETURNING *
    `;

    return new Response(JSON.stringify(result[0]), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating business:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// PUT - Update business
export async function PUT(request) {
  try {
    const data = await request.json();
    const {
      id,
      name,
      description,
      street_address_1,
      street_address_2,
      city,
      state,
      postal_code,
      country,
      phone,
      email,
      hours,
      category,
      cover_image_url,
      latitude,
      longitude,
    } = data;

    const result = await sql`
      UPDATE businesses
      SET 
        name = ${name},
        description = ${description || null},
        street_address_1 = ${street_address_1},
        street_address_2 = ${street_address_2 || null},
        city = ${city},
        state = ${state},
        postal_code = ${postal_code},
        country = ${country || 'US'},
        phone = ${phone || null},
        email = ${email || null},
        hours = ${hours || null},
        category = ${category},
        cover_image_url = ${cover_image_url || null},
        latitude = ${latitude || null},
        longitude = ${longitude || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: "Business not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating business:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// DELETE - Delete business
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Business ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await sql`DELETE FROM businesses WHERE id = ${id}`;

    return new Response(
      JSON.stringify({ success: true, message: "Business deleted" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting business:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}







