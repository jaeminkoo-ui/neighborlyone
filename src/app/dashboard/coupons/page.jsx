import { Link } from "react-router";
import { useState, useEffect } from "react";
import { requireAuth, getCurrentUser, getCurrentBusiness, logout } from "../../utils/auth";
import { useNavigate } from "react-router";

// NavItem component
const NavItem = ({ href, icon, label, active }) => {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium";
  const activeClasses = active
    ? "bg-blue-50 text-blue-600"
    : "text-gray-700 hover:bg-gray-50";

  return (
    <Link to={href} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default function CouponsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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

  // Fetch coupons on mount
  useEffect(() => {
    if (business?.id) {
      fetchCoupons();
    }
  }, [business]);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(`/api/coupons?business_id=${business.id}`);
      const data = await response.json();
      if (data.success) {
        setCoupons(data.coupons || []);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (couponId) => {
    if (!confirm("Are you sure you want to delete this coupon?")) {
      return;
    }

    try {
      const response = await fetch(`/api/coupons/${couponId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        // Remove from state
        setCoupons(coupons.filter((c) => c.id !== couponId));
        alert("Coupon deleted successfully!");
      } else {
        alert("Failed to delete coupon: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Failed to delete coupon");
    }
  };

  // Show loading state until mounted and user is loaded
  if (!mounted || !user) {
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
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard" icon="📊" label="Dashboard" />
          <NavItem href="/dashboard/business-info" icon="🏢" label="Business Info" />
          <NavItem href="/dashboard/coupons" icon="🎫" label="Coupons" active />
          {/* <NavItem href="/dashboard/analytics" icon="📈" label="Analytics" /> */}
          {/* <NavItem href="/dashboard/settings" icon="⚙️" label="Settings" /> */}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{business?.name || user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full mt-2 text-sm text-red-600 hover:text-red-700 font-medium py-2"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Coupons</h1>
              <p className="text-gray-600 mt-1">Manage and track your promotional coupons</p>
            </div>
            <Link
              to="/dashboard/coupons/new"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              + Create Coupon
            </Link>
          </div>
        </header>

        {/* Coupons List */}
        <div className="p-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading coupons...</p>
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No coupons yet. Create your first coupon!</p>
              <Link
                to="/dashboard/coupons/new"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                + Create Your First Coupon
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  {/* Coupon Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{coupon.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{coupon.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        coupon.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {coupon.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>

                  {/* Coupon Code */}
                  <div className="bg-gray-50 rounded p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">COUPON CODE</p>
                    <p className="text-sm font-mono font-bold text-gray-900">{coupon.code}</p>
                  </div>

                  {/* Stats in one line */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>👁️ {coupon.views || 0} Views</span>
                    <span>✅ {coupon.redeemed || 0} Redeemed</span>
                    <span>📅 {new Date(coupon.expiration_date).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Link
                      to={`/dashboard/coupons/${coupon.id}/edit`}
                      className="flex-1 text-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete coupon"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

