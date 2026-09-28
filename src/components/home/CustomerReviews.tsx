import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Quote, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerReviews: React.FC = () => {
  const { reviews, addReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const approvedReviews = reviews.filter((r) => r.status === 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    addReview({
      customerName: customerName.trim(),
      customerLocation: customerLocation.trim() || 'বাংলাদেশ',
      rating,
      comment: comment.trim(),
      verifiedPurchase: true,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 100)}?auto=format&fit=crop&w=150&q=80`,
    });

    // Reset & Close
    setCustomerName('');
    setCustomerLocation('');
    setComment('');
    setRating(5);
    setIsModalOpen(false);
  };

  return (
    <section className="py-14 sm:py-20 bg-white font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#0F3E36] tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              গ্রাহকদের অভিজ্ঞতা
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              আমাদের সম্মানিত গ্রাহকদের মতামত
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              সৌখিন বাজার থেকে কেনাকাটা করে গ্রাহকরা যা বলছেন
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 text-[#0F3E36] hover:bg-[#0F3E36] hover:text-white text-xs sm:text-sm font-bold border border-emerald-200 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            আপনার রিভিউ লিখুন
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-slate-200 group-hover:text-emerald-100 transition-colors pointer-events-none" />

              <div className="space-y-3 relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={rev.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {rev.customerName}
                    </h4>
                    {rev.verifiedPurchase && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="যাচাইকৃত ক্রেতা" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">
                    {rev.customerLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-slate-800 mb-1">
                আপনার মতামত জানান
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                সৌখিন বাজার থেকে কেনাকাটার অভিজ্ঞতা আমাদের ও অন্য গ্রাহকদের সাথে শেয়ার করুন।
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="যেমন: তানজিলা রহমান"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আপনার এলাকা / শহর
                  </label>
                  <input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    placeholder="যেমন: ধানমন্ডি, ঢাকা"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    রেটিং দিন *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">
                      {rating} / ৫ স্টার
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আপনার অভিজ্ঞতা বা রিভিউ লিখুন *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="পণ্যের মান, ডেলিভারি বা সার্ভিসের অভিজ্ঞতা লিখুন..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0F3E36] hover:bg-[#0c2f29] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    রিভিউ সাবমিট করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
