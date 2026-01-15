import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";
import heroEmpty from "@/assets/hero-empty.jpg";
import newHouse from "@/assets/new-house.jpg";
import newHouseEmpty from "@/assets/new-house-empty.jpg";

type Scene = "original" | "empty" | "newHouse" | "blueEmpty";

const CssTruck = ({ flipped = false }: { flipped?: boolean }) => (
  <div 
    className={`flex items-end ${flipped ? 'scale-x-[-1]' : ''}`}
    style={{ height: '100vh' }}
  >
    {/* Sunset glow behind truck */}
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60vh] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(255,140,50,0.6) 0%, rgba(255,80,50,0.3) 30%, rgba(180,50,100,0.2) 50%, transparent 70%)',
        }}
      />
    </div>
    <div className="flex items-end drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 60px rgba(255,120,50,0.5))' }}>
      {/* Cab Section */}
      <div className="relative z-10">
        {/* Cab Body */}
        <div className="w-36 h-44 bg-gradient-to-b from-amber-500 to-amber-600 rounded-tl-2xl rounded-bl-[40px] border-2 border-amber-700 relative shadow-lg">
          {/* Roof accent */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-amber-400 to-amber-500 rounded-tl-2xl" />
          
          {/* Windshield */}
          <div className="absolute top-5 left-3 right-3 h-20 bg-gradient-to-br from-sky-300 via-sky-200 to-sky-400 rounded-tl-xl rounded-tr-sm border-2 border-amber-800 shadow-inner">
            <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-tl-lg" />
          </div>
          
          {/* Side mirror */}
          <div className="absolute top-8 -left-4 w-4 h-6 bg-amber-800 rounded-l-full shadow-md" />
          
          {/* Door */}
          <div className="absolute bottom-2 left-3 right-3 h-24 bg-gradient-to-b from-amber-400 to-amber-500 border border-amber-700 rounded-sm shadow-inner">
            {/* Door handle */}
            <div className="absolute top-3 right-2 w-1.5 h-5 bg-amber-800 rounded-full" />
            {/* Door line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-amber-600" />
          </div>
          
          {/* Headlight */}
          <div className="absolute bottom-6 -left-1 w-3 h-6 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-l-full border border-amber-700" />
        </div>
        
        {/* Front Wheel */}
        <div className="absolute -bottom-10 left-6 w-24 h-24 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-full border-4 border-gray-600 shadow-xl flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-600 rounded-full" />
          </div>
        </div>
        
        {/* Bumper */}
        <div className="absolute -bottom-2 -left-2 w-20 h-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-l-lg" />
      </div>
      
      {/* Box/Trailer Section */}
      <div className="relative -ml-4">
        {/* Main Box - FULL SUNSET GRADIENT */}
        <div className="w-[120vw] min-w-[500px] h-[85vh] min-h-[400px] bg-gradient-to-b from-amber-300 via-orange-400 via-55% to-rose-500 border-2 border-orange-600 rounded-tr-xl shadow-2xl flex flex-col items-center justify-center px-8 relative overflow-hidden">
          {/* Sun glow in upper area */}
          <div 
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full opacity-60 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,220,100,0.9) 0%, rgba(255,180,50,0.5) 40%, transparent 70%)' }}
          />
          
          {/* Top trim - golden */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-yellow-400 to-amber-400" />
          
          {/* Bottom trim - deep sunset */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-rose-700 to-rose-500" />
          
          {/* Horizontal cloud streaks */}
          <div className="absolute top-[20%] left-0 right-0 h-8 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-[35%] left-[10%] right-[20%] h-4 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent pointer-events-none" />
          <div className="absolute top-[50%] left-[5%] right-[10%] h-6 bg-gradient-to-r from-transparent via-rose-300/20 to-transparent pointer-events-none" />
          
          {/* Side ridges for realism */}
          <div className="absolute top-4 bottom-6 left-0 w-1 bg-gradient-to-r from-orange-600/50 to-transparent" />
          <div className="absolute top-4 bottom-6 right-0 w-1 bg-gradient-to-l from-orange-600/50 to-transparent" />
          
          {/* Palm tree silhouettes */}
          <div className="absolute bottom-6 left-[8%] pointer-events-none">
            {/* Left palm - tall */}
            <svg width="120" height="200" viewBox="0 0 120 200" className="fill-black/80">
              {/* Trunk */}
              <path d="M55 200 Q58 150 62 100 Q60 80 58 60 L62 60 Q64 80 62 100 Q66 150 69 200 Z" />
              {/* Fronds */}
              <path d="M60 65 Q30 40 5 55 Q35 35 60 60 Z" />
              <path d="M60 60 Q25 20 10 25 Q40 15 60 55 Z" />
              <path d="M60 55 Q50 10 60 5 Q70 10 60 55 Z" />
              <path d="M60 60 Q95 20 110 25 Q80 15 60 55 Z" />
              <path d="M60 65 Q90 40 115 55 Q85 35 60 60 Z" />
              <path d="M60 62 Q40 30 20 40 Q50 25 60 58 Z" />
              <path d="M60 62 Q80 30 100 40 Q70 25 60 58 Z" />
            </svg>
          </div>
          
          <div className="absolute bottom-6 right-[12%] pointer-events-none">
            {/* Right palm - medium, slightly leaning */}
            <svg width="100" height="160" viewBox="0 0 100 160" className="fill-black/80">
              {/* Trunk - leaning right */}
              <path d="M42 160 Q50 120 55 80 Q54 65 52 50 L56 50 Q58 65 57 80 Q62 120 70 160 Z" />
              {/* Fronds */}
              <path d="M54 55 Q25 35 5 45 Q30 30 54 50 Z" />
              <path d="M54 50 Q30 15 15 20 Q40 10 54 45 Z" />
              <path d="M54 45 Q50 5 58 0 Q66 5 54 45 Z" />
              <path d="M54 50 Q78 15 93 20 Q68 10 54 45 Z" />
              <path d="M54 55 Q83 35 98 45 Q73 30 54 50 Z" />
            </svg>
          </div>
          
          <div className="absolute bottom-6 left-[25%] pointer-events-none">
            {/* Background palm - smaller */}
            <svg width="80" height="130" viewBox="0 0 80 130" className="fill-black/60">
              {/* Trunk */}
              <path d="M36 130 Q40 100 42 70 Q41 55 39 45 L43 45 Q45 55 44 70 Q48 100 52 130 Z" />
              {/* Fronds */}
              <path d="M41 48 Q20 32 5 40 Q25 28 41 45 Z" />
              <path d="M41 45 Q25 15 12 18 Q32 10 41 42 Z" />
              <path d="M41 42 Q38 8 44 2 Q50 8 41 42 Z" />
              <path d="M41 45 Q57 15 70 18 Q50 10 41 42 Z" />
              <path d="M41 48 Q62 32 77 40 Q57 28 41 45 Z" />
            </svg>
          </div>
          
          {/* Branding Container */}
          <div className={`text-center ${flipped ? 'scale-x-[-1]' : ''} relative z-10`}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
              TOP CHOICE
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white/90 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              MOVING
            </h3>
            <div className="mt-4 inline-block bg-white/90 backdrop-blur-sm px-6 py-2 rounded-lg shadow-lg">
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-orange-600 tracking-wider">
                253-267-3212
              </p>
            </div>
          </div>
        </div>
        
        {/* Rear Wheels */}
        <div className="absolute -bottom-10 right-16 flex gap-2">
          {/* Dual rear wheels */}
          <div className="w-24 h-24 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-full border-4 border-gray-600 shadow-xl flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
            </div>
          </div>
          <div className="-ml-4 w-24 h-24 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-full border-4 border-gray-600 shadow-xl flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Mud flap */}
        <div className="absolute -bottom-6 right-8 w-8 h-12 bg-gray-800 rounded-b-lg" />
        
        {/* Undercarriage */}
        <div className="absolute -bottom-2 left-0 right-12 h-4 bg-gradient-to-b from-gray-600 to-gray-800" />
      </div>
    </div>
  </div>
);

const MovingAnimation = () => {
  const [scene, setScene] = useState<Scene>("original");
  const [truckPhase, setTruckPhase] = useState<"hidden" | "drive-right" | "drive-left">("hidden");

  const backgrounds: Record<Scene, string> = {
    original: heroImage,
    empty: heroEmpty,
    newHouse: newHouse,
    blueEmpty: newHouseEmpty,
  };

  useEffect(() => {
    let isMounted = true;
    
    // Sequence: 1 → 3 → 4 → 2 → 4 → repeat
    const runAnimation = async () => {
      if (!isMounted) return;
      
      // Scene 1: Original room (8s pause)
      setScene("original");
      setTruckPhase("hidden");
      await delay(8000);
      if (!isMounted) return;

      // Truck drives right → transition to Scene 3
      setTruckPhase("drive-right");
      await delay(2500);
      if (!isMounted) return;
      setScene("empty");
      await delay(2600);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Scene 3: Empty room (8s pause)
      await delay(8000);
      if (!isMounted) return;

      // Truck drives left → transition to Scene 4
      setTruckPhase("drive-left");
      await delay(2500);
      if (!isMounted) return;
      setScene("blueEmpty");
      await delay(2600);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Scene 4: Blue empty room (8s pause)
      await delay(8000);
      if (!isMounted) return;

      // Truck drives right → transition to Scene 2
      setTruckPhase("drive-right");
      await delay(2500);
      if (!isMounted) return;
      setScene("newHouse");
      await delay(2600);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Scene 2: New house (8s pause)
      await delay(8000);
      if (!isMounted) return;

      // Truck drives left → transition to Scene 4
      setTruckPhase("drive-left");
      await delay(2500);
      if (!isMounted) return;
      setScene("blueEmpty");
      await delay(2600);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Scene 4: Blue empty room again (8s pause)
      await delay(8000);
      if (!isMounted) return;

      // Truck drives right → back to Scene 1
      setTruckPhase("drive-right");
      await delay(2500);
      if (!isMounted) return;
      setScene("original");
      await delay(2600);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Loop continues
      runAnimation();
    };

    runAnimation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background that crossfades */}
      <motion.div
        key={scene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgrounds[scene]})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Truck animations - HIDDEN on mobile for better performance */}
      <div className="hidden md:block">
        {/* Truck driving right */}
        {truckPhase === "drive-right" && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-8 left-0 z-10 pointer-events-none"
          >
            <CssTruck flipped />
          </motion.div>
        )}

        {/* Truck driving left */}
        {truckPhase === "drive-left" && (
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-8 left-0 z-10 pointer-events-none"
          >
            <CssTruck />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MovingAnimation;
