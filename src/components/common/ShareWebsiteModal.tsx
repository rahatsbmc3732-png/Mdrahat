import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { getStorePublicUrl, DEFAULT_BRANDED_SHORT_URL, copyToClipboard } from '../../utils/shareUtils';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  QrCode, 
  MessageSquare, 
  Facebook, 
  Send, 
  Globe, 
  Sparkles,
  Info,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShareWebsiteModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, siteConfig, showToast } = useStore();
  const [copiedType, setCopiedType] = useState<'short' | 'full' | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [activeUrlType, setActiveUrlType] = useState<'short' | 'full'>('short');

  const fullLiveUrl = getStorePublicUrl(siteConfig.liveWebsiteUrl);
  const shortBrandedUrl = DEFAULT_BRANDED_SHORT_URL;

  const currentUrl = activeUrlType === 'short' ? shortBrandedUrl : fullLiveUrl;

  useEffect(() => {
    if (copiedType) {
      const timer = setTimeout(() => setCopiedType(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [copiedType]);

  if (!isShareModalOpen) return null;

  const handleCopy = async (type: 'short' | 'full') => {
    const url = type === 'short' ? shortBrandedUrl : fullLiveUrl;
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedType(type);
      showToast('লিংক কপি করা হয়েছে!', `${type === 'short' ? 'শর্ট ব্র্যান্ডেড' : 'ফুল লাইভ'} লিংক সফলভাবে ক্লিপবোর্ডে কপি হয়েছে।`, 'success');
    } else {
      showToast('কপি ব্যর্থ হয়েছে', 'দয়া করে ম্যানুয়ালি লিংকটি সিলেক্ট করে কপি করুন।', 'error');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.brandName,
          text: `${siteConfig.brandName} - ${siteConfig.brandTagline}`,
          url: currentUrl,
        });
        showToast('শেয়ার সম্পন্ন হয়েছে', 'ধন্যবাদ!', 'success');
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy(activeUrlType);
    }
  };

  const shareText = encodeURIComponent(
    `✨ ${siteConfig.brandName}-এ স্বাগতম!\n${siteConfig.brandTagline}\nদেশীয় সেরা কালেকশন ও নিরাপদ কেনাকাটায় আজই ভিজিট করুন:\n${currentUrl}`
  );

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(siteConfig.brandName)}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}&margin=10`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-['Hind_Siliguri',sans-serif]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Top Header Banner */}
          <div className="bg-gradient-to-r from-[#0F3E36] via-[#144f44] to-[#0A2540] text-white p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-amber-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight">
                    ওয়েবসাইট লিংক শেয়ার ও কপি
                  </h3>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    {siteConfig.brandName} • ব্র্যান্ডেড ছোট ও স্ট্যান্ডার্ড লিংক
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* 1. RECOMMENDED: SHORT BRANDED URL BOX */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-500/40 space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F3E36]">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>ছোট ও স্ট্যান্ডার্ড ব্র্যান্ডেড লিংক (শেয়ারের জন্য সেরা)</span>
                </div>
                <span className="text-[10px] font-extrabold bg-[#0F3E36] text-amber-300 px-2.5 py-0.5 rounded-full">
                  ব্র্যান্ড নাম যুক্ত
                </span>
              </div>

              <div className="flex items-center gap-2 p-1.5 bg-white border border-emerald-300 rounded-xl">
                <div className="pl-2 text-emerald-700">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={shortBrandedUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="flex-1 bg-transparent text-xs sm:text-sm font-mono font-bold text-slate-900 focus:outline-hidden select-all"
                />
                <button
                  onClick={() => handleCopy('short')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    copiedType === 'short'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-md'
                  }`}
                >
                  {copiedType === 'short' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      কপি হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      কপি করুন
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                👉 এই লিংকটির মধ্যে সরাসরি আপনার শপের নাম <strong>shoukhin-bazar</strong> রয়েছে। এটি দেখতে অত্যন্ত প্রফেশনাল এবং যে কাউকে দেওয়া সহজ।
              </p>
            </div>

            {/* 2. DIRECT FULL CLOUD URL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                  মূল ডিরেক্ট ক্লাউড লিংক (Full URL):
                </label>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  লাইভ
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-[#0F3E36] transition-colors">
                <input
                  type="text"
                  readOnly
                  value={fullLiveUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="flex-1 bg-transparent text-[11px] sm:text-xs font-mono font-medium text-slate-600 focus:outline-hidden select-all truncate"
                />
                <button
                  onClick={() => handleCopy('full')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    copiedType === 'full'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  {copiedType === 'full' ? (
                    <>
                      <Check className="w-3 h-3" />
                      কপি
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      কপি
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={fullLiveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all text-center border border-slate-200"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                নতুন ট্যাবে দেখুন
              </a>

              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold transition-all text-center border border-amber-200 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-amber-700" />
                {showQR ? 'QR কোড লুকান' : 'QR কোড দেখুন'}
              </button>
            </div>

            {/* QR Code Container */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center text-center gap-2"
              >
                <p className="text-xs text-slate-600 font-semibold">
                  মোবাইল ক্যামেরা দিয়ে স্ক্যান করে সরাসরি ওয়েবসাইটে প্রবেশ করুন:
                </p>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 inline-block">
                  <img
                    src={qrCodeUrl}
                    alt="Store QR Code"
                    className="w-44 h-44 object-contain rounded-lg"
                  />
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentUrl}
                </span>
              </motion.div>
            )}

            {/* Social Share Section */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-600 block">
                এক ক্লিকে সোশ্যাল মিডিয়ায় শেয়ার করুন:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* WhatsApp */}
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  হোয়াটসঅ্যাপ
                </a>

                {/* Facebook */}
                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  ফেসবুক
                </a>

                {/* Telegram */}
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition-all"
                >
                  <Send className="w-4 h-4 text-sky-600" />
                  টেলিগ্রাম
                </a>
              </div>

              {/* Native Mobile Share Button */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-amber-300" />
                  অন্যান্য অ্যাপে শেয়ার করুন (Mobile Share)
                </button>
              )}
            </div>

            {/* Explanatory Help Guide */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-slate-700">
              <Info className="w-4 h-4 text-[#0F3E36] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#0F3E36]">
                  লিংকটি কীভাবে কাজে লাগাবেন?
                </p>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  উপরের <strong className="text-slate-900 font-semibold">“shoukhin-bazar”</strong> যুক্ত শর্ট লিংকটি কপি করে আপনার ফেসবুক পেইজ পোস্ট, মেসেঞ্জার, হোয়াটসঅ্যাপ অথবা বিজ্ঞাপনে ব্যবহার করুন।
                </p>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              সব সময় সক্রিয় লিংক
            </span>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

