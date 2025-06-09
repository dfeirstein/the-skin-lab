"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingLogo() {
  const [showFloating, setShowFloating] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show floating logo after scrolling past hero section
      setShowFloating(window.scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showFloating && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative group"
          >
            <div className="absolute inset-0 bg-copper-rose rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-full p-2 shadow-2xl border-2 border-copper-rose/20">
              <Image
                src="/tsl-logo.png"
                alt="Back to Top"
                width={80}
                height={80}
                className="h-16 w-16 md:h-20 md:w-20"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-deep-charcoal text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Back to Top
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}