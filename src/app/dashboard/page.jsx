import { Link } from "react-router";

export default function DashboardPage() {
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
          <NavItem href="/dashboard" icon="📊" label="Dashboard" active />
          <NavItem href="/dashboard/coupons" icon="🎫" label="Coupons" />
          <NavItem href="/dashboard/business-info" icon="🏢" label="Business Info" />
          <NavItem href="/dashboard/analytics" icon="📈" label="Analytics" />
          <NavItem href="/dashboard/settings" icon="⚙️" label="Settings" />
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Mario's Pizzeria</p>
              <p className="text-xs text-gray-500 truncate">owner@marios.com</p>
            </div>
          </div>
          <button className="w-full mt-2 text-sm text-red-600 hover:text-red-700 font-medium py-2">
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
            </div>
            <Link
              to="/dashboard/coupons/new"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Create Coupon
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Active Coupons" value="2" change="+1 this month" icon="🎫" />
            <StatCard title="Total Views" value="1,234" change="+15.3%" icon="👁️" />
            <StatCard title="Redeemed" value="89" change="+23.1%" icon="✅" />
            <StatCard title="Saved by Users" value="456" change="+18.2%" icon="💝" />
          </div>

          {/* Recent Coupons */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Coupons</h2>
              <Link to="/dashboard/coupons" className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              <CouponCard
                title="50% Off Pizza"
                code="PIZZA50"
                views={567}
                redeemed={42}
                expires="Dec 31, 2025"
                status="active"
              />
              <CouponCard
                title="Buy 1 Get 1 Free"
                code="PIZZABOGO"
                views={667}
                redeemed={47}
                expires="Dec 31, 2025"
                status="active"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }) {
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
}

function StatCard({ title, value, change, icon }) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function CouponCard({ title, code, views, redeemed, expires, status }) {
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
          <span>👁️ {views} views</span>
          <span>✅ {redeemed} redeemed</span>
          <span>📅 Expires: {expires}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}


