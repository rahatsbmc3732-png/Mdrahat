import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Truck, Headphones, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyChooseUs: React.FC = () => {
  const { siteConfig } = useStore();

  const reasons = [
    {
      icon: Award,
      title: '১০০% অকৃত্রিম ও খাঁটি',
      description: 'সরাসরি দক্ষ কারিগর ও অনুমোদিত সোর্স থেকে সংগৃহীত।',
    },
    {
      icon: ShieldCheck,
      title: 'নিরাপদ ক্যাশ অন ডেলিভারি',
      description: 'পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সম্পূর্ণ সুবিধা।',
    },
    {
      icon: Truck,
      title: 'দেশব্যাপী দ্রুত ডেলিভারি',
      description: 'দেশের ৬৪ জেলার যেকোনো প্রান্তে নির্ভরযোগ্য ডেলিভারি।',
    },
    {
      icon: Headphones,
      title: '২৪/৭ কাস্টমার সাপোর্ট',
      description: 'অর্ডার থেকে ডেলিভারি পর্যন্ত যেকোনো সহায়তায় আমরা প্রস্তুত।',
    },
  ];

  const stats = [
    { label: 'সন্তুষ্ট গ্রাহক', value: '৫০,০০০+' },
    { label: 'সফল ডেলিভারি', value: '৯৯.৪%' },
    { label: 'জেলা কভারেজ', value: '৬৪ টি' },
    { label: 'ঐতিহ্যবাহী পণ্য', value: '৫০০+' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/70 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0F3E36] uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200/80">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            কেন “{siteConfig.brandName}” বেছে নেবেন?
          </h2>
        </div>

        {/* 4 Reason Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -3 }}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-[#0F3E36]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F3E36] flex items-center justify-center mb-3 border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-[#0F3E36]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>যাচাইকৃত সুবিধা</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Numbers & Metrics Strip */}
        <div className="mt-10 bg-[#0F3E36] text-white rounded-2xl p-6 shadow-md border border-emerald-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/80">
            {stats.map((stat, idx) => (
              <div key={idx} className="pt-3 sm:pt-0 sm:px-3 first:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                  {stat.value}
                </div>
                <div className="text-xs text-emerald-100 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

