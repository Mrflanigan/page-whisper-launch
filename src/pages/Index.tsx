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
      <section className="relative min-h-screen md:h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background with Truck */}
        <MovingAnimation />

        {/* Header with Company Name */}
        <div className="relative z-20 px-4 sm:px-6 md:px-12 pt-6 md:pt-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-secondary tracking-tight">
            Top Choice Moving
          </h1>
          
          {/* Services Dropdown - Below company name */}
          <div className="flex justify-start sm:justify-end mt-3 md:mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-sm md:text-base"
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
        <div className="relative z-20 flex-1 flex flex-col items-center justify-end text-center px-4 max-w-5xl mx-auto pb-6 md:pb-8">
          <p className="text-base md:text-xl text-secondary/90 mb-1 font-light">
            Professional Loading & Unloading Services
          </p>
          <p className="text-xs md:text-base text-secondary/80 mb-4 max-w-2xl mx-auto px-2">
            We work with Uhaul, Penske, and all moving trucks. Very affordable rates — we come to you!
          </p>

          {/* Three Service Cards - Stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 w-full max-w-2xl">
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 sm:p-2 text-center border border-secondary/30 flex items-center sm:flex-col gap-3 sm:gap-0">
              <Truck className="w-6 h-6 sm:w-5 sm:h-5 sm:mx-auto sm:mb-1 text-secondary" />
              <h3 className="text-sm sm:text-xs font-semibold text-secondary">All Truck Types</h3>
            </div>
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 sm:p-2 text-center border border-secondary/30 flex items-center sm:flex-col gap-3 sm:gap-0">
              <MapPin className="w-6 h-6 sm:w-5 sm:h-5 sm:mx-auto sm:mb-1 text-secondary" />
              <h3 className="text-sm sm:text-xs font-semibold text-secondary">We Come to You</h3>
            </div>
            <div className="bg-secondary/20 backdrop-blur-sm rounded-lg p-3 sm:p-2 text-center border border-secondary/30 flex items-center sm:flex-col gap-3 sm:gap-0">
              <Clock className="w-6 h-6 sm:w-5 sm:h-5 sm:mx-auto sm:mb-1 text-secondary" />
              <h3 className="text-sm sm:text-xs font-semibold text-secondary">Flexible Hours</h3>
            </div>
          </div>

          {/* Hours & Service Area - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 text-secondary/80 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon–Sat, 9am–5pm</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>King, Pierce & surrounding areas</span>
            </div>
          </div>

          {/* CTA Button */}
          <a href="tel:253-267-3212" className="inline-block w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg md:text-2xl px-6 md:px-8 py-4 md:py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
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
