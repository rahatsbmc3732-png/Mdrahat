import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  CheckCircle2, 
  ShoppingBag, 
  Truck, 
  Phone, 
  MapPin, 
  Printer, 
  ArrowRight,
  Sparkles,
  Copy
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { lastPlacedOrder, setCurrentView, setIsTrackingModalOpen, showToast, siteConfig } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="py-20 text-center font-['Hind_Siliguri',sans-serif]">
        <h2 className="text-xl font-bold text-slate-800">কোনো সাম্প্রতিক অর্ডার পাওয়া যায়নি</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-6 py-2.5 bg-[#0F3E36] text-white rounded-xl text-sm font-bold"
        >
          হোমে ফিরে যান
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    showToast('অর্ডার আইডি কপি হয়েছে!', order.id, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 print:border-none print:shadow-none">
          
          {/* Header Status */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              অর্ডার সফলভাবে গৃহীত হয়েছে
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ধন্যবাদ, {order.customerName}!
            </h1>

            <p className="text-sm text-slate-600 max-w-md mx-auto">
              আপনার অর্ডারটি আমাদের সিস্টেমে সফলভাবে সংরক্ষিত হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে ফোনে যোগাযোগ করে অর্ডার কনফার্ম করবেন।
            </p>

            {/* Order Tracking Code Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-xs text-slate-500 font-medium">অর্ডার ট্র্যাকিং আইডি:</span>
                <span className="font-mono font-extrabold text-sm sm:text-base text-[#0F3E36]">
                  {order.id}
                </span>
                <button
                  onClick={handleCopyOrderId}
                  className="p-1 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
                  title="কপি করুন"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Order Details & Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            
            {/* Delivery Info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#0F3E36]" />
                ডেলিভারি ঠিকানা
              </h3>
              <p className="text-slate-700 font-semibold">{order.customerName}</p>
              <p className="text-slate-600">{order.customerAddress}</p>
              <p className="text-slate-600 flex items-center gap-1.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {order.customerPhone}
              </p>
            </div>

            {/* Payment & Estimate */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-[#0F3E36]" />
                পেমেন্ট ও ডেলিভারি
              </h3>
              <p className="text-slate-700">
                পেমেন্ট মেথড: <strong className="text-slate-900">{
                  order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' :
                  order.paymentMethod === 'bkash' ? 'বিকাশ' :
                  order.paymentMethod === 'nagad' ? 'নগদ' : 'রকেট'
                }</strong>
              </p>
              <p className="text-slate-700">
                পেমেন্ট স্ট্যাটাস: <strong className="text-amber-700 capitalize">{order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'বাকি (ডেলিভারিতে প্রদেয়)'}</strong>
              </p>
              <p className="text-slate-700">
                সম্ভাব্য ডেলিভারি: <strong className="text-[#0F3E36]">২৪ থেকে ৭২ ঘণ্টার মধ্যে</strong>
              </p>
            </div>

          </div>

          {/* Ordered Products Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#0F3E36]" />
              অর্ডারকৃত পণ্য তালিকা
            </h3>

            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm bg-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800">{item.product.name}</h4>
                      <span className="text-slate-400 text-xs">পরিমাণ: {item.quantity} টি</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Calculations */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>সাবটোটাল:</span>
                <span>৳{order.subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ:</span>
                <span>{order.deliveryCharge === 0 ? 'ফ্রি' : `৳${order.deliveryCharge.toLocaleString('bn-BD')}`}</span>
              </div>
              {order.couponDiscount && order.couponDiscount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>কুপন ছাড়:</span>
                  <span>-৳{order.couponDiscount.toLocaleString('bn-BD')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>সর্বমোট প্রদেয় মূল্য:</span>
                <span className="text-xl text-[#0F3E36]">৳{order.total.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 print:hidden">
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex-1 py-3.5 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              অর্ডার লাইভ ট্র্যাক করুন
            </button>

            <button
              onClick={handlePrint}
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              রসিদ প্রিন্ট করুন
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              হোম পেজে যান
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
