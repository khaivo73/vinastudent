import React from 'react';
import { 
  X, 
  Trash2, 
  Gift, 
  ArrowRight, 
  ShoppingCart, 
  Sparkles, 
  Check, 
  Truck, 
  QrCode, 
  Zap 
} from 'lucide-react';
import { StudentCartItem } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface StudentCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: StudentCartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateGift: (index: number, newGift: string) => void;
  onUpdateSimOption: (index: number, option: 'new_sim_physical' | 'new_sim_esim' | 'existing_sim') => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export const StudentCartDrawer: React.FC<StudentCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateGift,
  onUpdateSimOption,
  onCheckout,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.packageItem.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="student-cart-drawer">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-[#0072BC] text-white p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-yellow-300" />
              <div>
                <h3 className="font-black text-base sm:text-lg">Giỏ Hàng Tựu Trường</h3>
                <p className="text-[11px] text-blue-100">{cartItems.length} gói cước ưu đãi</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length > 0 && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 font-bold flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#D90429] shrink-0 animate-bounce" />
                <span>
                  <strong>Quà tặng có hạn:</strong> Chỉ áp dụng duy nhất trong Tháng 8/2026!
                </span>
              </div>
            )}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0072BC] flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Giỏ hàng sinh viên đang trống</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Hãy chọn một trong 16 gói cước (FCLUB, YOLO100, SODA125, D159V) để nhận ưu đãi giảm đến 50% và quà tặng nhé!
                </p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-base text-[#0072BC]">
                          {item.packageItem.code}
                        </span>
                        <span className="px-2 py-0.2 bg-red-100 text-[#D90429] text-[10px] font-black rounded">
                          -{item.packageItem.discountPercent}%
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {item.packageItem.cycle} • {item.packageItem.dataAllowance}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1 text-slate-400 hover:text-red-600 transition"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Gift selection box */}
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 text-xs">
                    <div className="flex items-center gap-1 text-amber-900 font-bold text-[11px] mb-1">
                      <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Quà Tặng Kèm:</span>
                    </div>
                    <select
                      value={item.selectedGift}
                      onChange={(e) => onUpdateGift(idx, e.target.value)}
                      className="w-full bg-white border border-amber-300 text-amber-950 font-bold rounded-lg px-2 py-1 text-xs focus:outline-none"
                    >
                      {item.packageItem.giftOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Format option */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                    <span className="text-slate-500 font-medium">Nhận dạng:</span>
                    <select
                      value={item.simOption}
                      onChange={(e) => onUpdateSimOption(idx, e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700"
                    >
                      <option value="new_sim_physical">SIM Mới (Giao 15p)</option>
                      <option value="new_sim_esim">Mã QR eSIM (3p)</option>
                      <option value="existing_sim">Gán SIM hiện tại</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Giá ưu đãi:</span>
                    <span className="font-black text-sm text-[#D90429]">
                      {formatNumberVND(item.packageItem.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Vận chuyển KTX & Quà tặng:</span>
                <span className="text-emerald-600 font-bold">Miễn Phí 100%</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-800">Tổng thanh toán:</span>
                <span className="text-xl font-black text-[#D90429]">
                  {formatNumberVND(totalAmount)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#D90429] hover:bg-[#b80323] text-white font-bold text-sm rounded-full shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>Tiến Hành Đặt Hàng Nhanh</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 pt-1"
              >
                Xóa tất cả sản phẩm
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
