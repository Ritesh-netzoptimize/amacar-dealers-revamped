import { motion } from 'framer-motion';
import { Zap, Link2, BarChart3 } from 'lucide-react';
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";


export default function Highlights () {
    const highlights = [
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Early access to seller listings",
        description: "Get first access to motivated sellers before your competition. Our platform gives you priority access to quality inventory listings."
      },
      {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "Live bidding, instant results",
        description: "Participate in real-time auctions with immediate feedback. Win quality inventory with transparent, competitive bidding processes."
      },
      {
        icon: <Link2 className="w-8 h-8" />,
        title: "API-powered inventory sync",
        description: "Seamlessly integrate with your existing systems. Our robust API ensures your inventory stays synchronized across all platforms."
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-white rounded-2xl shadow-lg"
                >
                  <div className="w-14 h-14 bg-[var(--brand-orange)] rounded-xl flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };