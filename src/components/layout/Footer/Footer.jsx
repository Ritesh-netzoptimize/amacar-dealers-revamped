import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A5F] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-4">
          <Link to="/privacy-policy" className="text-white/80 hover:text-white text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="text-white/80 hover:text-white text-sm transition-colors">
            Terms & Conditions
          </Link>
          <Link to="/dealership-agreement" className="text-white/80 hover:text-white text-sm transition-colors">
            Dealership Agreement
          </Link>
        </div>
        <div className="text-center text-white/80 text-sm">
          <p>© {currentYear} Amacar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
