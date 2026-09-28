import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { 
  X, 
  Layers, 
  ArrowRight, 
  SlidersHorizontal, 
  Search, 
  ShoppingBag, 
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryQuickDrawerProps {
  categorySlug: string | null;
  onClose: () => void;
}

export const CategoryQuickDrawer: React.FC<CategoryQuickDrawerProps> = ({
  categorySlug,
  onClose
}) => {
  const { 
    categories, 
    products, 
    setSelectedCategorySlug, 
    setCurrentView 
  } = useStore();

  const [drawerSearch, setDrawerSearch] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  // Find the active category
  const activeCategory = useMemo(() => {
    if (!categorySlug) return null;
    return categories.find((c) => c.slug === categorySlug) || null;
  }, [categories, categorySlug]);

  // Filter products for this specific category
  const categoryProducts = useMemo(() => {
    if (!activeCategory) return [];
    
    let list = products.filter((p) => p.category === activeCategory.id);

    if (drawerSearch.trim()) {
      const q = drawerSearch.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price_asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }

    return list;
  }, [activeCategory, products, drawerSearch, sortBy]);

  if (!categorySlug || !activeCategory) return null;

  const handleOpenFullCatalog = () => {
    setSelectedCategorySlug(activeCategory.slug);
    setCurrentView('products');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-['Hind_Siliguri',sans-serif]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Sheet */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="relative bg-gradient-to-r from-[#0F3E36] via-[#155348] to-[#0A2E28] text-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-md shrink-0 bg-slate-800">
                    <img
                      src={activeCategory.image}
                      alt={activeCategory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30 mb-1">
                      <Layers className="w-3 h-3" />
                      ক্যাটাগরি সংগ্রহ
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {activeCategory.name}
                    </h3>
                    <p className="text-xs text-emerald-100/90 mt-0.5 max-w-md line-clamp-1">
                      {activeCategory.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub bar: Search & Sort inside Category */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200/80" />
                  <input
                    type="text"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    placeholder={`${activeCategory.name}-এর পণ্য খুঁজুন...`}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-emerald-100/60 text-xs focus:outline-hidden focus:bg-white/15 focus:border-amber-400"
                  />
                  {drawerSearch && (
                    <button
                      onClick={() => setDrawerSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white/10 text-white border border-white/20 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-hidden cursor-pointer"
                  >
                    <option value="popular" className="text-slate-900">জনপ্রিয়তা অনুযায়ী</option>
                    <option value="price_asc" className="text-slate-900">দাম: কম থেকে বেশি</option>
                    <option value="price_desc" className="text-slate-900">দাম: বেশি থেকে কম</option>
                  </select>

                  <span className="text-[11px] font-bold text-amber-300 bg-black/30 px-2.5 py-1.5 rounded-xl whitespace-nowrap">
                    মোট {categoryProducts.length} টি পণ্য
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Body: Products Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70">
              {categoryProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    কোনো পণ্য খুঁজে পাওয়া যায়নি
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    আপনার খোঁজা অনুযায়ী এই ক্যাটাগরিতে কোনো পণ্য মেলেনি। অন্য শব্দ লিখে চেষ্টা করুন।
                  </p>
                  {drawerSearch && (
                    <button
                      onClick={() => setDrawerSearch('')}
                      className="text-xs font-bold text-[#0F3E36] hover:underline"
                    >
                      সার্চ রিসেট করুন
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                সরাসরি অর্ডার করতে পণ্যের <strong>"অর্ডার করুন"</strong> বাটনে ক্লিক করুন।
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>

                <button
                  onClick={handleOpenFullCatalog}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F3E36] hover:bg-[#145247] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>পূর্ণ ক্যাটালগে দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
