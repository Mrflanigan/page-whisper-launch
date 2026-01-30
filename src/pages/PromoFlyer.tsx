import { useRef, useState } from "react";
import { Phone, Truck, Clock, MapPin, CheckCircle, ArrowLeft, Copy, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

const PromoFlyer = () => {
  const flyerRef = useRef<HTMLDivElement>(null);
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    if (!flyerRef.current) return;
    
    setIsCopying(true);
    
    try {
      const canvas = await html2canvas(flyerRef.current, {
        backgroundColor: "#2a2520",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to create image");
        }
        
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          
          toast({
            title: "Copied to clipboard!",
            description: "Now paste it anywhere (Ctrl+V or Cmd+V)",
          });
        } catch (clipboardError) {
          console.error("Clipboard error:", clipboardError);
          toast({
            title: "Clipboard blocked",
            description: "Use screenshot instead: Win+Shift+S (Windows) or Cmd+Shift+4 (Mac)",
            variant: "destructive",
          });
        }
        
        setIsCopying(false);
      }, "image/png");
    } catch (error) {
      console.error("Copy error:", error);
      toast({
        title: "Copy failed",
        description: "Use screenshot: Win+Shift+S (Windows) or Cmd+Shift+4 (Mac)",
        variant: "destructive",
      });
      setIsCopying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3d3630] flex flex-col items-center justify-center p-4">
      {/* Controls */}
      <div className="flex items-center justify-between w-[400px] mb-4">
        <Link to="/" className="text-white/60 hover:text-white flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Button 
          onClick={handleCopyToClipboard}
          disabled={isCopying}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isCopying ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {isCopying ? "Copying..." : "Copy to Clipboard"}
        </Button>
      </div>

      {/* Flyer - This is what gets captured */}
      <div ref={flyerRef} className="w-[400px] bg-[#2a2520] rounded-2xl overflow-hidden shadow-2xl border border-[#4a4035]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4a4035] to-[#3d3630] p-6 text-center">
          <h1 className="text-3xl font-bold text-white font-oswald uppercase tracking-wide">
            Top Choice Moving
          </h1>
          <p className="text-white/80 text-base font-semibold mt-1">
            Loading & Unloading Services
          </p>
        </div>

        {/* THE TAGLINE - BIG AND BOLD */}
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

        {/* Truck Icon */}
        <div className="flex justify-center py-4 bg-[#3d3630]">
          <Truck className="w-12 h-12 text-white/80" />
        </div>

        {/* Phone Number - Big & Bold */}
        <div className="text-center py-4 bg-[#2a2520] mx-6 rounded-xl border-2 border-accent">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-6 h-6 text-accent" />
            <span className="text-2xl font-bold text-white font-bookman">
              253-267-3212
            </span>
          </div>
          <p className="text-white/70 text-sm mt-1">Free Estimates!</p>
        </div>

        {/* Truck Types */}
        <div className="p-5 space-y-3">
          <p className="text-white text-center font-semibold text-base">
            We Work With YOUR Truck!
          </p>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#3d3630] rounded-lg py-2 px-1">
              <p className="text-white text-sm font-bold">Uhaul</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg py-2 px-1">
              <p className="text-white text-sm font-bold">Penske</p>
            </div>
            <div className="bg-[#3d3630] rounded-lg py-2 px-1">
              <p className="text-white text-sm font-bold">Budget</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-white text-sm">Very Affordable Rates</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-white text-sm">Flexible Scheduling</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-white text-sm">We Come To You</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#3d3630] p-4 text-center border-t border-[#4a4035]">
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4" />
            <span>King & Pierce County & Surrounding Areas</span>
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
