import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PromoFlyer = () => {
  return (
    <div className="min-h-screen bg-[#3d3630] flex flex-col items-center justify-center p-4">
      {/* Back Link */}
      <Link to="/" className="self-start mb-4 text-white/60 hover:text-white flex items-center gap-2 text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* BIG INSTRUCTIONS */}
      <div className="bg-accent text-accent-foreground px-6 py-4 rounded-xl mb-6 text-center max-w-md">
        <p className="text-xl font-bold mb-2">
          📋 HOW TO COPY:
        </p>
        <p className="text-lg font-semibold">
          Press <span className="bg-black/20 px-2 py-1 rounded">Win + Shift + S</span>
        </p>
        <p className="text-base mt-2">
          Then drag a box around the flyer below.
        </p>
        <p className="text-base font-bold mt-2">
          It copies automatically! Just paste into Craigslist.
        </p>
      </div>

      {/* THE FLYER - Clean design */}
      <div className="w-[400px] bg-[#2a2520] rounded-2xl overflow-hidden shadow-2xl border border-[#4a4035]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4a4035] to-[#3d3630] p-6 text-center">
          <h1 className="text-3xl font-bold text-white font-oswald uppercase tracking-wide">
            Top Choice Moving
          </h1>
          <p className="text-white/80 text-base font-semibold mt-1 font-montserrat">
            Loading & Unloading Services
          </p>
        </div>

        {/* THE TAGLINE */}
        <div className="bg-accent py-5 px-4 text-center">
          <p className="text-accent-foreground text-xl font-bold leading-tight">
            You Pack It...
          </p>
          <p className="text-accent-foreground text-lg font-bold mt-1">
            Let Us Help Load and Unload.
          </p>
          <p className="text-accent-foreground/90 text-base font-semibold italic mt-1">
            It's What We Do Best!
          </p>
        </div>

        {/* Phone Number */}
        <div className="text-center py-6 bg-[#2a2520]">
          <p className="text-accent text-sm font-bold mb-1">CALL NOW</p>
          <p className="text-4xl font-bold text-white font-bookman">
            253-267-3212
          </p>
          <p className="text-white/70 text-sm mt-2">Free Estimates!</p>
        </div>

        {/* Truck Types */}
        <div className="px-6 pb-4">
          <p className="text-white text-center font-semibold text-base mb-3 font-montserrat">
            We Work With YOUR Truck!
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#3d3630] rounded-lg py-2">
              <p className="text-white text-sm font-bold">Uhaul</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg py-2">
              <p className="text-white text-sm font-bold">Penske</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg py-2">
              <p className="text-white text-sm font-bold">Budget</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 pb-4 space-y-2">
          <p className="text-accent text-sm">✓ Very Affordable Rates</p>
          <p className="text-accent text-sm">✓ Flexible Scheduling</p>
          <p className="text-accent text-sm">✓ We Come To You</p>
        </div>

        {/* Footer */}
        <div className="bg-[#3d3630] p-4 text-center border-t border-[#4a4035]">
          <p className="text-white/80 text-sm font-bold">
            King & Pierce County & Surrounding Areas
          </p>
          <p className="text-white/60 text-xs mt-1">
            Mon-Sat • 9am-5pm
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoFlyer;
