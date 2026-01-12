import { Phone, Clock, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-moving.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-secondary" />
            <span className="text-xl md:text-2xl font-bold text-secondary">Top Choice Moving</span>
          </div>
          <a href="tel:253-267-3212" className="hidden sm:flex items-center gap-2 text-secondary hover:text-accent transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-medium">253-267-3212</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <Truck className="w-16 h-16 mx-auto text-secondary mb-4" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 tracking-tight">
            Top Choice Moving
          </h1>
          <p className="text-xl md:text-2xl text-secondary/90 mb-8 font-light">
            Professional Loading & Unloading Services
          </p>
          <p className="text-lg md:text-xl text-secondary/80 mb-12 max-w-2xl mx-auto">
            We work with Uhaul, Penske, and all moving trucks. Very affordable rates — we come to you!
          </p>

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
          <p className="text-secondary/70 mt-4 text-sm">
            Ready to move? Give us a call!
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-secondary/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-secondary/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Services & Info Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Service Card 1 */}
            <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center">
              <Truck className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                All Truck Types
              </h3>
              <p className="text-muted-foreground">
                We load and unload for Uhaul, Penske, Budget, and all other moving truck rentals.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                We Come to You
              </h3>
              <p className="text-muted-foreground">
                Serving King County, Pierce County & all surrounding areas. No job too big or small.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-card rounded-lg p-8 shadow-md border border-border text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Flexible Hours
              </h3>
              <p className="text-muted-foreground">
                Available Monday through Saturday, 9am – 5pm. Very affordable rates.
              </p>
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-secondary rounded-lg p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-secondary-foreground">
              Ready to Get Moving?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto text-left">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-secondary-foreground">Hours</p>
                  <p className="text-muted-foreground">Monday – Saturday</p>
                  <p className="text-muted-foreground">9:00 AM – 5:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-secondary-foreground">Service Area</p>
                  <p className="text-muted-foreground">King County</p>
                  <p className="text-muted-foreground">Pierce County & Surrounding</p>
                </div>
              </div>
            </div>

            {/* Large Phone CTA */}
            <a href="tel:253-267-3212" className="inline-block">
              <Button
                size="lg"
                className="text-2xl md:text-3xl px-10 py-8 h-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-8 h-8 mr-4" />
                253-267-3212
              </Button>
            </a>
            <p className="text-muted-foreground mt-4">
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
