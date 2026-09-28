import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    cartSubtotal, 
    cartTotalCount, 
    updateCartQty, 
    removeFromCart, 
    setCurrentView,
    siteConfig 
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleGoToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  const handleGoToCart = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('cart');
  };

  const isFreeShipping = cartSubtotal >= siteConfig.freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / siteConfig.freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, siteConfig.freeShippingThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-['Hind_Siliguri',sans-serif]">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#0F3E36] text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">আপনার শপিং কার্ট</h3>
                <span className="text-xs text-slate-500">{cartTotalCount} টি পণ্য যুক্ত আছে</span>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-emerald-50/60 border-b border-emerald-100 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                অভিনন্দন! আপনি সারা দেশে ফ্রি ডেলিভারি পাচ্ছেন! 🎉
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>ফ্রি ডেলিভারির জন্য আরও <strong>৳{remainingForFreeShipping.toLocaleString('bn-BD')}</strong> টাকার পণ্য কিনুন</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F3E36] transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center justify-between"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="text-xs font-bold text-[#0F3E36] mt-0.5">
                      ৳{item.product.price.toLocaleString('bn-BD')}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        = ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-700">আপনার কার্ট খালি</h4>
                  <p className="text-xs text-slate-400 mt-1">পছন্দের পণ্য কার্টে যুক্ত করুন।</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('products');
                  }}
                  className="px-5 py-2.5 bg-[#0F3E36] text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  কেনাকাটা শুরু করুন
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-medium">সাবটোটাল:</span>
                <span className="text-lg font-bold text-[#0F3E36]">
                  ৳{cartSubtotal.toLocaleString('bn-BD')}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                * ডেলিভারি চার্জ চেকআউটের সময় আপনার এলাকার ভিত্তিতে নির্ধারণ হবে।
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleGoToCart}
                  className="py-3 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  কার্ট পেজে যান
                </button>
                <button
                  onClick={handleGoToCheckout}
                  className="py-3 px-3 rounded-xl bg-[#0F3E36] hover:bg-[#0c2f29] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  চেকআউট <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>নিরাপদ ও দ্রুত চেকআউট পদ্ধতি</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
