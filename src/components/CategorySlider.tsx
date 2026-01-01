"use client";
import { Milk } from "lucide-react";
import { Wheat } from "lucide-react";
import { Flame } from "lucide-react";
import { Heart } from "lucide-react";
import { Box } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Baby } from "lucide-react";
import { Home } from "lucide-react";
import { Coffee } from "lucide-react";
import { Cookie } from "lucide-react";
import { Apple } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const CategorySlider = () => {
  const categories = [
    { name: "Fruits & Vegetables", icon: Apple, color: "bg-green-100", id: 1 },
    { name: "Dairy & Eggs", icon: Milk, color: "bg-yellow-100", id: 2 },
    { name: "Rice Atta & Grains", icon: Wheat, color: "bg-brown-100", id: 3 },
    { name: "Snacks & Biscuits", icon: Cookie, color: "bg-orange-100", id: 4 },
    { name: "Spices & Masalas", icon: Flame, color: "bg-red-100", id: 5 },
    { name: "Beverages & Drinks", icon: Coffee, color: "bg-blue-100", id: 6 },
    { name: "Personal Care", icon: Heart, color: "bg-pink-100", id: 7 },
    {
      name: "Household & Essentials",
      icon: Home,
      color: "bg-purple-100",
      id: 8,
    },
    { name: "Instant & Packaged Food", icon: Box, color: "bg-teal-100", id: 9 },
    { name: "Baby & Pet Care", icon: Baby, color: "bg-lime-100", id: 10 },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmout = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmout, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      className="w-[90%] md:w-[80%] mx-auto mt-10 relative"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 Shop By Category
      </h2>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-green-700" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-10 pb-4 scrollbar-hide scroll-smooth"
      >
        {categories.map((category) => {
          const Icons = category.icon;
          return (
            <motion.div
              className={`min-w-[150px] md:min-w-[180px] flex flex-col items-center gap-3 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer ${category.color}`}
            >
              <div className="flex flex-col items-center justify-center p-3">
                <Icons className="w-10 h-10 text-green-700 mb-3" />
                <p className="text-center text-sm md:text-base font-semibold text-gray-700">
                  {category.name}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-green-700" />
      </button>
    </motion.div>
  );
};

export default CategorySlider;
