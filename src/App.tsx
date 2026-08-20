import React, { useState, useMemo, useEffect } from 'react';
import { StudentHeader } from './components/StudentHeader';
import { StudentHeroBanner } from './components/StudentHeroBanner';
import { StudentPackageGrid } from './components/StudentPackageGrid';
import { OfficialTableComparison } from './components/OfficialTableComparison';
import { StudentPerksSection } from './components/StudentPerksSection';
import { StudentFastCheckoutModal } from './components/StudentFastCheckoutModal';
import { StudentCartDrawer } from './components/StudentCartDrawer';
import { StudentFooter } from './components/StudentFooter';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPortal } from './components/AdminPortal';

import { STUDENT_PACKAGES } from './data/studentPackageData';
import { 
  StudentPackage, 
  StudentCartItem, 
  StudentOrder, 
  QuickFilterState,
  AppViewMode,
  OrderStatus
} from './types';
import { 
  PhoneCall, 
  ArrowUp, 
  CheckCircle, 
  GraduationCap, 
  Gift, 
  Zap,
  ShoppingCart,
  Layers,
  ShieldCheck
} from 'lucide-react';

const INITIAL_FILTER: QuickFilterState = {
  family: 'ALL',
  cycle: 'ALL',
  demand: 'ALL',
  searchQuery: '',
  sortBy: 'popular',
};

const STORAGE_KEY_ORDERS = 'vinastudent_orders_v1';
const STORAGE_KEY_CART = 'vinastudent_cart_v1';
const STORAGE_KEY_WEBHOOK = 'vinastudent_sheets_webhook_v1';
const STORAGE_KEY_AUTH = 'vinastudent_admin_auth_v1';

export default function App() {
  // Mode: Customer vs Admin
  const [currentView, setCurrentView] = useState<AppViewMode>('customer');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Storefront Filter State
  const [filter, setFilter] = useState<QuickFilterState>(INITIAL_FILTER);
  
  // Persistent Cart & Orders from localStorage
  const [cartItems, setCartItems] = useState<StudentCartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<StudentOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [googleSheetsWebhookUrl, setGoogleSheetsWebhookUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_WEBHOOK) || '';
    } catch {
      return '';
    }
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackageForCheckout, setSelectedPackageForCheckout] = useState<StudentPackage | null>(null);
  const [selectedGiftForCheckout, setSelectedGiftForCheckout] = useState<string | undefined>(undefined);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const handleSaveWebhookUrl = (url: string) => {
    setGoogleSheetsWebhookUrl(url);
    try {
      localStorage.setItem(STORAGE_KEY_WEBHOOK, url);
    } catch (e) {
      console.error(e);
    }
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (newFilter: Partial<QuickFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilter = () => {
    setFilter(INITIAL_FILTER);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth Handling
  const handleOpenAdminPortal = () => {
    if (isAdminAuthenticated) {
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } catch (e) {
      console.error(e);
    }
    setIsAdminLoginOpen(false);
    setCurrentView('admin');
    showToast('Đăng nhập Quản trị viên / Cán bộ Đoàn thành công!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {
      console.error(e);
    }
    setCurrentView('customer');
    showToast('Đã đăng xuất tài khoản quản trị.');
  };

  // Order Management Handlers
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus, staffNote?: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status, staffNote: staffNote || ord.staffNote } : ord))
    );
    showToast(`Đã cập nhật trạng thái đơn ${orderId} thành: ${status}`);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    showToast('Đã xóa đơn hàng khỏi hệ thống.');
  };

  const handleClearAllOrders = () => {
    setOrders([]);
    showToast('Đã xóa toàn bộ dữ liệu đơn hàng.');
  };

  const handleAddNewOrder = (newOrder: StudentOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Đã tạo đơn hàng mới: ${newOrder.id}`);
  };

  // Add to Cart
  const handleAddToCart = (pkg: StudentPackage, selectedGift?: string) => {
    const chosenGift = selectedGift || pkg.giftOptions[0];
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.packageItem.id === pkg.id && item.selectedGift === chosenGift
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          packageItem: pkg,
          quantity: 1,
          selectedGift: chosenGift,
          simOption: 'new_sim_physical',
        },
      ];
    });
    showToast(`Đã thêm gói ${pkg.code} (+Quà: ${chosenGift}) vào giỏ hàng!`);
  };

  // Fast Checkout direct
  const handleSelectPackageForCheckout = (pkg: StudentPackage, selectedGift?: string) => {
    setSelectedPackageForCheckout(pkg);
    setSelectedGiftForCheckout(selectedGift || pkg.giftOptions[0]);
    setIsCheckoutOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateCartGift = (index: number, newGift: string) => {
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, selectedGift: newGift } : item))
    );
  };

  const handleUpdateCartSimOption = (
    index: number,
    option: 'new_sim_physical' | 'new_sim_esim' | 'existing_sim'
  ) => {
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, simOption: option } : item))
    );
  };

  const handleCheckoutFromCart = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    setSelectedPackageForCheckout(cartItems[0].packageItem);
    setSelectedGiftForCheckout(cartItems[0].selectedGift);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: StudentOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Đặt hàng thành công! Mã đơn: ${newOrder.id}`);
  };

  // Filtered packages for customer view
  const filteredPackages = useMemo(() => {
    return STUDENT_PACKAGES.filter((pkg) => {
      // 1. Family filter
      if (filter.family !== 'ALL' && pkg.family !== filter.family) {
        return false;
      }

      // 1b. Demand filter
      if (filter.demand && filter.demand !== 'ALL' && pkg.demandType !== filter.demand) {
        return false;
      }

      // 2. Cycle filter
      if (filter.cycle !== 'ALL') {
        if (filter.cycle === '1T' && pkg.cycleMonths !== 1) return false;
        if (filter.cycle === '3T' && pkg.cycleMonths !== 3) return false;
        if (filter.cycle === '6T' && pkg.cycleMonths !== 6) return false;
        if (filter.cycle === '12T' && pkg.cycleMonths !== 12) return false;
      }

      // 3. Search Query
      if (filter.searchQuery.trim()) {
        const query = filter.searchQuery.toLowerCase().trim();
        const matchesCode = pkg.code.toLowerCase().includes(query);
        const matchesFamily = pkg.familyName.toLowerCase().includes(query);
        const matchesGift = pkg.giftText.toLowerCase().includes(query);
        const matchesData = pkg.dataAllowance.toLowerCase().includes(query);
        const matchesOptions = pkg.giftOptions.some((g) => g.toLowerCase().includes(query));
        if (!matchesCode && !matchesFamily && !matchesGift && !matchesData && !matchesOptions) {
          return false;
        }
      }

      return true;
    });
  }, [filter]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.packageItem.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // ================= RENDER ADMIN VIEW =================
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 font-sans">
        <AdminPortal
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onClearAllOrders={handleClearAllOrders}
          onAddNewOrder={handleAddNewOrder}
          googleSheetsWebhookUrl={googleSheetsWebhookUrl}
          onSaveWebhookUrl={handleSaveWebhookUrl}
          onSwitchToCustomerView={() => {
            setCurrentView('customer');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border border-blue-200 animate-in fade-in slide-in-from-bottom duration-200">
            <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // ================= RENDER CUSTOMER VIEW =================
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F4F8FB] text-slate-800 antialiased pb-16 sm:pb-0" id="vinastudent-app">
      
      {/* 1. Student Header */}
      <StudentHeader
        filter={filter}
        onFilterChange={handleFilterChange}
        cartCount={cartCount}
        cartTotal={cartTotal}
        orderCount={orders.length}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuickTable={() => setIsTableModalOpen(true)}
        onOpenAdminPortal={handleOpenAdminPortal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 2. Hero Banner with Quick Tabs */}
        <StudentHeroBanner
          filter={filter}
          onFilterChange={handleFilterChange}
          onOpenQuickTable={() => setIsTableModalOpen(true)}
        />

        {/* 3. Official 16 Package Product Cards Grid */}
        <StudentPackageGrid
          packages={filteredPackages}
          onSelectPackage={handleSelectPackageForCheckout}
          onAddToCart={handleAddToCart}
          onResetFilter={handleResetFilter}
        />

        {/* 4. Full Table Reference Component */}
        <OfficialTableComparison
          onSelectPackage={handleSelectPackageForCheckout}
          onAddToCart={handleAddToCart}
          isModal={false}
        />

        {/* 5. Back to school Perks & Guarantees */}
        <StudentPerksSection />

      </main>

      {/* 6. Footer */}
      <StudentFooter />

      {/* ================= MODALS ================= */}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Fast 1-Step Student Checkout Modal */}
      <StudentFastCheckoutModal
        packageItem={selectedPackageForCheckout}
        selectedGift={selectedGiftForCheckout}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
        googleSheetsWebhookUrl={googleSheetsWebhookUrl}
      />

      {/* Cart Drawer */}
      <StudentCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateGift={handleUpdateCartGift}
        onUpdateSimOption={handleUpdateCartSimOption}
        onCheckout={handleCheckoutFromCart}
        onClearCart={() => setCartItems([])}
      />

      {/* Table Reference Modal */}
      <OfficialTableComparison
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onSelectPackage={(pkg) => {
          setIsTableModalOpen(false);
          handleSelectPackageForCheckout(pkg);
        }}
        onAddToCart={(pkg) => {
          handleAddToCart(pkg);
        }}
        isModal={true}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Hotline & Zalo Call button */}
        <a
          href="https://zalo.me/0818006881"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center"
          title="Tổng đài / Zalo Cần Thơ: 08.1800 6881"
          id="student-floating-hotline"
        >
          <span className="absolute -inset-1 rounded-full bg-blue-400 opacity-50 animate-ping"></span>
          <div className="relative w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:bg-blue-700 transition">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <span className="absolute right-14 bg-white text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md border border-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Tổng đài / Zalo Cần Thơ: 08.1800 6881
          </span>
        </a>

        {/* Back To Top button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-white text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 flex items-center justify-center transition cursor-pointer"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* Sticky Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 py-1 px-2"
        >
          <GraduationCap className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">Tựu Trường</span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById('student-packages-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 py-1 px-2"
        >
          <Layers className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">16 Gói Cước</span>
        </button>

        <button
          onClick={handleOpenAdminPortal}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 py-1 px-2 relative"
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5 text-slate-700" />
            {orders.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {orders.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Cán Bộ</span>
        </button>

        <button
          onClick={() => setIsTableModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 py-1 px-2"
        >
          <Zap className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">Bảng Giá</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-blue-600 py-1 px-2 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Giỏ Hàng</span>
        </button>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-slate-800 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border border-blue-200 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
