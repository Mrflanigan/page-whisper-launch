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
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Animated Background with Truck */}
        <MovingAnimation />

        {/* Header with Company Name - Stacked on mobile */}
        <div className="relative z-20 px-4 sm:px-6 md:px-12 pt-6 md:pt-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-secondary tracking-tight leading-tight">
            <span className="block">Top Choice</span>
            <span className="block md:inline">Moving</span>
          </h1>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-lg md:max-w-5xl mx-auto">
          
          {/* Main CTA - Phone number prominent */}
          <a href="tel:253-267-3212" className="inline-block w-full sm:w-auto mb-6">
            <Button
              size="lg"
              className="w-full sm:w-auto text-xl md:text-2xl px-8 py-5 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="w-6 h-6 mr-3" />
              253-267-3212
            </Button>
          </a>
          <p className="text-secondary/80 text-sm mb-8">
            Tap to call for a free quote!
          </p>

          {/* Simple info */}
          <div className="space-y-2 text-secondary/80 text-sm mb-6">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>King, Pierce & surrounding areas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon–Sat, 9am–5pm</span>
            </div>
          </div>

          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-secondary/20 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                View Services
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 bg-card border border-border shadow-lg z-50">
              <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-muted">
                <Truck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-card-foreground">Loading & Unloading</p>
                  <p className="text-sm text-muted-foreground">Uhaul, Penske, Budget & more</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-default focus:bg-muted">
                <Trash2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-card-foreground">Hauling & Dump Runs</p>
                  <p className="text-sm text-muted-foreground">Full load required</p>
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
            </DropdownMenuContent>
          </DropdownMenu>
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
