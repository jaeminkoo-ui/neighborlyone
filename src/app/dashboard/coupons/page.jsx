import { Link } from "react-router";
import { useState, useEffect } from "react";
import { requireAuth, getCurrentUser, getCurrentBusiness, logout } from "../../utils/auth";
import { useNavigate } from "react-router";

// NavItem component
const NavItem = ({ href, label, active }) => {
  const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors font-medium";
  const activeClasses = active
    ? "bg-blue-500 text-white"
    : "text-gray-700 hover:bg-gray-100";

  return (
    <Link to={href} className={`${baseClasses} ${activeClasses}`}>
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
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/assets/neione_logo_horigental_blue.png" 
              alt="Neione"
              className="h-8 object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/dashboard/business-info" label="Business Info" />
          <NavItem href="/dashboard/coupons" label="Coupons" active />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 mb-2">
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
            className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
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

