import { Link } from "react-router";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
          <div className="flex items-center gap-4 text-gray-900">
            <div className="w-6 h-6 text-blue-500">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">NeighborlyOne</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link to="/residents" className="text-sm font-medium text-gray-600 hover:text-blue-500">
                For Residents
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-500">
                About Us
              </Link>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-500">
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

      <main className="flex flex-col items-center w-full px-4">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <section className="py-16 sm:py-24">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center text-center px-4 py-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop")',
              }}
            >
              <div className="flex flex-col gap-4 items-center w-full max-w-3xl mx-auto">
                <h1 className="text-white text-4xl font-black leading-tight sm:text-6xl">
                  Connect with your community. Grow your business, commission-free.
                </h1>
                <h2 className="text-white/90 text-base font-normal sm:text-xl max-w-2xl">
                  Join NeighborlyOne to reach local customers directly without the stress of public reviews and hidden
                  fees.
                </h2>
              </div>
              <Link
                to="/signup"
                className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-500 text-white text-base font-bold hover:bg-blue-600 transition-colors"
              >
                Start Your Free Tier Today!
              </Link>
            </div>
          </section>

          {/* Problem vs Solution Section */}
          <section className="py-16 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* The Problem */}
              <div className="flex flex-col gap-6 p-6 rounded-xl bg-white border border-gray-200">
                <h2 className="text-2xl font-bold text-red-500">The Problem: Exploitation & Stress</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-red-500 text-2xl">✕</span>
                    <div>
                      <h3 className="font-bold text-gray-900">High Commissions</h3>
                      <p className="text-gray-600">
                        Existing platforms take a significant cut from your hard-earned revenue, shrinking your profits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-red-500 text-2xl">😞</span>
                    <div>
                      <h3 className="font-bold text-gray-900">Public Review Anxiety</h3>
                      <p className="text-gray-600">
                        A single unfair review can damage your reputation, causing undue stress and lost business.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-red-500 text-2xl">⊗</span>
                    <div>
                      <h3 className="font-bold text-gray-900">Complex & Impersonal</h3>
                      <p className="text-gray-600">
                        You're just another listing in a vast, impersonal marketplace, struggling to stand out.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Solution */}
              <div className="flex flex-col gap-6 p-6 rounded-xl bg-green-50 border border-green-200">
                <h2 className="text-2xl font-bold text-green-600">The Solution: Fair, Effective, Stress-Free</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-green-600 text-2xl">💰</span>
                    <div>
                      <h3 className="font-bold text-gray-900">ZERO COMMISSION</h3>
                      <p className="text-gray-600">Keep 100% of your earnings. We never take a cut of your sales.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-green-600 text-2xl">🛡️</span>
                    <div>
                      <h3 className="font-bold text-gray-900">NO PUBLIC REVIEWS</h3>
                      <p className="text-gray-600">Foster genuine connections with private, constructive feedback.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-green-600 text-2xl">🎯</span>
                    <div>
                      <h3 className="font-bold text-gray-900">DIRECT LOCAL REACH</h3>
                      <p className="text-gray-600">Engage with customers right in your neighborhood, effortlessly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
              <p className="max-w-2xl text-lg text-gray-600">
                We've built a platform that puts local businesses first with powerful, easy-to-use tools.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">📄</span>
                <h3 className="text-lg font-bold text-gray-900">Digital Flyers & Coupons</h3>
                <p className="text-sm text-gray-600">
                  Create and send beautiful digital flyers and exclusive offers directly to local residents.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">✨</span>
                <h3 className="text-lg font-bold text-gray-900">AI-Powered Design</h3>
                <p className="text-sm text-gray-600">
                  No design skills? No problem. Our AI helps you create professional marketing materials in seconds.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">🎫</span>
                <h3 className="text-lg font-bold text-gray-900">Digital Loyalty Cards</h3>
                <p className="text-sm text-gray-600">
                  Reward your repeat customers and keep them coming back with easy-to-manage digital punch cards.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">🔔</span>
                <h3 className="text-lg font-bold text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">
                  Announce flash sales, new arrivals, or daily specials instantly to nearby customers.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">📊</span>
                <h3 className="text-lg font-bold text-gray-900">Actionable Analytics</h3>
                <p className="text-sm text-gray-600">
                  Understand what's working with simple insights on flyer views, coupon redemptions, and more.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <span className="text-blue-500 text-3xl">💬</span>
                <h3 className="text-lg font-bold text-gray-900">Private Feedback</h3>
                <p className="text-sm text-gray-600">
                  Receive valuable, constructive feedback from customers directly and privately.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works for Businesses</h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Getting started is simple. Reach your neighbors in just three easy steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-500 font-bold text-2xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your business profile in minutes. Tell your story, add photos, and list your
                  services.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-500 font-bold text-2xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Design a Flyer or Coupon</h3>
                <p className="text-gray-600">
                  Use our simple tools or AI assistant to create an eye-catching promotion for your local community.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-500 font-bold text-2xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Reach Your Neighbors</h3>
                <p className="text-gray-600">
                  Publish your offer and instantly notify residents in your service area. Watch the local support roll
                  in!
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Plans Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Choose the plan that's right for your business. No hidden fees. Ever.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Free Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-white border border-gray-200 h-full">
                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600 mt-1">Perfect for getting started.</p>
                <p className="text-4xl font-bold text-gray-900 mt-4">
                  $0 <span className="text-base font-normal text-gray-600">/ month</span>
                </p>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Business Profile</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>1 Active Digital Flyer</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Private Feedback</span>
                  </li>
                </ul>
                <button className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-blue-100 text-blue-500 font-bold hover:bg-blue-200 transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Standard Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-white border-2 border-blue-500 relative h-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold text-gray-900">Standard</h3>
                <p className="text-gray-600 mt-1">For growing businesses.</p>
                <p className="text-4xl font-bold text-blue-500 mt-4">
                  $29 <span className="text-base font-normal text-gray-600">/ month</span>
                </p>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>5 Active Flyers/Coupons</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Digital Loyalty Cards</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Push Notifications</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Basic Analytics</span>
                  </li>
                </ul>
                <button className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors">
                  Choose Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-white border border-gray-200 h-full">
                <h3 className="text-xl font-bold text-gray-900">Premium</h3>
                <p className="text-gray-600 mt-1">For power users.</p>
                <p className="text-4xl font-bold text-gray-900 mt-4">
                  $79 <span className="text-base font-normal text-gray-600">/ month</span>
                </p>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Everything in Standard, plus:</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Unlimited Flyers/Coupons</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>AI-Powered Design Assistant</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Priority Support</span>
                  </li>
                </ul>
                <button className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-blue-100 text-blue-500 font-bold hover:bg-blue-200 transition-colors">
                  Choose Plan
                </button>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 sm:py-24">
            <div className="bg-blue-500 text-white rounded-xl p-12 text-center flex flex-col items-center gap-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Ready to connect with your neighborhood?</h2>
              <p className="max-w-xl">
                Join hundreds of local businesses who are growing with their community on NeighborlyOne. Start your free
                tier today, no credit card required.
              </p>
              <Link
                to="/signup"
                className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-white text-blue-500 text-base font-bold hover:bg-gray-50 transition-colors"
              >
                Sign Up For Free
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-center bg-white border-t border-gray-200">
        <div className="w-full max-w-6xl px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2024 NeighborlyOne. All rights reserved.</p>
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
