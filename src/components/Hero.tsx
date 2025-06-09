"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, ArrowRight } from "lucide-react";

// Animation variants
const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface HeroProps {
  variant?: "typography" | "split" | "video" | "results";
  className?: string;
}

// Typography-focused Hero
const TypographyHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,#f9f5f1_0%,var(--background)_100%)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeInVariants} className="mb-4">
            <span className="inline-flex items-center rounded-full border border-copper-rose/30 bg-copper-rose/5 px-3 py-1 text-xs font-medium text-copper-rose">
              Luxury Medical Spa
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInVariants}
            className="font-playfair mb-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Where Science</span>
            <span className="block text-copper-rose">Meets Skin</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInVariants}
            className="font-inter mb-8 text-lg text-muted-foreground md:text-xl"
          >
            Experience the perfect fusion of advanced dermatological science and luxurious spa treatments, tailored to reveal your skin's natural radiance.
          </motion.p>
          
          <motion.div 
            variants={fadeInVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="bg-copper-rose text-white hover:bg-copper-rose/90">
              Book Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Treatments
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border shadow-xl">
            <Image
              src="/luxury-spa-interior.jpg"
              alt="Luxury Medical Spa Interior"
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 transform items-center justify-center">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-sm font-medium">Scroll to discover</span>
              <ChevronRight className="h-4 w-4 animate-pulse text-copper-rose" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Split-screen Before/After Hero
const SplitHero: React.FC = () => {
  return (
    <section className="relative bg-background pt-28 md:pt-36">
      <div className="grid min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-9rem)] grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:py-12 lg:px-8 xl:px-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="mx-auto max-w-xl"
          >
            <motion.div variants={fadeInVariants} className="mb-4">
              <span className="inline-flex items-center rounded-full border border-copper-rose/30 bg-copper-rose/5 px-3 py-1 text-xs font-medium text-copper-rose">
                Transformative Results
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInVariants}
              className="font-playfair mb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              <span className="block">Where Science</span>
              <span className="block text-copper-rose">Meets Skin</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInVariants}
              className="font-inter mb-6 text-base text-muted-foreground sm:text-lg"
            >
              Our advanced treatments combine cutting-edge technology with luxurious care to deliver visible, lasting results for your skin.
            </motion.p>
            
            <motion.div 
              variants={fadeInVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" className="bg-copper-rose text-white hover:bg-copper-rose/90">
                Book Consultation
              </Button>
              <Button variant="outline" size="lg">
                View Before & After
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-full bg-copper-rose p-3 sm:p-4"
                  >
                    <div className="rounded-full border-2 border-white p-4 sm:p-6">
                      <span className="font-playfair text-base font-medium text-white sm:text-xl">Before</span>
                      <span className="font-playfair mx-1 text-base font-medium text-white sm:mx-2 sm:text-xl">/</span>
                      <span className="font-playfair text-base font-medium text-white sm:text-xl">After</span>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/before-after-skin.jpg"
                    alt="Before and After Treatment Results"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Video Background Hero
const VideoHero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/spa-video-background.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="container relative z-20 mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeInVariants} className="mb-4">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-3 py-1 text-xs font-medium text-white">
              Luxury Medical Spa
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInVariants}
            className="font-playfair mb-6 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <span className="block">Where Science</span>
            <span className="block text-copper-rose">Meets Skin</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInVariants}
            className="font-inter mb-8 text-lg text-white/80 md:text-xl"
          >
            Experience the perfect fusion of advanced dermatological science and luxurious spa treatments, tailored to reveal your skin's natural radiance.
          </motion.p>
          
          <motion.div 
            variants={fadeInVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="bg-copper-rose text-white hover:bg-copper-rose/90">
              Book Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Play className="mr-2 h-4 w-4" />
              Watch Our Story
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        >
          <div className="flex flex-col items-center">
            <span className="font-inter mb-2 text-sm text-white/80">Scroll to explore</span>
            <div className="h-12 w-6 rounded-full border-2 border-white/30 p-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Results-focused Hero
const ResultsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-32 md:pt-40">
      <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,#f9f5f1_0%,var(--background)_100%)]"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeInVariants} className="mb-4">
              <span className="inline-flex items-center rounded-full border border-copper-rose/30 bg-copper-rose/5 px-3 py-1 text-xs font-medium text-copper-rose">
                Proven Results
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInVariants}
              className="font-playfair mb-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
            >
              <span className="block">Where Science</span>
              <span className="block text-copper-rose">Meets Skin</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInVariants}
              className="font-inter mb-8 text-lg text-muted-foreground"
            >
              Our treatments have helped thousands achieve their skin goals with measurable, visible results backed by science.
            </motion.p>
            
            <motion.div variants={fadeInVariants}>
              <div className="mb-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-medium text-copper-rose">98%</div>
                  <div className="font-inter text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-medium text-copper-rose">15+</div>
                  <div className="font-inter text-sm text-muted-foreground">Treatment Options</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-3xl font-medium text-copper-rose">10k+</div>
                  <div className="font-inter text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariants}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" className="bg-copper-rose text-white hover:bg-copper-rose/90">
                Book Consultation
              </Button>
              <Button variant="outline" size="lg">
                View Results Gallery
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border shadow-xl">
              <Image
                src="/results-collage.jpg"
                alt="Treatment Results Collage"
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-copper-rose p-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-medium text-white">Watch Client Stories</p>
                    <p className="font-inter text-sm text-white/80">Real results from real clients</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 -top-4 flex h-24 w-24 items-center justify-center rounded-full bg-copper-rose text-white shadow-lg">
              <div className="text-center">
                <div className="font-playfair text-xl font-medium">New</div>
                <div className="font-inter text-xs">Treatment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export function LuxuryMedicalSpaHero({ variant = "typography", className }: HeroProps) {
  const renderHero = () => {
    switch (variant) {
      case "split":
        return <SplitHero />;
      case "video":
        return <VideoHero />;
      case "results":
        return <ResultsHero />;
      case "typography":
      default:
        return <TypographyHero />;
    }
  };

  return (
    <div className={cn("", className)}>
      {renderHero()}
    </div>
  );
}

export default function Demo() {
  return (
    <div className="font-inter">
      <LuxuryMedicalSpaHero variant="typography" />
    </div>
  );
}