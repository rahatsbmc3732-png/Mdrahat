import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles, Flame, Star, Tag } from 'lucide-react';
import { motion } from 'motion/react';

type TabType = 'all' | 'bestseller' | 'new' | 'discount';

export const FeaturedProducts: React.FC = () => {
  const { products, setCurrentView, setSelectedCategorySlug } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'discount') return p.discountPercent && p.discountPercent > 0;
    return true; // all
  });

  return (
    <section className="py-12 sm:py-16 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200/70">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              বাছাইকৃত পণ্য
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1.5">
              সেরা ও জনপ্রিয় কালেকশন
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl self-start md:self-auto border border-slate-200/60">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-[#0F3E36] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              সব পণ্য
            </button>

            <button
              onClick={() => setActiveTab('bestseller')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'bestseller'
                  ? 'bg-white text-[#0F3E36] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              বেস্টসেলার
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-white text-[#0F3E36] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              নতুন আগমন
            </button>

            <button
              onClick={() => setActiveTab('discount')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'discount'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-rose-500" />
              বিশেষ অফার
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedCategorySlug(null);
              setCurrentView('products');
            }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 hover:bg-[#0F3E36] text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            সকল {products.length}+ পণ্য দেখুন
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

