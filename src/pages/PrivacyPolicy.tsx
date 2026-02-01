import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-oswald uppercase">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-300 font-montserrat">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
            <p>
              When you request a quote or contact us, we collect the following information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address (optional)</li>
              <li>Details about your moving or hauling needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Respond to your quote requests</li>
              <li>Contact you about our services</li>
              <li>Schedule and provide moving services</li>
              <li>Improve our customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties. 
              Your information is only used to provide the services you request from Top Choice Moving Inc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to improve your experience 
              and analyze website traffic. We also use Google Analytics and Google Ads to understand 
              how visitors use our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
            <p>
              You may request to access, correct, or delete your personal information by contacting us 
              at the phone number or email listed on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>Phone: <a href="tel:253-267-3212" className="text-amber-400 hover:underline">253-267-3212</a></li>
              <li>Email: <a href="mailto:Topchoicemovinginc@gmail.com" className="text-amber-400 hover:underline">Topchoicemovinginc@gmail.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page 
              with an updated revision date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
