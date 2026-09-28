export type ViewMode = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'wishlist' 
  | 'orders' 
  | 'admin';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  features: string[];
  stock: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  deliveryCharge: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'rocket' | 'card';
  paymentStatus: 'unpaid' | 'paid';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
  status: 'approved' | 'pending';
}

export interface FAQItem {
  id: string;
  category: 'delivery' | 'payment' | 'return' | 'order' | 'general';
  question: string;
  answer: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  description: string;
  isActive: boolean;
  expiryDate?: string;
}

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  announcementText: string;
  announcementActive: boolean;
  hotline: string;
  whatsapp: string;
  email: string;
  address: string;
  insideDhakaShipping: number;
  outsideDhakaShipping: number;
  freeShippingThreshold: number;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  heroImageUrl: string;
  promoBannerTitle: string;
  promoBannerSub: string;
  promoBannerDiscount: string;
  promoBannerCoupon: string;
  promoBannerImageUrl: string;
  promoBannerActive: boolean;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  themePrimaryColor: string;
  themeAccentColor: string;
  liveWebsiteUrl?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
