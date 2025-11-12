import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Logo from "../components/Logo";

export default function SupportPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all required fields.");
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
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOvC27LKNsDvihscphrpN_V46qqxcu2u00kWxcoUuhpIzvKMVnoRRl1tGvOq5coN7S/exec";
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors mode
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      // Note: With no-cors mode, we can't read the response
      // So we'll assume success if no error is thrown
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Optional: Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
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

      <main className="flex flex-col items-center w-full py-16 px-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support</h1>
            <p className="text-lg text-gray-600">
              Need help? Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Support Form */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                <p className="text-green-600 text-sm mt-1">
                  Thank you for contacting us. We'll respond to your email shortly.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">✗ Error sending message</p>
                <p className="text-red-600 text-sm mt-1">
                  Please try again or email us directly at neighborlyone0129@gmail.com
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                  placeholder="Please describe your issue or question in detail..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-blue-500 text-white text-base font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Or email us directly at{" "}
                <a href="mailto:neighborlyone0129@gmail.com" className="text-blue-500 hover:text-blue-600 font-medium">
                  neighborlyone0129@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">
              ← Back to Home
            </Link>
          </div>
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

