import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "MENU", href: "#menu" },
  { label: "ABOUT", href: "#about" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "CONTACT", href: "#contact" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/98 shadow-[0_4px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-sm"
          : "bg-brand-dark/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <span className="text-2xl">🎂</span>
            <div className="leading-tight">
              <span className="block font-black text-brand-yellow uppercase tracking-wider text-lg leading-none">
                BAKE TOWN
              </span>
              <span className="block text-white text-xs font-medium tracking-[0.2em] uppercase leading-none">
                BAKERY
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-brand-yellow transition-colors text-sm font-medium uppercase tracking-wider"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("#menu")}
              className="flex items-center gap-2 bg-brand-yellow text-brand-dark font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-full hover:brightness-110 transition-all shadow-yellow"
              data-ocid="nav.primary_button"
            >
              <ShoppingBag size={16} />
              ORDER NOW
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => {
                  setMobileOpen(false);
                  scrollTo(link.href);
                }}
                className="text-white/80 hover:text-brand-yellow transition-colors text-sm font-medium uppercase tracking-wider py-2 text-left"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                scrollTo("#menu");
              }}
              className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-full"
              data-ocid="nav.primary_button"
            >
              <ShoppingBag size={16} />
              ORDER NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
