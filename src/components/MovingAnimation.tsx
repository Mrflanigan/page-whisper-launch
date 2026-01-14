import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      await delay(1000); // Halfway through truck animation
      if (!isMounted) return;
      setScene("empty"); // Switch background as truck passes
      await delay(1500); // Truck finishes exiting
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

      // Phase 5: New house pause (longer - 4s)
      await delay(4000);
      if (!isMounted) return;

      // Loop back
      runAnimation();
    };

    runAnimation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <>
      {/* Background layers - z-0 */}
      <AnimatePresence mode="sync">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${backgrounds[scene]})` }}
        />
      </AnimatePresence>

      {/* Dark overlay - z-[1] */}
      <div className="absolute inset-0 bg-foreground/60 z-[1]" />

      {/* Truck layer - z-10 (below content which is z-20+) */}
      <AnimatePresence>
        {truckPhase === "drive-right" && (
          <motion.div
            key="truck-right"
            initial={{ x: "-150px" }}
            animate={{ x: "calc(100vw + 150px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute bottom-[20%] z-10 pointer-events-none"
          >
            <div className="bg-secondary rounded-lg p-3 shadow-2xl flex items-center gap-2">
              <Truck className="w-12 h-12 md:w-16 md:h-16 text-foreground" />
              <div className="text-foreground text-right">
                <p className="text-xs md:text-sm font-bold whitespace-nowrap">Top Choice</p>
                <p className="text-[10px] md:text-xs text-accent font-semibold">253-267-3212</p>
              </div>
            </div>
          </motion.div>
        )}
        {truckPhase === "drive-left" && (
          <motion.div
            key="truck-left"
            initial={{ x: "calc(100vw + 150px)" }}
            animate={{ x: "-150px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute bottom-[20%] z-10 pointer-events-none"
          >
            <div className="bg-secondary rounded-lg p-3 shadow-2xl flex items-center gap-2 scale-x-[-1]">
              <Truck className="w-12 h-12 md:w-16 md:h-16 text-foreground" />
              <div className="text-foreground text-right scale-x-[-1]">
                <p className="text-xs md:text-sm font-bold whitespace-nowrap">Top Choice</p>
                <p className="text-[10px] md:text-xs text-accent font-semibold">253-267-3212</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovingAnimation;
