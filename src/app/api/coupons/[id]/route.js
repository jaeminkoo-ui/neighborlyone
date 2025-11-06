import sql from "../../utils/sql.js";

// GET /api/coupons/:id - Get a single coupon
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const coupons = await sql`
      SELECT * FROM coupons WHERE id = ${id}
    `;

    if (coupons.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Coupon not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        coupon: coupons[0],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching coupon:", error);
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

// PUT /api/coupons/:id - Update a coupon
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const {
      title,
      description,
      code,
      discount_type,
      discount_value,
      expiration_date,
      is_active,
      terms_conditions,
      start_date,
    } = body;

    // Convert is_active boolean to status enum if provided
    const status = is_active !== undefined ? (is_active ? 'active' : 'draft') : undefined;

    const result = await sql`
      UPDATE coupons
      SET
        title = COALESCE(${title}, title),
        description = COALESCE(${description}, description),
        code = COALESCE(${code}, code),
        discount_type = COALESCE(${discount_type}, discount_type),
        discount_value = COALESCE(${discount_value}, discount_value),
        expiration_date = COALESCE(${expiration_date}, expiration_date),
        status = COALESCE(${status}, status),
        terms_and_conditions = COALESCE(${terms_conditions}, terms_and_conditions),
        start_date = COALESCE(${start_date}, start_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Coupon not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Coupon updated successfully",
        coupon: result[0],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating coupon:", error);
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

// DELETE /api/coupons/:id - Delete a coupon
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // First, delete related records
    await sql`DELETE FROM coupon_impressions WHERE coupon_id = ${id}`;
    await sql`DELETE FROM saved_coupons WHERE coupon_id = ${id}`;
    await sql`DELETE FROM coupon_redemptions WHERE coupon_id = ${id}`;

    // Then delete the coupon
    const result = await sql`
      DELETE FROM coupons WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Coupon not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Coupon deleted successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting coupon:", error);
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


