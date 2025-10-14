import { Star, TrendingUp, Users, Award, Quote, CheckCircle } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import { motion } from 'framer-motion';

export default function SuccessStories ()  {
    return (
      <section id="success-stories" className="py-18 bg-gradient-to-br from-white to-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#FF8A3D]/10 rounded-full mb-6">
              <span className="text-[#FF8A3D] font-semibold text-sm">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
              Stay Ahead. Win More Deals.
            </h2>
            <p className="text-xl text-[#2C3E50]/70 max-w-3xl mx-auto leading-relaxed">
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
                gradient: "from-[#2B5A8E] to-[#1E3A5F]"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Digital Tools to Scale Inventory",
                description: "Discover how technology can streamline your operations and scale your dealership efficiently with our integrated platform.",
                gradient: "from-[#FF8A3D] to-[#FFB366]"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Dealers Achieving Real Results",
                description: "Read success stories from dealers who have transformed their business using our platform and increased their profits.",
                gradient: "from-[#28A745] to-[#20C997]"
              }
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(43, 90, 142, 0.15)" 
                  }}
                  className="group p-8 bg-white rounded-2xl border border-[#E9ECEF] shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Subtle background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#2B5A8E] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#2C3E50]/70 leading-relaxed group-hover:text-[#2C3E50] transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
  
          {/* Professional Testimonial */}
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-12 bg-gradient-to-br from-[#2B5A8E] to-[#1E3A5F] rounded-3xl shadow-2xl text-white overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 right-8 w-32 h-32 border border-white/20 rounded-full" />
                <div className="absolute bottom-8 left-8 w-24 h-24 border border-white/20 rounded-full" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-[#FF8A3D] text-[#FF8A3D] mx-1" />
                  ))}
                </div>
                
                <Quote className="w-12 h-12 text-[#FF8A3D] mx-auto mb-6" />
                
                <blockquote className="text-2xl sm:text-3xl font-bold text-center mb-8 leading-relaxed">
                  "We've acquired 50+ cars weekly since joining Amacar."
                </blockquote>
                
                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">
                    Mike Rodriguez
                  </p>
                  <p className="text-[#FF8A3D] font-medium">
                    Owner, Rodriguez Auto Group
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
  
          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mt-16"
          >
            <div className="text-center p-8 bg-white rounded-2xl border border-[#E9ECEF] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2B5A8E] to-[#1E3A5F] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">500+</p>
              <p className="text-[#2C3E50]/70 font-medium">Trusted Dealers</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl border border-[#E9ECEF] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF8A3D] to-[#FFB366] rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <p className="text-4xl font-bold text-[#2C3E50] mb-2">4.9/5</p>
              <p className="text-[#2C3E50]/70 font-medium">Customer Rating</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };
  