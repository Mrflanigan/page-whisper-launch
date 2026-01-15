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
        {/* Main Box - BLUE SKY TO SUNSET TO OCEAN */}
        <div className="w-[120vw] min-w-[500px] h-[85vh] min-h-[400px] bg-gradient-to-b from-sky-400 via-sky-300 via-30% via-amber-300 via-50% via-orange-400 via-70% to-rose-500 border-2 border-orange-600 rounded-tr-xl shadow-2xl flex flex-col items-center justify-center px-8 relative overflow-hidden">
          {/* Sun glow - BIG */}
          <div 
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[55%] rounded-full opacity-80 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,240,150,1) 0%, rgba(255,200,80,0.8) 25%, rgba(255,150,50,0.5) 50%, transparent 75%)' }}
          />
          
          {/* Top trim - golden */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-yellow-400 to-amber-400" />
          
          {/* Bottom trim - deep sunset */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-cyan-900 to-rose-500 z-20" />
          
          {/* Horizontal cloud streaks */}
          <div className="absolute top-[20%] left-0 right-0 h-8 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <div className="absolute top-[35%] left-[10%] right-[20%] h-4 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent pointer-events-none" />
          <div className="absolute top-[45%] left-[5%] right-[10%] h-6 bg-gradient-to-r from-transparent via-rose-300/20 to-transparent pointer-events-none" />
          
          {/* Ocean in the distance */}
          <div className="absolute bottom-6 left-0 right-0 h-[25%] overflow-hidden pointer-events-none">
            {/* Ocean gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-400/60 via-cyan-600/70 to-cyan-800/80" />
            {/* Sun reflection on water */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-full opacity-70"
              style={{ background: 'linear-gradient(to bottom, rgba(255,200,100,0.8) 0%, rgba(255,150,50,0.4) 30%, rgba(255,100,50,0.2) 60%, transparent 100%)' }}
            />
            {/* Wave lines */}
            <div className="absolute top-[20%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute top-[40%] left-[5%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-orange-200/40 to-transparent" />
            <div className="absolute top-[55%] left-[10%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-[70%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
          </div>
          
          {/* Side ridges for realism */}
          <div className="absolute top-4 bottom-6 left-0 w-1 bg-gradient-to-r from-orange-600/50 to-transparent" />
          <div className="absolute top-4 bottom-6 right-0 w-1 bg-gradient-to-l from-orange-600/50 to-transparent" />
          
          {/* Palm tree silhouettes - TALLER */}
          <div className="absolute bottom-6 left-[5%] pointer-events-none z-10">
            {/* Left palm - MASSIVE */}
            <svg width="280" height="600" viewBox="0 0 280 600">
              {/* Trunk - brown */}
              <path d="M125 600 Q135 480 142 300 Q138 220 130 150 L150 150 Q158 220 154 300 Q162 480 175 600 Z" className="fill-amber-800" />
              <path d="M130 580 Q138 470 143 310 Q140 230 134 160 L146 160 Q152 230 149 310 Q155 470 162 580 Z" className="fill-amber-700" />
              {/* Fronds - lush green */}
              <path d="M140 165 Q70 110 10 140 Q85 85 140 150 Z" className="fill-green-600" />
              <path d="M140 150 Q55 65 25 80 Q95 40 140 135 Z" className="fill-green-700" />
              <path d="M140 135 Q115 30 140 8 Q165 30 140 135 Z" className="fill-green-500" />
              <path d="M140 150 Q225 65 255 80 Q185 40 140 135 Z" className="fill-green-700" />
              <path d="M140 165 Q210 110 270 140 Q195 85 140 150 Z" className="fill-green-600" />
              <path d="M140 158 Q85 90 40 110 Q110 70 140 145 Z" className="fill-green-500" />
              <path d="M140 158 Q195 90 240 110 Q170 70 140 145 Z" className="fill-green-500" />
            </svg>
          </div>
          
          <div className="absolute bottom-6 right-[6%] pointer-events-none z-10">
            {/* Right palm - MASSIVE, slightly leaning */}
            <svg width="260" height="550" viewBox="0 0 260 550">
              {/* Trunk - brown */}
              <path d="M110 550 Q130 420 142 270 Q138 190 130 130 L150 130 Q158 190 154 270 Q170 420 190 550 Z" className="fill-amber-800" />
              <path d="M116 530 Q134 410 144 275 Q140 198 134 140 L146 140 Q152 198 148 275 Q162 410 178 530 Z" className="fill-amber-700" />
              {/* Fronds - lush green */}
              <path d="M140 145 Q65 100 15 125 Q85 75 140 130 Z" className="fill-green-600" />
              <path d="M140 130 Q70 55 35 68 Q100 30 140 115 Z" className="fill-green-700" />
              <path d="M140 115 Q125 25 145 8 Q165 25 140 115 Z" className="fill-green-500" />
              <path d="M140 130 Q210 55 245 68 Q180 30 140 115 Z" className="fill-green-700" />
              <path d="M140 145 Q215 100 255 125 Q195 75 140 130 Z" className="fill-green-600" />
            </svg>
          </div>
          
          <div className="absolute bottom-6 left-[20%] pointer-events-none z-10">
            {/* Middle palm - tall background */}
            <svg width="200" height="450" viewBox="0 0 200 450">
              {/* Trunk - brown */}
              <path d="M90 450 Q100 350 105 220 Q102 165 95 120 L115 120 Q122 165 118 220 Q125 350 138 450 Z" className="fill-amber-800/90" />
              <path d="M95 430 Q104 340 108 225 Q105 172 99 130 L111 130 Q117 172 114 225 Q120 340 130 430 Z" className="fill-amber-700/90" />
              {/* Fronds - lush green */}
              <path d="M105 132 Q50 90 10 110 Q65 70 105 120 Z" className="fill-green-600/90" />
              <path d="M105 120 Q55 55 25 65 Q78 30 105 108 Z" className="fill-green-700/90" />
              <path d="M105 108 Q92 30 108 10 Q124 30 105 108 Z" className="fill-green-500/90" />
              <path d="M105 120 Q155 55 185 65 Q132 30 105 108 Z" className="fill-green-700/90" />
              <path d="M105 132 Q160 90 195 110 Q145 70 105 120 Z" className="fill-green-600/90" />
            </svg>
          </div>
          
          <div className="absolute bottom-6 right-[24%] pointer-events-none z-10">
            {/* Far palm - medium, distant */}
            <svg width="150" height="350" viewBox="0 0 150 350">
              {/* Trunk - brown */}
              <path d="M68 350 Q76 270 80 175 Q78 130 72 95 L88 95 Q94 130 91 175 Q98 270 108 350 Z" className="fill-amber-800/80" />
              <path d="M72 335 Q79 262 82 180 Q80 138 75 105 L85 105 Q90 138 88 180 Q94 262 102 335 Z" className="fill-amber-700/80" />
              {/* Fronds - lush green */}
              <path d="M80 105 Q40 72 10 88 Q52 58 80 95 Z" className="fill-green-600/80" />
              <path d="M80 95 Q48 45 25 52 Q62 25 80 85 Z" className="fill-green-700/80" />
              <path d="M80 85 Q70 25 82 8 Q94 25 80 85 Z" className="fill-green-500/80" />
              <path d="M80 95 Q112 45 140 52 Q98 25 80 85 Z" className="fill-green-700/80" />
              <path d="M80 105 Q120 72 145 88 Q108 58 80 95 Z" className="fill-green-600/80" />
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
