"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function HeroWithLogo() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-warm-grey via-white to-lab-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-copper-rose/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-platinum/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-32 lg:pt-20">
          
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="text-center lg:text-left"
          >
            {/* Mobile Logo */}
            <motion.div
              variants={scaleInVariants}
              className="lg:hidden mb-8 flex justify-center"
            >
              <div className="relative group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-r from-copper-rose/30 via-platinum/20 to-copper-rose/30 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative bg-white rounded-full p-4 shadow-2xl">
                  <Image
                    src="/tsl-logo.png"
                    alt="The Skin Lab"
                    width={180}
                    height={180}
                    className="h-36 w-36"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-copper-rose/30 bg-copper-rose/5 px-4 py-2 text-sm font-medium text-copper-rose">
                <Sparkles className="h-4 w-4" />
                Silicon Valley's Premier Medical Spa
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInVariants}
              className="font-playfair mb-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-deep-charcoal"
            >
              <span className="block">Where Science</span>
              <span className="block bg-gradient-to-r from-copper-rose to-copper-rose/70 bg-clip-text text-transparent">
                Meets Skin
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInVariants}
              className="font-inter mb-8 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Experience the perfect fusion of advanced dermatological science 
              and luxurious spa treatments, tailored to reveal your skin's 
              natural radiance.
            </motion.p>

            <motion.div
              variants={fadeInVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="bg-copper-rose text-white hover:bg-copper-rose/90 group">
                Book Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-copper-rose/30 hover:bg-copper-rose/5">
                View Transformations
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Logo Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative">
              {/* Rotating Glow Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 bg-gradient-to-r from-copper-rose/30 via-transparent to-platinum/30 rounded-full blur-3xl"
              />
              
              {/* Main Logo Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white rounded-full p-8 shadow-2xl border border-copper-rose/10"
              >
                <Image
                  src="/tsl-logo.png"
                  alt="The Skin Lab"
                  width={400}
                  height={400}
                  className="h-80 w-80"
                  priority
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-copper-rose text-white rounded-full p-3 shadow-lg"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-platinum text-white rounded-full p-3 shadow-lg"
                >
                  <span className="text-xs font-bold">EST 2024</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Discover More</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-copper-rose/30 rounded-full p-1"
            >
              <div className="w-1 h-2 bg-copper-rose rounded-full mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}