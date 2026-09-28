import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: '১০০% খাঁটি পণ্য',
      description: 'বাছাইকৃত উপাদান ও নিখুঁত কারুকাজ',
      color: 'bg-emerald-50 text-[#0F3E36] border-emerald-200/80 group-hover:bg-[#0F3E36] group-hover:text-white',
    },
    {
      icon: CreditCard,
      title: 'নিরাপদ লেনদেন',
      description: 'ক্যাশ অন ডেলিভারি ও ডিজিটাল পেমেন্ট',
      color: 'bg-amber-50 text-amber-800 border-amber-200/80 group-hover:bg-amber-500 group-hover:text-slate-950',
    },
    {
      icon: Truck,
      title: 'দ্রুত ডেলিভারি',
      description: '২৪-৭২ ঘণ্টায় দেশব্যাপী হোম ডেলিভারি',
      color: 'bg-teal-50 text-teal-800 border-teal-200/80 group-hover:bg-teal-700 group-hover:text-white',
    },
    {
      icon: RotateCcw,
      title: '৭ দিনের রিটার্ন',
      description: 'ঝামেলাহীন সহজ পণ্য পরিবর্তন সুবিধা',
      color: 'bg-rose-50 text-rose-800 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white',
    },
  ];

  return (
    <section className="py-6 bg-white border-y border-slate-100/80 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/60 border border-slate-200/60 hover:bg-white hover:border-[#0F3E36]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`p-2.5 sm:p-3 rounded-xl border shrink-0 transition-colors duration-300 ${item.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0F3E36] transition-colors leading-snug truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight truncate">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

