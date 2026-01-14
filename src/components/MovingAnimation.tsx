import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";
import emptyRoom from "@/assets/empty-room.jpg";
import newHouse from "@/assets/new-house.jpg";
import truckImage from "@/assets/moving-truck-branded.png";

type Scene = "original" | "empty" | "newHouse";

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
      {/* Single background that crossfades */}
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
          className="absolute bottom-0 left-0 z-10 pointer-events-none w-full h-[80%]"
        >
          <img 
            src={truckImage} 
            alt="Top Choice Moving truck" 
            className="h-full w-auto object-contain"
          />
        </motion.div>
      )}

      {/* Truck driving left */}
      {truckPhase === "drive-left" && (
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="absolute bottom-0 right-0 z-10 pointer-events-none w-full h-[80%]"
        >
          <img 
            src={truckImage} 
            alt="Top Choice Moving truck" 
            className="h-full w-auto object-contain scale-x-[-1]"
          />
        </motion.div>
      )}
    </div>
  );
};

export default MovingAnimation;
