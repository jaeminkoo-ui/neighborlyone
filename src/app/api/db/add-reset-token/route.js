import sql from "../../utils/sql.js";

export async function GET() {
  try {
    console.log("Starting database migration: add reset token columns...");

    // Add reset token columns to users table
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS reset_token TEXT,
      ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMPTZ
    `;

    console.log("✅ Migration complete: reset token columns added");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Reset token columns added successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Migration error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Migration failed", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

