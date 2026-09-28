import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  Share2, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    categories, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView,
    setSelectedCategorySlug,
    showToast,
    setIsCartDrawerOpen
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'shipping' | 'reviews'>('desc');

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isFavorited = isInWishlist(product.id);

  // Category name
  const category = categories.find((c) => c.id === product.category);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('লিঙ্ক কপি হয়েছে!', 'পণ্যটির লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে।', 'success');
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#0F3E36]">
            হোম
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setCurrentView('products')} className="hover:text-[#0F3E36]">
            সকল পণ্য
          </button>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <button 
                onClick={() => {
                  setSelectedCategorySlug(category.slug);
                  setCurrentView('products');
                }}
                className="hover:text-[#0F3E36]"
              >
                {category.name}
              </button>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {product.discountPercent && product.discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-xl shadow-md">
                    -{product.discountPercent}% ছাড়
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> বেস্টসেলার
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 justify-center overflow-x-auto py-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === index
                          ? 'border-[#0F3E36] scale-105 shadow-sm ring-2 ring-emerald-200'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Buying Actions (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* SKU, Category & Stock Status */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span>SKU: <strong className="text-slate-800 font-mono">{product.sku}</strong></span>
                    <span>ক্যাটাগরি: <strong className="text-[#0F3E36] font-semibold">{category?.name}</strong></span>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {product.stock > 0 ? `স্টকে আছে (${product.stock} টি)` : 'স্টক আউট'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500 text-xs">{product.reviewCount} টি কাস্টমার রিভিউ</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-4 py-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0F3E36]">
                    ৳{product.price.toLocaleString('bn-BD')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-slate-400 line-through">
                      ৳{product.originalPrice.toLocaleString('bn-BD')}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                      {product.discountPercent}% সাশ্রয়
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Quick Feature Bullets */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchasing Controls */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                {/* Quantity and Wishlist & Share */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-700">পরিমাণ:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-xs overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-5 py-2 text-sm font-bold text-slate-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isFavorited
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-slate-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                      <span>{isFavorited ? 'পছন্দের তালিকায় আছে' : 'উইশলিস্টে রাখুন'}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#0F3E36] hover:bg-slate-50 transition-colors"
                      title="শেয়ার করুন"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-50 hover:bg-[#0F3E36] text-[#0F3E36] hover:text-white rounded-xl text-sm font-bold border border-emerald-300/60 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    কার্টে যোগ করুন
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full py-3.5 px-6 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    এখনই অর্ডার করুন (Buy Now)
                  </button>
                </div>

                {/* Trust mini banner */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600 text-center">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50">
                    <Truck className="w-4 h-4 text-[#0F3E36]" />
                    <span className="font-semibold">সারা দেশে ডেলিভারি</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50">
                    <ShieldCheck className="w-4 h-4 text-[#0F3E36]" />
                    <span className="font-semibold">১০০% আসল পণ্য</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50">
                    <RotateCcw className="w-4 h-4 text-[#0F3E36]" />
                    <span className="font-semibold">৭ দিনের রিটার্ন</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Product Tabs: Description / Specs / Shipping / Reviews */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 text-sm sm:text-base font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'desc'
                    ? 'text-[#0F3E36] border-b-2 border-[#0F3E36]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                পণ্যের বিস্তারিত বিবরণ
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`pb-3 text-sm sm:text-base font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'features'
                    ? 'text-[#0F3E36] border-b-2 border-[#0F3E36]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                বৈশিষ্ট্য ও স্পেসিফিকেশন
              </button>

              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 text-sm sm:text-base font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-[#0F3E36] border-b-2 border-[#0F3E36]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ডেলিভারি ও রিটার্ন পলিসি
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm sm:text-base font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-[#0F3E36] border-b-2 border-[#0F3E36]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                কাস্টমার রিভিউ ({product.reviewCount})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6 text-sm text-slate-700 leading-relaxed max-w-4xl">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    সৌখিন বাজারের প্রতিটি পণ্য নিজস্ব কোয়ালিটি চেকিং টিম দ্বারা কঠোরভাবে যাচাই করা হয় যাতে আপনি পান নিখুঁত ও প্রিমিয়াম ফিনিশিং।
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">মূল বৈশিষ্ট্যসমূহ:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60">
                    <h4 className="font-bold text-[#0F3E36] mb-1">🚚 ডেলিভারি চার্জ ও সময়:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-700 text-xs sm:text-sm">
                      <li>ঢাকা সিটির মধ্যে: মাত্র ৬০ টাকা (২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি)।</li>
                      <li>ঢাকার বাইরে সারা দেশে: মাত্র ১২০ টাকা (২ থেকে ৩ কার্যদিবসের মধ্যে)।</li>
                      <li>২,০০০ টাকার বেশি অর্ডারে সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি!</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-1">🔄 ৭ দিনের রিটার্ন গ্যারান্টি:</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      পণ্য হাতে পেয়ে সাইজ, মান বা অন্য কোনো অসঙ্গতি থাকলে ডেলিভারির দিন থেকে ৭ দিনের মধ্যে সম্পূর্ণ বিনামূল্যে রিটার্ন করতে পারবেন।
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="text-center pr-4 border-r border-slate-200">
                      <div className="text-3xl font-extrabold text-[#0F3E36]">{product.rating.toFixed(1)}</div>
                      <div className="flex text-amber-400 justify-center my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-400">{product.reviewCount} টি রেটিং</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">১০০% ভেরিফায়েড ক্রেতাদের মতামত</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        আমাদের ক্রেতারা এই পণ্যের গুণমান ও নিখুঁত ফিনিশিং নিয়ে সন্তুষ্ট।
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                সম্পর্কিত আরও পণ্য
              </h2>
              <button
                onClick={() => {
                  setSelectedCategorySlug(category?.slug || null);
                  setCurrentView('products');
                }}
                className="text-xs sm:text-sm font-bold text-[#0F3E36] hover:underline"
              >
                ক্যাটাগরির সব দেখুন →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
