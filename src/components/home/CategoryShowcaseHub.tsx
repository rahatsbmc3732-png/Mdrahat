import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryQuickDrawer } from './CategoryQuickDrawer';
import { 
  Layers, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const CategoryShowcaseHub: React.FC = () => {
  const { categories, setSelectedCategorySlug, setCurrentView } = useStore();
  const [activePreviewCategorySlug, setActivePreviewCategorySlug] = useState<string | null>(null);

  const handleOpenCategoryFull = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentView('products');
  };

  const handleQuickPreview = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePreviewCategorySlug(slug);
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#F4F9F6] to-white font-['Hind_Siliguri',sans-serif] relative overflow-hidden border-t border-emerald-100">
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Standard, Clean, & Refined */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-[#0F3E36] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            সুশৃঙ্খল ক্যাটাগরি কালেকশন
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            পছন্দের ক্যাটাগরি বেছে নিয়ে পণ্য দেখুন
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
            কোনো ধরনের বিশৃঙ্খলা ছাড়াই আমাদের প্রতিটি পণ্য সুনির্দিষ্ট ক্যাটাগরিতে গুছিয়ে রাখা হয়েছে। যেকোনো ক্যাটাগরিতে ক্লিক করে তার ভেতরের সকল পণ্য এক পলকে দেখুন।
          </p>

          {/* Quick Pill Navigator */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActivePreviewCategorySlug(cat.slug)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-700 hover:text-[#0F3E36] transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                  {cat.itemCount}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid - High-end, pristine cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setActivePreviewCategorySlug(cat.slug)}
              className="group relative bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(15,62,54,0.12)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Category Card Media */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay for Depth & Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Item Count Badge */}
                <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0F3E36] border border-white/60 shadow-md flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>{cat.itemCount} টি পণ্য</span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-0.5">
                    {cat.nameEn}
                  </div>
                  <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Category Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                  {cat.description}
                </p>

                {/* Card Actions: 2 Standard, Intuitive Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={(e) => handleQuickPreview(cat.slug, e)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-[#0F3E36] text-[#0F3E36] hover:text-white text-xs font-bold transition-all border border-emerald-200/80 hover:border-[#0F3E36] shadow-2xs hover:shadow-sm cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>পণ্য দেখুন (দ্রুত ভিউ)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCategoryFull(cat.slug);
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                    title="সম্পূর্ণ ক্যাটালগে খুলুন"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Universal Bottom Action to View Full Catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setCurrentView('products');
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 hover:text-[#0F3E36] font-bold text-sm border-2 border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#0F3E36]" />
            <span>সকল ক্যাটাগরি ও পণ্য একসঙ্গে দেখতে ক্লিক করুন</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

      </div>

      {/* Category Quick Drawer for Seamless In-Page Browsing */}
      {activePreviewCategorySlug && (
        <CategoryQuickDrawer
          categorySlug={activePreviewCategorySlug}
          onClose={() => setActivePreviewCategorySlug(null)}
        />
      )}
    </section>
  );
};
