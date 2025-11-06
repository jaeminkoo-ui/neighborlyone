import sql from "../../utils/sql.js";
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user exists
    const users = await sql`
      SELECT id, email, name 
      FROM users 
      WHERE email = ${email.toLowerCase()}
      LIMIT 1
    `;

    if (users.length === 0) {
      // For security, don't reveal if email exists or not
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "If that email exists, we've sent a reset link" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store token in database (you'll need to add these columns to users table)
    await sql`
      UPDATE users 
      SET 
        reset_token = ${resetToken},
        reset_token_expiry = ${resetTokenExpiry}
      WHERE id = ${user.id}
    `;

    // In production, send email here
    // For now, log the reset link to console
    const resetLink = `http://localhost:4000/reset-password?token=${resetToken}`;
    
    console.log('\n========================================');
    console.log('🔐 PASSWORD RESET REQUEST');
    console.log('========================================');
    console.log('User:', user.name);
    console.log('Email:', user.email);
    console.log('Reset Link:', resetLink);
    console.log('Expires:', resetTokenExpiry.toLocaleString());
    console.log('========================================\n');

    // TODO: Send email with reset link using email service (SendGrid, AWS SES, etc.)
    // Example email content:
    // Subject: Reset Your NeighborlyOne Password
    // Body: Click this link to reset your password: {resetLink}
    //       This link will expire in 1 hour.

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Password reset email sent" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

