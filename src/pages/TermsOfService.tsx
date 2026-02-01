import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-300 font-montserrat">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Agreement to Terms</h2>
            <p>
              By accessing or using the services of Top Choice Moving Inc., you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Services Provided</h2>
            <p>
              Top Choice Moving Inc. provides loading and unloading labor services, hauling, dump runs, 
              and yard clearing services in the King County, Pierce County, and surrounding areas of Washington State.
            </p>
            <p className="mt-2">
              <strong className="text-white">Important:</strong> We provide labor services only. Customers are 
              responsible for providing their own rental truck or transportation unless otherwise arranged.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Quotes and Pricing</h2>
            <p>
              All quotes provided are estimates based on the information you provide. Final pricing may vary 
              based on actual job requirements, time, and any additional services requested on-site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Scheduling and Cancellations</h2>
            <p>
              We appreciate advance notice for cancellations or rescheduling. Please contact us as soon as 
              possible if you need to change your appointment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Customer Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide accurate information about the job scope</li>
              <li>Ensure safe and clear access to items being moved</li>
              <li>Pack and prepare items as agreed before arrival</li>
              <li>Be present or have an authorized representative on-site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Liability</h2>
            <p>
              While we take care in handling your belongings, Top Choice Moving Inc. provides labor services 
              and is not responsible for pre-existing damage, items improperly packed by the customer, or 
              damage due to circumstances beyond our control. We recommend customers maintain appropriate 
              insurance coverage for valuable items.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Service Area</h2>
            <p>
              We primarily serve King County, Pierce County, and surrounding areas in Washington State. 
              Please contact us to confirm service availability for your location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Information</h2>
            <p>For questions about these Terms of Service, contact us:</p>
            <ul className="mt-2 space-y-1 ml-4">
              <li>Phone: <a href="tel:253-267-3212" className="text-amber-400 hover:underline">253-267-3212</a></li>
              <li>Email: <a href="mailto:Topchoicemovinginc@gmail.com" className="text-amber-400 hover:underline">Topchoicemovinginc@gmail.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services after 
              changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
