import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import heroImage from "@/assets/hero-moving.jpg";
import emptyRoom from "@/assets/empty-room.jpg";
import newHouse from "@/assets/new-house.jpg";

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
          initial={{ x: -200 }}
          animate={{ x: "calc(100vw + 200px)" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="absolute bottom-[18%] z-10 pointer-events-none"
        >
          <div className="bg-secondary/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-2xl flex items-center gap-3 border border-secondary">
            <Truck className="w-10 h-10 md:w-14 md:h-14 text-foreground" />
            <div className="text-foreground">
              <p className="text-sm md:text-base font-bold whitespace-nowrap">Top Choice</p>
              <p className="text-xs text-accent font-semibold">253-267-3212</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Truck driving left */}
      {truckPhase === "drive-left" && (
        <motion.div
          initial={{ x: "calc(100vw + 200px)" }}
          animate={{ x: -200 }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="absolute bottom-[18%] z-10 pointer-events-none"
        >
          <div className="bg-secondary/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-2xl flex items-center gap-3 border border-secondary transform scale-x-[-1]">
            <Truck className="w-10 h-10 md:w-14 md:h-14 text-foreground" />
            <div className="text-foreground scale-x-[-1]">
              <p className="text-sm md:text-base font-bold whitespace-nowrap">Top Choice</p>
              <p className="text-xs text-accent font-semibold">253-267-3212</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovingAnimation;
