import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "baketown";

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="section-darker border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎂</span>
              <div>
                <span className="block font-black text-brand-yellow uppercase tracking-wider text-lg leading-none">
                  BAKE TOWN
                </span>
                <span className="block text-white text-xs font-medium tracking-[0.2em] uppercase leading-none">
                  BAKERY
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Freshly baked happiness delivered to your door. Located in
              Khajrana, Indore.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all"
              >
                <SiFacebook size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all"
              >
                <SiInstagram size={14} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all"
              >
                <SiX size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    className="text-white/50 hover:text-brand-yellow transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
              Contact Us
            </h4>
            <div className="space-y-2">
              <p className="text-white/50 text-sm">
                📍 Khajrana, Indore, MP, India
              </p>
              <p className="text-white/50 text-sm">📞 +91 99777 77631</p>
              <p className="text-white/50 text-sm">
                🕐 8:00 AM – 10:00 PM (Daily)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {year} Bake Town Bakery. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-sm hover:text-brand-yellow transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
