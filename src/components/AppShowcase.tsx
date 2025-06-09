'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const appFeatures = [
  {
    id: 'analysis',
    title: 'AI Skin Analysis',
    subtitle: 'Personalized insights in seconds',
    description: 'Our advanced AI technology analyzes your skin with clinical precision, providing personalized recommendations tailored to your unique needs.',
    image: '/Create_iPhone_app_mockup_screens_for_The_Skin_Lab-1749423148968.png',
    features: ['Face scanning technology', 'Instant skin assessment', 'Personalized treatment plans']
  },
  {
    id: 'booking',
    title: 'Seamless Scheduling',
    subtitle: 'Book appointments effortlessly',
    description: 'Schedule your treatments with just a few taps. Get reminders, manage appointments, and sync with your calendar automatically.',
    image: '/Create_iPhone_app_mockup_showing_appointment_sched-1749423157974.png',
    features: ['One-tap booking', 'Smart reminders', 'Calendar integration']
  },
  {
    id: 'tracking',
    title: 'Progress Tracking',
    subtitle: 'Monitor your skin transformation',
    description: 'Track your skincare journey with detailed progress reports. See real results with before/after comparisons and treatment history.',
    image: '/Create_iPhone_app_mockup_showing_personalized_regi-1749423164707.png',
    features: ['Treatment history', 'Progress analytics', 'Custom protocols']
  }
]

export function AppShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F6F4]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-playfair text-[#2C2C2C] mb-4"
          >
            Experience The Future of Skincare
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#898B8D] max-w-2xl mx-auto"
          >
            Our AI-powered app puts clinical-grade skin analysis and personalized care at your fingertips
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Navigation */}
          <div className="space-y-6">
            {appFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-white shadow-xl border-l-4 border-[#B87333]' 
                    : 'bg-[#F8F6F4] hover:bg-white hover:shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-playfair text-[#2C2C2C] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#B87333] font-medium mb-3">
                  {feature.subtitle}
                </p>
                <p className="text-[#898B8D] mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-[#2C2C2C]">
                      <svg className="w-4 h-4 mr-2 text-[#B87333]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Phone Mockup Display */}
          <div className="relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Image
                  src={appFeatures[activeFeature].image}
                  alt={appFeatures[activeFeature].title}
                  width={600}
                  height={600}
                  className="w-full max-w-md mx-auto"
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B87333] rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#898B8D] rounded-full opacity-10 blur-3xl" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#898B8D] mb-6">
            Download the app and start your personalized skincare journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-[#2C2C2C] text-white rounded-full hover:bg-[#B87333] transition-colors duration-300 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              App Store
            </button>
            <button className="px-8 py-4 bg-[#2C2C2C] text-white rounded-full hover:bg-[#B87333] transition-colors duration-300 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Google Play
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}