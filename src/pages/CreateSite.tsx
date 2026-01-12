import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const CreateSite = () => {
  // Generate stable particle positions
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7 + 10) % 100}%`,
      duration: 4 + (i % 4),
      delay: i * 0.25,
    })), 
  []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Stunning Cityscape Background with Ken Burns Effect */}
      <div className="fixed inset-0">
        <motion.div 
          className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%]"
          animate={{ 
            scale: [1, 1.08],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=90"
            alt="Stunning cityscape at dusk"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark gradient overlay - heavier at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        {/* Warm accent glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex justify-between items-center px-8 md:px-16 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back</span>
        </Link>
        <span className="text-white/30 text-sm tracking-[0.3em]">EST. 2024</span>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 md:px-16 pt-8 md:pt-12 pb-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Accent line */}
          <motion.div 
            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-amber-400/80 text-sm md:text-base tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Digital Presence Awaits
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            <span className="block">Professional Website</span>
            <span className="block mt-2">
              in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                30 Minutes
              </span>
            </span>
          </h1>
          
          <motion.p 
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Powered By Lightning-Fast AI
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/builder">
              <Button 
                size="lg" 
                className="text-lg md:text-xl px-12 py-8 h-auto rounded-full bg-white text-black hover:bg-amber-100 transition-all duration-500 tracking-wide shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* The Experience Section */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-20">
            <p className="text-amber-400/60 text-sm tracking-[0.3em] uppercase mb-4">The Experience</p>
            <h2 className="font-display text-3xl md:text-5xl text-white">Three effortless moments to your new website</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Share Your Story", 
                desc: "Simply tell us your business name and how to reach you. We handle everything else." 
              },
              { 
                step: "02", 
                title: "Add Your Images", 
                desc: "Upload your finest photos directly. We'll ensure they look absolutely stunning." 
              },
              { 
                step: "03", 
                title: "From Any Device", 
                desc: "Photos on your phone? Scan a simple code and they appear instantly. Pure magic." 
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-400/30 transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <span className="text-amber-400/40 text-sm font-mono tracking-wider">{item.step}</span>
                <h3 className="font-display text-2xl text-white mt-4 mb-3 group-hover:text-amber-200 transition-colors">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-amber-400/5 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Phone Upload Feature */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 text-sm tracking-wide">Magic Feature</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
                  Photos on Your Phone?
                </h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  We've crafted an effortless solution. Simply scan a code with your camera, 
                  select your images, and watch them appear on your new website. 
                  No cables. No confusion. Just seamless simplicity.
                </p>
              </div>
              
              <div className="w-40 h-40 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <div className="w-28 h-28 bg-white/80 rounded-xl flex items-center justify-center">
                  <span className="text-black/30 text-xs">QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="relative z-10 px-8 md:px-16 py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-white">What's Included</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Professional website design",
              "Optimized for every device",
              "One-tap calling for customers",
              "Shareable link for anywhere",
              "Lightning-fast loading",
              "Completely complimentary",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-center gap-4 p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white/80 text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-8 md:px-16 py-32">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/60 text-xl mb-8">
            Ready to elevate your presence?
          </p>
          
          <Link to="/builder">
            <Button 
              size="lg" 
              className="text-xl px-16 py-10 h-auto rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-black hover:from-amber-300 hover:via-amber-400 hover:to-amber-300 transition-all duration-500 tracking-wide shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 font-medium"
            >
              Begin Your Journey
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
          
          <p className="text-white/40 mt-8 text-base">
            A few minutes is all it takes
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 md:px-16 py-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-amber-400/30" />
            <span className="text-amber-400/60 text-xs tracking-[0.3em] uppercase">
              Crafted with Care
            </span>
            <div className="h-px w-8 bg-amber-400/30" />
          </div>
          <p className="text-white/40 text-sm">
            Questions? We're here to guide you every step of the way.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateSite;
