import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HelpCircle, ChevronDown, ChevronUp, Search, Phone, MessageSquare } from 'lucide-react';

export const FAQView: React.FC = () => {
  const { faqs, siteConfig } = useStore();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'সকল প্রশ্নোত্তর' },
    { id: 'order', name: 'অর্ডার ও কেনাকাটা' },
    { id: 'delivery', name: 'ডেলিভারি সংক্রান্ত' },
    { id: 'payment', name: 'পেমেন্ট ও মূল্য' },
    { id: 'return', name: 'রিটার্ন ও রিফান্ড' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#0F3E36] tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            সাধারণ জিজ্ঞাসা ও উত্তর
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            আপনার মনের প্রশ্নের সহজ সমাধান
          </h1>
          <p className="text-sm text-slate-600">
            অর্ডার, ডেলিভারি, পেমেন্ট এবং রিটার্ন সংক্রান্ত সকল প্রয়োজনীয় তথ্যাদি একনজরে।
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto pt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখে খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36] shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0F3E36] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base hover:text-[#0F3E36] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              কোনো প্রশ্নোত্তর খুঁজে পাওয়া যায়নি। সরাসরি হটলাইনে যোগাযোগ করুন।
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">এখনো কোনো প্রশ্ন আছে?</h3>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              আমাদের টিম সবসময় প্রস্তুত আপনাকে যেকোনো তথ্যে সহায়তা করতে।
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href={`tel:${siteConfig.hotline}`}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <Phone className="w-4 h-4" />
              কল করুন
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              হোয়াটসঅ্যাপ
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
