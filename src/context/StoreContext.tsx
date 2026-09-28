import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  Review, 
  FAQItem, 
  Coupon, 
  SiteConfig, 
  ViewMode, 
  ToastMessage,
  OrderStatus 
} from '../types';
import { 
  initialSiteConfig, 
  initialCategories, 
  initialProducts, 
  initialReviews, 
  initialFAQs, 
  initialCoupons,
  initialSampleOrders 
} from '../data/initialData';

interface StoreContextType {
  // Navigation & View
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  trackingOrderNumber: string;
  setTrackingOrderNumber: (num: string) => void;
  activePolicyModal: 'privacy' | 'terms' | 'return' | null;
  setActivePolicyModal: (policy: 'privacy' | 'terms' | 'return' | null) => void;

  // Data
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  categories: Category[];
  products: Product[];
  reviews: Review[];
  faqs: FAQItem[];
  coupons: Coupon[];
  orders: Order[];
  
  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  appliedCoupon: Coupon | null;
  appliedDiscountAmount: number;
  cartSubtotal: number;
  cartTotalCount: number;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Order actions
  lastCreatedOrder: Order | null;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Admin Data Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  deleteReview: (id: string) => void;
  approveReview: (id: string) => void;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  resetToDefaults: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  CONFIG: 'sb_site_config_v1',
  CATEGORIES: 'sb_categories_v1',
  PRODUCTS: 'sb_products_v1',
  REVIEWS: 'sb_reviews_v1',
  FAQS: 'sb_faqs_v1',
  COUPONS: 'sb_coupons_v1',
  ORDERS: 'sb_orders_v1',
  CART: 'sb_cart_v1',
  WISHLIST: 'sb_wishlist_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentViewState] = useState<ViewMode>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState<string>('');
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | 'return' | null>(null);

  // Scroll to top helper on view change
  const setCurrentView = (view: ViewMode) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State with LocalStorage fallbacks
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CONFIG);
    return saved ? { ...initialSiteConfig, ...JSON.parse(saved) } : initialSiteConfig;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : initialSampleOrders;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONFIG, JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let appliedDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      appliedDiscountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      appliedDiscountAmount = appliedCoupon.discountValue;
    }
  }

  // Cart Actions
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id && item.selectedVariant === variant);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock || 99),
        };
        return updated;
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stock || 99), selectedVariant: variant }];
      }
    });

    showToast('কার্টে যোগ করা হয়েছে', `${product.name} সফলভাবে শপিং কার্টে যুক্ত হয়েছে।`, 'success');
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্য সরানো হয়েছে', 'কার্ট থেকে পণ্যটি মুছে ফেলা হয়েছে।', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!coupon) {
      return { success: false, message: 'দুঃখিত! কুপন কোডটি সঠিক নয় অথবা মেয়াদ শেষ।' };
    }

    if (cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `এই কুপনটি ব্যবহার করতে ন্যূনতম ৳${coupon.minSpend.toLocaleString('bn-BD')} টাকার অর্ডার প্রয়োজন।`,
      };
    }

    setAppliedCoupon(coupon);
    showToast('কুপন সফলভাবে যুক্ত হয়েছে!', `${coupon.description}`, 'success');
    return { success: true, message: `কুপন কোড "${coupon.code}" সফলভাবে অ্যাপ্লাই হয়েছে!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('কুপন বাতিল হয়েছে', 'কুপন ছাড় সরিয়ে নেওয়া হয়েছে।', 'info');
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('উইশলিস্ট থেকে সরানো হয়েছে', `${product?.name || 'পণ্যটি'} উইশলিস্ট থেকে বাদ দেওয়া হয়েছে।`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('উইশলিস্টে সংরক্ষিত', `${product?.name || 'পণ্যটি'} আপনার পছন্দের তালিকায় যুক্ত হয়েছে।`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Order Actions
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrderNumber = `SB-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const itemInOrder = orderData.items.find((it) => it.productId === p.id);
        if (itemInOrder) {
          return {
            ...p,
            stock: Math.max(0, p.stock - itemInOrder.quantity),
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast('অর্ডার স্ট্যাটাস আপডেট হয়েছে', `অর্ডারের বর্তমান অবস্থা পরিবর্তন করা হয়েছে।`, 'info');
  };

  // Admin Actions
  const updateSiteConfig = (config: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...config }));
    showToast('সেটিংস সংরক্ষিত', 'ওয়েবসাইট কনফিগারেশন সফলভাবে আপডেট হয়েছে।', 'success');
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('পণ্য যোগ হয়েছে', `"${newProduct.name}" সফলভাবে যুক্ত হয়েছে।`, 'success');
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    );
    showToast('পণ্য আপডেট হয়েছে', 'পণ্যের তথ্য সফলভাবে সংরক্ষিত হয়েছে।', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('পণ্য মুছে ফেলা হয়েছে', 'পণ্যটি সফলভাবে রিমুভ করা হয়েছে।', 'info');
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('ক্যাটাগরি যুক্ত হয়েছে', `"${newCat.name}" ক্যাটাগরি তৈরি হয়েছে।`, 'success');
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...catData } : c))
    );
    showToast('ক্যাটাগরি আপডেট হয়েছে', 'ক্যাটাগরির তথ্য সংরক্ষিত হয়েছে।', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('ক্যাটাগরি মুছে ফেলা হয়েছে', 'ক্যাটাগরি রিমুভ করা হয়েছে।', 'info');
  };

  const addReview = (revData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newReview: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('রিভিউ যোগ করা হয়েছে', 'আপনার মূল্যবান মতামতের জন্য ধন্যবাদ!', 'success');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('রিভিউ মুছে ফেলা হয়েছে', 'রিভিউ সফলভাবে রিমুভ করা হয়েছে।', 'info');
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    showToast('রিভিউ অনুমোদিত', 'রিভিউটি ওয়েবসাইটে প্রদর্শিত হচ্ছে।', 'success');
  };

  const addFAQ = (faqData: Omit<FAQItem, 'id'>) => {
    const newFAQ: FAQItem = {
      ...faqData,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, newFAQ]);
    showToast('FAQ যুক্ত হয়েছে', 'নতুন প্রশ্ন ও উত্তর সেভ করা হয়েছে।', 'success');
  };

  const updateFAQ = (id: string, faqData: Partial<FAQItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...faqData } : f))
    );
    showToast('FAQ আপডেট হয়েছে', 'প্রশ্ন ও উত্তর সংরক্ষিত হয়েছে।', 'success');
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast('FAQ মুছে ফেলা হয়েছে', 'FAQ রিমুভ করা হয়েছে।', 'info');
  };

  const addCoupon = (coupData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...coupData,
      id: `coup-${Date.now()}`,
    };
    setCoupons((prev) => [...prev, newCoupon]);
    showToast('কুপন তৈরি হয়েছে', `কুপন "${newCoupon.code}" অ্যাক্টিভ হয়েছে।`, 'success');
  };

  const updateCoupon = (id: string, coupData: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...coupData } : c))
    );
    showToast('কুপন আপডেট হয়েছে', 'কুপন সেটিংস আপডেট হয়েছে।', 'success');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('কুপন মুছে ফেলা হয়েছে', 'কুপন রিমুভ করা হয়েছে।', 'info');
  };

  const resetToDefaults = () => {
    setSiteConfig(initialSiteConfig);
    setCategories(initialCategories);
    setProducts(initialProducts);
    setReviews(initialReviews);
    setFaqs(initialFAQs);
    setCoupons(initialCoupons);
    setOrders(initialSampleOrders);
    setCart([]);
    setWishlist([]);
    localStorage.clear();
    showToast('রিসেট সম্পন্ন', 'ডেমো ডেটা সফলভাবে রিস্টোর করা হয়েছে।', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        trackingOrderNumber,
        setTrackingOrderNumber,
        activePolicyModal,
        setActivePolicyModal,
        siteConfig,
        updateSiteConfig,
        categories,
        products,
        reviews,
        faqs,
        coupons,
        orders,
        cart,
        wishlist,
        appliedCoupon,
        appliedDiscountAmount,
        cartSubtotal,
        cartTotalCount,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyCouponCode,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        lastCreatedOrder,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addReview,
        deleteReview,
        approveReview,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        resetToDefaults,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
