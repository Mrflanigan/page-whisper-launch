import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";
import emptyRoom from "@/assets/empty-room.jpg";
import newHouse from "@/assets/new-house.jpg";

type Scene = "original" | "empty" | "newHouse";

const CssTruck = ({ flipped = false }: { flipped?: boolean }) => (
  <div 
    className={`flex items-end ${flipped ? 'scale-x-[-1]' : ''}`}
    style={{ height: '70vh', minHeight: '400px' }}
  >
    {/* Truck Container */}
    <div className="flex items-end">
      {/* Cab */}
      <div className="relative">
        {/* Cab body */}
        <div className="w-32 h-40 bg-white rounded-t-lg rounded-bl-3xl border-4 border-gray-700 relative">
          {/* Window */}
          <div className="absolute top-4 left-4 right-4 h-16 bg-sky-200 rounded-t-md border-2 border-gray-600" />
          {/* Door */}
          <div className="absolute bottom-0 left-2 right-2 h-20 bg-gray-100 border-2 border-gray-500 rounded-t-sm">
            <div className="absolute top-2 right-2 w-2 h-4 bg-gray-600 rounded-full" />
          </div>
        </div>
        {/* Front wheel */}
        <div className="absolute -bottom-8 left-4 w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
        </div>
      </div>
      
      {/* Box/Trailer */}
      <div className="relative -ml-2">
        {/* Main box */}
        <div className="w-[50vw] max-w-[600px] min-w-[300px] h-[50vh] min-h-[280px] bg-white border-4 border-gray-700 rounded-tr-lg flex flex-col items-center justify-center px-8">
          {/* Branding */}
          <div className={`text-center ${flipped ? 'scale-x-[-1]' : ''}`}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-800 leading-tight">
              TOP CHOICE
            </h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-700">
              MOVING
            </h3>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-600 mt-4">
              253-267-3212
            </p>
          </div>
        </div>
        {/* Rear wheel */}
        <div className="absolute -bottom-8 right-12 w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
        </div>
        {/* Middle wheel */}
        <div className="absolute -bottom-8 right-36 w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-600 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
        </div>
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
    newHouse: newHouse,
  };

  useEffect(() => {
    let isMounted = true;
    
    const runAnimation = async () => {
      if (!isMounted) return;
      
      // Phase 1: Original scene visible (3s pause)
      setScene("original");
      setTruckPhase("hidden");
      await delay(3000);
      if (!isMounted) return;

      // Phase 2: Truck drives right across screen
      setTruckPhase("drive-right");
      await delay(1000);
      if (!isMounted) return;
      setScene("empty");
      await delay(1500);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Phase 3: Empty room pause (2s)
      await delay(2000);
      if (!isMounted) return;

      // Phase 4: Truck drives left across screen
      setTruckPhase("drive-left");
      await delay(1000);
      if (!isMounted) return;
      setScene("newHouse");
      await delay(1500);
      if (!isMounted) return;
      setTruckPhase("hidden");

      // Phase 5: New house pause (4s)
      await delay(4000);
      if (!isMounted) return;

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

      {/* Truck driving right */}
      {truckPhase === "drive-right" && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="absolute bottom-8 left-0 z-10 pointer-events-none"
        >
          <CssTruck />
        </motion.div>
      )}

      {/* Truck driving left */}
      {truckPhase === "drive-left" && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="absolute bottom-8 left-0 z-10 pointer-events-none"
        >
          <CssTruck flipped />
        </motion.div>
      )}
    </div>
  );
};

export default MovingAnimation;
