"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "About", href: "/about" },
  { 
    label: "Treatments", 
    href: "/treatments",
    dropdown: [
      { label: "Injectables", href: "/treatments/injectables" },
      { label: "Laser Treatments", href: "/treatments/laser" },
      { label: "Facials", href: "/treatments/facials" },
      { label: "Body Contouring", href: "/treatments/body" },
    ]
  },
  { label: "Technology", href: "/technology" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-24' : 'h-28 md:h-36'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <Image
                src="/tsl-logo.png"
                alt="The Skin Lab"
                width={150}
                height={150}
                className={`transition-all duration-300 ${
                  scrolled ? 'h-20 w-20 md:h-24 md:w-24' : 'h-24 w-24 md:h-32 md:w-32'
                }`}
              />
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden xl:block absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  <p className="text-xs text-platinum uppercase tracking-widest">Where Science Meets Skin</p>
                </motion.div>
              )}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-auto mr-4">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <button
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className={`flex items-center space-x-1 transition-colors font-medium ${
                    scrolled ? 'text-deep-charcoal hover:text-copper-rose' : 'text-deep-charcoal hover:text-copper-rose'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </button>
                
                {item.dropdown && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                  >
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.label}
                        href={dropItem.href}
                        className="block px-4 py-3 text-sm text-deep-charcoal hover:bg-warm-grey hover:text-copper-rose transition-colors"
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-copper-rose text-white hover:bg-copper-rose/90">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-deep-charcoal hover:text-copper-rose' : 'text-deep-charcoal hover:text-copper-rose'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <nav className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                <Link
                  href={item.href}
                  className="block py-3 text-deep-charcoal hover:text-copper-rose transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 pb-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.label}
                        href={dropItem.href}
                        className="block py-2 text-sm text-gray-600 hover:text-copper-rose transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-copper-rose text-white hover:bg-copper-rose/90">
                Book Consultation
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}