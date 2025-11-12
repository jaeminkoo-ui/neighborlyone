import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove all non-digits
    
    // Limit to 10 digits
    const limited = input.slice(0, 10);
    
    // Format as (xxx) xxx-xxxx
    let formatted = "";
    if (limited.length > 0) {
      formatted = "(" + limited.slice(0, 3);
      if (limited.length > 3) {
        formatted += ") " + limited.slice(3, 6);
      }
      if (limited.length > 6) {
        formatted += "-" + limited.slice(6, 10);
      }
    }
    
    setFormData({
      ...formData,
      phone: formatted,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Validate phone number (must be 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Submitting signup form...");
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.businessName, // Use business name as owner name
          businessName: formData.businessName,
          phone: formData.phone,
        }),
      });

      console.log("📡 Response status:", response.status);
      const data = await response.json();
      console.log("📦 Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      // Success! Redirect to login page
      console.log("✅ Signup successful, navigating to login...");
      alert("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Signup error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/neione_logo_horigental_blue.png" 
              alt="Neione"
              className="h-8 object-contain"
            />
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-500 hidden">
            {/* Hidden SVG */}
            <div className="w-6 h-6 text-blue-500 hidden">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-500">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-12">
        <div className="w-full max-w-md">
          {/* Sign Up Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your Free Tier</h1>
              <p className="text-gray-600">Create your business account today</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="Your Business Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="you@business.com"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="(555) 123-4567"
                  maxLength="14"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter 10 digits (will auto-format)</p>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-blue-500 hover:text-blue-600 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-500 hover:text-blue-600 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Free Tier Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 text-center">
              ✨ <strong>Free Tier includes:</strong> Business Profile + 1 Active Digital Flyer + Private Feedback
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}






