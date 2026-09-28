import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Sparkles, CheckCircle2, Copy } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [contactInput, setContactInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setIsSubscribed(true);
    showToast('সাবস্ক্রিপশন সম্পন্ন হয়েছে!', 'আপনার জন্য ১০% স্পেশাল ডিসকাউন্ট কোড উন্মুক্ত হয়েছে।', 'success');
  };

  return (
    <section className="py-12 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-10 text-center relative overflow-hidden shadow-xs">
          
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0F3E36] flex items-center justify-center mx-auto shadow-inner">
              <Mail className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              বিশেষ অফার ও নতুন কালেকশনের আপডেট পান
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              আপনার ইমেইল বা মোবাইল নম্বর দিন। প্রথম অর্ডারে পেয়ে যান অতিরিক্ত ১০% মূল্যছাড়ের কুপন!
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0F3E36] animate-fade-in">
                <div className="flex items-center justify-center gap-2 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  আপনার স্পেশাল ১০% ডিসকাউন্ট কুপন কোড:
                </div>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl border border-emerald-300 font-mono font-bold text-sm text-slate-900">
                  <span>SHOUKHIN10</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('SHOUKHIN10');
                      showToast('কপি হয়েছে!', 'SHOUKHIN10 কোডটি কপি করা হয়েছে।', 'success');
                    }}
                    className="p-1 hover:text-[#0F3E36]"
                    title="কপি করুন"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                <input
                  type="text"
                  required
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  placeholder="আপনার ইমেইল বা মোবাইল নম্বর লিখুন..."
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36] shadow-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  সাবস্ক্রাইব
                </button>
              </form>
            )}

            <span className="block text-[11px] text-slate-400">
              🔒 আমরা কোনো স্প্যাম পাঠাই না। আপনার তথ্য সম্পূর্ণ সুরক্ষিত।
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
