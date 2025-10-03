import { Star } from "lucide-react";
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import {motion} from 'framer-motion';

export default function SuccessStories ()  {
    return (
      <section id="success-stories" className="py-20 bg-gradient-to-br from-orange-50/50 to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Stay ahead. Win more deals.
            </h2>
            <p className="text-xl text-neutral-600">
              Access insights and tools that give you a competitive edge
            </p>
          </AnimatedSection>
  
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Boost profit with smarter bidding",
                description: "Learn advanced bidding strategies that help maximize your ROI while securing quality inventory."
              },
              {
                title: "Digital tools to scale inventory",
                description: "Discover how technology can streamline your operations and scale your dealership efficiently."
              },
              {
                title: "Dealers achieving real results",
                description: "Read success stories from dealers who have transformed their business using our platform."
              }
            ].map((item, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-6 bg-white rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
  
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl text-white text-center"
            >
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-2xl font-bold mb-4">
                "We've acquired 50+ cars weekly since joining Amacar."
              </p>
              <p className="text-lg opacity-90">
                Mike Rodriguez
              </p>
              <p className="text-sm opacity-75">
                Owner, Rodriguez Auto Group
              </p>
            </motion.div>
          </AnimatedSection>
  
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">500+</p>
              <p className="text-neutral-600">Trusted Dealers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">4.9/5</p>
              <p className="text-neutral-600">Rating</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  