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
    title: "Injectables & Fillers",
    description: "Restore volume and smooth fine lines with our premium injectable treatments including Botox, Dysport, and dermal fillers.",
    image: "/service-injectables.png",
    features: ["Botox & Dysport", "Dermal Fillers", "Lip Enhancement", "Liquid Facelift"],
    href: "/treatments/injectables"
  },
  {
    icon: Zap,
    title: "Laser Treatments",
    description: "Advanced laser technology for skin resurfacing, hair removal, and pigmentation correction with minimal downtime.",
    image: "/service-laser.png",
    features: ["IPL Photofacial", "Laser Hair Removal", "Skin Resurfacing", "Tattoo Removal"],
    href: "/treatments/laser"
  },
  {
    icon: Heart,
    title: "Medical Facials",
    description: "Clinical-grade facials combining luxury with science for deep cleansing, hydration, and skin rejuvenation.",
    image: "/service-facials.png",
    features: ["HydraFacial", "Chemical Peels", "Microneedling", "LED Therapy"],
    href: "/treatments/facials"
  },
  {
    icon: Shield,
    title: "Body Contouring",
    description: "Non-invasive body sculpting treatments to eliminate stubborn fat and tighten skin without surgery.",
    image: "/service-body.png",
    features: ["CoolSculpting", "Skin Tightening", "Cellulite Reduction", "Muscle Toning"],
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
            Advanced Treatments,{" "}
            <span className="text-copper-rose">Exceptional Results</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of medical-grade aesthetic treatments, 
            each designed to enhance your natural beauty with precision and care.
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
                      <span>Learn More</span>
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
            View All Treatments
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}