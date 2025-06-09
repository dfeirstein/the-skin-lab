'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Facebook, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Injectables', href: '/treatments/injectables' },
    { label: 'Laser Treatments', href: '/treatments/laser' },
    { label: 'Facials', href: '/treatments/facials' },
    { label: 'Body Contouring', href: '/treatments/body' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'Meet the Team', href: '/team' },
    { label: 'Technology', href: '/technology' },
    { label: 'Results', href: '/results' },
  ],
  resources: [
    { label: 'Book Consultation', href: '/book' },
    { label: 'Virtual Consultation', href: '/virtual-consultation' },
    { label: 'Financing', href: '/financing' },
    { label: 'FAQs', href: '/faqs' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/theskinlab', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/theskinlab', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/theskinlab', label: 'YouTube' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2C2C2C] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-playfair mb-2">Stay in Touch</h3>
              <p className="text-white/70">Get exclusive offers and skin care tips delivered to your inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder:text-white/50 focus:outline-none focus:border-[#B87333] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#B87333] hover:bg-[#B87333]/90 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/tsl-logo.png"
                alt="The Skin Lab"
                width={120}
                height={120}
                className="h-24 w-24"
              />
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              Where Science Meets Skin. Experience the perfect fusion of advanced dermatological science and luxurious spa treatments.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 hover:bg-[#B87333] rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-[#B87333] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-[#B87333] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-[#B87333] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#B87333] flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Visit Us</p>
                <p className="text-white/70 text-sm">
                  123 Luxury Lane<br />
                  Beverly Hills, CA 90210
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#B87333] flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Call Us</p>
                <a href="tel:+13105551234" className="text-white/70 hover:text-[#B87333] text-sm transition-colors">
                  (310) 555-1234
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#B87333] flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Email Us</p>
                <a href="mailto:hello@theskinlab.com" className="text-white/70 hover:text-[#B87333] text-sm transition-colors">
                  hello@theskinlab.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#B87333] flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium mb-1">Hours</p>
                <p className="text-white/70 text-sm">
                  Mon-Fri: 9am-7pm<br />
                  Sat-Sun: 10am-6pm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              © {currentYear} The Skin Lab. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/50 hover:text-[#B87333] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-[#B87333] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-white/50 hover:text-[#B87333] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}