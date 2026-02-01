import { Phone, CheckCircle, Clock, MapPin, Truck, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";
import heroImage from "@/assets/hero-moving.jpg";

const AdsLanding = () => {
  const phoneNumber = "253-267-3212";

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Trusted Local Movers
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Top Choice Moving
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Loading • Hauling • Dump Runs
          </p>
          
          <p className="text-lg text-gray-400 mb-4">
            Serving Tacoma & Surrounding Areas
          </p>
          
          <p className="text-xl md:text-2xl text-amber-400 font-semibold mb-8">
            You Pack It... Let Us Help Load and Unload. It's What We Do Best!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-green-600/30"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: {phoneNumber}
              </Button>
            </a>
            
            <QuoteModal 
              triggerClassName="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-6 rounded-xl shadow-lg shadow-amber-500/30"
            />
          </div>

          {/* Quick Benefits */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free Quotes
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Same-Day Available
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Affordable Rates
            </span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-[#242424]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            How We Can Help
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Truck className="w-8 h-8" />}
              title="Loading & Unloading"
              description="We handle the heavy lifting. Load your truck or unload at your new place."
            />
            <ServiceCard 
              icon={<MapPin className="w-8 h-8" />}
              title="Hauling & Dump Runs"
              description="Got junk? We haul it away. Yard debris, old furniture, you name it."
            />
            <ServiceCard 
              icon={<Shield className="w-8 h-8" />}
              title="Yard Clearing"
              description="Clear out overgrown areas, remove debris, and prep your property."
            />
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <TrustItem icon={<Clock className="w-6 h-6" />} label="Quick Response" />
            <TrustItem icon={<Truck className="w-6 h-6" />} label="Heavy Lifting" />
            <TrustItem icon={<MapPin className="w-6 h-6" />} label="Local Experts" />
            <TrustItem icon={<Star className="w-6 h-6" />} label="5-Star Service" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#242424] to-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Moving?
          </h2>
          <p className="text-gray-400 mb-8">
            Call now for a free quote. We're here to make your move easy.
          </p>
          
          <a href={`tel:${phoneNumber.replace(/-/g, '')}`}>
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white text-xl px-10 py-7 rounded-xl shadow-lg shadow-green-600/30"
            >
              <Phone className="w-6 h-6 mr-3" />
              {phoneNumber}
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400 text-sm mb-2">Top Choice Moving Inc.</p>
          <div className="flex justify-center gap-4 text-xs">
            <a href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1a1a]/95 backdrop-blur border-t border-white/10 md:hidden z-50">
        <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="block">
          <Button 
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-xl"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now: {phoneNumber}
          </Button>
        </a>
      </div>

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors">
    <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-500/20 text-amber-400 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const TrustItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="text-amber-400">{icon}</div>
    <span className="text-gray-300 text-sm font-medium">{label}</span>
  </div>
);

export default AdsLanding;
