import { Phone, Clock, MapPin, Truck, Trash2, TreePine, ChevronDown, Smartphone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MovingAnimation from "@/components/MovingAnimation";
import heroMoving from "@/assets/hero-moving.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen md:h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background with Truck */}
        <MovingAnimation />

        {/* ===== DESKTOP VERSION (md and up - 768px+) ===== */}
        <div className="hidden md:flex md:flex-col md:flex-1 relative z-20">
          {/* Header with Company Name */}
          <div className="px-6 md:px-12 pt-8 md:pt-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tight whitespace-nowrap">
              Top Choice Moving
            </h1>
            
            {/* Services Dropdown - Below company name, far right */}
            <div className="flex justify-end mt-4 gap-3">
              <Link to="/mobile-preview">
                <Button 
                  variant="outline" 
                  className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  View Mobile
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  >
                    Services Offered
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 bg-card border border-border shadow-lg z-50">
                  <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-muted">
                    <Truck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-card-foreground">Loading & Unloading</p>
                      <p className="text-sm text-muted-foreground">All truck types: Uhaul, Penske, Budget & more</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-muted">
                    <Trash2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-card-foreground">Hauling & Dump Runs</p>
                      <p className="text-sm text-muted-foreground">Full load required — no single item hauling</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-muted">
                    <TreePine className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-card-foreground">Yard Clearing</p>
                      <p className="text-sm text-muted-foreground">Objects & debris removal</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="p-3 text-center border-t border-border bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      King County, Pierce County & surrounding
                    </p>
                    <p className="text-sm font-semibold text-accent">Very affordable rates!</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Hero Content - Desktop */}
          <div className="flex-1 flex flex-col items-center justify-end text-center px-4 max-w-5xl mx-auto pb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl text-secondary font-bold tracking-wide mb-2">
              Professional Loading & Unloading Services
            </p>
            <p className="text-sm md:text-base text-secondary/80 mb-4 max-w-2xl mx-auto">
              We work with Uhaul, Penske, and all moving trucks. Very affordable rates — we come to you!
            </p>

            {/* Three Service Cards */}
            <div className="grid grid-cols-3 gap-2 mb-4 w-full max-w-2xl">
              <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-2 text-center border border-secondary/30">
                <Truck className="w-5 h-5 mx-auto mb-1 text-secondary" />
                <h3 className="text-xs font-semibold text-secondary">All Truck Types</h3>
              </div>
              <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-2 text-center border border-secondary/30">
                <MapPin className="w-5 h-5 mx-auto mb-1 text-secondary" />
                <h3 className="text-xs font-semibold text-secondary">We Come to You</h3>
              </div>
              <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-2 text-center border border-secondary/30">
                <Clock className="w-5 h-5 mx-auto mb-1 text-secondary" />
                <h3 className="text-xs font-semibold text-secondary">Flexible Hours</h3>
              </div>
            </div>

            {/* Hours & Service Area & Email */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 text-secondary/80 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon–Sat, 9am–5pm</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>King & Pierce County & Surrounding Areas</span>
              </div>
              <a href="mailto:Topchoicemovinginc@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" />
                <span>Topchoicemovinginc@gmail.com</span>
              </a>
            </div>

            {/* CTA Button */}
            <a href="tel:253-267-3212" className="inline-block">
              <Button
                size="lg"
                className="text-xl md:text-2xl px-8 py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-6 h-6 mr-3" />
                <span className="font-bookman font-bold">253-267-3212</span>
              </Button>
            </a>
            <p className="text-secondary/70 mt-2 text-xs">
              Free estimates — we answer!
            </p>
          </div>
        </div>

        {/* ===== MOBILE VERSION (below md - under 768px) ===== */}
        <div className="md:hidden flex flex-col relative z-20">
          {/* PAGE 1: Hero with CTA */}
          <div 
            className="min-h-screen flex flex-col px-6 py-8 relative bg-no-repeat"
            style={{ 
              backgroundImage: `url(${heroMoving})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              backgroundColor: '#6a5d4a'
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-foreground/50" />
            {/* Company Name & Tagline */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-3 font-oswald uppercase">
                Top Choice Moving
              </h1>
              <p className="text-white text-xl font-bold tracking-wide font-montserrat">
                Professional Loading & Unloading Services
              </p>
            </div>

            {/* CTA Button - Primary Action */}
            <a href="tel:253-267-3212" className="inline-flex justify-center w-full mb-6 relative z-10">
              <Button
                size="lg"
                className="text-xl px-6 py-3 h-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-bookman font-bold">253-267-3212</span>
              </Button>
            </a>
            <p className="text-white/70 text-center text-sm font-bold mb-4 relative z-10 font-montserrat">Free Estimates</p>

            {/* Little truck animation */}
            <div className="relative z-10 w-full overflow-hidden mb-4">
              <Truck className="w-8 h-8 text-white animate-truck-mobile" />
            </div>

            {/* Spacer */}
            <div className="flex-1 relative z-10" />

            {/* Key Info - Classy Layout */}
            <div className="relative z-10 text-center space-y-3 mb-6 font-montserrat">
              <p className="text-white/80 text-sm font-bold">
                We work with Uhaul, Penske & all moving trucks!
              </p>
              <p className="text-white/60 text-sm font-bold">
                and...
              </p>
              <p className="text-white text-lg font-bold font-oswald uppercase">
                We Come to You
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold">9am – 5pm • Mon – Sat</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-bold">King & Pierce County</span>
              </div>
              <p className="text-white/70 text-xs font-bold">and surrounding areas</p>
              <a href="mailto:Topchoicemovinginc@gmail.com" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-bold">Topchoicemovinginc@gmail.com</span>
              </a>
              <p className="text-accent font-bold text-base pt-2 font-oswald uppercase">
                Very Affordable Rates
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center pb-6 relative z-10">
              <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
            </div>
          </div>

          {/* PAGE 2: Additional Services */}
          <div className="flex flex-col px-6 py-8 bg-foreground">
            
            {/* Also Available Header */}
            <h2 className="text-white font-bold text-xl text-center mb-6 font-oswald uppercase">
              Also Available
            </h2>

            {/* Services List - Clean & Classy */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-white font-bold font-montserrat">Hauling & Dump Runs</p>
              </div>
              <div className="flex items-center gap-3">
                <TreePine className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-white font-bold font-montserrat">Yard Clearing (objects & debris)</p>
              </div>
            </div>

            {/* Note */}
            <p className="text-white/50 text-sm text-center italic font-bold mb-6 font-montserrat">
              Full load required — no single item hauling
            </p>

            {/* Phone CTA */}
            <a href="tel:253-267-3212" className="block mb-6">
              <Button
                size="lg"
                className="w-full text-xl py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Phone className="w-6 h-6 mr-2" />
                <span className="font-bookman font-bold">253-267-3212</span>
              </Button>
            </a>

            {/* Mobile Footer */}
            <div 
              className="text-center py-6 -mx-6 px-6 mt-4"
              style={{ backgroundColor: '#6a5d4a' }}
            >
              <p className="text-white font-bold text-sm mb-1 font-oswald uppercase">Top Choice Moving Inc.</p>
              <p className="text-white/70 text-xs font-bold font-montserrat">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Desktop Only */}
      <footer className="hidden md:block bg-foreground text-secondary py-6 md:py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-base md:text-lg font-semibold mb-2">Top Choice Moving Inc.</p>
          <p className="text-secondary/70 text-xs md:text-sm">
            Professional loading & unloading services in the greater Seattle area
          </p>
          <p className="text-secondary/50 text-xs mt-4">
            © {new Date().getFullYear()} Top Choice Moving Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
