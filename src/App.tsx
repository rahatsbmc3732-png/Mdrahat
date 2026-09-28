import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { PolicyModal } from './components/common/PolicyModal';
import { CartDrawer } from './components/views/CartDrawer';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { OrderTrackingModal } from './components/views/OrderTrackingModal';
import { ShareWebsiteModal } from './components/common/ShareWebsiteModal';
import { FloatingShareButton } from './components/common/FloatingShareButton';

// Home sections
import { HeroSection } from './components/home/HeroSection';
import { CategoryShowcaseHub } from './components/home/CategoryShowcaseHub';
import { PromoBanner } from './components/home/PromoBanner';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { CustomerReviews } from './components/home/CustomerReviews';
import { Newsletter } from './components/home/Newsletter';
import { SocialGallery } from './components/home/SocialGallery';

// Dedicated views
import { AllProductsView } from './components/views/AllProductsView';
import { ProductDetailView } from './components/views/ProductDetailView';
import { CartView } from './components/views/CartView';
import { CheckoutView } from './components/views/CheckoutView';
import { OrderConfirmationView } from './components/views/OrderConfirmationView';
import { AboutUsView } from './components/views/AboutUsView';
import { ContactView } from './components/views/ContactView';
import { FAQView } from './components/views/FAQView';
import { WishlistView } from './components/views/WishlistView';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { MessageSquare, Phone, ArrowUp } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, siteConfig } = useStore();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  if (currentView === 'admin') {
    return (
      <>
        <AdminDashboard />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-slate-900 font-['Hind_Siliguri',sans-serif] selection:bg-[#0F3E36] selection:text-white">
      {/* Universal Header */}
      <Header />

      {/* Main Content Body */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection />
            <div id="category-showcase-section">
              <CategoryShowcaseHub />
            </div>
            <PromoBanner />
            <WhyChooseUs />
            <CustomerReviews />
            <Newsletter />
            <SocialGallery />
          </>
        )}

        {currentView === 'products' && <AllProductsView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'about' && <AboutUsView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'wishlist' && <WishlistView />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Modals & Overlays */}
      <ProductQuickViewModal />
      <OrderTrackingModal />
      <ShareWebsiteModal />
      <PolicyModal />
      <Toast />

      {/* Floating Website Link Share Button */}
      <FloatingShareButton />

      {/* Floating Customer Action Button (WhatsApp & Call) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-108 group relative"
          aria-label="WhatsApp Support"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-15 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
            হোয়াটসঅ্যাপে অর্ডার ও সাহায্য নিন
          </span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
