import React from 'react';
import { 
  GraduationCap, 
  ShoppingCart, 
  Search, 
  PhoneCall, 
  Gift, 
  Zap, 
  Sparkles,
  School,
  AlertCircle
} from 'lucide-react';
import { QuickFilterState } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface StudentHeaderProps {
  filter: QuickFilterState;
  onFilterChange: (newFilter: Partial<QuickFilterState>) => void;
  cartCount: number;
  cartTotal: number;
  orderCount: number;
  isAdminAuthenticated: boolean;
  onOpenCart: () => void;
  onOpenQuickTable: () => void;
  onOpenAdminPortal: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  filter,
  onFilterChange,
  cartCount,
  cartTotal,
  orderCount,
  isAdminAuthenticated,
  onOpenCart,
  onOpenQuickTable,
  onOpenAdminPortal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-md" id="student-header">
      
      {/* Top Announcement Bar with August limited gift warning */}
      <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 text-white py-1.5 px-3 text-center text-[11px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-2">
        <Gift className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
        <span className="truncate">
          ⚡ <strong>CHIẾN DỊCH TỰU TRƯỜNG CẦN THƠ:</strong> GIẢM ĐẾN 50% • <strong>QUÀ TẶNG CÓ HẠN DUY NHẤT THÁNG 8!</strong>
        </span>
        <span className="hidden md:inline-block bg-amber-300 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black ml-1">
          CHỈ PHỤC VỤ TP. CẦN THƠ • GIAO KTX 15P
        </span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo: VinaPhone Back To School */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Vina</span>
                <span className="text-xl sm:text-2xl font-black text-sky-500 tracking-tight">Student</span>
                <span className="text-[9px] bg-teal-100 text-teal-800 font-black px-1.5 py-0.5 rounded-md ml-1 tracking-wider">
                  CẦN THƠ
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 -mt-1 flex items-center gap-1.5">
                <span>Ưu đãi HSSV & Cán bộ Đoàn</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={filter.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Tìm nhanh: FCLUB, YOLO100, SODA125, D159V, quà tặng tháng 8..."
                className="w-full pl-10 pr-24 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              {filter.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded-full"
                >
                  Xóa
                </button>
              )}

              <button
                onClick={onOpenQuickTable}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition shadow-xs cursor-pointer"
              >
                Bảng Giá
              </button>
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Table View button for mobile/desktop */}
            <button
              onClick={onOpenQuickTable}
              className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold border border-sky-200 transition cursor-pointer"
              title="Xem bảng giá chính thức"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Bảng Tổng Hợp</span>
            </button>

            {/* Staff / Admin Portal Access Button */}
            <button
              onClick={onOpenAdminPortal}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-sky-600 rounded-xl text-xs font-bold border border-slate-200 transition cursor-pointer relative"
              title="Cổng Quản Trị Viên & Cán Bộ Đoàn"
              id="admin-portal-button"
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="hidden md:inline">
                {isAdminAuthenticated ? 'Trang Quản Trị' : 'Cán Bộ / Admin'}
              </span>
              {orderCount > 0 && (
                <span className="bg-sky-600 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Tổng Đài / Zalo: 08.1800 6881 */}
            <a
              href="https://zalo.me/0818006881"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-slate-700 rounded-xl transition text-xs font-bold border border-teal-200"
              title="Liên hệ Tổng đài / Zalo: 08.1800 6881 (TP. Cần Thơ)"
            >
              <PhoneCall className="w-4 h-4 text-teal-600" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 font-medium leading-none">Tổng đài / Zalo Cần Thơ</div>
                <div className="text-xs font-bold text-sky-600 leading-tight">08.1800 6881</div>
              </div>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-sky-500/20 transition group cursor-pointer"
              id="student-cart-button"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="hidden sm:flex flex-col items-start leading-none text-left">
                <span className="text-[10px] text-sky-100 font-medium">Giỏ Hàng SV</span>
                <span className="text-xs font-black text-white">
                  {cartCount > 0 ? formatNumberVND(cartTotal) : '0đ'}
                </span>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Search input bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={filter.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Tìm gói: FCLUB, YOLO100, SODA125, D159V, quà..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {filter.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

      </div>

    </header>
  );
};
