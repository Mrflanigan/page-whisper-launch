import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Smartphone, Camera, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const CreateSite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/3" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 md:px-12 py-6 flex justify-between items-center">
        <Link to="/">
          <Button variant="ghost" size="lg" className="text-base px-6 py-5 h-auto text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </Link>
        <div className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
          Est. 2024
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-12 pt-8 md:pt-16 pb-20 md:pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-accent/50" />
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Your Digital Presence
              </span>
              <div className="h-px w-12 bg-accent/50" />
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-8 leading-[1.1] tracking-tight">
              A Website as
              <br />
              <em className="font-normal">Remarkable</em> as
              <br />
              Your Business
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              In just minutes, create a stunning online presence that captures 
              the essence of what makes you exceptional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="relative z-10 flex justify-center pb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>

      {/* The Experience */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
              The Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              Three effortless moments to your new website
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Share Your Story",
                desc: "Simply tell us your business name and how to reach you. We handle everything else."
              },
              {
                num: "02",
                title: "Add Your Images",
                desc: "Upload your finest photos directly. We'll ensure they look absolutely stunning."
              },
              {
                num: "03",
                title: "From Any Device",
                desc: "Photos on your phone? Scan a simple code and they appear instantly. Pure magic."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                className="text-center"
              >
                <div className="text-accent text-sm tracking-[0.2em] mb-4 font-medium">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Feature - Luxury Callout */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative border border-accent/20 rounded-sm p-10 md:p-14 bg-gradient-to-b from-card to-background">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/40" />

            <div className="text-center">
              <Smartphone className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-4">
                Photos on Your Phone?
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                We've crafted an effortless solution. Simply scan a code with your camera, 
                select your images, and watch them appear on your new website. 
                No cables. No confusion. Just seamless simplicity.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground">
              What's Included
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="grid sm:grid-cols-2 gap-x-12 gap-y-5"
          >
            {[
              "Professional website design",
              "Optimized for every device",
              "One-tap calling for customers",
              "Shareable link for anywhere",
              "Lightning-fast loading",
              "Completely complimentary"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <Check className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={1.5} />
                <span className="text-foreground text-lg">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-12 pt-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-muted-foreground mb-8 text-lg">
            Ready to elevate your presence?
          </p>
          
          <Link to="/builder">
            <Button 
              size="lg" 
              className="text-lg md:text-xl px-12 py-8 h-auto w-full max-w-md rounded-sm bg-foreground text-background hover:bg-foreground/90 transition-all duration-500 tracking-wide"
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
          
          <p className="text-muted-foreground mt-8 text-base">
            A few minutes is all it takes
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-accent/30" />
            <span className="text-accent text-xs tracking-[0.3em] uppercase">
              Crafted with Care
            </span>
            <div className="h-px w-8 bg-accent/30" />
          </div>
          <p className="text-muted-foreground text-sm">
            Questions? We're here to guide you every step of the way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateSite;
