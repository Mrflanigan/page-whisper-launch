import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PromoFlyer = () => {
  return (
    <div className="min-h-screen bg-[#2a2520] flex flex-col items-center justify-center p-4">
      {/* Back Link - small and subtle */}
      <Link to="/" className="absolute top-4 left-4 text-white/40 hover:text-white flex items-center gap-2 text-xs">
        <ArrowLeft className="w-3 h-3" />
        Back
      </Link>

      {/* THE FLYER - Clean, no extra stuff */}
      <div className="w-[380px] bg-[#2a2520]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4a4035] to-[#3d3630] p-5 text-center rounded-t-xl">
          <h1 className="text-2xl font-bold text-white font-oswald uppercase tracking-wide">
            Top Choice Moving
          </h1>
          <p className="text-white/80 text-sm font-semibold mt-1 font-montserrat">
            Loading & Unloading Services
          </p>
        </div>

        {/* THE TAGLINE */}
        <div className="bg-accent py-4 px-4 text-center">
          <p className="text-accent-foreground text-lg font-bold leading-tight">
            You Pack It...
          </p>
          <p className="text-accent-foreground text-base font-bold mt-1">
            Let Us Help Load and Unload.
          </p>
          <p className="text-accent-foreground/90 text-sm font-semibold italic mt-1">
            It's What We Do Best!
          </p>
        </div>

        {/* Phone Number */}
        <div className="text-center py-5 bg-[#2a2520]">
          <p className="text-accent text-xs font-bold mb-1">CALL NOW</p>
          <p className="text-3xl font-bold text-white font-bookman">
            253-267-3212
          </p>
          <p className="text-white/70 text-xs mt-1">Free Estimates!</p>
        </div>

        {/* Truck Types */}
        <div className="px-4 pb-3 bg-[#2a2520]">
          <p className="text-white text-center font-semibold text-sm mb-2 font-montserrat">
            We Work With YOUR Truck!
          </p>
          <div className="flex justify-center gap-2 text-center">
            <span className="bg-[#3d3630] rounded px-3 py-1 text-white text-xs font-bold">Uhaul</span>
            <span className="bg-[#3d3630] rounded px-3 py-1 text-white text-xs font-bold">Penske</span>
            <span className="bg-[#3d3630] rounded px-3 py-1 text-white text-xs font-bold">Budget</span>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 py-3 bg-[#2a2520] text-center">
          <p className="text-accent text-xs">✓ Very Affordable Rates</p>
          <p className="text-accent text-xs">✓ Flexible Scheduling</p>
          <p className="text-accent text-xs">✓ We Come To You</p>
        </div>

        {/* Footer */}
        <div className="bg-[#3d3630] p-3 text-center rounded-b-xl">
          <p className="text-white/80 text-xs font-bold">
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
