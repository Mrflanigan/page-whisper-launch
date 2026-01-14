import { Phone, Clock, MapPin, Truck, Trash2, TreePine, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        {/* Header with Company Name and Services Dropdown */}
        <div className="relative z-10 px-6 md:px-12 pt-8 md:pt-12 flex justify-between items-start">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tight whitespace-nowrap">
            Top Choice Moving
          </h1>
          
          {/* Services Dropdown - Far Right */}
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

        {/* Animated Truck - below header */}
        <div className="relative z-10 px-6 md:px-12">
          <div className="animate-truck-drive">
            <Truck className="w-12 h-12 md:w-16 md:h-16 text-secondary" />
          </div>
        </div>

        {/* Hero Content - Centered, moved up */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto -mt-16 md:-mt-20">
          <p className="text-xl md:text-2xl text-secondary/90 mb-2 font-light">
            Professional Loading & Unloading Services
          </p>
          <p className="text-base md:text-lg text-secondary/80 mb-6 max-w-2xl mx-auto">
            We work with Uhaul, Penske, and all moving trucks. Very affordable rates — we come to you!
          </p>

          {/* Three Service Cards - on hero */}
          <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-3xl">
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 text-center border border-secondary/30">
              <Truck className="w-6 h-6 mx-auto mb-1 text-secondary" />
              <h3 className="text-sm font-semibold text-secondary">All Truck Types</h3>
            </div>
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 text-center border border-secondary/30">
              <MapPin className="w-6 h-6 mx-auto mb-1 text-secondary" />
              <h3 className="text-sm font-semibold text-secondary">We Come to You</h3>
            </div>
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 text-center border border-secondary/30">
              <Clock className="w-6 h-6 mx-auto mb-1 text-secondary" />
              <h3 className="text-sm font-semibold text-secondary">Flexible Hours</h3>
            </div>
          </div>

          {/* CTA Button */}
          <a href="tel:253-267-3212" className="inline-block">
            <Button
              size="lg"
              className="text-xl md:text-2xl px-8 py-6 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="w-6 h-6 mr-3" />
              253-267-3212
            </Button>
          </a>
          <p className="text-secondary/70 mt-3 text-sm">
            Ready to move? Give us a call!
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 pb-6 flex justify-center">
          <div className="w-6 h-10 border-2 border-secondary/50 rounded-full flex justify-center animate-bounce">
            <div className="w-1.5 h-3 bg-secondary/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Business Info Section */}
      <section className="py-10 px-4 bg-background">
        <div className="max-w-5xl mx-auto">

          {/* Business Info */}
          <div className="bg-secondary rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-5 text-secondary-foreground">
              Ready to Get Moving?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6 max-w-xl mx-auto text-left">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-secondary-foreground">Hours</p>
                  <p className="text-sm text-muted-foreground">Monday – Saturday, 9am – 5pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-secondary-foreground">Service Area</p>
                  <p className="text-sm text-muted-foreground">King & Pierce County</p>
                </div>
              </div>
            </div>

            {/* Large Phone CTA */}
            <a href="tel:253-267-3212" className="inline-block">
              <Button
                size="lg"
                className="text-xl md:text-2xl px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-6 h-6 mr-3" />
                253-267-3212
              </Button>
            </a>
            <p className="text-muted-foreground mt-3 text-sm">
              Tap to call now!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-secondary py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Top Choice Moving Inc.</p>
          <p className="text-secondary/70 text-sm">
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
