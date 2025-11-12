import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { requireAuth, getCurrentUser, getCurrentBusiness, logout } from "../utils/auth";

export default function DashboardPage() {
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

  // Show loading state until mounted and user is loaded
  if (!mounted || !user) {
    return <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>;
  }

  // Calculate stats from actual coupon data
  const stats = {
    activeCoupons: coupons.filter(c => c.is_active).length,
    totalViews: coupons.reduce((sum, c) => sum + (c.views || 0), 0),
    totalRedeemed: coupons.reduce((sum, c) => sum + (c.redeemed || 0), 0),
    totalSaved: coupons.reduce((sum, c) => sum + (c.saved_count || 0), 0),
  };

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
          <NavItem href="/dashboard" label="Dashboard" active />
          <NavItem href="/dashboard/business-info" label="Business Info" />
          <NavItem href="/dashboard/coupons" label="Coupons" />
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Active Coupons" value={stats.activeCoupons.toString()} change={`${stats.activeCoupons} total`} color="blue" />
            <StatCard title="Redeemed" value={stats.totalRedeemed.toString()} change={loading ? "..." : "All time"} color="green" />
            <StatCard title="Neighbors" value={stats.totalViews.toLocaleString()} change={loading ? "..." : "All time"} color="purple" />
            <StatCard title="Loved" value={stats.totalSaved.toString()} change={loading ? "..." : "All time"} color="red" />
          </div>

          {/* Recent Coupons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Coupons</h2>
              <Link to="/dashboard/coupons" className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading coupons...</div>
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
              <div className="space-y-4">
                {coupons.slice(0, 3).map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    id={coupon.id}
                    title={coupon.title}
                    code={coupon.code}
                    views={coupon.views || 0}
                    redeemed={coupon.redeemed || 0}
                    expires={new Date(coupon.expiration_date).toLocaleDateString()}
                    status={coupon.is_active ? "active" : "inactive"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, label, active = false }) {
  const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors font-medium";
  const activeClasses = active
    ? "bg-blue-500 text-white"
    : "text-gray-700 hover:bg-gray-100";

  return (
    <Link to={href} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

function StatCard({ title, value, change, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
          {change}
        </span>
      </div>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}

function CouponCard({ id, title, code, views, redeemed, expires, status }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded ${status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Code: <span className="font-mono font-bold">{code}</span>
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{views} Views</span>
          <span>{redeemed} Redeemed</span>
          <span>Expires: {expires}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to={`/dashboard/coupons/${id}/edit`}
          className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}


