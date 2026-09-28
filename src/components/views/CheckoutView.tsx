import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    deliveryLocation, 
    setDeliveryLocation, 
    deliveryCharge, 
    couponDiscount, 
    finalTotal, 
    appliedCoupon,
    placeOrder, 
    setCurrentView,
    siteConfig,
    showToast 
  } = useStore();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState(deliveryLocation === 'inside_dhaka' ? 'ঢাকা' : 'চট্টগ্রাম');
  const [customerNote, setCustomerNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'rocket'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center font-['Hind_Siliguri',sans-serif]">
        <h2 className="text-xl font-bold text-slate-800">আপনার কার্টে কোনো পণ্য নেই</h2>
        <button
          onClick={() => setCurrentView('products')}
          className="mt-4 px-6 py-2.5 bg-[#0F3E36] text-white rounded-xl text-sm font-bold"
        >
          কেনাকাটা করুন
        </button>
      </div>
    );
  }

  // Handle Delivery area switch
  const handleLocationChange = (loc: 'inside_dhaka' | 'outside_dhaka') => {
    setDeliveryLocation(loc);
    if (loc === 'inside_dhaka') {
      setCustomerCity('ঢাকা');
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return;
    }

    const phoneClean = customerPhone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 11 || (!phoneClean.startsWith('01') && !phoneClean.startsWith('8801'))) {
      setErrorMsg('অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    if (!customerAddress.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা) লিখুন।');
      return;
    }

    if (paymentMethod !== 'cod' && !transactionId.trim()) {
      setErrorMsg('অনলাইন পেমেন্টের জন্য ট্রানজ্যাকশন আইডি (TrxID) দেওয়া আবশ্যক।');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: `${customerAddress.trim()}, ${customerCity}`,
        customerCity,
        customerNote: customerNote.trim() || undefined,
        paymentMethod,
        transactionId: transactionId.trim() || undefined,
      });

      showToast('অর্ডার সফল হয়েছে!', `অর্ডার আইডি: ${order.id}`, 'success');
      setCurrentView('order-confirmation');
    } catch (err: any) {
      setErrorMsg(err.message || 'অর্ডার প্রক্রিয়া করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#0F3E36]">
            হোম
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setCurrentView('cart')} className="hover:text-[#0F3E36]">
            কার্ট
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">নিরাপদ চেকআউট</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
          অর্ডার সম্পন্ন করুন (চেকআউট)
        </h1>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleOrderSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Customer Information & Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Section 1: Customer Details */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-base text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-[#0F3E36] text-white flex items-center justify-center text-xs">
                    ১
                  </span>
                  ডেলিভারি ও যোগাযোগের তথ্য
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      আপনার পুরো নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: মো: সাইফুল ইসলাম"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      সচল মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      ডেলিভারি রাইডার এই নম্বরে যোগাযোগ করবেন
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      বিকল্প ফোন নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="জরুরি যোগাযোগের জন্য"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ডেলিভারি এরিয়া নির্বাচন করুন *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleLocationChange('inside_dhaka')}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                          deliveryLocation === 'inside_dhaka'
                            ? 'border-[#0F3E36] bg-emerald-50 text-[#0F3E36] ring-2 ring-emerald-200'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>ঢাকা সিটির ভেতরে</div>
                        <div className="text-xs font-normal text-slate-500 mt-0.5">
                          চার্জ: ৳{siteConfig.deliveryChargeInside} (২৪-৪৮ ঘণ্টা)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleLocationChange('outside_dhaka')}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer ${
                          deliveryLocation === 'outside_dhaka'
                            ? 'border-[#0F3E36] bg-emerald-50 text-[#0F3E36] ring-2 ring-emerald-200'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>ঢাকার বাইরে সারা দেশে</div>
                        <div className="text-xs font-normal text-slate-500 mt-0.5">
                          চার্জ: ৳{siteConfig.deliveryChargeOutside} (২-৩ দিন)
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      জেলা / শহর *
                    </label>
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    >
                      <option value="ঢাকা">ঢাকা</option>
                      <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                      <option value="সিলেট">সিলেট</option>
                      <option value="রাজশাহী">রাজশাহী</option>
                      <option value="খুলনা">খুলনা</option>
                      <option value="বরিশাল">বরিশাল</option>
                      <option value="রংপুর">রংপুর</option>
                      <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                      <option value="কুমিল্লা">কুমিল্লা</option>
                      <option value="গাজীপুর">গাজীপুর</option>
                      <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</option>
                      <option value="বগুড়া">বগুড়া</option>
                      <option value="অন্যান্য জেলা">অন্যান্য জেলা</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      পূর্ণ ঠিকানা (বাড়ি/রোড/এলাকা) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="যেমন: বাড়ি ১২, রোড ৪, ব্লক সি, বনানী, ঢাকা"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      অর্ডার সংক্রান্ত বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="যেমন: ডেলিভারির আগে কল দিন বা গিফট র‍্যাপিং লাগবে"
                      className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 font-bold text-base text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-[#0F3E36] text-white flex items-center justify-center text-xs">
                    ২
                  </span>
                  মূল্য পরিশোধের পদ্ধতি নির্বাচন করুন
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'cod'
                        ? 'border-[#0F3E36] bg-emerald-50/50 ring-2 ring-emerald-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#0F3E36]"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900">ক্যাশ অন ডেলিভারি</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        পণ্য হাতে পেয়ে দেখে টাকা পরিশোধ করুন।
                      </div>
                    </div>
                  </div>

                  {/* bKash */}
                  <div
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'bkash'
                        ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 accent-rose-600"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="text-rose-600 font-extrabold">বিকাশ</span> পেমেন্ট
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        বিকাশ সেন্ড মানি বা মার্চেন্ট পেমেন্ট
                      </div>
                    </div>
                  </div>

                  {/* Nagad */}
                  <div
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'nagad'
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 accent-amber-600"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="text-amber-600 font-extrabold">নগদ</span> পেমেন্ট
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        নগদ সেন্ড মানি করুন
                      </div>
                    </div>
                  </div>

                  {/* Rocket */}
                  <div
                    onClick={() => setPaymentMethod('rocket')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      paymentMethod === 'rocket'
                        ? 'border-purple-500 bg-purple-50/50 ring-2 ring-purple-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_opt"
                      checked={paymentMethod === 'rocket'}
                      onChange={() => setPaymentMethod('rocket')}
                      className="mt-1 accent-purple-600"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="text-purple-600 font-extrabold">রকেট</span> পেমেন্ট
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        রকেট ওয়ালেট দিয়ে পেমেন্ট
                      </div>
                    </div>
                  </div>
                </div>

                {/* Digital Payment Instruction Box if not COD */}
                {paymentMethod !== 'cod' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 animate-fade-in">
                    <div className="text-xs text-amber-900 font-semibold">
                      📌 আমাদের {paymentMethod === 'bkash' ? 'বিকাশ' : paymentMethod === 'nagad' ? 'নগদ' : 'রকেট'} পার্সোনাল নম্বর: <strong className="font-mono text-sm bg-white px-2 py-0.5 rounded-md border border-amber-300">01712-345678</strong>-এ মোট <strong className="text-base text-[#0F3E36]">৳{finalTotal.toLocaleString('bn-BD')}</strong> সেন্ড মানি করুন এবং নিচের ঘরে TrxID লিখুন:
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ট্রানজ্যাকশন আইডি (Transaction ID / TrxID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="যেমন: 9J3K8L2M"
                        className="w-full px-4 py-2 bg-white border border-amber-300 rounded-xl text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                      />
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right: Order Items & Submit Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 sticky top-28">
                
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                  অর্ডারের পণ্যসমূহ ({cart.length})
                </h3>

                {/* Mini product list */}
                <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-slate-100 pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-800 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-slate-400">
                            {item.quantity} x ৳{item.product.price.toLocaleString('bn-BD')}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-800 shrink-0">
                        ৳{(item.product.price * item.quantity).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakup */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>পণ্যের মূল্য (সাবটোটাল):</span>
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
                      <span>কুপন ছাড় ({appliedCoupon?.code}):</span>
                      <span>-৳{couponDiscount.toLocaleString('bn-BD')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                    <span>সর্বমোট টাকা:</span>
                    <span className="text-2xl text-[#0F3E36]">
                      ৳{finalTotal.toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার নিশ্চিত করুন (Confirm Order)'}
                </button>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>১০০% নিরাপদ ডেলিভারি ও টাকা পরিশোধের নিশ্চয়তা</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>অর্ডারের পর ট্র্যাকিং কোড দিয়ে লাইভ স্ট্যাটাস দেখতে পারবেন</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
