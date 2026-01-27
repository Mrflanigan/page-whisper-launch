import { Phone, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  const phoneNumber = "253-267-3212";

  // Fire Google Ads conversion on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17900064574/pFfiCKydmu0bEL6etddC',
        'value': 1.0,
        'currency': 'USD'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-500 rounded-full mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Thank You!
        </h1>
        
        <p className="text-lg text-gray-300 mb-2">
          Your request has been received.
        </p>
        
        <p className="text-gray-400 mb-8">
          We'll get back to you as soon as possible. For immediate assistance, give us a call!
        </p>

        {/* Call Button */}
        <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="block mb-4">
          <Button 
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl shadow-lg shadow-green-600/30"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now: {phoneNumber}
          </Button>
        </a>

        {/* Back Link */}
        <Link to="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
