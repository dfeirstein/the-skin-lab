"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
  Award,
  Users,
  Microscope,
  Clock,
  Shield,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "Science-Backed Treatments",
    description: "Every procedure is rooted in peer-reviewed research and performed using FDA-approved technologies.",
    stat: "100%",
    statLabel: "Evidence-Based"
  },
  {
    icon: Award,
    title: "Board-Certified Experts",
    description: "Our medical team brings decades of combined experience in aesthetic medicine and dermatology.",
    stat: "25+",
    statLabel: "Years Experience"
  },
  {
    icon: Users,
    title: "Personalized Approach",
    description: "Custom treatment plans designed for your unique skin concerns, lifestyle, and aesthetic goals.",
    stat: "10k+",
    statLabel: "Happy Clients"
  },
  {
    icon: Clock,
    title: "Minimal Downtime",
    description: "Advanced techniques and technologies that fit seamlessly into your busy Silicon Valley lifestyle.",
    stat: "95%",
    statLabel: "Same-Day Recovery"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Rigorous safety protocols and state-of-the-art sterilization exceed industry standards.",
    stat: "0",
    statLabel: "Compromises"
  },
  {
    icon: Sparkles,
    title: "Luxury Experience",
    description: "From consultation to aftercare, experience the perfect blend of medical excellence and spa luxury.",
    stat: "5★",
    statLabel: "Client Rating"
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

export function WhyChooseUs() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-copper-rose rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-platinum rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-copper-rose/30 bg-copper-rose/5 px-4 py-2 text-sm font-medium text-copper-rose mb-4">
            <Award className="h-4 w-4" />
            Why Choose Us
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-deep-charcoal mb-6">
            The Silicon Valley Standard in{" "}
            <span className="text-copper-rose">Medical Aesthetics</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Where innovation meets indulgence. Experience the difference of a medical spa 
            that combines cutting-edge technology with uncompromising luxury.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-warm-grey/50 rounded-2xl p-8 h-full hover:bg-warm-grey transition-colors duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow">
                    <feature.icon className="h-8 w-8 text-copper-rose" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-playfair text-2xl font-medium text-deep-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-copper-rose">
                      {feature.stat}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {feature.statLabel}
                    </span>
                  </div>
                </div>
              </div>
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
          <div className="inline-flex flex-col items-center">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to experience the difference?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center gap-2 bg-copper-rose text-white px-8 py-4 rounded-full hover:bg-copper-rose/90 transition-colors font-medium">
                Schedule Your Consultation
                <Sparkles className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-copper-rose text-copper-rose px-8 py-4 rounded-full hover:bg-copper-rose/5 transition-colors font-medium">
                View Success Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}