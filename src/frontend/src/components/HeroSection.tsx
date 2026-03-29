import { ChevronDown, MapPin, MessageCircle, Star } from "lucide-react";

export default function HeroSection() {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="Bake Town Bakery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/40 text-brand-yellow text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Star size={14} className="fill-brand-yellow text-brand-yellow" />
          <span>4.5 Rating</span>
          <span className="w-px h-4 bg-brand-yellow/40" />
          <MapPin size={14} />
          <span>Khajrana, Indore</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animate-delay-200 font-black uppercase leading-tight mb-4">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-yellow tracking-tight">
            FRESHLY BAKED
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight">
            HAPPINESS
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up animate-delay-400 text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light">
          Freshly Baked Happiness Delivered to You — Cakes, Pastries &amp; Fast
          Food in Khajrana, Indore
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/919977777631?text=Hello! I want to place an order"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-yellow text-brand-dark font-bold text-base uppercase tracking-wider px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-yellow w-full sm:w-auto justify-center"
            data-ocid="hero.primary_button"
          >
            <MessageCircle size={20} />
            ORDER ON WHATSAPP
          </a>
          <button
            type="button"
            onClick={scrollToMenu}
            className="flex items-center gap-2 border-2 border-white text-white font-bold text-base uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-brand-dark transition-all w-full sm:w-auto justify-center"
            data-ocid="hero.secondary_button"
          >
            VIEW MENU
          </button>
        </div>

        {/* Scroll down indicator */}
        <div className="animate-fade-in-up animate-delay-800 mt-16 flex justify-center">
          <button
            type="button"
            onClick={scrollToMenu}
            className="text-white/40 hover:text-brand-yellow transition-colors animate-bounce"
            aria-label="Scroll to menu"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
