import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "../components/Logo";

export default function PolishingUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    platforms: {
      android: false,
      ios: false,
      any: false,
    },
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: !prev.platforms[platform],
      },
    }));
  };

  const handleEmailChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const getSelectedPlatforms = () => {
    const selected = [];
    if (formData.platforms.android) selected.push("Android");
    if (formData.platforms.ios) selected.push("iOS");
    if (formData.platforms.any) selected.push("Any Platform");
    return selected.join(", ");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const selectedPlatforms = getSelectedPlatforms();
    if (!selectedPlatforms) {
      alert("Please select at least one platform.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: Replace this URL with your actual Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzZ12N8RJ534K5Ww6nPESWroDF3k5cxpv43qDVgHzKo4zVxzQyG9mVywDNb2vDfycg/exec";

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors mode
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platforms: selectedPlatforms,
          email: formData.email,
          timestamp: new Date().toISOString(),
        }),
      });

      // Note: With no-cors mode, we can't read the response
      // So we'll assume success if no error is thrown
      setSubmitStatus("success");

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* SEO Meta Tags would be added in a helmet or meta component */}
      <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
          <Logo />
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link to="/residents" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                For Residents
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                About Us
              </Link>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                Login
              </Link>
            </div>
            <Link
              to="/signup"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              Start Free Tier
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Main Content Card */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-5xl">✨</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
              We're polishing things up!
            </h1>

            {/* Subtext */}
            <div className="text-center mb-8 space-y-3">
              <p className="text-lg text-gray-700">
                Our app is still being finalized. Leave your email below, and we'll notify you the moment it's ready to download.
              </p>
              <p className="text-lg font-semibold text-yellow-600">
                As a thank-you for pre-signing up, you'll receive a <span className="text-xl font-bold">$5 coupon</span> to use at any Neighborly One partner business when we launch!
              </p>
            </div>

            {submitStatus === "success" ? (
              /* Success Message */
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanks!</h3>
                <p className="text-lg text-gray-700 mb-1">
                  You're now pre-registered. We'll email you when the app launches — and send you your $5 welcome coupon!
                </p>
                <div className="mt-8">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">Something went wrong. Please try again.</p>
                  </div>
                )}

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Which platform are you interested in? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.platforms.android}
                        onChange={() => handlePlatformChange("android")}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">Android</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.platforms.ios}
                        onChange={() => handlePlatformChange("ios")}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">iOS</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.platforms.any}
                        onChange={() => handlePlatformChange("any")}
                        className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-medium">Any Platform</span>
                    </label>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "success"}
                  className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-yellow-400 text-gray-900 text-base font-bold hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Back to Home Link */}
          {submitStatus !== "success" && (
            <div className="mt-8 text-center">
              <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 NeighborlyOne. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/support" className="text-sm hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

