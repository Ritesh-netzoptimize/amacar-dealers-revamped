
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';


export default function Hero () {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
  
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-orange-50/30 to-neutral-50 pt-20">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        </motion.div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-orange-100 rounded-full"
            >
              <span className="text-orange-600 font-semibold text-sm">
                🚀 Trusted by 500+ Dealers
              </span>
            </motion.div>
  
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Real Leads. Real-Time Bidding.
              </span>
              <br />
              Real Profit.
            </h1>
  
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Get instant access to pre-qualified seller listings — with zero per-unit auction fees. 
              Plus, unlock advanced dealer tools that help you source quality inventory and close more deals, faster.
            </p>
  
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(246, 133, 31, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Dashboard →
            </motion.button>
  
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16"
            >
              <ChevronDown className="w-8 h-8 text-neutral-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  };