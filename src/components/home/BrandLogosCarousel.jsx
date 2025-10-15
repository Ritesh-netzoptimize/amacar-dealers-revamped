import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BrandLogosCarousel = ({ className = "", pauseOnHover = true }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Brand logos data - removing duplicates
  const brandLogos = [
    {
      name: 'Kia',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Kia-logo-2560x1440-1.png',
      alt: 'Kia Logo'
    },
    {
      name: 'Jeep',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/jeep-logo-1993-download.png',
      alt: 'Jeep Logo'
    },
    {
      name: 'Infiniti',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Infiniti-logo-1989-2560x1440-1.png',
      alt: 'Infiniti Logo'
    },
    {
      name: 'Hyundai',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/hyundai-logo-2011-download.png',
      alt: 'Hyundai Logo'
    },
    {
      name: 'Mercedes-Benz',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Mercedes-Benz-logo-2011-1920x1080-1.png',
      alt: 'Mercedes-Benz Logo'
    },
    {
      name: 'Mazda',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/mazda-logo-2018-vertical-download.png',
      alt: 'Mazda Logo'
    },
    {
      name: 'Lincoln',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Lincoln-logo-2019-1920x1080-1.png',
      alt: 'Lincoln Logo'
    },
    {
      name: 'Lexus',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Lexus-logo-1988-1920x1080-1.png',
      alt: 'Lexus Logo'
    },
    {
      name: 'Toyota',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/toyota-logo-2019-download.png',
      alt: 'Toyota Logo'
    },
    {
      name: 'Tesla',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/tesla-logo-2007-full-download.png',
      alt: 'Tesla Logo'
    },
    {
      name: 'Subaru',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/subaru-logo-2019-download.png',
      alt: 'Subaru Logo'
    },
    {
      name: 'RAM',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/RAM-logo-2009-2560x1440-1.png',
      alt: 'RAM Logo'
    },
    {
      name: 'BMW',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/bmw-logo-2020-gray-download.png',
      alt: 'BMW Logo'
    },
    {
      name: 'Audi',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/audi-logo-2016-download.png',
      alt: 'Audi Logo'
    },
    {
      name: 'Alfa Romeo',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Alfa-Romeo-logo-2015-1920x1080-1.png',
      alt: 'Alfa Romeo Logo'
    },
    {
      name: 'Acura',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Acura-logo-1990-1024x768-1.png',
      alt: 'Acura Logo'
    },
    {
      name: 'Chrysler',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/chrysler-logo-2009-download.png',
      alt: 'Chrysler Logo'
    },
    {
      name: 'Chevrolet',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Chevrolet-logo-2013-2560x1440-1.png',
      alt: 'Chevrolet Logo'
    },
    {
      name: 'Cadillac',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/cadillac-logo-2021-full-download.png',
      alt: 'Cadillac Logo'
    },
    {
      name: 'Buick',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/Buick-logo-2002-2560x1440-1.png',
      alt: 'Buick Logo'
    },
    {
      name: 'GMC',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/GMC-logo-2200x600-1.png',
      alt: 'GMC Logo'
    },
    {
      name: 'Ford',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/ford-logo-2017-download.png',
      alt: 'Ford Logo'
    },
    {
      name: 'Dodge',
      logo: 'https://dealer.amacar.ai/wp-content/uploads/2024/12/dodge-logo-2010-download.png',
      alt: 'Dodge Logo'
    }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...brandLogos, ...brandLogos];

  // Responsive logo sizing
  const getLogoSize = () => {
    if (typeof window === 'undefined') return 'h-20 w-24'; // SSR fallback
    
    const width = window.innerWidth;
    if (width < 480) return 'h-16 w-20';      // Very small mobile
    if (width < 640) return 'h-18 w-22';      // Mobile
    if (width < 768) return 'h-20 w-24';      // Small tablet
    if (width < 1024) return 'h-22 w-28';     // Tablet
    if (width < 1280) return 'h-24 w-32';     // Small desktop
    return 'h-24 w-32';                       // Large desktop
  };

  const [logoSize, setLogoSize] = useState('h-20 w-24'); // Start with mobile-friendly default

  // Update logo size on window resize
  useEffect(() => {
    const updateLogoSize = () => {
      setLogoSize(getLogoSize());
    };

    // Set initial value
    updateLogoSize();

    // Add resize listener
    window.addEventListener('resize', updateLogoSize);
    
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  return (
    <section className="py-18 bg-gradient-to-br from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#2B5A8E]/10 rounded-full mb-6">
            <span className="text-[#2B5A8E] font-semibold text-sm">Trusted Partners</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            Trusted by Leading Brands
          </h2>
          <p className="text-xl text-[#2C3E50]/70 max-w-3xl mx-auto leading-relaxed">
            We work with the most reputable automotive brands to bring you quality vehicles from trusted sources
          </p>
        </div>

        {/* Modern scrolling container */}
        <div 
          className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-[#E9ECEF] shadow-lg"
        >
          <div 
            className={cn(
              "flex gap-8 md:gap-12 lg:gap-16",
              isPaused ? "animate-pause" : "animate-scroll"
            )}
            style={{
              animationDuration: '60s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: 'normal',
              width: 'max-content'
            }}
          >
            {duplicatedLogos.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.03 
                }}
                className="group flex-shrink-0"
              >
                <div className={cn(
                  "bg-white rounded-2xl p-6 shadow-lg border border-[#E9ECEF] hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-[#2B5A8E]/20 flex items-center justify-center relative overflow-hidden",
                  logoSize
                )}>
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2B5A8E]/5 to-[#FF8A3D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain filter grayscale-0 transition-all duration-500 relative z-10"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F8F9FA] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F8F9FA] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default BrandLogosCarousel;
