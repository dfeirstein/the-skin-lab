"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Shield,
  ArrowRight,
  Star
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "I Look Tired All The Time",
    description: "Erase those under-eye bags and forehead lines that make you look exhausted (even after vacation). Results in 3-5 days.",
    image: "/service-injectables.png",
    features: ["Botox for Crow's Feet", "Under-Eye Fillers", "Brow Lift", "11 Lines"],
    href: "/treatments/injectables"
  },
  {
    icon: Zap,
    title: "My Skin Looks Dull & Uneven",
    description: "Reveal the glowing skin hiding underneath sun damage, age spots, and acne scars. Your complexion, but 10 years younger.",
    image: "/service-laser.png",
    features: ["IPL for Sun Damage", "Laser Resurfacing", "Melasma Treatment", "Pore Refinement"],
    href: "/treatments/laser"
  },
  {
    icon: Heart,
    title: "Nothing I Buy Actually Works",
    description: "Stop wasting money on products. Get clinical treatments that penetrate deeper and deliver visible results you can't get at home.",
    image: "/service-facials.png",
    features: ["HydraFacial Deep Clean", "Medical Peels", "Collagen Induction", "Custom Protocols"],
    href: "/treatments/facials"
  },
  {
    icon: Shield,
    title: "Exercise Isn't Fixing These Areas",
    description: "Target the stubborn fat that won't budge—no matter how many Barry's classes you take. See results in 8-12 weeks.",
    image: "/service-body.png",
    features: ["Fat Freezing", "Skin Tightening", "Cellulite Smoothing", "Muscle Definition"],
    href: "/treatments/body"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-warm-grey/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-copper-rose/30 bg-copper-rose/5 px-4 py-2 text-sm font-medium text-copper-rose mb-4">
            <Star className="h-4 w-4" />
            Our Services
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-deep-charcoal mb-6">
            Tell Us What Bothers You.{" "}
            <span className="text-copper-rose">We'll Fix It.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From "I look tired" to "Is that really me in photos?"—we have the exact treatment 
            to solve your specific concern. No package deals. No upselling. Just solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <Link href={service.href}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority
                      onError={() => {
                        console.error(`Failed to load image: ${service.image}`);
                      }}
                    />
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                        <service.icon className="h-6 w-6 text-copper-rose" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-playfair text-2xl md:text-3xl font-medium text-deep-charcoal mb-3 group-hover:text-copper-rose transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span 
                            key={feature}
                            className="text-xs px-3 py-1 bg-warm-grey rounded-full text-deep-charcoal"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-copper-rose font-medium group-hover:gap-3 transition-all">
                      <span>Fix This Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-rose to-copper-rose/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link 
            href="/treatments"
            className="inline-flex items-center gap-2 bg-copper-rose text-white px-8 py-4 rounded-full hover:bg-copper-rose/90 transition-colors font-medium"
          >
            See All Solutions
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}