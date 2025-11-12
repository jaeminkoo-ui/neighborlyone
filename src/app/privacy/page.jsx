import { Link } from "react-router";
import Logo from "../components/Logo";

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last Updated: November 11, 2024</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our platform and mobile application.
                </p>
                <p className="text-gray-600">
                  By using NeighborlyOne, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Business Users:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Account information (name, email, phone number, password)</li>
                  <li>Business details (business name, address, hours, description)</li>
                  <li>Business images and logos</li>
                  <li>Payment information for paid subscriptions</li>
                  <li>Promotional content (flyers, coupons, special offers)</li>
                </ul>

                <p className="text-gray-600 mb-4">
                  <strong>Resident Users:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Account information (name, email, password)</li>
                  <li>Location data (to show nearby businesses)</li>
                  <li>Saved businesses and favorite locations</li>
                  <li>Redeemed coupons and loyalty card data</li>
                  <li>Private feedback submitted to businesses</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Device information (device type, operating system, unique device identifiers)</li>
                  <li>Log data (IP address, browser type, pages visited, time spent)</li>
                  <li>Location data (GPS, WiFi, cellular data when location services are enabled)</li>
                  <li>Usage analytics (app interactions, features used, engagement metrics)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies and Tracking Technologies</h3>
                <p className="text-gray-600 mb-4">
                  We use cookies, web beacons, and similar tracking technologies to track activity on our service and 
                  hold certain information. You can instruct your browser to refuse all cookies or to indicate when a 
                  cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Create and manage your account</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, and security alerts</li>
                  <li>Provide customer service and support</li>
                  <li>Personalize your experience and show you relevant local businesses</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues and fraudulent activity</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Location Data</h2>
                <p className="text-gray-600 mb-4">
                  NeighborlyOne is a location-based service. We use location data to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Show you nearby businesses and deals</li>
                  <li>Help businesses reach local customers</li>
                  <li>Provide location-specific push notifications</li>
                  <li>Improve our services and analytics</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  You can control location permissions through your device settings. Disabling location services may limit 
                  the functionality of our app.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How We Share Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Business Listings</h3>
                <p className="text-gray-600 mb-4">
                  Business profiles, including name, address, hours, description, and promotional content, are publicly 
                  visible to all app users.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Service Providers</h3>
                <p className="text-gray-600 mb-4">
                  We may share your information with third-party service providers who perform services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Payment processing</li>
                  <li>Data analytics</li>
                  <li>Cloud hosting</li>
                  <li>Email delivery</li>
                  <li>Customer support</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Legal Requirements</h3>
                <p className="text-gray-600 mb-4">
                  We may disclose your information if required by law or in response to valid requests by public authorities.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.4 Business Transfers</h3>
                <p className="text-gray-600 mb-4">
                  If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part 
                  of that transaction.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.5 Private Feedback</h3>
                <p className="text-gray-600 mb-4">
                  Feedback submitted by residents is shared privately with the specific business. We do not make feedback 
                  public or share it with other businesses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information, 
                  including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive 
                  to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute 
                  security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes 
                  outlined in this Privacy Policy. When you delete your account, we will delete or anonymize your personal 
                  information, except where we are required to retain it by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Privacy Rights</h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Access and Portability</h3>
                <p className="text-gray-600 mb-4">
                  You have the right to access and receive a copy of your personal information.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Correction</h3>
                <p className="text-gray-600 mb-4">
                  You can update your account information at any time through your account settings.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.3 Deletion</h3>
                <p className="text-gray-600 mb-4">
                  You can request deletion of your personal information by contacting us or deleting your account through 
                  the app settings.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.4 Opt-Out</h3>
                <p className="text-gray-600 mb-4">
                  You can opt out of marketing communications by following the unsubscribe link in our emails or adjusting 
                  your notification preferences in the app.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.5 California Residents</h3>
                <p className="text-gray-600 mb-4">
                  California residents have additional rights under the California Consumer Privacy Act (CCPA), including 
                  the right to know what personal information is collected and the right to opt out of the sale of personal 
                  information (note: we do not sell personal information).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
                  information from children under 13. If you become aware that a child has provided us with personal information, 
                  please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Links</h2>
                <p className="text-gray-600 mb-4">
                  Our service may contain links to third-party websites or services. We are not responsible for the privacy 
                  practices of these third parties. We encourage you to read their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Your information may be transferred to and maintained on servers located outside of your country where data 
                  protection laws may differ. By using our services, you consent to the transfer of your information to the 
                  United States and other countries.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date. For material changes, we will provide 
                  additional notice (such as an email notification).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@neighborlyone.com<br />
                  <strong>Address:</strong> NeighborlyOne Privacy Department<br />
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Your Consent</h2>
                <p className="text-gray-600">
                  By using our services, you consent to our Privacy Policy and agree to its terms. If you do not agree with 
                  this policy, please discontinue use of our services.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex gap-4">
                <Link
                  to="/terms"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Terms of Service →
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


