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
        className="absolute inset-0 bg-slate-900/60 transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="bg-white border-b border-slate-200 text-slate-900 p-5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900">Giỏ Hàng Tựu Trường Cần Thơ</h3>
                <p className="text-[11px] text-slate-500">{cartItems.length} gói cước ưu đãi</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length > 0 && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold flex items-center gap-2">
                <Gift className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Quà tặng có hạn:</strong> Chỉ áp dụng duy nhất trong Tháng 8/2026!
                </span>
              </div>
            )}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
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
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="border-l-4 border-orange-500 pl-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-base text-blue-600">
                          {item.packageItem.code}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-md">
                          -{item.packageItem.discountPercent}%
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {item.packageItem.cycle} • {item.packageItem.dataAllowance}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1 text-slate-400 hover:text-slate-900 transition cursor-pointer"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Gift selection box */}
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center gap-1 text-slate-900 font-bold text-[11px] mb-1">
                      <Gift className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>Quà Tặng Kèm (Tháng 8):</span>
                    </div>
                    <select
                      value={item.selectedGift}
                      onChange={(e) => onUpdateGift(idx, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-600"
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
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600"
                    >
                      <option value="new_sim_physical">SIM Mới (Giao KTX 15p)</option>
                      <option value="new_sim_esim">Mã QR eSIM (3p)</option>
                      <option value="existing_sim">Gán SIM hiện tại</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Giá ưu đãi:</span>
                    <span className="font-bold text-sm text-slate-900 font-mono">
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
                <span>Giao KTX Cần Thơ & Quà tặng:</span>
                <span className="text-blue-700 font-bold">Miễn Phí 100%</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-800">Tổng thanh toán:</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatNumberVND(totalAmount)}
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-white" />
                <span>Tiến Hành Đặt Hàng Nhanh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 pt-1 cursor-pointer"
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
