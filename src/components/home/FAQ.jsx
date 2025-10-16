import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
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
      <section id="faq" className="py-18 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#3DD598]/10 rounded-full mb-6">
              <span className="text-[#3DD598] font-semibold text-sm">FAQ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
              Dealer FAQ: Quick Answers
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about joining Amacar and maximizing your success
            </p>
          </AnimatedSection>
  
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group bg-white rounded-2xl border border-[#E5E5E5] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="cursor-pointer w-full p-8 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-[#4A90E2]/5 hover:to-[#FF8C42]/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#4A90E2] to-[#4A90E2] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-[#1A1A1A] text-lg group-hover:text-[#4A90E2] transition-colors duration-300">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ 
                        rotate: openIndex === index ? 180 : 0,
                        scale: openIndex === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-r from-[#FF8C42] to-[#FF8C42] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-[#4A4A4A] leading-relaxed border-t border-[#E5E5E5] bg-gradient-to-r from-[#F8F9FA] to-white">
                      <div className="pt-6">
                        {faq.answer}
                      </div>
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
  