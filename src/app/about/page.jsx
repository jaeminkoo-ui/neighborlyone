import { Link } from "react-router";
import Logo from "../components/Logo";

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-center border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full max-w-6xl px-4 py-3">
          <Logo />
          <div className="flex flex-1 justify-end gap-8">
            <div className="hidden md:flex items-center gap-9">
              <Link to="/residents" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                For Residents
              </Link>
              <Link to="/about" className="text-sm font-medium text-blue-500 transition-colors">
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

      <main className="flex flex-col items-center w-full flex-grow">
        <div className="w-full max-w-4xl px-4 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About NeighborlyOne</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering local businesses to thrive in their communities without the burden of commissions, forced ads, or public review stress.
            </p>
          </section>

          {/* Our Mission Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md border border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Success. Our Mission.</h2>
              <p className="text-lg text-gray-700 mb-4">
                NeighborlyOne is committed to helping local businesses succeed by providing a fair, transparent, and effective marketing platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Your Business</h3>
                  <p className="text-gray-700">Strong & Independent</p>
                  <p className="text-sm text-gray-600 mt-2">
                    We believe your business should keep 100% of what you earn. No commissions, no hidden fees, no surprises.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Platform</h3>
                  <p className="text-gray-700">Customer Acquisition & Optimization</p>
                  <p className="text-sm text-gray-600 mt-2">
                    We focus on bringing qualified local customers to your door using smart technology and community engagement.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xl font-bold text-gray-900 text-center">
                  NeighborlyOne: Your Neighborhood, Your Customers.
                </p>
              </div>
            </div>
          </section>

          {/* Our Role vs Your Role Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Role vs. Your Role: A Partnership for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-md border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">What We Do</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Acquire & target local customers for you.</strong> We recruit neighborhood residents and direct them to participating businesses.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Provide AI-driven marketing strategies & analytics.</strong> Our platform helps you understand what works and optimize your campaigns.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Continuously optimize to bring customers to your business.</strong> We monitor performance and adjust strategies to maximize your foot traffic.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-8 rounded-xl shadow-md border border-yellow-200">
                <h3 className="text-2xl font-bold text-yellow-700 mb-4">What You Do</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Deliver an exceptional experience</strong> to every customer who walks through your door.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Maintain your business's quality, service, and products.</strong> Your reputation is built on what you deliver.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Convert new visitors into loyal regulars.</strong> Make every first-time customer want to come back.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold text-gray-900 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                We bring the customers. You make them come back.
              </p>
            </div>
          </section>

          {/* Why We Started Section */}
          <section className="mb-16">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Started NeighborlyOne</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  We saw too many hardworking business owners struggling with unfair platforms that prioritized profits over partnerships.
                </p>
                <p className="text-lg">
                  <strong>20-30% commissions</strong> on delivery apps. <strong>$500-$2,000+ monthly ad spend</strong> on search platforms. <strong>Stressful public reviews</strong> that can damage your reputation overnight.
                </p>
                <p className="text-lg">
                  We asked ourselves: <em>"What if there was a better way?"</em>
                </p>
                <p className="text-lg">
                  A platform that:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Puts <strong>zero commission</strong> burden on businesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Eliminates the stress of <strong>public reviews</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Focuses on <strong>local community connection</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Delivers <strong>actual results</strong> with measurable impact</span>
                  </li>
                </ul>
                <p className="text-lg font-semibold text-blue-600 mt-6">
                  That's why we built NeighborlyOne.
                </p>
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Approach: Smart Technology Meets Local Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Targeting</h3>
                <p className="text-gray-700">
                  Our platform uses artificial intelligence to identify and reach customers who are most likely to visit your business based on location, preferences, and behavior patterns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hyper-Local Focus</h3>
                <p className="text-gray-700">
                  We don't waste your time with broad, untargeted marketing. Every offer reaches real neighbors within your defined service radius who can actually visit your store.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Welcome Coupon Program</h3>
                <p className="text-gray-700">
                  New members receive a Welcome Coupon redeemable at <strong>all participating businesses</strong>, creating an immediate incentive to visit your store and discover what you offer.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monthly Merchant Rewards</h3>
                <p className="text-gray-700">
                  The more engaged your customers are (measured by coupon redemptions), the higher your monthly reward from NeighborlyOne. We incentivize real visits, not just clicks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Analytics</h3>
                <p className="text-gray-700">
                  Track customer journeys, understand repeat visits, and get AI-driven suggestions for your next campaign. Private feedback helps you improve without public scrutiny.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Spam-Free Delivery</h3>
                <p className="text-gray-700">
                  Your offers are delivered directly within the NeighborlyOne app via push notifications. No email spam folders, no lost messages—just direct communication with your neighbors.
                </p>
              </div>
            </div>
          </section>

          {/* Special Offer Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-xl shadow-lg border-2 border-yellow-400">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Special Offer for New Merchants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">For Merchants</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Free Signup & Basic Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>100% Coupon Payout Guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated Support (Email/Chat)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-yellow-600 mb-3">For Members</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Welcome Coupon (usable at all participating businesses)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Regular Local Offers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Spam-Free Notifications & Monthly Rewards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-16">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get In Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:neighborlyone0129@gmail.com" className="text-blue-500 hover:underline">
                        neighborlyone0129@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Coming in next update */}
                  {/* 
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Chat</p>
                      <p className="text-gray-600">In-app Live Support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Hours</p>
                      <p className="text-gray-600">24/7 (English Support)</p>
                    </div>
                  </div>
                  */}
                </div>

                <div className="flex items-center justify-center">
                  <Link
                    to="/support"
                    className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-blue-500 text-white text-base font-bold hover:bg-blue-600 transition-colors shadow-md"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Final CTA Section - Full Width */}
        <section className="w-full bg-blue-500 text-white py-16 sm:py-24">
          <div className="flex flex-col items-center text-center gap-6 px-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Reconnect with Your Neighborhood?</h2>
            <p className="max-w-xl text-lg">
              Your local customers are waiting to discover you. Join hundreds of local businesses already thriving with NeighborlyOne!
            </p>
            <div className="flex flex-col gap-3 text-left bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-white font-semibold">0% Commission. Guaranteed.</p>
              <p className="text-white font-semibold">Free Signup. No Credit Card Required.</p>
              <p className="text-white font-semibold">Launch Your First Offer in 10 Minutes.</p>
            </div>
            <Link
              to="/signup"
              className="mt-4 flex min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-yellow-400 text-gray-900 text-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg"
            >
              Sign Up Free Today!
            </Link>
          </div>
        </section>

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
      </main>
    </div>
  );
}
