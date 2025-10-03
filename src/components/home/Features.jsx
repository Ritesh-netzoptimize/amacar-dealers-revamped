
import { motion } from 'framer-motion';
import { Car, Zap, Link2 } from 'lucide-react';
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";

export default function Features () {
    const features = [
      {
        icon: <Car className="w-8 h-8" />,
        title: "Gain Exclusive Access to Local Private Sellers",
        description: "Be the first to see ready to sell private sellers before your competition"
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Bid in real time—no outlet waiting",
        description: "Participate in live auctions with instant feedback, no more need for visiting traditional auctions."
      },
      {
        icon: <Link2 className="w-8 h-8" />,
        title: "API integration for inventory feed",
        description: "Seamlessly sync with your existing systems."
      }
    ];
  
    return (
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Why dealers choose us
            </h2>
            <p className="text-xl text-neutral-600">
              Built for modern dealerships that demand excellence
            </p>
          </AnimatedSection>
  
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="p-8 bg-gradient-to-br from-white to-neutral-50 rounded-2xl border border-neutral-200 shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  