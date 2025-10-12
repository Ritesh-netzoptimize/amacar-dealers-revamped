export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-neutral-400 text-sm">
          <p>© {currentYear} Amacar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
