import sql from "../../utils/sql.js";

// 개발용 API - 프로덕션에서는 제거해야 함
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email parameter required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const users = await sql`
      SELECT email, reset_token, reset_token_expiry 
      FROM users 
      WHERE email = ${email.toLowerCase()}
      LIMIT 1
    `;

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = users[0];
    const resetLink = user.reset_token 
      ? `http://localhost:4000/reset-password?token=${user.reset_token}`
      : null;

    return new Response(
      JSON.stringify({ 
        email: user.email,
        reset_link: resetLink,
        expires: user.reset_token_expiry
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

