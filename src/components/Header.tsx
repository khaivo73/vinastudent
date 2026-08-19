import React from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  X, 
  SlidersHorizontal 
} from 'lucide-react';
import { FilterState } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface HeaderProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenOrderLookup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filter,
  onFilterChange,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAccount,
  onOpenOrderLookup,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm transition-all" id="vina-header">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#005a96] via-[#0072BC] to-[#0089e0] text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-[#D90429] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              HOT
            </span>
            <span>Ưu đãi VinaPhone: Giảm tới 20% Sim Số Đẹp + Tặng Data 4G/5G Khủng 120GB</span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <button 
              onClick={onOpenOrderLookup}
              className="hover:underline flex items-center gap-1 cursor-pointer transition"
              id="header-order-lookup-btn"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Tra cứu đơn hàng</span>
            </button>
            <span className="text-blue-200">|</span>
            <div className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              <span>Hotline 24/7: <strong className="text-amber-300 font-bold">1800 1091 - 0912.888.999</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo VinaSim */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group" id="brand-logo-link">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#005a96] to-[#0072BC] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition transform">
              <div className="relative">
                <span className="text-xl sm:text-2xl font-black tracking-tighter">V</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D90429] rounded-full border-2 border-white"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0072BC]">Vina</span>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800">Sim</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-blue-50 text-[#0072BC] rounded border border-blue-200">Store</span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline-block font-medium">Kho Sim Số Đẹp & Data Chính Hãng VinaPhone</span>
            </div>
          </a>

          {/* Search Bar in Middle */}
          <div className="flex-1 max-w-2xl relative mx-1 sm:mx-4">
            <div className="relative flex items-center">
              <input
                id="header-sim-search-input"
                type="text"
                value={filter.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Tìm số sim (VD: 091*, *888*, *6868*), gói data..."
                className="w-full pl-10 pr-24 py-2.5 sm:py-3 bg-slate-50 border-2 border-slate-200 rounded-full text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0072BC] focus:outline-none focus:ring-4 focus:ring-[#0072BC]/15 transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              
              {filter.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-20 text-slate-400 hover:text-slate-600 p-1"
                  title="Xóa tìm kiếm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('product-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute right-1.5 bg-[#0072BC] hover:bg-[#005a96] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition flex items-center gap-1 shadow-sm"
                id="header-search-submit-btn"
              >
                <span>Tìm</span>
              </button>
            </div>

            {/* Quick Suggestion Tags */}
            <div className="hidden md:flex items-center gap-2 mt-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar">
              <span className="font-medium text-slate-400">Gợi ý tìm:</span>
              <button 
                onClick={() => onFilterChange({ searchQuery: '*888*' })}
                className="hover:text-[#0072BC] hover:underline"
              >
                *888* (Tam hoa 8)
              </button>
              <span>•</span>
              <button 
                onClick={() => onFilterChange({ searchQuery: '*6868*' })}
                className="hover:text-[#0072BC] hover:underline"
              >
                *6868* (Lộc phát)
              </button>
              <span>•</span>
              <button 
                onClick={() => onFilterChange({ searchQuery: '091' })}
                className="hover:text-[#0072BC] hover:underline"
              >
                Đầu số cổ 091
              </button>
              <span>•</span>
              <button 
                onClick={() => onFilterChange({ searchQuery: '088' })}
                className="hover:text-[#0072BC] hover:underline"
              >
                Đầu 088 Đại gia
              </button>
              <span>•</span>
              <button 
                onClick={() => onFilterChange({ searchQuery: 'VD149' })}
                className="hover:text-[#0072BC] hover:underline text-[#D90429] font-medium"
              >
                Gói VD149 120GB
              </button>
            </div>
          </div>

          {/* Right Action Blocks: Account & Shopping Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Account Management Button */}
            <button
              onClick={onOpenAccount}
              id="header-account-btn"
              className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50/80 text-slate-700 hover:text-[#0072BC] border border-slate-200/80 transition group text-left"
              title="Click để quản lý tài khoản"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-[#0072BC] flex items-center justify-center group-hover:bg-[#0072BC] group-hover:text-white transition">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium leading-none">Tài khoản</span>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#0072BC] leading-tight mt-0.5">
                  Click để quản lý
                </span>
              </div>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#D90429] hover:bg-[#b50322] text-white shadow-md shadow-red-500/20 transition transform active:scale-95"
              title="Xem giỏ hàng"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-yellow-400 text-slate-900 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#D90429] shadow-sm animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[11px] text-red-100 font-medium leading-none">Giỏ hàng</span>
                <span className="text-xs font-bold leading-tight mt-0.5">
                  {cartCount > 0 ? formatNumberVND(cartTotal) : '0 đ'}
                </span>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
