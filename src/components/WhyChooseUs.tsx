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
    title: "No More Guessing Games",
    description: "You'll know exactly why we're recommending each treatment—backed by clinical data, not sales quotas.",
    stat: "100%",
    statLabel: "Transparent Pricing"
  },
  {
    icon: Award,
    title: "The Right Hands Matter",
    description: "Our doctors train other doctors. When it's your face, experience isn't optional—it's everything.",
    stat: "Zero",
    statLabel: "Junior Injectors"
  },
  {
    icon: Users,
    title: "Built for Your Schedule",
    description: "Lunch-hour treatments that actually work. No 2-week downtime surprises or purple bruises before your presentation.",
    stat: "30 min",
    statLabel: "Average Visit"
  },
  {
    icon: Clock,
    title: "Results You Can Track",
    description: "Monthly progress photos and measurable improvements. You'll see exactly what you're paying for.",
    stat: "97%",
    statLabel: "Visible Results"
  },
  {
    icon: Shield,
    title: "Fix It Free Guarantee",
    description: "Not happy? We'll adjust it at no charge. That's confidence you won't find at discount clinics.",
    stat: "100%",
    statLabel: "Satisfaction Promise"
  },
  {
    icon: Sparkles,
    title: "Actually Enjoyable",
    description: "Heated massage tables, noise-canceling headphones, and zero judgment. Self-care should feel good.",
    stat: "5★",
    statLabel: "Experience Rating"
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
            Why Pay More When{" "}
            <span className="text-copper-rose">Cheaper Options Exist?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Because fixing bad work costs 3x more than doing it right the first time. 
            Here's what you're actually paying for:
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
              Stop settling for "good enough" skin
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center gap-2 bg-copper-rose text-white px-8 py-4 rounded-full hover:bg-copper-rose/90 transition-colors font-medium">
                Book My Analysis (Free Today)
                <Sparkles className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-copper-rose text-copper-rose px-8 py-4 rounded-full hover:bg-copper-rose/5 transition-colors font-medium">
                See Pricing First
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}