import React from 'react';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Sparkles, 
  Check, 
  Eye, 
  ShieldCheck, 
  Wifi, 
  Tag 
} from 'lucide-react';
import { SimItem } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface ProductCardProps {
  sim: SimItem;
  onBuyNow: (sim: SimItem) => void;
  onAddToCart: (sim: SimItem) => void;
  onViewDetail: (sim: SimItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sim,
  onBuyNow,
  onAddToCart,
  onViewDetail,
}) => {
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative group"
      id={`product-card-${sim.id}`}
    >
      {/* Top Banner & Discount Badge */}
      <div className="relative p-4 pb-0">
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Red Discount Badge in top corner */}
          <span className="bg-[#D90429] text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm tracking-wide flex items-center gap-1">
            <span>-{sim.discountPercent}%</span>
          </span>

          {/* Optional VIP / Hot Badge */}
          {sim.badge && (
            <span className="bg-blue-50 text-[#0072BC] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {sim.badge}
            </span>
          )}
        </div>

        {/* Sim Card Preview Header Container */}
        <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-blue-50/50 rounded-xl p-3.5 border border-blue-100/60 text-center relative mt-1">
          
          {/* Network Carrier Icon */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-1">
            <span className="text-[#0072BC] font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
              VinaPhone
            </span>
            <span className="bg-white px-1.5 py-0.5 rounded text-slate-600 border border-slate-200">
              {sim.simType}
            </span>
          </div>

          {/* SỐ SIM HIỂN THỊ TO, NỔI BẬT */}
          <div 
            onClick={() => onViewDetail(sim)}
            className="text-xl sm:text-2xl font-black text-[#0072BC] tracking-tight group-hover:text-[#005a96] transition py-1 cursor-pointer select-all font-mono"
            title="Bấm xem chi tiết phong thủy & gói cước"
          >
            {sim.number}
          </div>

          {/* Sim Category Tag */}
          <div className="text-[11px] font-medium text-slate-500 line-clamp-1">
            {sim.categoryName}
          </div>
        </div>

      </div>

      {/* Product Content Body */}
      <div className="p-4 pt-3 space-y-2.5 flex-1 flex flex-col justify-between">
        
        {/* Included Data Package Info */}
        <div className="text-[11px] bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-100 flex items-start gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-[#0072BC] shrink-0 mt-0.5" />
          <span className="line-clamp-1 font-medium">{sim.includedPackage}</span>
        </div>

        {/* Rating Stars & Review Count */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-500">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-700 ml-0.5">{sim.rating.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            ({sim.reviewCount} đánh giá)
          </span>
        </div>

        {/* Pricing Block: Current Bold Red Price + Original Strikethrough Price */}
        <div className="pt-1 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            {/* Giá bán hiện tại in đậm đỏ */}
            <span className="text-lg sm:text-xl font-black text-[#D90429] tracking-tight">
              {formatNumberVND(sim.price)}
            </span>
            {/* Giá gốc gạch ngang */}
            <span className="text-xs text-slate-400 line-through font-medium">
              {formatNumberVND(sim.originalPrice)}
            </span>
          </div>

          {/* Dòng hiển thị mã sản phẩm: Mã SP: SIM-XXX */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-0.5">
            <span>Mã SP: <strong className="text-slate-700">{sim.id}</strong></span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5 text-[10px]">
              <Check className="w-3 h-3" /> Sẵn hàng
            </span>
          </div>
        </div>

        {/* Action Buttons: "Mua Ngay" in VinaPhone Blue + Add to Cart */}
        <div className="pt-2 grid grid-cols-5 gap-1.5">
          {/* Nút "Mua Ngay" màu xanh VinaPhone */}
          <button
            onClick={() => onBuyNow(sim)}
            id={`btn-buy-now-${sim.id}`}
            className="col-span-3 bg-[#0072BC] hover:bg-[#005a96] text-white py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            title="Mua ngay nhận sim trong 15 phút"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Mua Ngay</span>
          </button>

          {/* Nút thêm vào giỏ */}
          <button
            onClick={() => onAddToCart(sim)}
            id={`btn-add-to-cart-${sim.id}`}
            className="col-span-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0072BC] rounded-xl border border-slate-200/80 transition flex items-center justify-center cursor-pointer"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>

          {/* Nút xem chi tiết */}
          <button
            onClick={() => onViewDetail(sim)}
            id={`btn-view-detail-${sim.id}`}
            className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200/80 transition flex items-center justify-center cursor-pointer"
            title="Xem chi tiết phong thủy"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
