import sql from "../../utils/sql.js";

export async function GET() {
  try {
    console.log("Starting database migration: add cover_image_url column...");
    
    // Add cover_image_url column if it doesn't exist
    await sql`
      ALTER TABLE businesses
      ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
      ADD COLUMN IF NOT EXISTS logo_url TEXT;
    `;
    
    // Copy data from image_url to cover_image_url if image_url column exists
    try {
      await sql`
        UPDATE businesses
        SET cover_image_url = image_url
        WHERE image_url IS NOT NULL AND cover_image_url IS NULL;
      `;
      console.log("Migrated existing image_url data to cover_image_url");
    } catch (error) {
      console.log("No image_url column to migrate from (this is okay):", error.message);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Image URL columns added and data migrated successfully" 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Migration error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to add image URL columns", 
        details: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



