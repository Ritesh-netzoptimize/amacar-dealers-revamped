import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import {motion} from 'framer-motion';

export default function HowItWorks () {
    const steps = [
      {
        number: "1",
        title: "Sign up in minutes",
        description: "Complete your dealer verification and get instant access to our live auction platform."
      },
      {
        number: "2",
        title: "Review live private cars ready for sales",
        description: "Browse pre-qualified private seller vehicles and bid on matches your inventory."
      },
      {
        number: "3",
        title: "Place your bid — enjoy unlimited bidding",
        description: "Participate in real-time auctions with variety of cars to bid and win."
      }
    ];
  
    return (
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              How it works for dealers
            </h2>
            <p className="text-xl text-neutral-600">
              Simple 3-step process to start winning auctions and growing your inventory
            </p>
          </AnimatedSection>
  
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative p-8 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border-2 border-neutral-200"
                >
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };