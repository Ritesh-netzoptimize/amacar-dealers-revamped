import { Star, TrendingUp, Users, Award, Quote, CheckCircle } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import { motion } from 'framer-motion';
import TestimonialCarousel from "./Testimonials";

export default function SuccessStories ()  {
    return (
      <section id="success-stories" className="py-18 bg-gradient-to-br from-white to-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#4F46E5]/10 rounded-full mb-6">
              <span className="text-[#4F46E5] font-semibold text-sm">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              Stay Ahead. Win More Deals.
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              Access insights and tools that give you a competitive edge in the automotive market
            </p>
          </AnimatedSection>
  
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Boost Profit with Smarter Bidding",
                description: "Learn advanced bidding strategies that help maximize your ROI while securing quality inventory at competitive prices.",
                gradient: "from-[#4F46E5] to-[#2E93E1]"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Digital Tools to Scale Inventory",
                description: "Discover how technology can streamline your operations and scale your dealership efficiently with our integrated platform.",
                gradient: "from-[#15A9D8] to-[#2E93E1]"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Dealers Achieving Real Results",
                description: "Read success stories from dealers who have transformed their business using our platform and increased their profits.",
                gradient: "from-[#2E93E1] to-[#2E93E1]"
              }
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(79, 70, 229, 0.15)" 
                  }}
                  className="group p-8 bg-white rounded-2xl border border-[#E5E5E5] shadow-lg hover:shadow-2xl transition-all duration-200 relative overflow-hidden"
                >
                  {/* Subtle background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`} />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110  duration-100 shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 group-hover:text-[#4F46E5] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#4A4A4A] leading-relaxed group-hover:text-[#1A1A1A] transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
  
  
        </div>
      </section>
    );
  };
  