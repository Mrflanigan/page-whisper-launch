import { Phone, Clock, MapPin, Truck, Trash2, TreePine, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MovingAnimation from "@/components/MovingAnimation";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background with Truck */}
        <MovingAnimation />

        {/* Header with Company Name */}
        <div className="relative z-20 px-6 md:px-12 pt-8 md:pt-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-secondary tracking-tight whitespace-nowrap">
            Top Choice Moving
          </h1>
          
          {/* Services Dropdown - Below company name, far right */}
          <div className="flex justify-end mt-4">
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

        {/* Hero Content - Everything on page one */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <p className="text-lg md:text-xl text-secondary/90 mb-1 font-light">
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
              <span>King & Pierce County</span>
            </div>
          </div>

          {/* CTA Button */}
          <a href="tel:253-267-3212" className="inline-block">
            <Button
              size="lg"
              className="text-xl md:text-2xl px-8 py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="w-6 h-6 mr-3" />
              253-267-3212
            </Button>
          </a>
          <p className="text-secondary/70 mt-2 text-xs">
            Tap to call now!
          </p>
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
