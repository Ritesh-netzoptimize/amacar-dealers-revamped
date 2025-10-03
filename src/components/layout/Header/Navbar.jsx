import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Menu, X } from 'lucide-react';

// Navbar Component
export default function Navbar () {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const navLinks = ["Features", "How it Works", "Success Stories", "FAQ"];
  
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-[var(--brand-orange)] bg-clip-text text-transparent">
                Amacar
              </span>
            </motion.div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  whileHover={{ y: -2 }}
                  className="text-neutral-700 hover:text-orange-500 font-medium transition-colors"
                >
                  {link}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Dashboard →
              </motion.button>
            </div>
  
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
  
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden pb-4"
            >
              {navLinks.map((link) => (
                <motion.a
                  animate={{ opacity: 1, height: "auto" }}
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="block py-2 text-neutral-700 hover:text-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <button className="mt-2 w-full px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold">
                Dashboard →
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>
    );
  };