import React from 'react';
import { 
  PhoneCall, 
  MessageCircle, 
  Search, 
  ShoppingCart, 
  Layers, 
  Home, 
  ArrowUp 
} from 'lucide-react';

interface FloatingWidgetsProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
  showBackToTop: boolean;
  onScrollToTop: () => void;
  onOpenCategoryMenu: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  cartCount,
  onOpenCart,
  onOpenOrderLookup,
  showBackToTop,
  onScrollToTop,
  onOpenCategoryMenu,
}) => {
  return (
    <>
      {/* Desktop Floating Right Widgets */}
      <div className="fixed bottom-20 sm:bottom-8 right-3 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Zalo Chat Button */}
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#0068FF] text-white shadow-xl flex items-center justify-center hover:scale-110 transition group relative"
          title="Chat Zalo Tư Vấn Sim 24/7"
        >
          <span className="font-black text-xs">Zalo</span>
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Chat Zalo: 0983.69.8184
          </span>
        </a>

        {/* Hotline Call Button with ripple effect */}
        <a
          href="tel:18001091"
          className="relative group flex items-center"
          title="Gọi Tổng Đài VinaPhone 24/7"
        >
          <span className="absolute -inset-1 rounded-full bg-[#D90429] opacity-70 animate-ping"></span>
          <div className="relative w-12 h-12 rounded-full bg-[#D90429] text-white shadow-xl flex items-center justify-center hover:scale-110 transition">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <span className="absolute right-14 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Hotline: 1800 1091 (Miễn phí)
          </span>
        </a>

        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={onScrollToTop}
            className="w-10 h-10 rounded-full bg-white/95 text-slate-700 hover:text-[#0072BC] shadow-lg border border-slate-200 flex items-center justify-center hover:scale-110 transition"
            title="Lên đầu trang"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* Sticky Mobile Bottom Navigation Bar (eCommerce Standard) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-[#0072BC] py-1 px-2"
        >
          <Home className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">Trang Chủ</span>
        </button>

        {/* Category Catalog */}
        <button
          onClick={() => {
            const el = document.getElementById('product-catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-[#0072BC] py-1 px-2"
        >
          <Layers className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">Kho Sim</span>
        </button>

        {/* Call Hotline */}
        <a
          href="tel:18001091"
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#D90429] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <PhoneCall className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold text-[#D90429] mt-0.5">Gọi 18001091</span>
        </a>

        {/* Order Lookup */}
        <button
          onClick={onOpenOrderLookup}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-[#0072BC] py-1 px-2"
        >
          <Search className="w-5 h-5 text-slate-700" />
          <span className="text-[10px] font-semibold">Tra Cứu</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-[#0072BC] py-1 px-2 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D90429] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Giỏ Hàng</span>
        </button>

      </div>
    </>
  );
};
