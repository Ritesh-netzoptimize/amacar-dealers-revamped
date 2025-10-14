import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/ui/LoginUI/LoginModal";
import { useNavigate } from "react-router-dom";
import LogoutModal from "@/components/ui/LogoutUI/LogoutModal";
import { logoutUser } from "@/redux/slices/userSlice";

// Navbar Component
export default function Navbar() {
  const navLinks = [
    { name: "Features", id: "features" },
    { name: "How it Works", id: "how-it-works" },
    { name: "Success Stories", id: "success-stories" },
    { name: "FAQ", id: "faq" }
  ];
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleForgotPassword = () => {
    console.log("Open forgot password modal");
  };

  const handleLogout = () => {
    setLogoutModalOpen(true);
    setOpen(false);
  };

  const handleConfirmLogout = async () => {
    // console.log("Before calling dispatch logout")
    await dispatch(logoutUser());
    // console.log("after calling dispatch logout")
    navigate("/");
    // setLogoutModalOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="https://dealer.amacar.ai/wp-content/uploads/2024/10/logo-4-2048x680.png"
              alt="Amacar Logo"
              className="h-8 sm:h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -2 }}
                className={`cursor-pointer font-semibold font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                  isScrolled 
                    ? "text-[var(--brand-orange)] hover:text-orange-500 hover:bg-orange-50" 
                    : "text-white hover:text-orange-300 hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                {link.name}
              </motion.button>
            ))}
            {user ? (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full px-6 py-2.5 text-sm text-orange-500 rounded-lg font-semibold border-2 border-[var(--brand-orange)] bg-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="cursor-pointer w-full px-6 py-2.5 text-sm text-orange-500 rounded-lg font-semibold shadow-lg bg-white hover:bg-orange-50 transition-colors"
                >
                  Join as dealer
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`cursor-pointer md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? "text-gray-700 hover:bg-gray-100" 
                : "text-white hover:bg-white/10 backdrop-blur-sm"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pb-4"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
              {navLinks.map((link) => (
                <motion.button
                  animate={{ opacity: 1, height: "auto" }}
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="cursor-pointer block w-full text-left py-3 px-4 text-[var(--brand-orange)] font-semibold hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                >
                  {link.name}
                </motion.button>
              ))}
              {user ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer mt-4 w-full px-6 py-3 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Dashboard
                </button>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <button
                    onClick={() => {
                      setLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="cursor-pointer w-full px-6 py-3 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Login →
                  </button>
                  <button 
                    onClick={() => navigate("/register")}
                    className="cursor-pointer w-full px-6 py-3 text-sm text-orange-500 rounded-lg font-semibold border-2 border-[var(--brand-orange)] bg-white hover:bg-orange-50 transition-all"
                  >
                    Join as dealer
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Login Modal */}
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onForgotPassword={handleForgotPassword}
        />

        {logoutModalOpen && (
          <LogoutModal
            isOpen={logoutModalOpen}
            onClose={() => setLogoutModalOpen(false)}
            onConfirm={handleConfirmLogout}
          />
        )}
      </div>
    </motion.nav>
  );
}
