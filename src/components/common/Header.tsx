import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Settings, 
  Sparkles, 
  ChevronDown,
  Clock,
  ArrowRight,
  Share2,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStorePublicUrl, copyToClipboard } from '../../utils/shareUtils';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    siteConfig,
    categories,
    products,
    cartTotalCount,
    cartSubtotal,
    wishlist,
    setIsCartDrawerOpen,
    setSelectedCategorySlug,
    setSelectedProductId,
    setIsTrackingModalOpen,
    setIsShareModalOpen,
    searchQuery,
    setSearchQuery,
    showToast,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [headerCopied, setHeaderCopied] = useState(false);

  const handleQuickCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getStorePublicUrl(siteConfig.liveWebsiteUrl);
    const success = await copyToClipboard(url);
    if (success) {
      setHeaderCopied(true);
      showToast('লিংক কপি হয়েছে!', 'ওয়েবসাইটের পাবলিক লিংক সফলভাবে কপি করা হয়েছে।', 'success');
      setTimeout(() => setHeaderCopied(false), 2500);
    }
  };
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for instant search
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchDropdownOpen(false);
      setCurrentView('products');
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setIsSearchDropdownOpen(false);
    setSearchQuery('');
    setCurrentView('product-detail');
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setCurrentView('products');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 transition-all font-['Hind_Siliguri',sans-serif]">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => {
              setSelectedCategorySlug(null);
              setCurrentView('home');
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F3E36] to-[#1a5b50] flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F3E36] leading-none">
                {siteConfig.brandName}
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                প্রিমিয়াম কেনাকাটা
              </span>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                placeholder="পণ্য বা ক্যাটাগরি খুঁজুন..."
                className="w-full pl-4 pr-11 py-2 bg-slate-50/90 border border-slate-200/90 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]/30 focus:border-[#0F3E36] focus:bg-white transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#0F3E36] text-white rounded-lg hover:bg-[#0c2f29] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Dropdown */}
            <AnimatePresence>
              {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-80 overflow-y-auto"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    পণ্য ফলাফল
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelectProduct(p.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-slate-800 truncate">{p.name}</h4>
                            <span className="text-xs font-bold text-[#0F3E36]">
                              ৳{p.price.toLocaleString('bn-BD')}
                            </span>
                          </div>
                        </button>
                      ))}
                      <div className="p-2 text-center bg-slate-50">
                        <button
                          onClick={() => {
                            setIsSearchDropdownOpen(false);
                            setCurrentView('products');
                          }}
                          className="text-xs font-bold text-[#0F3E36] hover:underline flex items-center justify-center gap-1 mx-auto"
                        >
                          সকল ফলাফল দেখুন ({filteredProducts.length}+) <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-xs text-slate-500">
                      কোনো পণ্য পাওয়া যায়নি।
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Desktop Share Website Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShareModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-[#0F3E36] bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer text-xs font-bold"
              title="ওয়েবসাইট লিংক শেয়ার করুন"
              aria-label="Share Website Link"
            >
              <Share2 className="w-4 h-4 text-[#0F3E36]" />
              <span>লিংক শেয়ার</span>
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-[#0F3E36] hover:bg-slate-100/80 transition-colors cursor-pointer"
              title="পছন্দের তালিকা"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </motion.button>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0F3E36] to-[#155448] text-white hover:shadow-md transition-all shadow-sm cursor-pointer border border-emerald-400/20"
              title="শপিং কার্ট"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-emerald-200">কার্ট</span>
                <span className="text-xs font-bold mt-0.5">৳{cartSubtotal.toLocaleString('bn-BD')}</span>
              </div>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 4. Desktop Navigation Bar Links (Categories Line) */}
        <nav className="hidden md:flex items-center justify-between border-t border-slate-100 py-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setSelectedCategorySlug(null);
                setCurrentView('home');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-[#0F3E36] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0F3E36] hover:bg-slate-100'
              }`}
            >
              হোম
            </button>

            {/* Categories Dropdown */}
            <div ref={categoryDropdownRef} className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  isCategoryDropdownOpen
                    ? 'bg-slate-100 text-[#0F3E36]'
                    : 'text-slate-700 hover:text-[#0F3E36] hover:bg-slate-100'
                }`}
              >
                সব ক্যাটাগরি
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    ক্যাটাগরি তালিকা
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0F3E36] transition-colors cursor-pointer"
                    >
                      <span className="font-semibold">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full font-medium">
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                    <button
                      onClick={() => {
                        setSelectedCategorySlug(null);
                        setIsCategoryDropdownOpen(false);
                        setCurrentView('products');
                      }}
                      className="w-full text-xs font-bold text-[#0F3E36] py-1 text-left hover:underline cursor-pointer"
                    >
                      সকল পণ্য দেখুন →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-slate-200 mx-1" />

            {/* Direct Category Links in the Line */}
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.slug)}
                className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#0F3E36] hover:bg-emerald-50 font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedCategorySlug(null);
                setCurrentView('products');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                currentView === 'products'
                  ? 'bg-[#0F3E36] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0F3E36] hover:bg-slate-100'
              }`}
            >
              সকল পণ্য
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="flex items-center gap-1 text-slate-600 hover:text-[#0F3E36] font-semibold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#0F3E36]" />
              ট্র্যাক অর্ডার
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-amber-400 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              অ্যাডমিন
            </button>
          </div>
        </nav>
      </div>

      {/* 5. Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-xl overflow-hidden"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-slate-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile Website Share Banner */}
            <div className="bg-gradient-to-r from-[#0F3E36] to-[#165649] p-3 rounded-2xl text-white shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-amber-300">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">ওয়েবসাইট লিংক শেয়ার করুন</div>
                  <div className="text-[10px] text-emerald-100/80">কাউকে পাঠাতে বা পেজে শেয়ার করতে</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsShareModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold shadow-xs cursor-pointer active:scale-95"
              >
                লিংক নিন
              </button>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                🏠 হোম
              </button>
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setCurrentView('products');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                🛍️ সকল পণ্য
              </button>
              <button
                onClick={() => {
                  setCurrentView('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                ❤️ পছন্দের তালিকা ({wishlist.length})
              </button>
              <button
                onClick={() => {
                  setIsTrackingModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                📦 অর্ডার ট্র্যাক
              </button>
              <button
                onClick={() => {
                  setCurrentView('about');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                ℹ️ আমাদের সম্পর্কে
              </button>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                📞 যোগাযোগ
              </button>
            </div>

            {/* Categories in Mobile */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 mb-2">ক্যাটাগরি সমূহ</div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-[#0F3E36] rounded-full text-xs font-semibold text-slate-700"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Switcher Mobile */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400/20 text-amber-900 text-xs font-bold border border-amber-300/80"
              >
                <Settings className="w-4 h-4" />
                অ্যাডমিন ড্যাশবোর্ড
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

