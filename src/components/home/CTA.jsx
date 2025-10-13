import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function CTA () {
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    return (
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join as a Dealer
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Start winning auctions and growing your inventory today. Join hundreds of successful 
              dealers who trust Amacar for quality vehicle acquisitions.
            </p>
            {user ? (
              <motion.button
              onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-10 py-5 bg-white text-orange-600 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                Dashboard 
              </motion.button>
            ) : (
              <motion.button
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer w-[50%] h-12 cursor-pointer  px-6 py-2.5 text-md text-orange-500 rounded-lg font-semibold border-2 border-[var(--brand-orange)] bg-white"
              >
                Join as dealer
              </motion.button>
            )}
          </AnimatedSection>
        </div>
      </section>
    );
  };