import React from 'react';
import { 
  X, 
  Star, 
  Zap, 
  ShoppingCart, 
  ShieldCheck, 
  Wifi, 
  Compass, 
  Sparkles, 
  Truck, 
  QrCode, 
  CheckCircle2 
} from 'lucide-react';
import { SimItem } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface ProductDetailModalProps {
  sim: SimItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (sim: SimItem) => void;
  onAddToCart: (sim: SimItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  sim,
  isOpen,
  onClose,
  onBuyNow,
  onAddToCart,
}) => {
  if (!isOpen || !sim) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="product-detail-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005a96] to-[#0072BC] text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div>
            <span className="text-[11px] uppercase font-bold text-yellow-300 tracking-wider">
              CHI TIẾT SIM SỐ ĐẸP VINAPHONE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
              {sim.number}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Main Sim Card Display */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-6 rounded-3xl border border-blue-100 text-center relative shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-[#D90429] rounded-full text-xs font-black mb-2">
              <span>GIẢM -{sim.discountPercent}%</span>
              <span>• {sim.badge || 'SIÊU PHẨM'}</span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-[#0072BC] font-mono tracking-wider my-2 select-all">
              {sim.number}
            </div>

            <p className="text-sm font-semibold text-slate-700">
              {sim.categoryName} • Mã SP: <span className="font-mono">{sim.id}</span>
            </p>

            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#D90429]">
                {formatNumberVND(sim.price)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatNumberVND(sim.originalPrice)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 mt-2 text-amber-500 text-xs font-bold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-slate-700 ml-1">5.0 / 5.0 ({sim.reviewCount} đánh giá từ khách mua)</span>
            </div>
          </div>

          {/* Feng Shui Analysis Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Compass className="w-5 h-5 text-amber-600" />
                <span>Thẩm Định Phong Thủy Sim Số</span>
              </div>
              <span className="bg-amber-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                {sim.fengShuiScore} / 10 Điểm
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              <strong>Ý nghĩa:</strong> {sim.meaning}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-amber-950 font-semibold">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span>Âm Dương: <strong>Cân Bằng Hài Hòa</strong></span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span>Ngũ Hành: <strong>Kim Sinh Thủy</strong></span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200 col-span-2 sm:col-span-1">
                <span>Quẻ Dịch: <strong>Đại Cát Hanh Thông</strong></span>
              </div>
            </div>
          </div>

          {/* Included Package Offer */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#0072BC] font-bold">
              <Wifi className="w-5 h-5" />
              <span>Gói Cước Khuyến Mãi Tặng Kèm:</span>
            </div>
            <p className="text-slate-700 font-medium pl-7">
              {sim.includedPackage}
            </p>
          </div>

          {/* Guarantees list */}
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Đăng ký thông tin chính chủ VinaPhone ngay khi nhận sim.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Miễn phí giao hàng hỏa tốc trong 15 phút tại 63 tỉnh thành.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Hỗ trợ cấp đổi eSIM quét mã QR kích hoạt trong 3 phút.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBuyNow(sim);
              }}
              className="flex-1 py-3.5 bg-[#0072BC] hover:bg-[#005a96] text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>Mua Ngay (Giao 15 Phút)</span>
            </button>

            <button
              onClick={() => {
                onAddToCart(sim);
                onClose();
              }}
              className="py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm Vào Giỏ</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
