import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobilePreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Desktop
          </Button>
        </Link>
      </div>

      <h1 className="text-white text-2xl font-bold mb-6">Mobile Preview</h1>
      
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone outer frame */}
        <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50">
          {/* Phone inner bezel */}
          <div className="bg-black rounded-[2.5rem] p-2 relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10 flex items-center justify-center">
              <div className="w-16 h-4 bg-gray-900 rounded-full" />
            </div>
            
            {/* Screen */}
            <div className="w-[375px] h-[812px] rounded-[2rem] overflow-hidden bg-white">
              <iframe
                src="/?mobilePreview=true"
                className="w-full h-full border-0"
                title="Mobile Preview"
              />
            </div>
          </div>
        </div>
        
        {/* Phone button */}
        <div className="absolute -right-1 top-28 w-1 h-12 bg-gray-700 rounded-r" />
        <div className="absolute -right-1 top-44 w-1 h-8 bg-gray-700 rounded-r" />
        <div className="absolute -left-1 top-32 w-1 h-16 bg-gray-700 rounded-l" />
      </div>

      <p className="text-white/60 text-sm mt-6">
        iPhone 14 Pro dimensions (375 × 812)
      </p>
    </div>
  );
};

export default MobilePreview;
