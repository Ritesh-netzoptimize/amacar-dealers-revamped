import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";

export default function FAQ ()  {
    const [openIndex, setOpenIndex] = useState(null);
  
    const faqs = [
      { question: "What is Amacar?", answer: "Amacar is a revolutionary platform connecting dealerships with pre-qualified private sellers through real-time auctions." },
      { question: "How do dealerships sign up?", answer: "Simply complete our quick dealer verification process and get instant access to our auction platform." },
      { question: "How much can dealers save per month by joining Amacar?", answer: "Dealers save thousands through zero per-unit auction fees and access to competitive pricing." },
      { question: "How do dealer auctions work?", answer: "Participate in live, real-time auctions with instant feedback and transparent bidding." },
      { question: "Do I need to set up appointment with the customers?", answer: "No appointments needed - our platform handles coordination seamlessly." },
      { question: "What if my bid is not accepted?", answer: "You can immediately bid on other vehicles with no penalties or restrictions." },
      { question: "Is there a limit to the number of cars I can bid on?", answer: "Enjoy unlimited bidding on unlimited vehicles for one low monthly fee." }
    ];
  
    return (
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Dealer FAQ: Quick Answers
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about joining Amacar
            </p>
          </AnimatedSection>
  
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-semibold text-neutral-900">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-500" />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-neutral-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    );
  };
  