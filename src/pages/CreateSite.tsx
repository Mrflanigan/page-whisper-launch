import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Smartphone, Image, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const CreateSite = () => {
  const steps = [
    {
      icon: Sparkles,
      title: "Tell us about your business",
      description: "Just fill in your name, phone number, and what you do. That's it!"
    },
    {
      icon: Image,
      title: "Add your photos",
      description: "Upload pictures right from your computer. They'll look great automatically."
    },
    {
      icon: Smartphone,
      title: "Photos on your phone?",
      description: "No problem! Scan a code with your phone and upload from there. Easy peasy."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero */}
      <div className="px-6 pt-16 pb-12 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Build Your Website
            <br />
            <span className="text-primary">In Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            No tech skills needed. Just answer a few questions and you're done!
          </p>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phone Upload Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="px-6 py-8 max-w-xl mx-auto"
      >
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
          <Smartphone className="w-10 h-10 text-accent mx-auto mb-3" />
          <h3 className="font-semibold text-foreground text-lg mb-2">
            Pictures on your phone?
          </h3>
          <p className="text-muted-foreground">
            Don't worry — we've made that super easy! Just scan a code and your 
            photos jump right over. No cables, no emails, no headaches.
          </p>
        </div>
      </motion.div>

      {/* What You Get */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold text-foreground text-center mb-6">
          What you'll get:
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Your own website",
            "Works on all phones",
            "Easy to share link",
            "Looks professional",
            "Ready in minutes",
            "Totally free"
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-foreground text-sm">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-6 py-12 text-center"
      >
        <Link to="/builder">
          <Button size="lg" className="text-lg px-8 py-6 h-auto">
            Let's Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Takes about 5 minutes
        </p>
      </motion.div>

      {/* Footer */}
      <div className="px-6 py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          Questions? We're here to help!
        </p>
      </div>
    </div>
  );
};

export default CreateSite;
