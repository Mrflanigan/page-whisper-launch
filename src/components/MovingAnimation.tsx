import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";
import emptyRoom from "@/assets/empty-room.jpg";
import newHouse from "@/assets/new-house.jpg";

type Scene = "original" | "empty" | "newHouse" | "blueEmpty";

const CssTruck = ({ flipped = false }: { flipped?: boolean }) => (
  <div 
    className={`flex items-end ${flipped ? 'scale-x-[-1]' : ''}`}
    style={{ height: '100vh' }}
  >
    <div className="flex items-end drop-shadow-2xl">
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
        {/* Main Box */}
        <div className="w-[120vw] min-w-[500px] h-[85vh] min-h-[400px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 rounded-tr-xl shadow-2xl flex flex-col items-center justify-center px-8 relative overflow-hidden">
          {/* Top trim */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-400 to-amber-300" />
          
          {/* Bottom trim */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-amber-600 to-amber-400" />
          
          {/* Side ridges for realism */}
          <div className="absolute top-4 bottom-6 left-0 w-1 bg-gradient-to-r from-amber-200 to-transparent" />
          <div className="absolute top-4 bottom-6 right-0 w-1 bg-gradient-to-l from-amber-200 to-transparent" />
          
          {/* Branding Container */}
          <div className={`text-center ${flipped ? 'scale-x-[-1]' : ''} relative z-10`}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-800 leading-none tracking-tight drop-shadow-sm">
              TOP CHOICE
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-700 tracking-wide">
              MOVING
            </h3>
            <div className="mt-4 inline-block bg-amber-500 px-6 py-2 rounded-lg shadow-lg">
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider">
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
    empty: emptyRoom,
    newHouse: emptyRoom, // Placeholder - needs proper image
    blueEmpty: newHouse,
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

      {/* Scene number indicator (temporary) */}
      <div className="absolute top-4 right-4 z-50 bg-red-600 text-white text-4xl font-bold px-4 py-2 rounded-lg">
        {scene === "original" ? "1" : scene === "newHouse" ? "2" : scene === "empty" ? "3" : "4"}
      </div>

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
  );
};

export default MovingAnimation;
