import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PromoFlyer = () => {
  return (
    <div className="min-h-screen bg-[#2a2520] flex flex-col items-center justify-center p-4">
      {/* Back Link */}
      <Link to="/" className="absolute top-4 left-4 text-white/40 hover:text-white flex items-center gap-2 text-xs">
        <ArrowLeft className="w-3 h-3" />
        Back
      </Link>

      {/* Instructions */}
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg mb-4 text-center">
        <p className="text-lg font-bold">👇 RIGHT-CLICK the image below → "Copy image"</p>
      </div>

      {/* Flyer as actual image using SVG data URL for perfect text */}
      <img 
        src={`data:image/svg+xml,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="550" viewBox="0 0 400 550">
            <rect width="400" height="550" fill="#2a2520"/>
            
            <!-- Header -->
            <rect y="0" width="400" height="90" fill="#3d3630"/>
            <text x="200" y="45" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="28" font-weight="bold" fill="white">TOP CHOICE MOVING</text>
            <text x="200" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#cccccc">Loading &amp; Unloading Services</text>
            
            <!-- Tagline Banner -->
            <rect y="90" width="400" height="95" fill="#d4a574"/>
            <text x="200" y="125" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#1a1a1a">You Pack It...</text>
            <text x="200" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1a1a1a">Let Us Help Load and Unload.</text>
            <text x="200" y="178" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-style="italic" fill="#2a2520">It's What We Do Best!</text>
            
            <!-- Phone Section -->
            <text x="200" y="220" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#d4a574">CALL NOW</text>
            <text x="200" y="260" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="white">253-267-3212</text>
            <text x="200" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#999999">Free Estimates!</text>
            
            <!-- Truck Types -->
            <text x="200" y="325" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">We Work With YOUR Truck!</text>
            <rect x="70" y="340" width="70" height="28" rx="5" fill="#3d3630"/>
            <text x="105" y="359" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Uhaul</text>
            <rect x="165" y="340" width="70" height="28" rx="5" fill="#3d3630"/>
            <text x="200" y="359" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Penske</text>
            <rect x="260" y="340" width="70" height="28" rx="5" fill="#3d3630"/>
            <text x="295" y="359" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Budget</text>
            
            <!-- Features -->
            <text x="200" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#d4a574">✓ Very Affordable Rates</text>
            <text x="200" y="422" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#d4a574">✓ Flexible Scheduling</text>
            <text x="200" y="444" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#d4a574">✓ We Come To You</text>
            
            <!-- Footer -->
            <rect y="470" width="400" height="80" fill="#3d3630"/>
            <text x="200" y="505" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#cccccc">King &amp; Pierce County &amp; Surrounding Areas</text>
            <text x="200" y="528" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#999999">Mon-Sat • 9am-5pm</text>
          </svg>
        `)}`}
        alt="Top Choice Moving Flyer"
        className="rounded-xl shadow-2xl"
        style={{ width: 400, height: 550 }}
      />
    </div>
  );
};

export default PromoFlyer;
