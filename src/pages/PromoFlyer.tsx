import { Phone, Truck, Clock, MapPin, CheckCircle } from "lucide-react";

const PromoFlyer = () => {
  return (
    <div className="min-h-screen bg-[#3d3630] flex items-center justify-center p-4">
      <div className="w-[400px] bg-[#2a2520] rounded-2xl overflow-hidden shadow-2xl border border-[#4a4035]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4a4035] to-[#3d3630] p-6 text-center">
          <h1 className="text-3xl font-bold text-white font-oswald uppercase tracking-wide">
            Top Choice Moving
          </h1>
          <p className="text-accent text-lg font-semibold mt-1">
            Loading & Unloading Services
          </p>
        </div>

        {/* Truck Icon Section */}
        <div className="flex justify-center py-6 bg-[#3d3630]">
          <div className="bg-accent/20 p-4 rounded-full">
            <Truck className="w-16 h-16 text-accent" />
          </div>
        </div>

        {/* Phone Number - Big & Bold */}
        <div className="text-center py-4 bg-accent mx-6 rounded-xl">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-6 h-6 text-accent-foreground" />
            <span className="text-2xl font-bold text-accent-foreground font-bookman">
              253-267-3212
            </span>
          </div>
          <p className="text-accent-foreground/80 text-sm mt-1">Free Estimates!</p>
        </div>

        {/* Services */}
        <div className="p-6 space-y-3">
          <p className="text-white text-center font-semibold text-lg mb-4">
            We Work With YOUR Truck!
          </p>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#3d3630] rounded-lg p-3">
              <p className="text-white text-sm font-bold">Uhaul</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg p-3">
              <p className="text-white text-sm font-bold">Penske</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg p-3">
              <p className="text-white text-sm font-bold">Budget</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-white text-sm">Licensed & Insured</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-white text-sm">Very Affordable Rates</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-white text-sm">Flexible Scheduling</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#3d3630] p-4 text-center border-t border-[#4a4035]">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>King & Pierce County</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs mt-1">
            <Clock className="w-3 h-3" />
            <span>Mon-Sat • 9am-5pm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoFlyer;
