"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Users, Award, Calendar } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Tech Executive",
    image: "/testimonial-1.jpg",
    content: "The personalized treatment plan transformed my skin completely. As someone in tech, I needed minimal downtime - they delivered exactly that. My skin looks 10 years younger!",
    rating: 5,
    treatment: "Liquid Facelift & IPL",
    results: "Reduced fine lines by 85%"
  },
  {
    id: 2,
    name: "Dr. Michael Torres",
    role: "Venture Capitalist",
    image: "/testimonial-2.jpg",
    content: "The scientific approach here is unparalleled. They use evidence-based treatments and track results meticulously. It's the Silicon Valley way - data-driven beauty.",
    rating: 5,
    treatment: "Body Contouring & Skin Tightening",
    results: "20% fat reduction in 3 months"
  },
  {
    id: 3,
    name: "Jennifer Park",
    role: "CEO & Mother of Two",
    image: "/testimonial-3.jpg",
    content: "I wanted to look refreshed, not 'done.' They understood perfectly. The results are so natural that people just ask if I've been on vacation!",
    rating: 5,
    treatment: "Botox & Dermal Fillers",
    results: "Natural rejuvenation achieved"
  }
];

const statistics = [
  {
    icon: Users,
    value: "10,000+",
    label: "Happy Clients",
    subtext: "Since 2020"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    subtext: "500+ Reviews"
  },
  {
    icon: TrendingUp,
    value: "97%",
    label: "Satisfaction Rate",
    subtext: "Client Surveys"
  },
  {
    icon: Award,
    value: "15+",
    label: "Industry Awards",
    subtext: "Excellence Recognition"
  }
];


export function TestimonialsResults() {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-warm-grey/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-rose rounded-full blur-3xl" />
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
            <Star className="h-4 w-4" />
            Real Results
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-deep-charcoal mb-6">
            They Got Their Confidence Back in{" "}
            <span className="text-copper-rose">30 Days or Less</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real Silicon Valley executives, entrepreneurs, and professionals share their transformation stories. 
            No filters. No retouching. Just results.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {statistics.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <stat.icon className="h-8 w-8 text-copper-rose mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-deep-charcoal mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-deep-charcoal">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-copper-rose/20" />
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  {index === activeTestimonial && (
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Client Info */}
                      <div className="md:col-span-1 text-center md:text-left">
                        <div className="relative w-32 h-32 mx-auto md:mx-0 mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-copper-rose to-platinum rounded-full p-1">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={128}
                              height={128}
                              className="rounded-full object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <h3 className="font-playfair text-2xl font-medium text-deep-charcoal mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-muted-foreground mb-2">{testimonial.role}</p>
                        <div className="flex gap-1 justify-center md:justify-start mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-copper-rose text-copper-rose" />
                          ))}
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-deep-charcoal">{testimonial.treatment}</p>
                          <p className="text-copper-rose">{testimonial.results}</p>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="md:col-span-2">
                        <p className="text-xl md:text-2xl text-deep-charcoal leading-relaxed font-light">
                          "{testimonial.content}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex gap-2 justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-copper-rose w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Skin Analysis Technology */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-copper-rose/10 to-platinum/10 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-3xl font-medium text-deep-charcoal mb-4">
                Your Personalized Treatment Journey Starts with AI
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Experience the future of skincare with our advanced AI Skin Analysis Scanner. 
                This cutting-edge technology analyzes your skin at a cellular level, 
                identifying concerns invisible to the naked eye and creating a treatment 
                plan as unique as you are.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-rose font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-deep-charcoal mb-1">3D Facial Mapping</h4>
                    <p className="text-sm text-muted-foreground">
                      Captures every angle and contour for comprehensive analysis
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-rose font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-deep-charcoal mb-1">Deep Skin Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Detects sun damage, pore size, wrinkles, and texture at multiple skin layers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-rose font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-deep-charcoal mb-1">Custom Treatment Plan</h4>
                    <p className="text-sm text-muted-foreground">
                      AI recommends the perfect combination of treatments for your goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-copper-rose/20 to-platinum/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                  <div className="w-32 h-32 bg-gradient-to-br from-copper-rose to-platinum rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      <circle cx="12" cy="10" r="3" strokeWidth={1.5} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v6m-3-3h6" />
                    </svg>
                  </div>
                  <h4 className="font-playfair text-2xl font-medium text-deep-charcoal mb-2">
                    AI Precision Meets Human Expertise
                  </h4>
                  <p className="text-muted-foreground">
                    Our AI scanner provides insights that guide our experts in creating 
                    your perfect treatment plan
                  </p>
                  <div className="mt-6 flex justify-center gap-8">
                    <div>
                      <p className="text-2xl font-bold text-copper-rose">200+</p>
                      <p className="text-xs text-muted-foreground">Data Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-copper-rose">15 sec</p>
                      <p className="text-xs text-muted-foreground">Scan Time</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-copper-rose">99%</p>
                      <p className="text-xs text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Stop watching others get results. It's your turn.
          </p>
          <button className="inline-flex items-center gap-2 bg-copper-rose text-white px-8 py-4 rounded-full hover:bg-copper-rose/90 transition-colors font-medium">
            Claim Your Spot Today
            <Calendar className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}