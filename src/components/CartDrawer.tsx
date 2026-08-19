import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  Truck, 
  QrCode, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem, SimItem } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (simId: string) => void;
  onUpdateFormat: (simId: string, format: 'eSIM' | 'physical') => void;
  onCheckoutCart: () => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateFormat,
  onCheckoutCart,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.sim.price * item.quantity, 0);
  const finalSubtotal = Math.max(0, rawSubtotal - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VINAPRO' || couponCode.trim().toUpperCase() === 'FREESHIP') {
      setAppliedDiscount(50000);
      setCouponMessage('Áp dụng mã giảm giá 50.000 đ thành công!');
    } else {
      setCouponMessage('Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn" id="cart-drawer-overlay">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between relative animate-in slide-in-from-right duration-300">
        
        {/* Cart Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#005a96] to-[#0072BC] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h3 className="font-black text-lg">Giỏ Hàng Sim VinaPhone</h3>
            <span className="bg-yellow-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
            id="close-cart-drawer-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-100 flex items-center justify-between text-xs text-[#0072BC]">
          <div className="flex items-center gap-1.5 font-semibold">
            <Truck className="w-4 h-4" />
            <span>Miễn phí giao hàng hỏa tốc 15 phút</span>
          </div>
          <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 text-[10px]">
            100% FREESHIP
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.sim.id} className="pt-3 first:pt-0 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {item.sim.id}
                    </span>
                    <div className="text-lg font-black text-[#0072BC] font-mono leading-tight">
                      {item.sim.number}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.sim.categoryName}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-[#D90429] block">
                      {formatNumberVND(item.sim.price)}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.sim.id)}
                      className="text-slate-400 hover:text-red-600 transition p-1 text-xs inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>

                {/* Format toggle per item */}
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/70 text-xs">
                  <span className="text-[11px] font-medium text-slate-500 pl-1">Định dạng:</span>
                  <button
                    type="button"
                    onClick={() => onUpdateFormat(item.sim.id, 'physical')}
                    className={`flex-1 py-1 px-2 rounded-lg font-semibold transition ${
                      item.selectedFormat === 'physical'
                        ? 'bg-white text-[#0072BC] shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/50'
                    }`}
                  >
                    Sim Vật Lý
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateFormat(item.sim.id, 'eSIM')}
                    className={`flex-1 py-1 px-2 rounded-lg font-semibold transition ${
                      item.selectedFormat === 'eSIM'
                        ? 'bg-white text-[#0072BC] shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/50'
                    }`}
                  >
                    eSIM QR
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-blue-50 text-[#0072BC] rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800">Giỏ hàng của bạn đang trống</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Hãy lựa chọn các số sim yêu thích hoặc gói cước data VinaPhone giá tốt nhé!
              </p>
            </div>
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            
            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Nhập mã giảm giá (VD: VINAPRO)"
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-medium focus:outline-none focus:border-[#0072BC]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition"
              >
                Áp Dụng
              </button>
            </form>

            {couponMessage && (
              <p className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {couponMessage}
              </p>
            )}

            {/* Total breakdown */}
            <div className="space-y-1.5 pt-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{formatNumberVND(rawSubtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá khuyến mãi:</span>
                  <span>-{formatNumberVND(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí giao hàng:</span>
                <span className="text-emerald-600 font-bold">Miễn phí</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Tổng thanh toán:</span>
                <span className="text-base font-black text-[#D90429]">
                  {formatNumberVND(finalSubtotal)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onCheckoutCart}
              className="w-full py-3.5 bg-[#0072BC] hover:bg-[#005a96] text-white font-bold text-sm rounded-full shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              id="cart-checkout-proceed-btn"
            >
              <span>Tiến Hành Đặt Mua ({cartItems.length} Sim)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-600 hover:underline pt-1"
            >
              Xóa toàn bộ giỏ hàng
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
