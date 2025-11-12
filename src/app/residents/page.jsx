import { Link } from "react-router";
import Logo from "../components/Logo";

export default function ResidentsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
          <Logo />
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link to="/residents" className="text-sm font-medium text-blue-500">
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
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Free Tier
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover Local Deals in Your Neighborhood
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get exclusive offers and coupons from your favorite local businesses. 
                Support your community while saving money!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/polishing-up"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  Download on App Store
                </Link>
                <Link
                  to="/polishing-up"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Get it on Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Residents Love NeighborlyOne
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to discover and save on local businesses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Exclusive Deals</h3>
                <p className="text-gray-600 text-center">
                  Get access to special offers and coupons from local businesses in your area.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Nearby & Relevant</h3>
                <p className="text-gray-600 text-center">
                  Discover businesses and deals right in your neighborhood that matter to you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Support Local</h3>
                <p className="text-gray-600 text-center">
                  Help your community thrive by supporting small businesses in your area.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Digital Loyalty Cards</h3>
                <p className="text-gray-600 text-center">
                  Never lose a punch card again. Track your rewards digitally and earn perks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Real-time Alerts</h3>
                <p className="text-gray-600 text-center">
                  Get notified about flash sales, new arrivals, and special events instantly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Save Favorites</h3>
                <p className="text-gray-600 text-center">
                  Create a personalized list of your favorite local spots and never miss a deal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Start saving in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Download the App</h3>
                <p className="text-gray-600">
                  Get NeighborlyOne from the App Store or Google Play. It's completely free!
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Explore Local Deals</h3>
                <p className="text-gray-600">
                  Browse coupons, offers, and digital flyers from businesses near you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Save & Redeem</h3>
                <p className="text-gray-600">
                  Show your digital coupon at checkout and enjoy your savings!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-blue-500">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to discover your neighborhood?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of residents saving money and supporting local businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/polishing-up"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-500 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                Download for iOS
              </Link>
              <Link
                to="/polishing-up"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-500 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                Download for Android
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-center bg-white border-t border-gray-200">
        <div className="w-full max-w-6xl px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 NeighborlyOne. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-500">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-500">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-sm text-gray-600 hover:text-blue-500">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

