import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Smartphone, Camera, Sparkles, ArrowRight, CheckCircle2, ArrowLeft, Star, Zap, Shield } from 'lucide-react';

const CreateSite = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="relative z-10 px-6 pt-6">
        <Link to="/">
          <Button variant="ghost" size="lg" className="text-base px-6 py-5 h-auto">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-12 pb-16 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Professional Websites Made Simple
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Business
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Deserves Better
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            In just a few minutes, you'll have a beautiful, professional website 
            that makes customers call.
          </p>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            {[
              { icon: Zap, label: "Ready in Minutes" },
              { icon: Shield, label: "Always Looks Great" },
              { icon: Star, label: "100% Free" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          >
            Three Simple Steps
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                num: "1",
                icon: Sparkles,
                title: "Tell Us About Your Business",
                desc: "Your name, phone number, what you do. That's all we need to get started."
              },
              {
                num: "2", 
                icon: Camera,
                title: "Add Your Best Photos",
                desc: "Upload right from your computer. We'll make them look amazing automatically."
              },
              {
                num: "3",
                icon: Smartphone,
                title: "Photos on Your Phone? No Problem!",
                desc: "Just scan a code with your camera. Your pictures appear like magic — no cables, no confusion."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Upload Feature Highlight */}
      <section className="relative z-10 px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-3xl p-8 md:p-10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Smartphone className="w-10 h-10 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Pictures on Your Phone?
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We've made this <strong className="text-foreground">super easy</strong>. 
                  Scan a simple code, pick your photos, and they're instantly on your new website. 
                  No tech skills needed!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What You Get */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5"
          >
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              What You'll Get
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Your own professional website",
                "Works beautifully on all phones",
                "Easy link to share anywhere",
                "Customers can tap to call you",
                "Looks great on any device",
                "Ready in just minutes"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-foreground text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="max-w-xl mx-auto text-center"
        >
          <Link to="/builder">
            <Button 
              size="lg" 
              className="text-xl md:text-2xl px-12 py-8 h-auto w-full rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
              Let's Build Your Site
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
          <p className="text-lg text-muted-foreground mt-6">
            Takes about 5 minutes • Completely free
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Questions? We're here to help you every step of the way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateSite;
