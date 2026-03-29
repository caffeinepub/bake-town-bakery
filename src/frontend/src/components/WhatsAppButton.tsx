import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-brand-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-white/10 whitespace-nowrap">
          Order on WhatsApp
        </div>
      )}
      <a
        href="https://wa.me/919977777631?text=Hello! I want to place an order"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="wa-pulse w-14 h-14 bg-brand-yellow rounded-full flex items-center justify-center text-brand-dark shadow-yellow hover:brightness-110 transition-all"
        aria-label="Order on WhatsApp"
        data-ocid="whatsapp.primary_button"
      >
        <MessageCircle size={26} strokeWidth={2.5} />
      </a>
    </div>
  );
}
