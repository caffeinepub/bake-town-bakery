import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    initials: "PS",
    rating: 5,
    text: "The chocolate cake was absolutely divine! Perfectly moist and incredibly tasty. The presentation was stunning too. Will definitely order again!",
    date: "2 weeks ago",
  },
  {
    name: "Rahul Gupta",
    initials: "RG",
    rating: 5,
    text: "Best bakery in Indore! The croissants here are flaky and buttery, just like the real deal. Their fast food is equally amazing. Highly recommend!",
    date: "1 month ago",
  },
  {
    name: "Sunita Verma",
    initials: "SV",
    rating: 4.5,
    text: "Ordered a birthday cake last minute and they delivered perfectly on time! Amazing service and the taste was out of this world. Family loved it!",
    date: "3 weeks ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={
            n <= Math.floor(rating)
              ? "text-brand-yellow fill-brand-yellow"
              : n - 0.5 <= rating
                ? "text-brand-yellow fill-brand-yellow/50"
                : "text-brand-dark/20"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 reveal">
          <p className="text-brand-yellow font-semibold uppercase tracking-[0.3em] text-sm mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-dark tracking-tight">
            CUSTOMER
            <span className="block text-brand-yellow">LOVE</span>
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 mb-6" />
        </div>

        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-4 mb-12 reveal">
          <div className="text-center">
            <div className="text-5xl font-black text-brand-dark">4.5</div>
            <div className="flex justify-center mt-1">
              <StarRating rating={4.5} />
            </div>
            <div className="text-brand-dark/60 text-sm mt-1">
              Average Rating
            </div>
          </div>
          <div className="w-px h-16 bg-brand-dark/20" />
          <div className="text-center">
            <div className="text-5xl font-black text-brand-dark">500+</div>
            <div className="text-brand-dark/60 text-sm mt-1">
              Happy Customers
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.name}
              className={`reveal reveal-delay-${idx + 1} bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col`}
              data-ocid={`reviews.item.${idx + 1}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark font-black text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">{review.name}</h4>
                  <p className="text-brand-dark/40 text-xs">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-brand-dark/70 text-sm leading-relaxed mt-3 flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
