
import { motion } from 'framer-motion';
import { Car, Zap, Link2, Shield, TrendingUp, Clock, Users, BarChart3 } from 'lucide-react';
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";

export default function Features () {
    const features = [
      {
        icon: <Car className="w-8 h-8" />,
        title: "Exclusive Access to Private Sellers",
        description: "Be the first to see ready-to-sell private sellers before your competition. Get exclusive access to high-quality inventory that never hits traditional auction floors.",
        gradient: "from-[#2B5A8E] to-[#1E3A5F]"
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Real-Time Bidding Platform",
        description: "Participate in live auctions with instant feedback. No more waiting at traditional auction houses - bid from anywhere, anytime.",
        gradient: "from-[#FF8A3D] to-[#FFB366]"
      },
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Zero Per-Unit Fees",
        description: "Keep more profit with our zero per-unit auction fees. Only pay for what you win, when you win it.",
        gradient: "from-[#28A745] to-[#20C997]"
      },
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Advanced Analytics",
        description: "Make data-driven decisions with comprehensive market insights, pricing trends, and performance analytics.",
        gradient: "from-[#2B5A8E] to-[#1E3A5F]"
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "24/7 Platform Access",
        description: "Access our platform anytime, anywhere. Never miss an opportunity with round-the-clock availability.",
        gradient: "from-[#FF8A3D] to-[#FFB366]"
      },
      {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "API Integration",
        description: "Seamlessly sync with your existing DMS and inventory management systems for streamlined operations.",
        gradient: "from-[#28A745] to-[#20C997]"
      }
    ];
  
    return (
      <section id="features" className="py-18 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#2B5A8E]/10 rounded-full mb-6">
              <span className="text-[#2B5A8E] font-semibold text-sm">Why Choose Amacar</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
              Built for Modern Dealerships
            </h2>
            <p className="text-xl text-[#2C3E50]/70 max-w-3xl mx-auto leading-relaxed">
              Experience the future of automotive auctions with our cutting-edge platform designed for dealers who demand excellence
            </p>
          </AnimatedSection>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(43, 90, 142, 0.15)" 
                }}
                className="group p-8 bg-white rounded-2xl border border-[#E9ECEF] shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#2B5A8E] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-[#2C3E50]/70 leading-relaxed group-hover:text-[#2C3E50] transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  