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

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
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
          <NavItem href="/dashboard/coupons" icon="🎫" label="Coupons" />
          {/* <NavItem href="/dashboard/analytics" icon="📈" label="Analytics" /> */}
          {/* <NavItem href="/dashboard/settings" icon="⚙️" label="Settings" active /> */}
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
      <main className="flex-1 overflow-auto flex items-center justify-center">
        <div className="text-center px-4 py-12 max-w-2xl">
          <div className="w-32 h-32 mx-auto mb-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-6xl">⚙️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-8">
            We're building advanced settings and preferences to help you customize your NeighborlyOne experience.
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto mb-8">
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Account Management</p>
                <p className="text-sm text-gray-600">Change password, email, and profile</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Notification Preferences</p>
                <p className="text-sm text-gray-600">Control how and when you're notified</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Subscription & Billing</p>
                <p className="text-sm text-gray-600">Manage your plan and payment methods</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <p className="font-medium text-gray-900">Privacy & Security</p>
                <p className="text-sm text-gray-600">Data settings and security options</p>
              </div>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

