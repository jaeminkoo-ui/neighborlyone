import sql from "../../utils/sql.js";

/**
 * Add password_hash column to users table for authentication
 */
export async function POST(request) {
  try {
    console.log("🔐 Adding password_hash column to users table...");

    // Check if column already exists
    const columnCheck = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'password_hash'
    `;

    if (columnCheck.length > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "password_hash column already exists",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add password_hash column
    await sql`
      ALTER TABLE users 
      ADD COLUMN password_hash VARCHAR(255)
    `;

    console.log("✅ password_hash column added successfully");

    return new Response(
      JSON.stringify({
        success: true,
        message: "password_hash column added successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error adding password_hash column:", error);
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





