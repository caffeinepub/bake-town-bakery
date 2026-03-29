import { Heart, Leaf, Star } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Daily",
    desc: "Every item baked fresh each morning with the finest local ingredients.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "We never compromise on quality — each bite is a testament to our craft.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Passion and care go into everything we bake, from cakes to croissants.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-dark py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <p className="text-brand-yellow font-semibold uppercase tracking-[0.3em] text-sm mb-4 reveal">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-6 reveal">
              ABOUT
              <span className="block text-brand-yellow">US</span>
            </h2>
            <div className="w-16 h-1 bg-brand-yellow mb-8 reveal" />
            <p className="text-white/70 text-lg leading-relaxed mb-10 reveal">
              Born from a passion for perfection, Bake Town Bakery has been
              serving the people of Khajrana, Indore with freshly baked delights
              since day one. Every item is crafted with love, using the finest
              ingredients to ensure quality, taste, and freshness in every bite.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`reveal reveal-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-brand-yellow/50 hover:bg-brand-yellow/5 transition-all`}
                >
                  <div className="w-10 h-10 bg-brand-yellow/20 rounded-full flex items-center justify-center mb-3">
                    <feat.icon size={18} className="text-brand-yellow" />
                  </div>
                  <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_0_oklch(0.82_0.165_88_/_0.15)]">
              <img
                src="/assets/generated/hero-banner.dim_1200x600.jpg"
                alt="Bake Town Bakery kitchen"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
              {/* Rating Badge */}
              <div className="absolute bottom-6 left-6 bg-brand-yellow text-brand-dark font-black text-xl px-5 py-3 rounded-2xl shadow-yellow">
                ⭐ 4.5 <span className="text-sm font-semibold">Rating</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-brand-yellow/30 rounded-3xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-yellow/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
