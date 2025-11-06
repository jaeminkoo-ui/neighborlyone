import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { requireAuth, getCurrentUser, getCurrentBusiness } from "../../../utils/auth";

export default function NewCouponPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    discount_type: "percentage",
    discount_value: "",
    expiration_date: "",
    terms_conditions: "",
    is_active: true,
  });

  // Check authentication on mount
  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    const currentBusiness = getCurrentBusiness();
    setUser(currentUser);
    setBusiness(currentBusiness);
    
    if (!currentUser) {
      requireAuth(navigate);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!business?.id) {
      alert("No business found. Please complete your business profile first.");
      return;
    }

    // Validation
    if (!formData.title || !formData.code || !formData.expiration_date) {
      alert("Please fill in all required fields (Title, Code, Expiration Date)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: business.id,
          title: formData.title,
          description: formData.description,
          code: formData.code.toUpperCase(),
          discount_type: formData.discount_type,
          discount_value: parseFloat(formData.discount_value) || 0,
          expiration_date: new Date(formData.expiration_date).toISOString(),
          is_active: formData.is_active,
          terms_conditions: formData.terms_conditions,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Coupon created successfully!");
        navigate("/dashboard/coupons");
      } else {
        alert(`Error: ${result.error || "Failed to create coupon"}`);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("An error occurred while creating the coupon");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state until mounted and user is loaded
  if (!mounted || !user || !business) {
    return <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 text-blue-500">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">NeighborlyOne</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1 transition-colors font-medium"
          >
            <span className="text-xl">📊</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link
            to="/dashboard/business-info"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1 transition-colors font-medium"
          >
            <span className="text-xl">🏢</span>
            <span className="text-sm">Business Info</span>
          </Link>
          <Link
            to="/dashboard/coupons"
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg mb-1 transition-colors font-medium"
          >
            <span className="text-xl">🎫</span>
            <span className="text-sm">Coupons</span>
          </Link>
          <Link
            to="/dashboard/analytics"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1 transition-colors font-medium"
          >
            <span className="text-xl">📈</span>
            <span className="text-sm">Analytics</span>
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1 transition-colors font-medium"
          >
            <span className="text-xl">⚙️</span>
            <span className="text-sm">Settings</span>
          </Link>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {business?.name?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{business?.name || user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Link
            to="/login"
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('currentBusiness');
            }}
            className="block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Coupon</h1>
            <p className="text-gray-600">Design and publish a new coupon for your customers</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Coupon Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Coupon Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 50% Off All Pizzas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe the offer in detail..."
                  />
                </div>

              </div>
            </div>

            {/* Discount Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Discount Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type *
                  </label>
                  <select
                    name="discount_type"
                    value={formData.discount_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="percentage">Percentage Off (e.g., 20% off)</option>
                    <option value="fixed_amount">Fixed Amount (e.g., $10 off)</option>
                    <option value="bogo">Buy One Get One (BOGO)</option>
                    <option value="free_item">Free Item</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    name="discount_value"
                    value={formData.discount_value}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. 50 for 50% or 10 for $10"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the discount amount (number only)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="e.g. PIZZA50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique code customers will use to redeem</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    rows={3}
                    name="terms_conditions"
                    value={formData.terms_conditions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="e.g. Valid for dine-in only. Cannot be combined with other offers."
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Availability</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date *
                  </label>
                  <input
                    type="date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">When does this coupon expire?</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Activate coupon immediately
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Preview</h2>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow-sm p-4 max-w-md">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {formData.title || "Your Coupon Title"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formData.description || "Your coupon description will appear here"}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      ACTIVE
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded p-3 mb-3">
                    <p className="text-xs text-gray-500 mb-1">COUPON CODE</p>
                    <p className="text-lg font-mono font-bold text-gray-900">
                      {formData.code || "YOUR_CODE"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>📅 Expires: {formData.expiration_date ? new Date(formData.expiration_date).toLocaleDateString() : "-"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Creating..." : "Create Coupon"}
              </button>
              <Link
                to="/dashboard/coupons"
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}





