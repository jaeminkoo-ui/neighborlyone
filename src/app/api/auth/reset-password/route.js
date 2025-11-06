import sql from "../../utils/sql.js";
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: "Token and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find user with valid token
    const users = await sql`
      SELECT id, email, name, reset_token_expiry 
      FROM users 
      WHERE reset_token = ${token}
      LIMIT 1
    `;

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired reset token" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];

    // Check if token has expired
    if (new Date(user.reset_token_expiry) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Reset token has expired" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset token
    await sql`
      UPDATE users 
      SET 
        password_hash = ${hashedPassword},
        reset_token = NULL,
        reset_token_expiry = NULL
      WHERE id = ${user.id}
    `;

    console.log('\n========================================');
    console.log('✅ PASSWORD RESET SUCCESSFUL');
    console.log('========================================');
    console.log('User:', user.name);
    console.log('Email:', user.email);
    console.log('Time:', new Date().toLocaleString());
    console.log('========================================\n');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Password reset successful" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reset password" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

