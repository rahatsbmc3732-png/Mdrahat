import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Star, 
  Award, 
  Zap, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { siteConfig, setCurrentView, setSelectedCategorySlug } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5F0] via-[#F4F9F6] to-white pt-8 sm:pt-14 pb-14 sm:pb-20 font-['Hind_Siliguri',sans-serif]">
      {/* 1. Ambient Background Glows - Soft, soothing Green & White Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Center Radiant Emerald Halo */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[480px] rounded-full bg-gradient-to-b from-emerald-300/35 via-emerald-100/25 to-transparent blur-3xl" />

        {/* Soft Cool Green Gradient Pool on Left */}
        <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-emerald-200/25 blur-3xl" />

        {/* Soft Golden/Warm Ambient Pool on Right */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />

        {/* Subtle grid dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#0F3E36_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* 1. TOP HEADER: Clean, Organized, & Centered                  */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-12">
          
          {/* Radiant Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-300/80 text-[#0F3E36] text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(15,62,54,0.06)]">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>ঐতিহ্য ও আধুনিকতার প্রিমিয়াম সম্ভার</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            {siteConfig.heroHeadline}
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {siteConfig.heroSubheadline}
          </p>

          {/* Call to Actions (CTA) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const catSection = document.getElementById('category-showcase-section');
                if (catSection) {
                  catSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setSelectedCategorySlug(null);
                  setCurrentView('products');
                }
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0F3E36] via-[#145347] to-[#0F3E36] text-white rounded-xl text-sm sm:text-base font-bold shadow-[0_10px_25px_-5px_rgba(15,62,54,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(15,62,54,0.6)] flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden group border border-emerald-500/30"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Layers className="w-5 h-5 text-amber-300" />
              <span>ক্যাটাগরি সমূহ দেখুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategorySlug(null);
                setCurrentView('products');
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200/90 hover:border-emerald-300 rounded-xl text-sm sm:text-base font-bold transition-all shadow-2xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#0F3E36]" />
              <span>পূর্ণ ক্যাটালগ এক্সপ্লোর</span>
            </motion.button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. CENTER STAGE: Prominent, Standard Photo with Subtle Animated Soft Shadow */}
        {/* ============================================================ */}
        <div className="relative max-w-6xl mx-auto mt-4 sm:mt-8">
          
          {/* The Photo Container: Stable image with subtle, gentle ambient shadow */}
          <div className="relative z-10 w-full group">
            
            {/* Subtle, soft ambient aura around all 4 sides */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 -m-3 sm:-m-5 rounded-[44px] bg-[#0F3E36]/30 blur-2xl -z-10 pointer-events-none"
            />

            {/* Main Image Frame: Big, Standard, Crisp & Prestigious with Clean Shadow */}
            <div className="relative rounded-3xl sm:rounded-[40px] overflow-hidden border-4 sm:border-8 border-white bg-slate-900 shadow-[0_20px_45px_-12px_rgba(15,62,54,0.28)] aspect-16/9 sm:aspect-21/9 lg:aspect-[2.3/1]">
              <img
                src={siteConfig.heroImageUrl}
                alt="সৌখিন বাজার মূল কালেকশন"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Sophisticated Dark Glass Vignette Scrim for Depth & Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Premium Subtle Glare Highlight */}
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

              {/* Bottom Information Overlay inside Photo */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    এক্সক্লুসিভ প্রিমিয়াম কালেকশন
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                    দেশীয় ঐতিহ্য ও আধুনিকতার অনন্য সমাহার
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed drop-shadow-sm font-normal max-w-xl">
                    সেরা ডিজাইনার ও বিশ্বস্ত কারিগরদের তৈরি খাঁটি আয়োজন — সরাসরি আপনার দরজায় ক্যাশ অন ডেলিভারিতে।
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2.5 bg-black/50 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shadow-lg">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-left text-xs">
                    <div className="font-bold text-white">১০০% ক্যাশ অন ডেলিভারি</div>
                    <div className="text-[11px] text-emerald-200">পণ্য হাতে পেয়ে মূল্য পরিশোধ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* High-end Floating Badges (Positioned cleanly on the frame) */}
            {/* Badge 1: Top-Left (Rating & Customer Trust) */}
            <div className="absolute -top-3 sm:-top-5 left-3 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] border border-slate-100/90 flex items-center gap-3 z-20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                <Star className="w-5 h-5 fill-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1">
                  ৪.৯ / ৫.০ <span className="text-amber-500 font-bold">★★★★★</span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">৫০,০০০+ সন্তুষ্ট ক্রেতা</div>
              </div>
            </div>

            {/* Badge 2: Top-Right (Genuine Guarantee) */}
            <div className="absolute -top-3 sm:-top-5 right-3 sm:right-6 bg-gradient-to-r from-[#0F3E36] to-[#165549] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-[0_14px_30px_rgba(15,62,54,0.35)] border border-emerald-400/40 flex items-center gap-3 z-20">
              <div className="p-2 rounded-xl bg-white/15 text-amber-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  ১০০% খাঁটি পণ্য
                </div>
                <div className="text-[10px] sm:text-xs text-emerald-200 font-medium">গুণগত মানের শতভাগ নিশ্চয়তা</div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* GENTLE, SUBTLE GROUND SHADOW: Soft, natural & tasteful pulse */}
          {/* ============================================================ */}
          <div className="relative w-full flex justify-center -mt-2 sm:-mt-3">
            <motion.div
              animate={{
                scaleX: [0.88, 0.96, 0.88],
                scaleY: [0.85, 1.15, 0.85],
                opacity: [0.28, 0.46, 0.28],
                filter: ['blur(14px)', 'blur(22px)', 'blur(14px)'],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[84%] sm:w-[90%] h-8 sm:h-12 rounded-[100%] bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/40 pointer-events-none"
            />
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. Bottom Trust Bar: Clean, Green-accented, Standard           */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F3E36] flex items-center justify-center shrink-0 border border-emerald-100">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">দ্রুত ডেলিভারি</div>
              <div className="text-[11px] text-slate-500">সারা দেশে ক্যাশ অন</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">১০০% খাঁটি পণ্য</div>
              <div className="text-[11px] text-slate-500">গুণগত মানের গ্যারান্টি</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">সহজ রিটার্ন সুবিধা</div>
              <div className="text-[11px] text-slate-500">৭ দিনের মধ্যে রিটার্ন</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-emerald-100 shadow-2xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F3E36] flex items-center justify-center shrink-0 border border-emerald-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-tight">২৪/৭ কাস্টমার সাপোর্ট</div>
              <div className="text-[11px] text-slate-500">যেকোনো তথ্যে সহায়তা</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
