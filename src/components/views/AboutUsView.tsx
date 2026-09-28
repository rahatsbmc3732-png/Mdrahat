import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Heart, Sparkles, Award, Users, CheckCircle } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { siteConfig, setCurrentView } = useStore();

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#0F3E36] tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            আমাদের পরিচিতি ও রূপকল্প
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            “{siteConfig.brandName}” — ঐতিহ্যের সাথে আধুনিকতার সেতুবন্ধন
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            আমরা দেশীয় ঐতিহ্যবাহী কারুশিল্প, প্রিমিয়াম লাইফস্টাইল পণ্য এবং খাঁটি দেশীয় অর্গানিক খাবার প্রতিটি পরিবারে পৌঁছে দিতে নিরলস কাজ করে যাচ্ছি।
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              আমাদের শুরুর গল্প
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              ২০২০ সালে একদল সংস্কৃতিমনা ও উদ্ভাবনী তরুণের হাত ধরে “সৌখিন বাজার”-এর যাত্রা শুরু। আমাদের মূল উদ্দেশ্য ছিল প্রান্তিক কারিগর ও তাঁতিদের খাঁটি সৃষ্টিকে সরাসরি দেশের প্রতিটি কোণে পৌঁছে দেওয়া।
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              আজ ৫০,০০০+ সন্তুষ্ট গ্রাহকের ভালোবাসা ও আস্থার প্রতীক সৌখিন বাজার। প্রতিটি পণ্যের ক্ষেত্রে আমরা বজায় রাখি সর্বোচ্চ মানের নিশ্চয়তা।
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#0F3E36]">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ১০০% খাঁটি পণ্য
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                সরাসরি কারিগর থেকে
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80"
                alt="সৌখিন বাজার ঐতিহ্য"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0F3E36] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">পণ্যের গুণমান</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              কোনো প্রকার ভেজাল বা নিম্নমানের উপাদানের সুযোগ নেই। প্রতিটি ব্যাচ নিখুঁতভাবে পরীক্ষা করা হয়।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">আন্তরিক গ্রাহক সেবা</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              অর্ডার থেকে ডেলিভারি—প্রতিটি ধাপে আমরা নিশ্চিত করি দ্রুত ও স্বাচ্ছন্দ্যময় অভিজ্ঞতা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">কারিগরদের ক্ষমতায়ন</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              প্রান্তিক হস্তশিল্পী ও তাঁতিদের ন্যায্য পারিশ্রমিক ও কাজের স্বীকৃতি দিতে আমরা প্রতিজ্ঞাবদ্ধ।
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('products')}
            className="px-8 py-3.5 bg-[#0F3E36] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#0c2f29] transition-all cursor-pointer"
          >
            আমাদের কালেকশন দেখুন
          </button>
        </div>

      </div>
    </div>
  );
};
