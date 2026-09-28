import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { 
    setSelectedProductId, 
    setCurrentView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    setIsCartDrawerOpen
  } = useStore();

  const handleProductClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div 
      onClick={handleProductClick}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-[#0F3E36]/40 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer font-['Hind_Siliguri',sans-serif]"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-bold shadow-xs">
              -{product.discountPercent}% ছাড়
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-900 text-[11px] font-bold shadow-xs flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-900" /> বেস্টসেলার
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-md bg-[#0F3E36] text-white text-[11px] font-bold shadow-xs">
              নতুন
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFavorited
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>

          <button
            onClick={handleQuickView}
            aria-label="Quick View"
            className="p-2 rounded-full bg-white/90 text-slate-600 hover:text-[#0F3E36] hover:bg-white backdrop-blur-md transition-all shadow-sm opacity-0 group-hover:opacity-100"
            title="কুইক ভিউ"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Status Pill on bottom */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-500/90 text-slate-900 text-[10px] font-bold text-center py-0.5 rounded-md backdrop-blur-xs">
            মাত্র {product.stock} টি স্টকে আছে!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              স্টক আউট
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-500 mb-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-slate-700 ml-1">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm text-slate-800 line-clamp-2 group-hover:text-[#0F3E36] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-1 mt-1">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#0F3E36]">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-1 py-2 px-2 bg-emerald-50 hover:bg-[#0F3E36] text-[#0F3E36] hover:text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              কার্ট
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full py-2 px-2 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:pointer-events-none shadow-xs cursor-pointer"
            >
              এখনই কিনুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
