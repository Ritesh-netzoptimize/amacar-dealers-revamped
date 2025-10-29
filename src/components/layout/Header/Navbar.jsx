import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/ui/LoginUI/LoginModal";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutModal from "@/components/ui/LogoutUI/LogoutModal";
import { logoutUser } from "@/redux/slices/userSlice";

// Navbar Component
export default function Navbar() {
  const navLinks = [
    { name: "Features", id: "features" },
    { name: "How it Works", id: "how-it-works" },
    { name: "Success Stories", id: "success-stories" },
    { name: "FAQ", id: "faq" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
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
    setIsMobileMenuOpen(false);

    // Check if we're on the home page
    if (location.pathname === "/") {
      // We're already on home page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Not on home page, store section ID and navigate
      sessionStorage.setItem("scrollToSection", sectionId);
      navigate("/");
    }
  };

  // Handle scrolling when navigating to home page
  useEffect(() => {
    if (location.pathname === "/") {
      // Check if there's a section to scroll to in sessionStorage
      const sectionId = sessionStorage.getItem("scrollToSection");
      if (sectionId) {
        sessionStorage.removeItem("scrollToSection");
        // Use a more reliable method to wait for DOM
        const scrollToElement = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            // If element not found yet, try again after a short delay
            setTimeout(scrollToElement, 50);
          }
        };
        // Small delay to ensure DOM is ready
        setTimeout(scrollToElement, 100);
      } else if (location.hash) {
        // Also handle hash-based navigation
        const sectionId = location.hash.substring(1);
        const scrollToElement = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            setTimeout(scrollToElement, 50);
          }
        };
        setTimeout(scrollToElement, 100);
      }
    }
  }, [location]);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-md"
        : "bg-white/95 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img
              src="https://dealer.amacar.ai/wp-content/uploads/2024/10/logo-4-2048x680.png"
              alt="Amacar Logo"
              className="h-6 sm:h-7 md:h-8 lg:h-10 w-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -2 }}
                className="cursor-pointer font-semibold transition-all duration-300 px-3 py-2 rounded-lg text-[#4A4A4A] hover:text-[#4F46E5] hover:bg-[#4F46E5]/10"
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer px-4 lg:px-6 py-2 lg:py-2.5 bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm lg:text-base"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base text-[#4F46E5] rounded-lg font-semibold border-2 border-[#4F46E5] bg-white hover:bg-[#4F46E5]/10 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    setLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer px-4 lg:px-6 py-2 lg:py-2.5 bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm lg:text-base"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="cursor-pointer px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base text-[#4F46E5] rounded-lg font-semibold border-2 border-[#4F46E5] bg-white hover:bg-[#4F46E5] hover:text-white transition-all"
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="cursor-pointer md:hidden p-2 rounded-lg transition-all duration-300 text-[#4A4A4A] hover:bg-[#4F46E5]/10 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pb-3 sm:pb-4"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 mx-1 sm:mx-0">
              {/* Navigation Links */}
              <div className="space-y-1 sm:space-y-2">
                {navLinks.map((link) => (
                  <motion.button
                    animate={{ opacity: 1, height: "auto" }}
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="cursor-pointer block w-full text-left py-2.5 sm:py-3 px-3 sm:px-4 text-[#4F46E5] font-semibold hover:text-[#15A9D8] hover:bg-[#15A9D8]/10 rounded-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200/50">
                {user ? (
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-[#4F46E5] rounded-lg font-semibold border-2 border-[#4F46E5] bg-white hover:bg-[#4F46E5]/10 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[#4F46E5] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Login →
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-[#4F46E5] rounded-lg font-semibold border-2 border-[#4F46E5] bg-white hover:bg-[#4F46E5] hover:text-white transition-all"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
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
