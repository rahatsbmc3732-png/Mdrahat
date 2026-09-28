import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Copy, Check, ArrowRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';

export const PromoBanner: React.FC = () => {
  const { siteConfig, setCurrentView, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  if (!siteConfig.promoBannerActive) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(siteConfig.promoBannerCoupon);
    setCopied(true);
    showToast('কুপন কোড কপি হয়েছে!', `"${siteConfig.promoBannerCoupon}" চেকআউটে ব্যবহার করুন।`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-8 sm:py-12 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F3E36] via-[#144f44] to-[#0d2a23] text-white p-6 sm:p-10 shadow-xl border border-emerald-500/30"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                {siteConfig.promoBannerDiscount}
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                {siteConfig.promoBannerTitle}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg">
                {siteConfig.promoBannerSub}
              </p>

              {/* Coupon Copy Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center bg-black/40 border border-white/20 rounded-xl p-1 backdrop-blur-xs">
                  <span className="px-2.5 text-xs text-emerald-200 font-medium">কুপন:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-mono font-extrabold text-xs tracking-wider">
                    {siteConfig.promoBannerCoupon}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="ml-1.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="কোড কপি করুন"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentView('products')}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-amber-400 text-[#0F3E36] hover:text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  অফারটি নিন
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Right Decorative Image */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-4/3">
                <img
                  src={siteConfig.promoBannerImageUrl}
                  alt="স্পেশাল অফার"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

