import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Search, 
  RotateCcw, 
  Star, 
  ChevronRight, 
  X
} from 'lucide-react';

export const AllProductsView: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategorySlug, 
    setSelectedCategorySlug, 
    setCurrentView,
    searchQuery,
    setSearchQuery 
  } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(selectedCategorySlug || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'newest'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category slug if changed outside
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && p.category !== cat.id) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesEn = p.nameEn && p.nameEn.toLowerCase().includes(q);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesEn && !matchesTag) return false;
      }

      // Price Range
      if (p.price > maxPrice) return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      // Stock
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.rating * b.reviewCount - a.rating * a.reviewCount; // Popular
    });
  }, [products, categories, selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCategorySlug(null);
    setMaxPrice(6000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('popular');
  };

  const currentCategoryName = categories.find((c) => c.slug === selectedCategory)?.name;

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Page Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <button onClick={() => setCurrentView('home')} className="hover:text-[#0F3E36]">
              হোম
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">সকল পণ্য</span>
            {currentCategoryName && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#0F3E36] font-semibold">{currentCategoryName}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {currentCategoryName ? currentCategoryName : 'সৌখিন বাজারের সকল পণ্য'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                মোট <strong className="text-slate-800 font-bold">{filteredProducts.length}</strong> টি পণ্য পাওয়া গেছে
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-xs"
            >
              <Filter className="w-4 h-4 text-[#0F3E36]" />
              ফিল্টার ও ক্যাটাগরি
            </button>
          </div>

          {/* Rapid Horizontal Category Switcher Bar */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCategorySlug(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#0F3E36] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              সকল পণ্য ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSelectedCategorySlug(cat.slug);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#0F3E36] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.slug ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.itemCount}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Sidebar Filters (3 cols) + Product Listing (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-base">
                <SlidersHorizontal className="w-4 h-4 text-[#0F3E36]" />
                ফিল্টার করুন
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#0F3E36] hover:underline flex items-center gap-1 font-semibold"
                title="রিসেট"
              >
                <RotateCcw className="w-3 h-3" />
                রিসেট
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800">ক্যাটাগরি</h3>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedCategorySlug(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-emerald-50 text-[#0F3E36] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>সকল ক্যাটাগরি</span>
                  <span className="text-xs text-slate-400">{products.length}</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setSelectedCategorySlug(cat.slug);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-emerald-50 text-[#0F3E36] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">মূল্য পরিসীমা</h3>
                <span className="text-xs font-bold text-[#0F3E36]">
                  ৳০ - ৳{maxPrice.toLocaleString('bn-BD')}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="6500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0F3E36] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>৳৩০০</span>
                <span>৳৬,৫০০+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">মিনিমাম রেটিং</h3>
              <div className="space-y-1.5">
                {[4.5, 4.0, 3.0, 0].map((ratingVal) => (
                  <label
                    key={ratingVal}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-[#0F3E36]"
                  >
                    <input
                      type="radio"
                      name="min_rating"
                      checked={minRating === ratingVal}
                      onChange={() => setMinRating(ratingVal)}
                      className="accent-[#0F3E36]"
                    />
                    {ratingVal === 0 ? (
                      <span>যেকোনো রেটিং</span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <strong>{ratingVal}</strong> স্টার বা তার বেশি
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only Toggle */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-bold text-slate-800">শুধুমাত্র স্টকে থাকা পণ্য</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#0F3E36] rounded-md"
                />
              </label>
            </div>

          </aside>

          {/* Product Listing Main Section (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Controls Bar (Sort & View Layout) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Search Within Catalog */}
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="পণ্য বা কিওয়ার্ড খুঁজুন..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sorting & Layout View Toggle */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">সর্ট করুন:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  >
                    <option value="popular">সর্বাধিক জনপ্রিয়</option>
                    <option value="price_asc">মূল্য: কম থেকে বেশি</option>
                    <option value="price_desc">মূল্য: বেশি থেকে কম</option>
                    <option value="newest">নতুন পণ্যসমূহ</option>
                  </select>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-xs text-[#0F3E36]' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="গ্রিড ভিউ"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-xs text-[#0F3E36]' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="লিস্ট ভিউ"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  কোনো পণ্য খুঁজে পাওয়া যায়নি!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  আপনার ফিল্টার বা সার্চ কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#0F3E36] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#0c2f29] transition-all cursor-pointer"
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">ফিল্টার ও ক্যাটাগরি</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">ক্যাটাগরি</h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedCategorySlug(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    selectedCategory === 'all' ? 'bg-[#0F3E36] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  সকল
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.slug);
                      setSelectedCategorySlug(c.slug);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                      selectedCategory === c.slug ? 'bg-[#0F3E36] text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>সর্বোচ্চ মূল্য:</span>
                <span className="text-[#0F3E36]">৳{maxPrice.toLocaleString('bn-BD')}</span>
              </div>
              <input
                type="range"
                min="300"
                max="6500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0F3E36]"
              />
            </div>

            {/* Apply & Reset Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleResetFilters}
                className="py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                রিসেট
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="py-2.5 bg-[#0F3E36] text-white rounded-xl text-xs font-bold shadow-md"
              >
                ফিল্টার প্রয়োগ করুন
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
