import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/ui/LoginUI/LoginModal";
import { useNavigate } from "react-router-dom";
import LogoutModal from "@/components/ui/LogoutUI/LogoutModal";
import { logout } from "@/redux/slices/userSlice";

// Navbar Component
export default function Navbar() {
  const navLinks = ["Features", "How it Works", "Success Stories", "FAQ"];
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
    await dispatch(logout());
    // console.log("after calling dispatch logout")
    navigate("/");
    // setLogoutModalOpen(false);
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
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-[var(--brand-orange)] bg-clip-text text-transparent">
              Amacar
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                whileHover={{ y: -2 }}
                className="text-neutral-700 hover:text-orange-500 font-medium transition-colors"
              >
                {link}
              </motion.a>
            ))}
            {user ? (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-2.5 text-sm text-orange-500 rounded-lg font-semibold border-2 border-[var(--brand-orange)] bg-white"
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
                  className="px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="w-full px-6 py-2.5 text-sm text-orange-500 rounded-lg font-semibold border-2 border-[var(--brand-orange)] bg-white hover:bg-orange-50 transition-colors"
                >
                  Join as dealer
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
            {navLinks.map((link) => (
              <motion.a
                animate={{ opacity: 1, height: "auto" }}
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="block py-2 text-neutral-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-2 w-full px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold"
              >
                Dashboard
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full px-6 py-2.5 bg-[var(--brand-orange)] text-white rounded-lg font-semibold"
                >
                  Login →
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="mt-2 w-full px-6 py-2.5 text-sm text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                >
                  Join as dealer
                </button>
              </div>
            )}
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
