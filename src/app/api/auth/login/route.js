import supabase from "../../utils/supabase.js";

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

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
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

    const user = authData.user;

    // Get user's businesses
    const { data: businesses, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id);

    if (businessError) {
      console.error("Error fetching businesses:", businessError);
    }

    // Return user data
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          phone: user.user_metadata?.phone,
          role: user.user_metadata?.role || 'business_owner',
        },
        businesses: businesses || [],
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


