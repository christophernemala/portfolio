import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SPLASHES_PER_BURST = 10;
const SPLASH_INTERVAL = 180;   // ms between splashes
const BURST_PAUSE = 2600;      // pause after burst

const RainOnGlass = () => {
  const [splashes, setSplashes] = useState([]);
  const splashIndex = useRef(0);

  useEffect(() => {
    let splashTimer;
    let burstTimeout;

    const spawnSplash = () => {
      setSplashes((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          left: 8 + Math.random() * 84,
          top: 10 + Math.random() * 14,
        },
      ]);

      splashIndex.current += 1;

      if (splashIndex.current < SPLASHES_PER_BURST) {
        splashTimer = setTimeout(spawnSplash, SPLASH_INTERVAL);
      } else {
        // Reset after burst
        burstTimeout = setTimeout(() => {
          splashIndex.current = 0;
          setSplashes([]);
          spawnSplash();
        }, BURST_PAUSE);
      }
    };

    spawnSplash();

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(burstTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          initial={{ scale: 0.4, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 1.1,
            ease: "easeOut",
          }}
          className="
            absolute
            w-6 h-6
            rounded-full
            blur-[0.5px]
          "
          style={{
            left: `${splash.left}%`,
            top: `${splash.top}px`,
            background: `
              radial-gradient(
                circle,
                rgba(255,255,255,0.55) 0%,
                rgba(255,255,255,0.35) 30%,
                rgba(255,255,255,0.15) 55%,
                rgba(255,255,255,0.05) 70%,
                rgba(255,255,255,0) 75%
              )
            `,
          }}
        />
      ))}
    </div>
  );
};

export default RainOnGlass;
