import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setCurrentView } = useStore();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <button onClick={() => setCurrentView('home')} className="hover:text-[#0F3E36]">
              হোম
            </button>
            <span>/</span>
            <span className="text-slate-800 font-semibold">পছন্দের তালিকা</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
              <Heart className="w-6 h-6 fill-rose-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                আপনার পছন্দের তালিকা (Wishlist)
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                মোট {favoriteProducts.length} টি পণ্য সংরক্ষিত আছে
              </p>
            </div>
          </div>
        </div>

        {/* Grid or Empty */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              আপনার উইশলিস্ট খালি!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              পছন্দের পণ্যের হার্ট আইকনে ক্লিক করে সংরক্ষণ করুন এবং পরবর্তীতে সহজে কিনুন।
            </p>
            <button
              onClick={() => setCurrentView('products')}
              className="px-6 py-2.5 bg-[#0F3E36] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#0c2f29] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              পণ্য ব্রাউজ করুন
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
