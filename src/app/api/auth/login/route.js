import sql from "../../utils/sql.js";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email and password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find user by email
    const users = await sql`
      SELECT id, email, name, phone, role, password_hash
      FROM users
      WHERE email = ${email}
    `;

    if (users.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email or password",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];

    // Check if user has password (for existing sample users without password)
    if (!user.password_hash) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Account not set up with password. Please contact support.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email or password",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get user's businesses
    const businesses = await sql`
      SELECT 
        id, 
        name, 
        description, 
        street_address_1,
        street_address_2,
        city,
        state,
        postal_code,
        phone, 
        email,
        category, 
        image_url,
        latitude,
        longitude,
        hours
      FROM businesses
      WHERE owner_id = ${user.id}
    `;

    // Return user data (in production, you'd create a JWT or session here)
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          role: user.role,
        },
        businesses: businesses,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Login failed",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


