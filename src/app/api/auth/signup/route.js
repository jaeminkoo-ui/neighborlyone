import sql from "../../utils/sql.js";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, businessName, phone } = body;

    // Validation
    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email, password, and name are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User with this email already exists",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userResult = await sql`
      INSERT INTO users (email, name, phone, role, password_hash)
      VALUES (${email}, ${name}, ${phone || null}, 'business_owner', ${hashedPassword})
      RETURNING id, email, name, phone, role
    `;

    const user = userResult[0];

    // Create business if businessName provided
    if (businessName && user) {
      await sql`
        INSERT INTO businesses (
          owner_id, 
          name, 
          description, 
          street_address_1, 
          city, 
          state, 
          postal_code, 
          phone,
          latitude,
          longitude,
          category
        )
        VALUES (
          ${user.id},
          ${businessName},
          'New business on NeighborlyOne',
          'Address not set',
          'Not set',
          'NY',
          '10001',
          ${phone || ''},
          40.7128,
          -74.0060,
          'Other'
        )
      `;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to create account",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


