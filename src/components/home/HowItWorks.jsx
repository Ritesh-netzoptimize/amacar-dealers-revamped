import { AnimatedSection } from "../common/AnimatedSection/AnimatedSection";
import { motion } from "framer-motion";
import { UserPlus, Search, Gavel, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "1",
      title: "Sign Up in Minutes",
      description:
        "Complete your dealer verification and get instant access to our live auction platform. No lengthy approval processes.",
      icon: <UserPlus className="w-8 h-8" />,
      gradient: "from-[#2B5A8E] to-[#1E3A5F]",
    },
    {
      number: "2",
      title: "Browse Quality Inventory",
      description:
        "Review pre-qualified private seller vehicles that match your inventory needs. Get detailed vehicle reports and photos.",
      icon: <Search className="w-8 h-8" />,
      gradient: "from-[#FF8A3D] to-[#FFB366]",
    },
    {
      number: "3",
      title: "Bid & Win Instantly",
      description:
        "Participate in real-time auctions with unlimited bidding. Win quality vehicles at competitive prices with zero per-unit fees.",
      icon: <Gavel className="w-8 h-8" />,
      gradient: "from-[#28A745] to-[#20C997]",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-18 bg-gradient-to-br from-white to-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-[#FF8A3D]/10 rounded-full mb-6">
            <span className="text-[#FF8A3D] font-semibold text-sm">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-xl text-[#2C3E50]/70 max-w-3xl mx-auto leading-relaxed">
            Get started in minutes with our streamlined 3-step process designed
            for maximum efficiency
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2B5A8E] via-[#FF8A3D] to-[#28A745] opacity-20" />

          {steps.map((step, index) => (
            <AnimatedSection key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(43, 90, 142, 0.15)",
                }}
                className="relative group"
              >
                {/* Step number with gradient */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="relative p-8 pt-12 bg-white rounded-2xl border border-[#E9ECEF] shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-[#2B5A8E]/20">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {step.number}
                  </div>

                  <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#2B5A8E] transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-[#2C3E50]/70 leading-relaxed group-hover:text-[#2C3E50] transition-colors duration-300">
                    {step.description}
                  </p>

                  {/* Hover indicator */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
          onClick={() => navigate("/register")}
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#2B5A8E] to-[#1E3A5F] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
