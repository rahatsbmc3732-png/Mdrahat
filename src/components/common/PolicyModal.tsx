import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal, siteConfig } = useStore();

  if (!activePolicyModal) return null;

  const getTitle = () => {
    switch (activePolicyModal) {
      case 'privacy':
        return 'গোপনীয়তা নীতিমালা (Privacy Policy)';
      case 'terms':
        return 'ব্যবহারের শর্তাবলী (Terms & Conditions)';
      case 'return':
        return 'রিটার্ন ও রিফান্ড পলিসি (Return & Refund Policy)';
    }
  };

  const getIcon = () => {
    switch (activePolicyModal) {
      case 'privacy':
        return <ShieldCheck className="w-6 h-6 text-[#0F3E36]" />;
      case 'terms':
        return <FileText className="w-6 h-6 text-[#0F3E36]" />;
      case 'return':
        return <RotateCcw className="w-6 h-6 text-[#0F3E36]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{getTitle()}</h3>
              <p className="text-xs text-slate-500">{siteConfig.brandName} গ্রাহক সুরক্ষা নির্দেশিকা</p>
            </div>
          </div>
          <button
            onClick={() => setActivePolicyModal(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
          {activePolicyModal === 'privacy' && (
            <>
              <h4 className="font-bold text-slate-800 text-base">১. তথ্য সংগ্রহ ও সুরক্ষা</h4>
              <p>
                {siteConfig.brandName}-এ আপনার গোপনীয়তা রক্ষা করা আমাদের প্রধান দায়িত্ব। আপনার নাম, মোবাইল নম্বর, ইমেইল ও ডেলিভারি ঠিকানা শুধুমাত্র আপনার অর্ডার যথাযথভাবে পৌঁছে দেওয়া এবং গ্রাহক সেবা নিশ্চিত করার জন্য ব্যবহার করা হয়।
              </p>
              <h4 className="font-bold text-slate-800 text-base">২. তথ্যের নিরাপত্তা</h4>
              <p>
                আমরা কোনো তৃতীয় পক্ষের কাছে গ্রাহকের ব্যক্তিগত তথ্য বিক্রয় বা বিনিময় করি না। সকল তথ্য আধুনিক এনক্রিপশন প্রযুক্তির মাধ্যমে সুরক্ষিত রাখা হয়।
              </p>
              <h4 className="font-bold text-slate-800 text-base">৩. পেমেন্ট সিকিউরিটি</h4>
              <p>
                বিকাশ, নগদ বা ব্যাংক কার্ডে পেমেন্টের ক্ষেত্রে সরাসরি নিরাপদ ও অনুমোদিত গেটওয়ে ব্যবহার করা হয়। কোনো পাসওয়ার্ড বা ওটিপি আমাদের সিস্টেমে সংরক্ষিত হয় না।
              </p>
            </>
          )}

          {activePolicyModal === 'terms' && (
            <>
              <h4 className="font-bold text-slate-800 text-base">১. অর্ডার ও মূল্য পরিশোধ</h4>
              <p>
                ওয়েবসাইটে উল্লেখিত প্রতিটি পণ্যের মূল্য ভ্যাট অন্তর্ভুক্ত। অর্ডার কনফার্মেশনের পর আমাদের প্রতিনিধি প্রয়োজনে ফোন কলের মাধ্যমে ঠিকানা নিশ্চিত করতে পারেন।
              </p>
              <h4 className="font-bold text-slate-800 text-base">২. ডেলিভারির সময়সীমা</h4>
              <p>
                ঢাকা সিটির মধ্যে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। প্রাকৃতিক দুর্যোগ বা অনিবার্য কারণে ডেলিভারিতে সাময়িক বিলম্ব হতে পারে।
              </p>
              <h4 className="font-bold text-slate-800 text-base">৩. পণ্যের প্রাপ্যতা</h4>
              <p>
                কোনো পণ্য স্টক আউট হয়ে গেলে গ্রাহককে অবিলম্বে অবহিত করা হবে এবং পূর্বে পেমেন্ট করা থাকলে রিফান্ড প্রদান করা হবে।
              </p>
            </>
          )}

          {activePolicyModal === 'return' && (
            <>
              <h4 className="font-bold text-slate-800 text-base">১. সহজ ৭ দিনের রিটার্ন পলিসি</h4>
              <p>
                পণ্য হাতে পাওয়ার পর যদি সাইজ সমস্যা, ত্রুটি বা অমিল পাওয়া যায়, তাহলে ডেলিভারির ৭ দিনের মধ্যে আমাদের কাস্টমার কেয়ারে যোগাযোগ করে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন।
              </p>
              <h4 className="font-bold text-slate-800 text-base">২. রিটার্নের শর্তসমূহ</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>পণ্যটি অব্যবহৃত এবং মূল ট্যাগ/প্যাকেজিংসহ থাকতে হবে।</li>
                <li>ডেলিভারির সময় ক্যাশ মেমো বা অর্ডার আইডি সংরক্ষণ রাখতে হবে।</li>
                <li>ত্রুটিযুক্ত পণ্যের ক্ষেত্রে রিটার্ন ডেলিভারি চার্জ {siteConfig.brandName} বহন করবে।</li>
              </ul>
              <h4 className="font-bold text-slate-800 text-base">৩. রিফান্ডের সময়সীমা</h4>
              <p>
                পণ্যটি আমাদের ওয়্যারহাউসে পৌঁছানোর পর ৩-৫ কার্যদিবসের মধ্যে আপনার বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে টাকা রিফান্ড করা হবে।
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0F3E36] text-white hover:bg-[#0c2f29] transition-colors"
          >
            বুঝেছি ও একমত
          </button>
        </div>
      </motion.div>
    </div>
  );
};
