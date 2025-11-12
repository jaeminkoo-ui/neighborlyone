import { Link } from "react-router";
import Logo from "../components/Logo";

export default function TermsPage() {
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
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last Updated: November 11, 2024</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to NeighborlyOne. By accessing or using our platform, you agree to be bound by these Terms of Service 
                  ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                <p className="text-gray-600">
                  These Terms apply to all users of NeighborlyOne, including business owners, residents using our mobile application, 
                  and visitors to our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne is a platform that connects local businesses with residents in their community. We provide:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Business profile creation and management tools</li>
                  <li>Digital flyer and coupon creation services</li>
                  <li>Digital loyalty card programs</li>
                  <li>Push notification capabilities</li>
                  <li>Analytics and reporting tools</li>
                  <li>A mobile application for residents to discover local deals</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Business Accounts</h3>
                <p className="text-gray-600 mb-4">
                  To create a business account, you must:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Be at least 18 years old</li>
                  <li>Have the legal authority to represent the business</li>
                  <li>Maintain the security of your account credentials</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Resident Accounts</h3>
                <p className="text-gray-600 mb-4">
                  Residents can access our services through our mobile application by creating an account with a valid email address 
                  and agreeing to these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription Plans and Pricing</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Free Tier</h3>
                <p className="text-gray-600 mb-4">
                  We offer a free tier that includes basic features such as business profile creation, one active digital flyer, 
                  and private feedback capabilities.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Paid Plans</h3>
                <p className="text-gray-600 mb-4">
                  Our paid plans (Standard and Premium) offer additional features. Subscription fees are charged monthly and are 
                  non-refundable except as required by law.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Zero Commission Policy</h3>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne does not charge any commission on sales or transactions made through our platform. Businesses keep 
                  100% of their earnings from customer transactions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Business Content and Conduct</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Content Guidelines</h3>
                <p className="text-gray-600 mb-4">
                  Businesses are responsible for all content they post, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Business information and descriptions</li>
                  <li>Digital flyers and promotional materials</li>
                  <li>Coupons and special offers</li>
                  <li>Images and logos</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Prohibited Content</h3>
                <p className="text-gray-600 mb-4">
                  You may not post content that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Is illegal, fraudulent, or deceptive</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains malware or harmful code</li>
                  <li>Is offensive, discriminatory, or harassing</li>
                  <li>Violates any applicable laws or regulations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Coupon Terms</h3>
                <p className="text-gray-600 mb-4">
                  Businesses must honor all coupons and offers published through our platform according to the terms specified. 
                  Any changes or cancellations must be communicated to NeighborlyOne immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Private Feedback System</h2>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne does not support public reviews. All feedback is private and constructive, shared directly between 
                  customers and businesses. Businesses agree to respond to feedback professionally and constructively.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Your Content</h3>
                <p className="text-gray-600 mb-4">
                  You retain ownership of all content you submit to NeighborlyOne. By posting content, you grant us a worldwide, 
                  non-exclusive, royalty-free license to use, display, and distribute your content on our platform.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Our Platform</h3>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne and its original content, features, and functionality are owned by us and are protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account and access to our services immediately, without prior notice or liability, 
                  for any reason, including breach of these Terms.
                </p>
                <p className="text-gray-600 mb-4">
                  You may terminate your account at any time through your account settings. Upon termination, your right to use 
                  the service will immediately cease.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  To the maximum extent permitted by law, NeighborlyOne shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Your use or inability to use the service</li>
                  <li>Unauthorized access to your account</li>
                  <li>Statements or conduct of any third party on the service</li>
                  <li>Any other matter relating to the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
                <p className="text-gray-600 mb-4">
                  The service is provided "as is" and "as available" without warranties of any kind, either express or implied, 
                  including but not limited to implied warranties of merchantability, fitness for a particular purpose, and 
                  non-infringement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard 
                  to its conflict of law provisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide 
                  at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be 
                  determined at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> legal@neighborlyone.com<br />
                  <strong>Address:</strong> NeighborlyOne Legal Department<br />
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4">
                <Link
                  to="/privacy"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Privacy Policy →
                </Link>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2024 NeighborlyOne. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-sm hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

