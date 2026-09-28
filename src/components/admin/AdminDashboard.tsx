import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, Coupon, SiteConfig } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Star, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  ArrowLeft, 
  Search, 
  Save, 
  DollarSign, 
  TrendingUp, 
  Truck, 
  Clock, 
  Eye,
  AlertCircle,
  Globe,
  Share2,
  Copy,
  ExternalLink,
  QrCode,
  Sparkles,
  Flame
} from 'lucide-react';
import { getStorePublicUrl, DEFAULT_BRANDED_SHORT_URL, copyToClipboard } from '../../utils/shareUtils';

type AdminTab = 'overview' | 'products' | 'orders' | 'coupons' | 'reviews' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    categories,
    orders, 
    updateOrderStatus, 
    coupons, 
    addCoupon, 
    toggleCouponStatus, 
    deleteCoupon, 
    reviews, 
    deleteReview, 
    siteConfig, 
    updateSiteConfig, 
    setCurrentView, 
    setIsShareModalOpen,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default authenticated for ease of use
  const [adminPass, setAdminPass] = useState('');
  const [copiedDashboardLink, setCopiedDashboardLink] = useState<'short' | 'full' | null>(null);

  const handleDashboardCopyLink = async (type: 'short' | 'full' = 'short') => {
    const url = type === 'short' ? DEFAULT_BRANDED_SHORT_URL : getStorePublicUrl(siteConfig.liveWebsiteUrl);
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedDashboardLink(type);
      showToast('ওয়েবসাইট লিংক কপি হয়েছে!', `${type === 'short' ? 'শর্ট ব্র্যান্ডেড' : 'ফুল'} লিংক সফলভাবে ক্লিপবোর্ডে কপি হয়েছে।`, 'success');
      setTimeout(() => setCopiedDashboardLink(null), 2500);
    }
  };

  // Product modal / edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    name: '',
    nameEn: '',
    category: categories[0]?.id || '1',
    price: 990,
    originalPrice: 1200,
    shortDescription: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
    stock: 20,
    sku: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
    rating: 5,
    reviewCount: 1,
    features: ['১০০% খাঁটি ও গুণগত উপাদান', 'নিখুঁত ফিনিশিং', '৭ দিনের রিটার্ন সুবিধা'],
    tags: ['সৌখিন', 'নতুন', 'বেস্টসেলার'],
    isBestSeller: false,
    isNew: true,
  });

  // Coupon form state
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(10);
  const [couponType, setCouponType] = useState<'percent' | 'fixed'>('percent');
  const [couponMinSpend, setCouponMinSpend] = useState(1000);

  // Settings form state
  const [tempConfig, setTempConfig] = useState<SiteConfig>({ ...siteConfig });

  // Selected Order for Modal View
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [trackingCodeInput, setTrackingCodeInput] = useState('');

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0);
  const totalPendingOrders = orders.filter((o) => o.status === 'pending').length;
  const totalDeliveredOrders = orders.filter((o) => o.status === 'delivered').length;

  const handleOpenNewProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      nameEn: '',
      category: categories[0]?.id || '1',
      price: 1200,
      originalPrice: 1500,
      shortDescription: 'প্রিমিয়াম কোয়ালিটি ও নিখুঁত ফিনিশিং।',
      description: 'সৌখিন বাজারের প্রতিটি পণ্য নিজস্ব কোয়ালিটি চেকিং টিম দ্বারা কঠোরভাবে যাচাই করা হয়।',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      stock: 25,
      sku: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewCount: 0,
      features: ['খাঁটি উপাদান', 'দ্রুত ডেলিভারি', '৭ দিনের রিপ্লেসমেন্ট'],
      tags: ['সৌখিন', 'নতুন'],
      isBestSeller: false,
      isNew: true,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, productFormData);
      showToast('পণ্য আপডেট হয়েছে', `${productFormData.name} সফলভাবে পরিবর্তিত হয়েছে।`, 'success');
    } else {
      addProduct(productFormData as any);
      showToast('নতুন পণ্য যোগ হয়েছে', `${productFormData.name} ক্যাটালগে যুক্ত হয়েছে।`, 'success');
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    addCoupon({
      code: couponCode.trim().toUpperCase(),
      discountPercent: couponType === 'percent' ? Number(couponDiscount) : undefined,
      discountAmount: couponType === 'fixed' ? Number(couponDiscount) : undefined,
      minSpend: Number(couponMinSpend),
      isActive: true,
      description: `${couponType === 'percent' ? couponDiscount + '% ছাড়' : '৳' + couponDiscount + ' ফিক্সড ছাড়'}`,
    });

    setCouponCode('');
    showToast('কুপন তৈরি হয়েছে', `"${couponCode.toUpperCase()}" কুপন সক্রিয় করা হয়েছে।`, 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(tempConfig);
    showToast('সেটিংস সংরক্ষিত হয়েছে', 'সাইটের কনফিগারেশন আপডেট সম্পন্ন হয়েছে।', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Hind_Siliguri',sans-serif]">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white leading-tight">
              সৌখিন বাজার — অ্যাডমিন প্যানেল
            </h1>
            <span className="text-[11px] text-slate-400">স্টোর ম্যানেজমেন্ট ও কন্ট্রোল রুম</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            স্টোরে ফিরে যান
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            ড্যাশবোর্ড ও রিপোর্ট
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            পণ্য তালিকা ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            অর্ডারসমূহ ({orders.length})
            {totalPendingOrders > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                {totalPendingOrders} নতুন
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            কুপন কোড ({coupons.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4" />
            রিভিউ ({reviews.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#0F3E36] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            সাইট ও ব্যানার সেটিংস
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Live Website Link & Share Hub Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F3E36] via-[#165649] to-[#0A2540] p-6 sm:p-7 border border-emerald-500/30 shadow-2xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    লাইভ ওয়েবসাইট প্রস্তুত ও সক্রিয়
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    আপনার পাবলিক ওয়েবসাইটের স্ট্যান্ডার্ড ও ছোট লিংক
                  </h2>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    এই লিংকটিতে আপনার ওয়েবসাইটের নাম (shoukhin-bazar) দেওয়া রয়েছে। এটি ফেসবুক পেজ, হোয়াটসঅ্যাপ, ইনস্টাগ্রাম বায়ো বা যেকোনো জায়গায় শেয়ার করতে পারেন।
                  </p>

                  {/* Primary Short Branded URL Display Bar */}
                  <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-black/40 rounded-xl border border-emerald-400/50 text-amber-300 font-mono text-xs sm:text-sm font-bold truncate select-all">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                      <span className="truncate">{DEFAULT_BRANDED_SHORT_URL}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDashboardCopyLink('short')}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md ${
                          copiedDashboardLink === 'short'
                            ? 'bg-emerald-400 text-slate-950 font-extrabold'
                            : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                        }`}
                      >
                        {copiedDashboardLink === 'short' ? (
                          <>
                            <Check className="w-4 h-4 text-slate-950" />
                            <span>কপি হয়েছে!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>শর্ট লিংক কপি</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                        title="QR কোড ও সোশ্যাল শেয়ার"
                      >
                        <Share2 className="w-4 h-4 text-amber-300" />
                        <span>শেয়ার ও QR</span>
                      </button>

                      <a
                        href={getStorePublicUrl(siteConfig.liveWebsiteUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white border border-white/10 transition-colors"
                        title="নতুন ট্যাবে ওয়েবসাইট খুলুন"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Share Tip Box */}
                <div className="hidden xl:flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-emerald-100 max-w-xs shrink-0">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>শেয়ার করার পরামর্শ:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    • ফেসবুক পোস্ট ও পেজের 'Shop Now' বাটনে এই লিংক যুক্ত করুন।
                    <br />
                    • হোয়াটসঅ্যাপে বন্ধুদের পাঠিয়ে সরাসরি অর্ডার পেতে পারেন।
                  </p>
                </div>
              </div>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>মোট বিক্রয় আয়</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  ৳{totalRevenue.toLocaleString('bn-BD')}
                </div>
                <span className="text-[11px] text-slate-400">সফল ও চলমান অর্ডার মিলিয়ে</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>মোট অর্ডার সংখ্যা</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {orders.length} টি
                </div>
                <span className="text-[11px] text-slate-400">{totalDeliveredOrders} টি ডেলিভারড সম্পন্ন</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>পেন্ডিং ও প্রসেসিং অর্ডার</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {totalPendingOrders} টি
                </div>
                <span className="text-[11px] text-amber-300/80">দ্রুত ব্যবস্থা নিন</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>লাইভ সক্রিয় পণ্য</span>
                  <Package className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {products.length} টি
                </div>
                <span className="text-[11px] text-slate-400">{categories.length} টি ক্যাটাগরিতে</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">সর্বশেষ অর্ডারসমূহ</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  সকল অর্ডার দেখুন →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="text-slate-400 border-b border-slate-700 pb-2">
                    <tr>
                      <th className="py-2.5">অর্ডার নম্বর</th>
                      <th>গ্রাহকের নাম ও ফোন</th>
                      <th>পণ্য</th>
                      <th>মোট টাকা</th>
                      <th>পেমেন্ট</th>
                      <th>স্ট্যাটাস</th>
                      <th>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3 font-mono font-bold text-amber-400">{ord.id}</td>
                        <td>
                          <div className="font-semibold text-white">{ord.customerName}</div>
                          <div className="text-[11px] text-slate-400">{ord.customerPhone}</div>
                        </td>
                        <td>{ord.items.length} টি আইটেম</td>
                        <td className="font-bold text-emerald-400">৳{ord.total.toLocaleString('bn-BD')}</td>
                        <td>
                          <span className="uppercase text-[11px] font-semibold text-slate-300">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            ord.status === 'pending' ? 'bg-amber-900/60 text-amber-300 border border-amber-700' :
                            ord.status === 'delivered' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' :
                            ord.status === 'cancelled' ? 'bg-rose-900/60 text-rose-300 border border-rose-700' :
                            'bg-blue-900/60 text-blue-300 border border-blue-700'
                          }`}>
                            {ord.status === 'pending' ? 'পেন্ডিং' :
                             ord.status === 'confirmed' ? 'কনফার্মড' :
                             ord.status === 'processing' ? 'প্যাকিং' :
                             ord.status === 'shipped' ? 'শিপমেন্টে' :
                             ord.status === 'delivered' ? 'ডেলিভারড' : 'বাতিল'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setViewingOrder(ord);
                              setTrackingCodeInput(ord.trackingCode || '');
                            }}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                            title="বিস্তারিত দেখুন"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">পণ্য ক্যাটালগ ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-400">নতুন পণ্য যুক্ত করুন, মূল্য বা স্টক হালনাগাদ করুন</p>
              </div>

              <button
                onClick={handleOpenNewProduct}
                className="px-4 py-2.5 bg-[#0F3E36] hover:bg-[#13554b] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                নতুন পণ্য যোগ করুন
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="p-4">পণ্য</th>
                      <th>SKU</th>
                      <th>ক্যাটাগরি</th>
                      <th>মূল্য</th>
                      <th>স্টক</th>
                      <th>রেটিং</th>
                      <th className="text-right p-4">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {products.map((p) => {
                      const catName = categories.find((c) => c.id === p.category)?.name || 'সাধারণ';
                      return (
                        <tr key={p.id} className="hover:bg-slate-700/30">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-white line-clamp-1">{p.name}</div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">{p.shortDescription}</div>
                              </div>
                            </div>
                          </td>
                          <td className="font-mono text-slate-400">{p.sku}</td>
                          <td>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 text-xs">
                              {catName}
                            </span>
                          </td>
                          <td className="font-bold text-emerald-400">
                            ৳{p.price.toLocaleString('bn-BD')}
                          </td>
                          <td>
                            <span className={`font-bold ${p.stock > 5 ? 'text-slate-200' : p.stock > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                              {p.stock} টি
                            </span>
                          </td>
                          <td className="text-amber-400 font-semibold">
                            ★ {p.rating.toFixed(1)} ({p.reviewCount})
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                                title="এডিট করুন"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`আপনি কি "${p.name}" পণ্যটি মুছে ফেলতে চান?`)) {
                                    deleteProduct(p.id);
                                    showToast('পণ্য মুছে ফেলা হয়েছে', p.name, 'info');
                                  }
                                }}
                                className="p-2 rounded-xl bg-rose-900/40 hover:bg-rose-800/80 text-rose-300 transition-colors"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">গ্রাহকদের অর্ডার ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-400">অর্ডারের স্ট্যাটাস পরিবর্তন ও কুরিয়ার ট্র্যাকিং কোড যুক্ত করুন</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="p-4">অর্ডার আইডি</th>
                      <th>গ্রাহক</th>
                      <th>ঠিকানা</th>
                      <th>পণ্য ও পরিমাণ</th>
                      <th>টাকা</th>
                      <th>পেমেন্ট</th>
                      <th>স্ট্যাটাস</th>
                      <th className="text-right p-4">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-700/30">
                        <td className="p-4 font-mono font-bold text-amber-400">{ord.id}</td>
                        <td>
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <div className="text-slate-400 text-xs">{ord.customerPhone}</div>
                        </td>
                        <td className="text-xs text-slate-300 max-w-[200px] truncate">
                          {ord.customerAddress}
                        </td>
                        <td>
                          <div className="text-xs text-slate-300">
                            {ord.items.map((it) => `${it.product.name} (${it.quantity})`).join(', ')}
                          </div>
                        </td>
                        <td className="font-bold text-emerald-400">৳{ord.total.toLocaleString('bn-BD')}</td>
                        <td>
                          <span className="text-xs uppercase bg-slate-700 px-2 py-0.5 rounded text-slate-200">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td>
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value as any);
                              showToast('স্ট্যাটাস আপডেট', `অর্ডার ${ord.id} এখন ${e.target.value}`, 'success');
                            }}
                            className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#0F3E36]"
                          >
                            <option value="pending">পেন্ডিং (Pending)</option>
                            <option value="confirmed">কনফার্মড (Confirmed)</option>
                            <option value="processing">প্যাকিং (Processing)</option>
                            <option value="shipped">শিপমেন্টে (Shipped)</option>
                            <option value="delivered">ডেলিভারড (Delivered)</option>
                            <option value="cancelled">বাতিল (Cancelled)</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setViewingOrder(ord);
                              setTrackingCodeInput(ord.trackingCode || '');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            দেখুন
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            
            {/* Create Coupon Form (5 cols) */}
            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="font-bold text-lg text-white">নতুন কুপন তৈরি করুন</h3>

              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">কুপন কোড *</label>
                  <input
                    type="text"
                    required
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="যেমন: EID20 বা SHOUKHIN15"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl uppercase font-mono text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">ছাড়ের ধরন</label>
                    <select
                      value={couponType}
                      onChange={(e) => setCouponType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                    >
                      <option value="percent">শতাংশ (% Percent)</option>
                      <option value="fixed">নির্দিষ্ট টাকা (৳ Fixed)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {couponType === 'percent' ? 'ছাড়ের পরিমাণ (%)' : 'ছাড়ের পরিমাণ (৳)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={couponDiscount}
                      onChange={(e) => setCouponDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">সর্বনিম্ন কেনাকাটা (৳)</label>
                  <input
                    type="number"
                    value={couponMinSpend}
                    onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F3E36] hover:bg-[#13554b] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  কুপন সেভ করুন
                </button>
              </form>
            </div>

            {/* Coupons List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-bold text-lg text-white">সক্রিয় কুপন কোডসমূহ</h3>

              <div className="space-y-3">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-bold rounded-lg text-sm">
                          {c.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          c.isActive ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {c.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        ছাড়: {c.discountPercent ? `${c.discountPercent}%` : `৳${c.discountAmount}`} | সর্বনিম্ন অর্ডার: ৳{c.minSpend || 0}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCouponStatus(c.id)}
                        className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs"
                      >
                        {c.isActive ? 'বন্ধ করুন' : 'চালু করুন'}
                      </button>
                      <button
                        onClick={() => deleteCoupon(c.id)}
                        className="p-2 rounded-xl bg-rose-900/40 text-rose-300 hover:bg-rose-800/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white">গ্রাহকদের রিভিউ ও ফিডব্যাক</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        deleteReview(rev.id);
                        showToast('রিভিউ মুছে ফেলা হয়েছে', rev.customerName, 'info');
                      }}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic">"{rev.comment}"</p>

                  <div className="pt-2 border-t border-slate-700 flex items-center gap-2.5">
                    <img src={rev.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{rev.customerName}</div>
                      <div className="text-[11px] text-slate-400">{rev.customerLocation}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-3">
              সাইট কাস্টমাইজেশন ও যোগাযোগ সেটিংস
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
              {/* Live URL & Sharing Settings Card */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">লাইভ ওয়েবসাইট ইউআরএল ও শেয়ার লিংক সেটিংস</h3>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                    পাবলিক লিংক
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">
                  পাবলিশ করার পর যে লিংকের মাধ্যমে গ্রাহকরা আপনার ওয়েবসাইটে ঢুকবেন, সেই লিংকটি নিচে নির্ধারণ করুন। খালি রাখলে বর্তমান ডোমেইনের লাইভ লিংক স্বয়ংক্রিয়ভাবে ব্যবহৃত হবে।
                </p>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    লাইভ ওয়েবসাইট লিংক / কাস্টম ডোমেইন (Live Website URL)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      placeholder="https://ais-pre-pwrboyqchazzfhq2fzh7yj-186037039549.asia-southeast1.run.app"
                      value={tempConfig.liveWebsiteUrl || ''}
                      onChange={(e) => setTempConfig({ ...tempConfig, liveWebsiteUrl: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-300 font-mono focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleDashboardCopyLink}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>কপি</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsShareModalOpen(true)}
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-amber-300" />
                      <span>QR ও শেয়ার</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">দোকানের নাম (Brand Name)</label>
                  <input
                    type="text"
                    value={tempConfig.brandName}
                    onChange={(e) => setTempConfig({ ...tempConfig, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ট্যাগলাইন (Brand Tagline)</label>
                  <input
                    type="text"
                    value={tempConfig.brandTagline}
                    onChange={(e) => setTempConfig({ ...tempConfig, brandTagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">হটলাইন নম্বর</label>
                  <input
                    type="text"
                    value={tempConfig.hotline}
                    onChange={(e) => setTempConfig({ ...tempConfig, hotline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="text"
                    value={tempConfig.whatsapp}
                    onChange={(e) => setTempConfig({ ...tempConfig, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={tempConfig.email}
                    onChange={(e) => setTempConfig({ ...tempConfig, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ঠিকানা</label>
                  <input
                    type="text"
                    value={tempConfig.address}
                    onChange={(e) => setTempConfig({ ...tempConfig, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Delivery charges */}
              <div className="pt-4 border-t border-slate-700">
                <h3 className="font-bold text-white mb-3">ডেলিভারি ফি সেটিংস</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">ঢাকার ভেতর চার্জ (৳)</label>
                    <input
                      type="number"
                      value={tempConfig.deliveryChargeInside}
                      onChange={(e) => setTempConfig({ ...tempConfig, deliveryChargeInside: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">ঢাকার বাইরে চার্জ (৳)</label>
                    <input
                      type="number"
                      value={tempConfig.deliveryChargeOutside}
                      onChange={(e) => setTempConfig({ ...tempConfig, deliveryChargeOutside: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">ফ্রি ডেলিভারি থ্রেশহোল্ড (৳)</label>
                    <input
                      type="number"
                      value={tempConfig.freeShippingThreshold}
                      onChange={(e) => setTempConfig({ ...tempConfig, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Top Announcement & Promo Banner */}
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <h3 className="font-bold text-white">অ্যানাউন্সমেন্ট ও প্রমো ব্যানার</h3>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">টপ অ্যানাউন্সমেন্ট বার টেক্সট</label>
                  <input
                    type="text"
                    value={tempConfig.announcementText}
                    onChange={(e) => setTempConfig({ ...tempConfig, announcementText: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">প্রমো ব্যানার শিরোনাম</label>
                    <input
                      type="text"
                      value={tempConfig.promoBannerTitle}
                      onChange={(e) => setTempConfig({ ...tempConfig, promoBannerTitle: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">প্রমো কুপন কোড</label>
                    <input
                      type="text"
                      value={tempConfig.promoBannerCoupon}
                      onChange={(e) => setTempConfig({ ...tempConfig, promoBannerCoupon: e.target.value })}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#0F3E36] hover:bg-[#13554b] text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  সকল সেটিংস সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-700 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white">
                {editingProduct ? 'পণ্য সম্পাদনা (Edit Product)' : 'নতুন পণ্য যোগ করুন'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">পণ্যের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ক্যাটাগরি *</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">SKU কোড</label>
                  <input
                    type="text"
                    value={productFormData.sku || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, sku: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">পূর্বের মূল্য (Regular Price ৳)</label>
                  <input
                    type="number"
                    value={productFormData.originalPrice || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">স্টক পরিমাণ *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.stock || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">ছবির লিঙ্ক (Image URL)</label>
                  <input
                    type="text"
                    value={productFormData.images?.[0] || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, images: [e.target.value] })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">সংক্ষিপ্ত বিবরণ</label>
                  <input
                    type="text"
                    value={productFormData.shortDescription || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    value={productFormData.description || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isBestSeller || false}
                      onChange={(e) => setProductFormData({ ...productFormData, isBestSeller: e.target.checked })}
                      className="accent-[#0F3E36]"
                    />
                    <span className="text-slate-300">বেস্টসেলার হিসেবে চিহ্নিত করুন</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isNew || false}
                      onChange={(e) => setProductFormData({ ...productFormData, isNew: e.target.checked })}
                      className="accent-[#0F3E36]"
                    />
                    <span className="text-slate-300">নতুন আগমন (New Arrival)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0F3E36] hover:bg-[#13554b] text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-white">অর্ডার বিবরণী</h3>
                <span className="font-mono text-xs text-amber-400">{viewingOrder.id}</span>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div>গ্রাহকের নাম: <strong className="text-white">{viewingOrder.customerName}</strong></div>
                <div>ফোন নম্বর: <strong className="text-white">{viewingOrder.customerPhone}</strong></div>
                <div>ঠিকানা: <span className="text-slate-200">{viewingOrder.customerAddress}</span></div>
                {viewingOrder.customerNote && (
                  <div className="text-amber-300">নোট: {viewingOrder.customerNote}</div>
                )}
              </div>

              <div>
                <h4 className="font-bold text-white mb-1.5">অর্ডারকৃত পণ্য:</h4>
                <div className="rounded-xl bg-slate-800 divide-y divide-slate-700 p-2">
                  {viewingOrder.items.map((it) => (
                    <div key={it.product.id} className="p-2 flex justify-between">
                      <span>{it.product.name} x {it.quantity}</span>
                      <strong className="text-emerald-400">৳{(it.product.price * it.quantity).toLocaleString('bn-BD')}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span>৳{viewingOrder.subtotal.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{viewingOrder.deliveryCharge.toLocaleString('bn-BD')}</span>
                </div>
                {viewingOrder.couponDiscount && (
                  <div className="flex justify-between text-rose-400">
                    <span>কুপন ছাড়:</span>
                    <span>-৳{viewingOrder.couponDiscount.toLocaleString('bn-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-white text-base pt-1 border-t border-slate-700">
                  <span>সর্বমোট:</span>
                  <span className="text-emerald-400">৳{viewingOrder.total.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              {/* Courier tracking update */}
              <div className="pt-2">
                <label className="block text-slate-300 font-bold mb-1">
                  কুরিয়ার ট্র্যাকিং নম্বর (Steadfast / RedX / Pathao)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingCodeInput}
                    onChange={(e) => setTrackingCodeInput(e.target.value)}
                    placeholder="যেমন: ST-8839201"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
                  />
                  <button
                    onClick={() => {
                      updateOrderStatus(viewingOrder.id, viewingOrder.status, trackingCodeInput);
                      showToast('ট্র্যাকিং কোড সেভ হয়েছে', trackingCodeInput, 'success');
                    }}
                    className="px-4 py-2 bg-[#0F3E36] text-white rounded-xl font-bold"
                  >
                    সেভ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
