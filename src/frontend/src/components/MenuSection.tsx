import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Category } from "../backend.d";
import { useGetAllMenuItems } from "../hooks/useQueries";

const FALLBACK_ITEMS = [
  {
    id: 1n,
    name: "Chocolate Fantasy Cake",
    category: Category.cakes,
    price: "₹450",
    description: "Rich dark chocolate layers",
    imageUrl: "/assets/generated/cake-chocolate.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 2n,
    name: "Vanilla Dream Cake",
    category: Category.cakes,
    price: "₹350",
    description: "Light fluffy vanilla sponge",
    imageUrl: "/assets/generated/cake-vanilla.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 3n,
    name: "Red Velvet Cake",
    category: Category.cakes,
    price: "₹500",
    description: "Classic red velvet with cream cheese",
    imageUrl: "/assets/generated/cake-redvelvet.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 4n,
    name: "Butter Croissant",
    category: Category.pastries,
    price: "₹80",
    description: "Flaky French-style croissant",
    imageUrl: "/assets/generated/pastry-croissant.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 5n,
    name: "Cinnamon Rolls",
    category: Category.pastries,
    price: "₹120",
    description: "Warm rolls with cream glaze",
    imageUrl: "/assets/generated/pastry-cinnaroll.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 6n,
    name: "French Macarons",
    category: Category.pastries,
    price: "₹200",
    description: "Colorful Parisian macarons",
    imageUrl: "/assets/generated/pastry-macaron.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 7n,
    name: "Classic Burger",
    category: Category.fastFood,
    price: "₹150",
    description: "Juicy burger with fresh veggies",
    imageUrl: "/assets/generated/food-burger.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 8n,
    name: "Veg Pizza",
    category: Category.fastFood,
    price: "₹250",
    description: "Loaded vegetarian pizza",
    imageUrl: "/assets/generated/food-pizza.dim_400x300.jpg",
    isAvailable: true,
  },
  {
    id: 9n,
    name: "Crispy Fries",
    category: Category.fastFood,
    price: "₹90",
    description: "Golden crispy french fries",
    imageUrl: "/assets/generated/food-fries.dim_400x300.jpg",
    isAvailable: true,
  },
];

const CATEGORY_IMAGE_MAP: Record<string, Record<string, string>> = {
  [Category.cakes]: {
    "Chocolate Fantasy Cake":
      "/assets/generated/cake-chocolate.dim_400x300.jpg",
    "Vanilla Dream Cake": "/assets/generated/cake-vanilla.dim_400x300.jpg",
    "Red Velvet Cake": "/assets/generated/cake-redvelvet.dim_400x300.jpg",
  },
  [Category.pastries]: {
    "Butter Croissant": "/assets/generated/pastry-croissant.dim_400x300.jpg",
    "Cinnamon Rolls": "/assets/generated/pastry-cinnaroll.dim_400x300.jpg",
    "French Macarons": "/assets/generated/pastry-macaron.dim_400x300.jpg",
  },
  [Category.fastFood]: {
    "Classic Burger": "/assets/generated/food-burger.dim_400x300.jpg",
    "Veg Pizza": "/assets/generated/food-pizza.dim_400x300.jpg",
    "Crispy Fries": "/assets/generated/food-fries.dim_400x300.jpg",
  },
};

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  [Category.cakes]: "/assets/generated/cake-chocolate.dim_400x300.jpg",
  [Category.pastries]: "/assets/generated/pastry-croissant.dim_400x300.jpg",
  [Category.fastFood]: "/assets/generated/food-burger.dim_400x300.jpg",
};

function resolveImage(item: {
  imageUrl: string;
  name: string;
  category: Category;
}): string {
  if (item.imageUrl?.startsWith("/assets/generated/")) return item.imageUrl;
  const catMap = CATEGORY_IMAGE_MAP[item.category as string];
  if (catMap?.[item.name]) return catMap[item.name];
  return (
    CATEGORY_FALLBACK_IMAGES[item.category as string] ??
    "/assets/generated/cake-chocolate.dim_400x300.jpg"
  );
}

const TABS = [
  { key: "all", label: "ALL", icon: "🍽️" },
  { key: Category.cakes, label: "CAKES", icon: "🎂" },
  { key: Category.pastries, label: "PASTRIES", icon: "🍰" },
  { key: Category.fastFood, label: "FAST FOOD", icon: "🍔" },
];

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { data: backendItems } = useGetAllMenuItems();

  const items = (
    backendItems && backendItems.length > 0 ? backendItems : FALLBACK_ITEMS
  )
    .filter((i) => i.isAvailable)
    .filter((i) => activeTab === "all" || i.category === activeTab);

  return (
    <section id="menu" className="section-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-brand-yellow font-semibold uppercase tracking-[0.3em] text-sm mb-3">
            What We Serve
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-brand-dark tracking-tight">
            OUR DELICIOUS
            <span className="block text-brand-yellow">SELECTION</span>
          </h2>
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all border-2 ${
                activeTab === tab.key
                  ? "bg-brand-yellow text-brand-dark border-brand-yellow shadow-yellow"
                  : "border-brand-dark/20 text-brand-dark/70 hover:border-brand-yellow hover:text-brand-dark"
              }`}
              data-ocid="menu.filter.tab"
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {items.length === 0 ? (
          <div
            className="text-center py-16 text-brand-dark/50"
            data-ocid="menu.empty_state"
          >
            <span className="text-5xl block mb-4">🍽️</span>
            <p className="text-lg font-medium">
              No items available in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={String(item.id)}
                className={`reveal reveal-delay-${Math.min((idx % 3) + 1, 4)} bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col`}
                data-ocid={`menu.item.${idx + 1}`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={resolveImage(
                      item as {
                        imageUrl: string;
                        name: string;
                        category: Category;
                      },
                    )}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-brand-dark text-lg leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-brand-dark/60 text-sm mb-3 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-brand-yellow">
                      {item.price}
                    </span>
                    <a
                      href={`https://wa.me/919977777631?text=I want to order ${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-brand-dark text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-brand-yellow hover:text-brand-dark transition-all"
                      data-ocid={`menu.primary_button.${idx + 1}`}
                    >
                      <MessageCircle size={14} />
                      Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
