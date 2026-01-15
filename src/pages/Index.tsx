import { Phone, Clock, MapPin, Truck, Trash2, TreePine, ChevronDown, Smartphone } from "lucide-react";
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

            {/* Hours & Service Area */}
            <div className="flex gap-6 mb-4 text-secondary/80 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Mon–Sat, 9am–5pm</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>King & Pierce County & Surrounding Areas</span>
              </div>
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
              backgroundSize: '140%',
              backgroundPosition: 'center 50%'
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-foreground/50" />
            {/* Company Name & Tagline */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-4xl font-bold text-secondary tracking-tight leading-tight mb-3">
                Top Choice Moving
              </h1>
              <p className="text-secondary text-xl font-bold tracking-wide">
                Professional Loading & Unloading Services
              </p>
              <p className="text-secondary/70 text-sm mt-1">
                We work with Uhaul, Penske & all moving trucks!
              </p>
            </div>

            {/* CTA Button - Primary Action */}
            <a href="tel:253-267-3212" className="inline-flex justify-center w-full mb-6 relative z-10">
              <Button
                size="sm"
                className="text-base px-5 py-2 h-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-bookman font-bold">253-267-3212</span>
              </Button>
            </a>
            <p className="text-secondary/70 text-center text-sm mb-4 relative z-10">Free Estimates</p>

            {/* Spacer to push content to bottom */}
            <div className="flex-1 relative z-10" />

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
              <div className="bg-secondary/15 rounded-xl p-4 text-center border border-secondary/20">
                <Truck className="w-7 h-7 mx-auto mb-2 text-accent" />
                <h3 className="text-sm font-semibold text-secondary">All Truck Types</h3>
              </div>
              <div className="bg-secondary/15 rounded-xl p-4 text-center border border-secondary/20">
                <MapPin className="w-7 h-7 mx-auto mb-2 text-accent" />
                <h3 className="text-sm font-semibold text-secondary">We Come to You</h3>
              </div>
              <div className="bg-secondary/15 rounded-xl p-4 text-center border border-secondary/20">
                <Clock className="w-7 h-7 mx-auto mb-2 text-accent" />
                <h3 className="text-sm font-semibold text-secondary">Flexible Hours</h3>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex flex-col items-center pb-6 relative z-10">
              <p className="text-secondary/60 text-sm mb-2">Learn more</p>
              <ChevronDown className="w-6 h-6 text-secondary/60 animate-bounce" />
            </div>
          </div>

          {/* PAGE 2: Services & Rates */}
          <div className="min-h-screen flex flex-col px-6 py-8 bg-foreground">
            {/* Very Affordable Rates - Hero Banner */}
            <div className="bg-accent/20 rounded-xl p-6 mb-8 border border-accent/40 text-center">
              <p className="text-accent font-bold text-2xl mb-1">Very Affordable Rates!</p>
              <p className="text-secondary/80 text-sm">Quality service at prices you'll love</p>
            </div>

            {/* Services Section */}
            <div className="bg-secondary/10 rounded-xl p-5 mb-8 border border-secondary/20">
              <h2 className="text-secondary font-bold text-lg text-center mb-5">Our Services</h2>
              
              <div className="space-y-5">
                {/* Loading & Unloading */}
                <div className="flex items-start gap-4">
                  <Truck className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-secondary font-semibold text-base">Loading & Unloading</h3>
                    <p className="text-secondary/70 text-sm mt-1">Uhaul, Penske & all moving trucks</p>
                  </div>
                </div>

                {/* Hauling & Dump Runs */}
                <div className="flex items-start gap-4">
                  <Trash2 className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-secondary font-semibold text-base">Hauling & Dump Runs</h3>
                    <p className="text-secondary/70 text-sm mt-1">Full load required — no single item</p>
                  </div>
                </div>

                {/* Yard Clearing */}
                <div className="flex items-start gap-4">
                  <TreePine className="w-7 h-7 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-secondary font-semibold text-base">Yard Clearing & Debris Removal</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours & Service Area */}
            <div className="bg-secondary/10 rounded-xl p-5 mb-8 border border-secondary/20">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-secondary font-semibold">Hours</h3>
                  <p className="text-secondary/80 text-sm">Monday – Saturday, 9am – 5pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-secondary font-semibold">Service Area</h3>
                  <p className="text-secondary/80 text-sm">King & Pierce County & Surrounding Areas</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <span className="bg-accent/20 text-accent px-5 py-2 rounded-full text-sm font-semibold border border-accent/30">
                ✓ Licensed & Insured
              </span>
            </div>

            {/* Second CTA at bottom */}
            <a href="tel:253-267-3212" className="block mt-auto">
              <Button
                size="lg"
                className="w-full text-xl py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Phone className="w-6 h-6 mr-2" />
                <span className="font-bookman font-bold">253-267-3212</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-secondary py-6 md:py-8 px-4">
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
