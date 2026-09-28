import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Check, 
  X, 
  Sparkles, 
  Truck, 
  RotateCcw,
  ChevronRight
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartTotalCount, 
    updateCartQty, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    deliveryLocation, 
    setDeliveryLocation, 
    deliveryCharge, 
    couponDiscount, 
    finalTotal, 
    setCurrentView,
    siteConfig 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput.trim());
  };

  const isFreeShipping = cartSubtotal >= siteConfig.freeShippingThreshold;

  if (cart.length === 0) {
    return (
      <div className="py-16 sm:py-24 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center px-4 space-y-4">
          <div className="w-20 h-20 bg-emerald-50 text-[#0F3E36] rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">আপনার শপিং কার্ট খালি</h2>
          <p className="text-sm text-slate-500">
            আপনি এখনো কার্টে কোনো পণ্য যুক্ত করেননি। আমাদের আকর্ষণীয় কালেকশনগুলো ব্রাউজ করুন।
          </p>
          <button
            onClick={() => setCurrentView('products')}
            className="px-8 py-3.5 bg-[#0F3E36] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0c2f29] transition-all cursor-pointer inline-flex items-center gap-2"
          >
            কেনাকাটা শুরু করুন <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#0F3E36]">
            হোম
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setCurrentView('products')} className="hover:text-[#0F3E36]">
            পণ্য
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">শপিং কার্ট ({cartTotalCount})</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          আপনার শপিং কার্ট
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Alert banner */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#0F3E36]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  {isFreeShipping ? (
                    <span className="text-xs sm:text-sm font-bold text-emerald-800">
                      🎉 আপনি এই অর্ডারে ফ্রি ডেলিভারি পাচ্ছেন!
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm text-slate-700">
                      ৳{siteConfig.freeShippingThreshold.toLocaleString('bn-BD')} বা তার বেশি কেনাকাটায় <strong className="text-[#0F3E36]">ফ্রি ডেলিভারি</strong>!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Table / Cards */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-800">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">
                        SKU: {item.product.sku}
                      </div>
                      <div className="text-sm font-bold text-[#0F3E36] mt-1">
                        ৳{item.product.price.toLocaleString('bn-BD')}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Qty button */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-bold text-sm text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <div className="text-base font-bold text-slate-900">
                        ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Keep shopping link */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setCurrentView('products')}
                className="text-xs sm:text-sm font-bold text-[#0F3E36] hover:underline cursor-pointer"
              >
                ← আরও পণ্য ব্রাউজ করুন
              </button>
            </div>

          </div>

          {/* Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 sticky top-28">
              
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                অর্ডার সারাংশ
              </h2>

              {/* Delivery Area Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  ডেলিভারি এরিয়া নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('inside_dhaka')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      deliveryLocation === 'inside_dhaka'
                        ? 'border-[#0F3E36] bg-emerald-50 text-[#0F3E36] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div>ঢাকা সিটির ভেতর</div>
                    <div className="text-[11px] text-slate-400">৳{siteConfig.deliveryChargeInside}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryLocation('outside_dhaka')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                      deliveryLocation === 'outside_dhaka'
                        ? 'border-[#0F3E36] bg-emerald-50 text-[#0F3E36] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div>ঢাকার বাইরে সারা দেশে</div>
                    <div className="text-[11px] text-slate-400">৳{siteConfig.deliveryChargeOutside}</div>
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  ডিসকাউন্ট কুপন কোড:
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>"{appliedCoupon.code}" কুপন সক্রিয় (-৳{couponDiscount.toLocaleString('bn-BD')})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 hover:text-rose-600"
                      title="কুপন মুছুন"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="কুপন কোড (যেমন: SHOUKHIN10)"
                      className="flex-1 px-3 py-2 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0F3E36] text-white rounded-xl text-xs font-bold hover:bg-[#0c2f29] transition-colors"
                    >
                      প্রয়োগ
                    </button>
                  </form>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>পণ্যসমূহের মোট মূল্য (সাবটোটাল):</span>
                  <span className="font-semibold text-slate-800">
                    ৳{cartSubtotal.toLocaleString('bn-BD')}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryCharge === 0 ? (
                      <strong className="text-emerald-600">ফ্রি</strong>
                    ) : (
                      `৳${deliveryCharge.toLocaleString('bn-BD')}`
                    )}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>কুপন মূল্যছাড়:</span>
                    <span>-৳{couponDiscount.toLocaleString('bn-BD')}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয় টাকা:</span>
                  <span className="text-xl text-[#0F3E36]">
                    ৳{finalTotal.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full py-4 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                চেকআউট করুন (Next Step)
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center text-[11px] text-slate-400">
                🔒 ১০০% নিরাপদ পেমেন্ট ও ক্যাশ অন ডেলিভারি সুবিধা
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
