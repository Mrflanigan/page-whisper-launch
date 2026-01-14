import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-moving.jpg";
import emptyRoom from "@/assets/empty-room.jpg";
import newHouse from "@/assets/new-house.jpg";
import movingTruck from "@/assets/moving-truck.png";

type Scene = "original" | "empty" | "newHouse";

const MovingAnimation = () => {
  const [scene, setScene] = useState<Scene>("original");
  const [truckPosition, setTruckPosition] = useState<"hidden" | "entering-left" | "exiting-right" | "entering-right" | "exiting-left">("hidden");
  const [showTruck, setShowTruck] = useState(false);

  const backgrounds: Record<Scene, string> = {
    original: heroImage,
    empty: emptyRoom,
    newHouse: newHouse,
  };

  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Original scene visible (2s pause)
      setScene("original");
      setShowTruck(false);
      await delay(2000);

      // Phase 2: Truck enters from left
      setShowTruck(true);
      setTruckPosition("entering-left");
      await delay(1500);

      // Phase 3: Truck exits right, switch to empty room
      setTruckPosition("exiting-right");
      await delay(750);
      setScene("empty");
      await delay(750);
      setShowTruck(false);

      // Phase 4: Empty room pause (1.5s)
      await delay(1500);

      // Phase 5: Truck enters from right
      setShowTruck(true);
      setTruckPosition("entering-right");
      await delay(1500);

      // Phase 6: Truck exits left, switch to new house
      setTruckPosition("exiting-left");
      await delay(750);
      setScene("newHouse");
      await delay(750);
      setShowTruck(false);

      // Phase 7: New house pause (longer - 3s)
      await delay(3000);

      // Loop back
      runAnimation();
    };

    runAnimation();
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getTruckStyles = () => {
    switch (truckPosition) {
      case "entering-left":
        return { x: "0%", scaleX: 1 };
      case "exiting-right":
        return { x: "100vw", scaleX: 1 };
      case "entering-right":
        return { x: "0%", scaleX: -1 };
      case "exiting-left":
        return { x: "-100vw", scaleX: -1 };
      default:
        return { x: "-100vw", scaleX: 1 };
    }
  };

  const getInitialX = () => {
    if (truckPosition === "entering-left" || truckPosition === "exiting-right") {
      return "-100vw";
    }
    return "100vw";
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background layers */}
      <AnimatePresence mode="sync">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgrounds[scene]})` }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Truck layer */}
      <AnimatePresence>
        {showTruck && (
          <motion.div
            initial={{ x: getInitialX() }}
            animate={getTruckStyles()}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut"
            }}
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="relative">
              <img 
                src={movingTruck} 
                alt="Moving truck" 
                className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl"
              />
              {/* Truck branding overlay */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-xs md:text-sm font-bold text-secondary whitespace-nowrap drop-shadow-lg">
                  Top Choice Moving
                </p>
                <p className="text-[10px] md:text-xs text-accent font-semibold drop-shadow-lg">
                  253-267-3212
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovingAnimation;
