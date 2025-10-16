import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Plus, 
  Minus, 
  ArrowRight, 
  Car, 
  Gavel, 
  Link2, 
  Key, 
  Building, 
  RefreshCw, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Star,
  Handshake,
  ChevronDown
} from 'lucide-react'

const HomeNew = () => {
  const [openFaq, setOpenFaq] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  const features = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Gain Exclusive Access to Local Private Sellers",
      description: "Be the first to see ready-to-sell private sellers before your competition.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Bid in real time—no outlet waiting",
      description: "Participate in live auctions with instant feedback, no more need for visiting traditional auctions.",
      gradient: "from-blue-500 to-teal-500"
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "API Integration for Inventory feed",
      description: "Seamlessly sync with your existing systems.",
      gradient: "from-blue-500 to-purple-600"
    }
  ]

  const whyChooseUs = [
    {
      icon: <Key className="w-8 h-8" />,
      title: "Early access to seller listings",
      description: "Get first access to motivated sellers before your competition. Our platform gives you priority access to quality inventory listings.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Live bidding, instant results",
      description: "Participate in real-time auctions with immediate feedback. Win quality inventory with transparent, competitive bidding processes.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "API-powered inventory sync",
      description: "Seamlessly integrate with your existing systems. Our robust API ensures your inventory stays synchronized across all platforms.",
      gradient: "from-blue-500 to-purple-600"
    }
  ]

  const howItWorks = [
    {
      number: "1",
      title: "Sign up in minutes",
      description: "Complete your dealer verification and get instant access to our live auction platform."
    },
    {
      number: "2", 
      title: "Review live private cars ready for sales",
      description: "Browse pre-qualified private seller vehicles and bid on matches you inventory."
    },
    {
      number: "3",
      title: "Place your bid—enjoy unlimited bidding on unlimited vehicles for one low monthly fee.",
      description: "Participate in real-time auctions with variety of cars to bid and win."
    }
  ]

  const stayAhead = [
    {
      title: "Boost profit with smarter bidding",
      description: "Learn advanced bidding strategies that help maximize your ROI while securing quality inventory.",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      title: "Digital tools to scale inventory",
      description: "Discover how technology can streamline your operations and scale your dealership efficiently.",
      gradient: "from-blue-400 to-teal-500"
    },
    {
      title: "Dealers achieving real results",
      description: "Read success stories from dealers who have transformed their business using our platform.",
      gradient: "from-green-400 to-green-600"
    }
  ]

  const faqs = [
    { question: "What is Amacar?", answer: "Amacar is a revolutionary platform connecting dealerships with pre-qualified private sellers through real-time auctions." },
    { question: "How do dealerships sign up?", answer: "Simply complete our quick dealer verification process and get instant access to our auction platform." },
    { question: "How much can dealers save per month by joining Amacar?", answer: "Dealers save thousands through zero per-unit auction fees and access to competitive pricing." },
    { question: "How do dealer auctions work?", answer: "Participate in live, real-time auctions with instant feedback and transparent bidding." },
    { question: "Do I need to set up appointment with the customers?", answer: "No appointments needed - our platform handles coordination seamlessly." },
    { question: "What if my bid is not accepted?", answer: "You can immediately bid on other vehicles with no penalties or restrictions." },
    { question: "Is there a limit to the number of cars I can bid on?", answer: "Enjoy unlimited bidding on unlimited vehicles for one low monthly fee." }
  ]

  return (
    <div className="font-sans antialiased bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">amacar</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#resources" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
              <a href="#support" className="text-gray-700 hover:text-blue-600 transition-colors">Support</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Sign Up
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 style={{ fontWeight: "900" }} className="text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                <span className="block">Real Leads.</span>
                <span className="block text-blue-500">Real-Time Bidding.</span>
                <span className="block text-teal-500">Real Profit.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get instant access to pre-qualified seller listings — with zero per-unit auction fees. Plus, unlock advanced dealer tools that help you source quality inventory and close more deals, faster.
              </p>
              <button className="px-8 py-4 bg-white border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Content - Video */}
            <div className="relative">
              <div 
                className="relative bg-purple-600 rounded-2xl p-8 cursor-pointer hover:bg-purple-700 transition-colors"
                onClick={() => setShowVideo(true)}
              >
                <div className="flex flex-col items-center justify-center text-white">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-purple-600 ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold">Watch Our Platform Demo</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dealers Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Dealers Choose Us</h2>
            <p className="text-xl text-gray-600">Built for modern dealerships that demand excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works For Dealers</h2>
          </div>

          <div className="space-y-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6 bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Ahead Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Stay Ahead. Win More Deals.</h2>
            <p className="text-xl text-gray-600">Access insights and tools that give you a competitive edge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stayAhead.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${item.gradient} p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Quote */}
            <div>
              <div className="text-6xl text-gray-300 mb-4">"</div>
              <blockquote className="text-2xl font-bold text-gray-900 mb-6">
                We've acquired 50+ cars weekly since joining Amacar.
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900">Mike Rodriguez</div>
                <div className="text-gray-600">Owner, Rodriguez Auto Group</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-gray-900">Trusted by 100+ Dealers</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-gray-900">4.9/5 Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Dealer FAQ: <span className="text-blue-500">Quick Answers</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about joining Amacar</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white"
                  >
                    {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-600 border-t border-gray-100">
                    <div className="pt-4">{faq.answer}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join As A Dealer CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Join As A Dealer</h2>
              <p className="text-xl mb-8 leading-relaxed">
                Start winning auctions and growing your inventory today. Join hundreds of successful dealers who trust Amacar for quality vehicle acquisitions.
              </p>
              <button className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors">
                Login
              </button>
            </div>

            {/* Right Content - Dashboard Illustration */}
            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
                <div className="bg-white rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-sm">Dashboard Interface</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-sm">
            © 2023 Amacar. All rights reserved. Built for dealers who demand excellence.
          </p>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
            <div className="bg-white rounded-2xl p-4">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-16 h-16 mx-auto mb-4" />
                  <div>Video Demo Placeholder</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default HomeNew