
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from '../ui/LoginUI/LoginModal';
import { useNavigate } from 'react-router-dom';


export default function Hero () {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const [showVideo, setShowVideo] = useState(false);
    const { user } = useSelector((state) => state.user);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleForgotPassword = () => {
      setLoginModalOpen(true);
    };
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-orange-50/30 to-neutral-50 pt-20">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        </motion.div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
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
    
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                <span className="bg-[var(--brand-orange)] bg-clip-text text-transparent">
                  Real Leads. Real-Time Bidding.
                </span>
                <br />
                Real Profit.
              </h1>
    
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Get instant access to pre-qualified seller listings — with zero per-unit auction fees. 
                Plus, unlock advanced dealer tools that help you source quality inventory and close more deals, faster.
              </p>
    
              {user ? (
                <motion.button
                onClick={() => navigate("/dashboard")}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(246, 133, 31, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--brand-orange)]  text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Dashboard →
                </motion.button>
              ) : (
                <motion.button
                onClick={() => setLoginModalOpen(true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(246, 133, 31, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--brand-orange)]  text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Login →
                </motion.button>
              )}
            </motion.div>

            {/* Right Column - Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2 cursor-pointer group"
                onClick={() => setShowVideo(true)}
              >
                <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                  {/* Thumbnail placeholder - you can replace this with an actual thumbnail image */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-orange-600 font-semibold text-lg">Watch Demo</p>
                    <p className="text-orange-500 text-sm mt-1">See how AmacarAI works</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
  
          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 text-center"
          >
            <ChevronDown className="w-8 h-8 text-neutral-400 mx-auto" />
          </motion.div>
        </div>

        {/* Video Modal Overlay */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Video */}
              <div className="relative w-full" style={{ paddingBottom: '75%' }}> {/* Taller aspect ratio */}
                <iframe
                  src="https://player.vimeo.com/video/1112370692?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="AmacarAI Video B2B EDITED"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {loginModalOpen && (
          <LoginModal 
            isOpen={loginModalOpen} 
            onClose={() => setLoginModalOpen(false)} 
            onForgotPassword={handleForgotPassword}
          />
        )}
      </div>
    );
  };