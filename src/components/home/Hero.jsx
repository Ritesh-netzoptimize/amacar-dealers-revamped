
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, X, ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
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
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Professional Background */}
        <div className="absolute inset-0 z-0">
          {/* High-quality background with professional overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#2B5A8E] to-[#1E3A5F]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Subtle geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
            <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full" />
            <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full" />
            <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full" />
          </div>
        </div>

        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF8A3D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#2B5A8E]/10 rounded-full blur-3xl" />
        </motion.div>
  
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                className="inline-block mb-4 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    Trusted by 500+ Dealers Nationwide
                  </span>
                </div>
              </motion.div>
    
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block mb-2">
                  <span className="bg-gradient-to-r from-[#FF8A3D] to-[#FFB366] bg-clip-text text-transparent">
                    Real Leads.
                  </span>
                </span>
                <span className="block mb-2">
                  <span className="bg-gradient-to-r from-[#FF8A3D] to-[#FFB366] bg-clip-text text-transparent">
                    Real-Time Bidding.
                  </span>
                </span>
                <span className="block text-white">
                  Real Profit.
                </span>
              </h1>
    
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light">
                Get instant access to pre-qualified seller listings with zero per-unit auction fees. 
                Unlock advanced dealer tools that help you source quality inventory and close more deals, faster.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FF8A3D]/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#FF8A3D]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Zero Fees</p>
                    <p className="text-white/70 text-sm">No per-unit charges</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FF8A3D]/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#FF8A3D]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Real-Time</p>
                    <p className="text-white/70 text-sm">Live bidding platform</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#FF8A3D]/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#FF8A3D]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Verified</p>
                    <p className="text-white/70 text-sm">Pre-qualified leads</p>
                  </div>
                </div>
              </div>
    
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <motion.button
                    onClick={() => navigate("/dashboard")}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(43, 90, 142, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-[#2B5A8E] to-[#1E3A5F] text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setLoginModalOpen(true)}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(43, 90, 142, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-[#2B5A8E] to-[#1E3A5F] text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Right Column - Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-md border border-white/10 p-3 cursor-pointer group hover:bg-white/10 transition-all duration-500 hover:scale-105"
                onClick={() => setShowVideo(true)}
              >
                <div className="relative w-full h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-[#2B5A8E]/30 to-[#1E3A5F]/40 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  {/* Professional video thumbnail */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#FF8A3D] to-[#FFB366] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-2">See Amacar in Action</h3>
                    <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
                      <span>• Real-time bidding</span>
                      <span>• Instant access</span>
                    </div>
                  </div>
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
  
          {/* Professional scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-10 text-center"
          >
            <div className="inline-flex flex-col items-center space-y-2">
              <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
              <a href="/#features"><ChevronDown className="w-6 h-6 text-white/60" /></a>
            </div>
          </motion.div>
        </div>

        {/* Professional Video Modal */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Professional close button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-r from-[#2B5A8E] to-[#1E3A5F] hover:from-[#1E3A5F] hover:to-[#2B5A8E] rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-2xl hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Video container with professional styling */}
              <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://player.vimeo.com/video/1112370692?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=0"
                  className="absolute top-0 left-0 w-full h-full"
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