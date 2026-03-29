import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section-dark py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-brand-yellow font-semibold uppercase tracking-[0.3em] text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            FIND US &amp;
            <span className="block text-brand-yellow">CONTACT</span>
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <div className="reveal rounded-2xl overflow-hidden shadow-[0_0_40px_0_rgba(0,0,0,0.5)]">
            <iframe
              src="https://maps.google.com/maps?q=Khajrana,+Indore,+Madhya+Pradesh&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bake Town Bakery Location"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6 reveal">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-yellow/40 transition-all">
              <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-1">
                  Address
                </h4>
                <p className="text-white/60">Khajrana, Indore</p>
                <p className="text-white/60">Madhya Pradesh, India – 452016</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-yellow/40 transition-all">
              <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">
                  Phone
                </h4>
                <a
                  href="tel:+919977777631"
                  className="text-brand-yellow font-bold text-lg hover:underline"
                  data-ocid="contact.primary_button"
                >
                  +91 99777 77631
                </a>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-brand-yellow/40 transition-all">
              <div className="w-12 h-12 bg-brand-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-brand-yellow" />
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-1">
                  Timings
                </h4>
                <p className="text-white/60">Monday – Sunday</p>
                <p className="text-white font-semibold">8:00 AM – 10:00 PM</p>
              </div>
            </div>

            <a
              href="https://wa.me/919977777631?text=Hello! I want to place an order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-brand-yellow text-brand-dark font-black text-base uppercase tracking-wider px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-yellow w-full"
              data-ocid="contact.secondary_button"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
