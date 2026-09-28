import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Share2, Globe, Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { getStorePublicUrl, DEFAULT_BRANDED_SHORT_URL, copyToClipboard } from '../../utils/shareUtils';

export const FloatingShareButton: React.FC = () => {
  const { setIsShareModalOpen, siteConfig, showToast } = useStore();
  const [quickCopied, setQuickCopied] = useState(false);

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = DEFAULT_BRANDED_SHORT_URL;
    const success = await copyToClipboard(url);
    if (success) {
      setQuickCopied(true);
      showToast('শর্ট লিংক কপি হয়েছে!', 'ওয়েবসাইটের ব্র্যান্ডেড লিংক (tinyurl.com/shoukhin-bazar) কপি হয়েছে।', 'success');
      setTimeout(() => setQuickCopied(false), 2500);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-['Hind_Siliguri',sans-serif]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsShareModalOpen(true)}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0F3E36] hover:bg-[#13554b] text-white shadow-xl hover:shadow-2xl border border-emerald-400/30 transition-all cursor-pointer"
        aria-label="Share Website"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>

        <Globe className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline text-white">
          সাইট লিংক শেয়ার করুন
        </span>

        {/* Quick Copy Mini Button */}
        <button
          onClick={handleQuickCopy}
          title="দ্রুত লিংক কপি করুন"
          className="ml-1 p-1 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
        >
          {quickCopied ? (
            <Check className="w-3.5 h-3.5 text-emerald-300" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Hover Tooltip for Mobile & Desktop */}
        <span className="absolute left-0 -top-9 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          {quickCopied ? '✓ কপি হয়েছে!' : 'ওয়েবসাইটের লিংক ও QR কোড পেতে ক্লিক করুন'}
        </span>
      </motion.button>
    </div>
  );
};
