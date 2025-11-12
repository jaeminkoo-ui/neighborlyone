import { Link } from "react-router";
import { useState, useEffect } from "react";
import { isAuthenticated, getCurrentUser, getCurrentBusiness } from "./utils/auth";
import Logo from "./components/Logo";
import HeroSlideshow from "./components/HeroSlideshow";

export default function Page() {
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      setUser(getCurrentUser());
      setBusiness(getCurrentBusiness());
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it truly 0% commission?",
      answer: "Yes, you receive 100% of the coupon value. Our revenue comes from optional premium features."
    },
    {
      question: "Why no public reviews?",
      answer: "We eliminate the stress of public reviews. You receive private, constructive feedback to help you improve."
    },
    {
      question: "How do I set my service area?",
      answer: "In your profile, you define a radius (e.g., 1-2 miles) around your business. Only members within that area receive your offers."
    },
    {
      question: "What redemption rate can I expect?",
      answer: "Our app-based, targeted approach often yields 30-50%+ redemption rates, significantly higher than direct mail (~20%) or email coupons (5-10%)."
    },
    {
      question: "What about premium features?",
      answer: "Our core platform is free. Optional premium features offer advanced AI analytics, priority support, and enhanced targeting."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. There are no contracts or long-term commitments."
    }
  ];

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
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                About Us
              </Link>
              {mounted && user ? (
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                  My Dashboard
                </Link>
              ) : (
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors">
                  Login
                </Link>
              )}
            </div>
            {mounted && user ? (
              <Link
                to="/dashboard"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
              >
                Start Free Tier
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        {/* Hero Section - Full Screen with Slideshow */}
        <section className="w-full">
          <HeroSlideshow className="min-h-screen">
            <div className="flex min-h-screen flex-col gap-6 items-center justify-center text-center px-4 py-20">
              <div className="flex flex-col gap-2 items-center w-full max-w-3xl mx-auto">
                <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl">
                  Connect with your community.
                </h1>
                <h1 className="text-white text-4xl font-bold leading-tight sm:text-5xl">
                  Grow your business.
                </h1>
              </div>
              <Link
                to="/signup"
                className="mt-8 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-yellow-400 text-gray-900 text-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg"
              >
                Start Your Free Tier Today!
              </Link>
            </div>
          </HeroSlideshow>
        </section>

        <div className="w-full max-w-6xl px-4">
          {/* Problem Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Are You Truly Connecting with Your Neighborhood Customers?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  The Reality for Small Business Owners in the US
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <p className="text-lg text-gray-700 mb-6">
                  You've poured your heart into your business, but are you facing these challenges?
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 italic">"If I just register on Google Maps, will customers find me?"</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 italic">"Will listing on DoorDash/Uber Eats/Grubhub automatically bring orders?"</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 italic">"Are discounts enough to draw a crowd?"</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-6">
                  The answer is often 'no'.
                </p>
                <p className="text-gray-700 mt-4">
                  Exceptional food, outstanding service, and quality products are the foundation. But <strong>the real challenge is getting those customers through your door</strong> to experience and appreciate what you offer. For restaurants, great taste is a given. For retail, fair prices for quality products. <strong>But how do you cut through the noise?</strong>
                </p>
                <p className="text-gray-700 mt-4">
                  Costs are constantly rising. Waiting for customers to "just discover you" is a gamble you can't afford.
                </p>
              </div>
            </div>
          </section>

          {/* High Cost Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  The High Cost of "Visibility"
                </h2>
                <p className="text-xl text-gray-600">"I need to advertise, but where do I even start?"</p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Hidden Traps of Existing Platforms:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Delivery Apps</h4>
                    <p className="text-sm text-gray-600 mb-3">(DoorDash, Uber Eats, Grubhub)</p>
                    <p className="text-2xl font-bold text-red-600 mb-3">20-30%</p>
                    <p className="text-sm text-gray-700">Commissions on sales</p>
                    <p className="text-sm font-semibold text-red-700 mt-3">Eats into your profit margins</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Yelp/Google Ads</h4>
                    <p className="text-sm text-gray-600 mb-3">&nbsp;</p>
                    <p className="text-2xl font-bold text-red-600 mb-3">$500-$2,000+</p>
                    <p className="text-sm text-gray-700">Per month</p>
                    <p className="text-sm font-semibold text-red-700 mt-3">High ad spend just to be seen</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Paid Placements</h4>
                    <p className="text-sm text-gray-600 mb-3">&nbsp;</p>
                    <p className="text-2xl font-bold text-red-600 mb-3">Additional</p>
                    <p className="text-sm text-gray-700">Fees</p>
                    <p className="text-sm font-semibold text-red-700 mt-3">Endless spending for fleeting exposure</p>
                  </div>
                </div>
                <div className="mt-8 bg-gray-100 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">The Small Business Dilemma:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Limited space & staff = capped sales potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>High costs ≠ proportional revenue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span><strong>Result: Skyrocketing expenses, stagnant profits.</strong> This is the shared struggle of every small business owner.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  NeighborlyOne: Your Fair, Effective, Stress-Free Solution
                </h2>
                <p className="text-xl text-gray-600">Our Three Core Promises</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Promise 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md border border-blue-200">
                  <div className="text-4xl font-bold text-blue-500 mb-4">1</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Commissions. No Forced Ads.</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>Keep 100% of your earnings.</strong> We never take a cut from your sales or coupons.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>No forced ad spend.</strong> We don't make you pay for top placements.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>No public reviews.</strong> Eliminate the stress of unfair ratings damaging your reputation.</span>
                    </li>
                  </ul>
                </div>

                {/* Promise 2 */}
                <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-xl shadow-md border border-yellow-200">
                  <div className="text-4xl font-bold text-yellow-500 mb-4">2</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Max Impact, Minimal Cost.</h3>
                  <p className="text-gray-700 mb-4">
                    We combine the strengths of Direct Mail (high cost, ~20% redemption) and Email Coupons (low open rates, spam risk) to deliver a superior solution.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-yellow-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Redemption Rate:</span>
                      <span className="text-2xl font-bold text-yellow-600">30-50%+</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>vs. Direct Mail: ~20%</p>
                      <p>vs. Email: 5-10%</p>
                    </div>
                  </div>
                </div>

                {/* Promise 3 */}
                <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-md border border-purple-200">
                  <div className="text-4xl font-bold text-purple-500 mb-4">3</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Driven Local Marketing Optimization</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>Smart Audience Targeting:</strong> Reach customers most likely to visit your specific neighborhood.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>Performance Insights:</strong> Understand what's working with actionable data.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700"><strong>Automated Strategy:</strong> Our AI helps you craft irresistible offers that drive foot traffic.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Cards Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Why NeighborlyOne is Your Best Bet
                </h2>
                <p className="text-xl text-gray-600">Compare us with the alternatives</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* NeighborlyOne Card - Highlighted */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-xl shadow-lg border-4 border-yellow-400 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full shadow">
                    BEST CHOICE
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-2 text-center">NeighborlyOne</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Commissions</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">0%</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Forced Ads</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">None</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Public Reviews</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">None</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Local Targeting</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">Strong</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Redemption Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">30-50%+</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Free to Start</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">Yes</span>
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Apps Card */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Delivery Apps</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Commissions</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">20-30%</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Forced Ads</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Yes</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Public Reviews</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Yes</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Local Targeting</span>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 font-bold">Moderate</span>
                        <span className="text-yellow-500">⚠️</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Redemption Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Low</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Free to Start</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">No</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ad Platforms Card */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ad Platforms</h3>
                  <div className="text-sm text-gray-500 text-center mb-4">(Yelp/Google)</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Commissions</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-bold">-</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Forced Ads</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Yes</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Public Reviews</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Yes</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Local Targeting</span>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 font-bold">Broad</span>
                        <span className="text-yellow-500">⚠️</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Redemption Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Low</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700 font-medium">Free to Start</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-bold">Costly</span>
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" transform="rotate(45 10 10)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Key Features: Everything You Need to Succeed
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Build Your Local Customer Base</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Welcome Coupon Program:</strong> New members automatically receive a Welcome Coupon redeemable at <strong>all participating local businesses</strong>.
                  </p>
                  <p className="text-gray-700">
                    <strong>Community-Driven Growth:</strong> We recruit local residents, directing them to your doorstep.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Truly Commission-Free Coupons</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>100% Payout:</strong> When a coupon is redeemed, you receive the full value. No fees, no hidden cuts.
                  </p>
                  <p className="text-gray-700">
                    <strong>Example:</strong> A $10 coupon means $10 in your pocket.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Monthly Merchant Rewards</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Get Rewarded for Engaged Customers:</strong> The more coupons your customers use, the higher your monthly reward from NeighborlyOne.
                  </p>
                  <p className="text-gray-700">
                    <strong>Direct Incentive:</strong> We incentivize customer visits, boosting your revenue.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Smart, Localized Offer Delivery</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Bypass Email Spam:</strong> Your offers are delivered directly within the NeighborlyOne app.
                  </p>
                  <p className="text-gray-700">
                    <strong>Targeted Reach:</strong> Ensure your promotions reach actual neighbors who can visit your store.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow md:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable AI Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-700">
                        <strong>Track Customer Journeys:</strong> Understand repeat visits and loyalty.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Optimize Offers:</strong> AI-driven suggestions for your next successful campaign.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <strong>Private Feedback:</strong> Get direct, constructive insights from customers without public scrutiny.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-white rounded-3xl">
            <div className="flex flex-col gap-8 px-6">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  How NeighborlyOne Works for Your Business
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-500 mb-3">1</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Create Your Profile</h3>
                  <p className="text-sm text-gray-600 mb-2">(30 Seconds)</p>
                  <p className="text-gray-700">
                    Sign up, add your business info, location, and service radius. <strong>It's Free.</strong> No credit card required to start.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-500 mb-3">2</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Design Your Offer</h3>
                  <p className="text-sm text-gray-600 mb-2">(AI-Assisted)</p>
                  <p className="text-gray-700">
                    Easily create compelling coupons or promotions. Our AI helps with design suggestions. Publish instantly.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-500 mb-3">3</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Reach Your Neighbors</h3>
                  <p className="text-sm text-gray-600 mb-2">&nbsp;</p>
                  <p className="text-gray-700">
                    Your offer is delivered via push notification and within the app to nearby residents. <strong>Connect directly</strong> with your local community.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-500 mb-3">4</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Analyze & Optimize</h3>
                  <p className="text-sm text-gray-600 mb-2">&nbsp;</p>
                  <p className="text-gray-700">
                    Monitor real-time redemption rates and customer engagement. Our platform provides insights to refine your future campaigns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section - Keep existing */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent Membership</h2>
              <p className="max-w-2xl text-lg text-gray-600">
                Choose the right plan for your local business. Connect with your community — no hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Free Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-white border border-gray-200 h-full">
                <h3 className="text-xl font-bold text-gray-900">Free</h3>
                <p className="text-gray-600 mt-1">Perfect for local businesses getting started.</p>
                <p className="text-4xl font-bold text-gray-900 mt-4">
                  $0 <span className="text-base font-normal text-gray-600">/ month</span>
                </p>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Up to 500 coupons per month (1 type)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>1 ZIP code coverage (registered area only)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Issue once per month</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No AI analytics</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-blue-100 text-blue-500 font-bold hover:bg-blue-200 transition-colors"
                >
                  Choose Plan
                </Link>
              </div>

              {/* Standard Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-white border-2 border-yellow-400 relative h-full shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full">
                  LIMITED-TIME FREE
                </div>
                <h3 className="text-xl font-bold text-gray-900">Standard</h3>
                <p className="text-gray-600 mt-1">Reach more local neighbors.</p>
                <div className="mt-4 flex flex-col gap-1">
                  <p className="text-2xl font-bold text-gray-400 line-through">
                    $39.99 <span className="text-sm font-normal">/ month</span>
                  </p>
                  <p className="text-4xl font-bold text-yellow-500">
                    Free <span className="text-base font-normal text-gray-600">for now</span>
                  </p>
                </div>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Up to 2,000 coupons per month (up to 3 types)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>3 ZIP codes coverage (your area + 2 nearby)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Issue twice per month</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Basic AI Report (popular days & times)</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition-colors shadow-md"
                >
                  Choose Plan
                </Link>
              </div>

              {/* Premium Plan */}
              <div className="flex flex-col p-8 rounded-xl bg-gray-50 border border-gray-300 h-full opacity-75">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-700">Premium</h3>
                  <span className="bg-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded">Coming Soon</span>
                </div>
                <p className="text-gray-500 mt-1">Coming Soon – for community leaders.</p>
                <p className="text-3xl font-bold text-gray-500 mt-4">
                  Coming Soon
                </p>
                <ul className="space-y-3 mt-8 text-left flex-grow">
                  <li className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Up to 5,000 coupons per month (up to 10 types)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>6 ZIP codes coverage (expanded local reach)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Issue weekly</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Advanced AI Recommendations (text, timing, image suggestions – currently unavailable)</span>
                  </li>
                </ul>
                <button disabled className="mt-8 w-full flex items-center justify-center rounded-lg h-12 px-5 bg-gray-300 text-gray-500 font-bold cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 sm:py-24">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="max-w-3xl mx-auto w-full space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
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
