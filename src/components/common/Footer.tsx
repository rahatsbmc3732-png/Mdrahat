import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Heart,
  Facebook,
  Instagram,
  Youtube,
  Share2,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteConfig, setCurrentView, setSelectedCategorySlug, setActivePolicyModal, setIsTrackingModalOpen, setIsShareModalOpen } = useStore();

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentView('products');
  };

  return (
    <footer className="bg-[#0A2540] text-slate-300 font-['Hind_Siliguri',sans-serif] pt-16 pb-8 border-t border-slate-800">
      {/* Upper Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-400 shrink-0 border border-white/10">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">দ্রুত সারা দেশে ডেলিভারি</h4>
              <p className="text-xs text-slate-400 mt-1">ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা, সারা দেশে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি।</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-400 shrink-0 border border-white/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">১০০% মানসম্মত পণ্য</h4>
              <p className="text-xs text-slate-400 mt-1">সরাসরি দক্ষ কারিগর ও নির্ভরযোগ্য উৎস থেকে সংগৃহীত খাঁটি পণ্য।</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-400 shrink-0 border border-white/10">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">সহজ ৭ দিনের রিটার্ন পলিসি</h4>
              <p className="text-xs text-slate-400 mt-1">পণ্য পছন্দ না হলে বা ত্রুটি থাকলে ঝামেলাহীন রিটার্ন ও দ্রুত রিফান্ড।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.brandTagline}. আমাদের লক্ষ্য দেশীয় ঐতিহ্য, হস্তশিল্প এবং আধুনিক লাইফস্টাইল পণ্য গ্রাহকের দোরগোড়ায় পৌঁছে দেওয়া।
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>হটলাইন: {siteConfig.hotline}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-900 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                হোয়াটসঅ্যাপ সাপোর্ট
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  হোম পেজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('products')}
                  className="hover:text-amber-400 transition-colors"
                >
                  সকল পণ্য ব্রাউজ করুন
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  আমাদের সম্পর্কে জানুন
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  যোগাযোগ ও লোকেশন
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackingModalOpen(true)}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  অর্ডার ট্র্যাক করুন
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">ক্যাটাগরি</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('fashion')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ফ্যাশন ও পোশাক
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('home-decor')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ঘর সাজানোর পণ্য ও কারুশিল্প
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('lifestyle')}
                  className="hover:text-amber-400 transition-colors"
                >
                  খাঁটি মধু ও অর্গানিক খাবার
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('beauty')}
                  className="hover:text-amber-400 transition-colors"
                >
                  সৌন্দর্য ও হারবাল যত্ন
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('gifts')}
                  className="hover:text-amber-400 transition-colors"
                >
                  উপহার সামগ্রী ও হ্যাম্পার
                </button>
              </li>
            </ul>
          </div>

            {/* Customer Service & Policies */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">গ্রাহক সেবা ও শেয়ার</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    ওয়েবসাইট লিংক শেয়ার করুন
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('faq')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    সাধারণ প্রশ্নোত্তর (FAQ)
                  </button>
                </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('return')}
                  className="hover:text-amber-400 transition-colors"
                >
                  রিটার্ন ও রিফান্ড নীতি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-amber-400 transition-colors"
                >
                  গোপনীয়তা নীতিমালা
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-amber-400 transition-colors"
                >
                  ব্যবহারের শর্তাবলী
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  অ্যাডমিন লগইন
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Payment & Copyright bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">{siteConfig.brandName}</strong>. সর্বস্বত্ব সংরক্ষিত।
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-medium mr-1">আমরা গ্রহণ করি:</span>
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold border border-rose-800 text-[10px]">
              বিকাশ
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800 text-[10px]">
              নগদ
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold border border-purple-800 text-[10px]">
              রকেট
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800 text-[10px]">
              ভিসা / মাস্টারকার্ড
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 text-[10px]">
              ক্যাশ অন ডেলিভারি
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
