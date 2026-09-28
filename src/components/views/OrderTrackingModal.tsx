import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingModalOpen, setIsTrackingModalOpen, orders, lastPlacedOrder, siteConfig } = useStore();
  const [searchId, setSearchId] = useState(lastPlacedOrder ? lastPlacedOrder.id : '');
  const [searchedOrder, setSearchedOrder] = useState<any>(lastPlacedOrder || null);
  const [hasSearched, setHasSearched] = useState(!!lastPlacedOrder);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const clean = searchId.trim().toLowerCase();
    const found = orders.find(
      (o) => o.id.toLowerCase() === clean || o.customerPhone.includes(clean)
    );
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps = [
    { key: 'pending', title: 'অর্ডার গৃহীত', desc: 'অর্ডার সিস্টেমে জমা হয়েছে' },
    { key: 'confirmed', title: 'কনফার্মড', desc: 'কাস্টমার কেয়ার থেকে যাচাই সম্পন্ন' },
    { key: 'processing', title: 'প্যাকেজিং', desc: 'পণ্যের মান পরীক্ষা ও প্যাকিং চলছে' },
    { key: 'shipped', title: 'শিপমেন্টে আছে', desc: 'কুরিয়ার রাইডারের কাছে হস্তান্তরিত' },
    { key: 'delivered', title: 'ডেলিভারড', desc: 'গ্রাহকের ঠিকানায় পৌঁছে দেওয়া হয়েছে' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-['Hind_Siliguri',sans-serif]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F3E36] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                অর্ডার লাইভ ট্র্যাকিং
              </h2>
              <p className="text-xs text-slate-500">
                আপনার অর্ডার আইডি বা মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান অবস্থা জানুন
              </p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="অর্ডার আইডি (যেমন: SB-2026-0801) বা ফোন নম্বর"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              ট্র্যাক করুন
            </button>
          </form>

          {/* Search Results */}
          {hasSearched && (
            searchedOrder ? (
              <div className="space-y-6 animate-fade-in">
                
                {/* Order Summary Info Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500">অর্ডার নম্বর: </span>
                    <strong className="font-mono text-slate-900 font-bold">{searchedOrder.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">অর্ডারের তারিখ: </span>
                    <strong className="text-slate-800">{searchedOrder.createdAt}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">মোট মূল্য: </span>
                    <strong className="text-[#0F3E36] font-bold">৳{searchedOrder.total.toLocaleString('bn-BD')}</strong>
                  </div>
                </div>

                {/* Timeline Visual Progress */}
                {searchedOrder.status === 'cancelled' ? (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>এই অর্ডারটি বাতিল (Cancelled) করা হয়েছে। সহায়তার জন্য কাস্টমার কেয়ারে যোগাযোগ করুন।</span>
                  </div>
                ) : (
                  <div className="py-4">
                    <div className="relative">
                      {/* Timeline Bar */}
                      <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
                      <div 
                        className="hidden sm:block absolute top-1/2 left-0 h-1 bg-[#0F3E36] -translate-y-1/2 z-0 transition-all duration-500" 
                        style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                      />

                      {/* Steps Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                        {steps.map((step, idx) => {
                          const isDone = idx <= currentStepIdx;
                          const isCurrent = idx === currentStepIdx;

                          return (
                            <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                              <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                                  isDone
                                    ? 'bg-[#0F3E36] text-white ring-4 ring-emerald-100'
                                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                                }`}
                              >
                                {isDone ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : idx + 1}
                              </div>
                              <div className="min-w-0">
                                <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#0F3E36]' : 'text-slate-700'}`}>
                                  {step.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 hidden sm:block">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Courier / Delivery Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block mb-1 font-medium">ডেলিভারি ঠিকানা:</span>
                    <strong className="text-slate-800">{searchedOrder.customerName}</strong>
                    <div className="text-slate-600 mt-0.5">{searchedOrder.customerAddress}</div>
                    <div className="text-slate-500 mt-1">ফোন: {searchedOrder.customerPhone}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block mb-1 font-medium">কুরিয়ার তথ্য:</span>
                    <div className="text-slate-800">
                      কুরিয়ার পার্টনার: <strong className="text-[#0F3E36]">{searchedOrder.courierName || 'Steadfast Courier'}</strong>
                    </div>
                    <div className="text-slate-800 mt-0.5">
                      কুরিয়ার ট্র্যাকিং: <strong className="font-mono">{searchedOrder.trackingCode || searchedOrder.id}</strong>
                    </div>
                    <div className="text-slate-500 mt-1">পেমেন্ট: {searchedOrder.paymentMethod.toUpperCase()} (৳{searchedOrder.total})</div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700">অর্ডারকৃত পণ্য:</h4>
                  <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
                    {searchedOrder.items.map((it: any) => (
                      <div key={it.product.id} className="p-2.5 flex items-center justify-between">
                        <span className="text-slate-800 font-medium">{it.product.name} x {it.quantity}</span>
                        <span className="text-slate-900 font-bold">৳{(it.product.price * it.quantity).toLocaleString('bn-BD')}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">কোনো অর্ডার পাওয়া যায়নি!</h4>
                <p className="text-xs text-slate-500">
                  সঠিক অর্ডার আইডি বা মোবাইল নম্বর দিয়ে পুনরায় অনুসন্ধান করুন। প্রয়োজনে হটলাইনে যোগাযোগ করুন: {siteConfig.hotline}
                </p>
              </div>
            )
          )}

          {/* Footer Hotline */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>সাহায্য প্রয়োজন? কল করুন:</span>
            <a
              href={`tel:${siteConfig.hotline}`}
              className="flex items-center gap-1.5 font-bold text-[#0F3E36] hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.hotline}
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
