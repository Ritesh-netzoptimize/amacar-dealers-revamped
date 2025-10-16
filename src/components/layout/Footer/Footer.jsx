export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A5F] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white/80 text-sm">
          <p>© {currentYear} Amacar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
