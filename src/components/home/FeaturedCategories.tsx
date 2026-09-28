import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedCategories: React.FC = () => {
  const { categories, setSelectedCategorySlug, setCurrentView } = useStore();

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentView('products');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3E36] uppercase bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/70">
              <Layers className="w-3 h-3" />
              জনপ্রিয় ক্যাটাগরি
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5">
              পছন্দের ক্যাটাগরি বেছে নিন
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setCurrentView('products');
            }}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F3E36] hover:underline cursor-pointer shrink-0"
          >
            সব দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group bg-white rounded-2xl border border-slate-200/80 hover:border-[#0F3E36]/40 p-3.5 flex flex-col items-center text-center shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Category Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Title & Item count */}
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0F3E36] transition-colors leading-tight">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-1">
                {cat.itemCount} টি পণ্য
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

