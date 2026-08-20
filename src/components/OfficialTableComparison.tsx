import React from 'react';
import { 
  X, 
  Gift, 
  Zap, 
  ShoppingCart, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Flame,
  PhoneCall
} from 'lucide-react';
import { STUDENT_PACKAGES } from '../data/studentPackageData';
import { StudentPackage } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface OfficialTableComparisonProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectPackage: (pkg: StudentPackage) => void;
  onAddToCart: (pkg: StudentPackage) => void;
  isModal?: boolean;
}

export const OfficialTableComparison: React.FC<OfficialTableComparisonProps> = ({
  isOpen = true,
  onClose,
  onSelectPackage,
  onAddToCart,
  isModal = false,
}) => {
  if (isModal && !isOpen) return null;

  const content = (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="official-packages-table">
      
      {/* Table Header / Title */}
      <div className="bg-white border-b border-slate-200 p-5 sm:p-6 flex items-center justify-between text-slate-900">
        <div>
          <h3 className="text-lg sm:text-2xl font-black text-slate-900">
            Bảng Giá Khuyến Nghị & Quà Tặng 16 Gói Cước Mùa Tựu Trường
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Áp dụng cho học sinh, sinh viên các trường Đại học, Cao đẳng tại TP. Cần Thơ
          </p>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* FULL 16-PACKAGE PRICING & GIFT TABLE */}
      <div className="overflow-x-auto">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-between">
          <span className="uppercase text-slate-900 tracking-wide">Chi Tiết Giá & Quà Tặng Kèm Theo Từng Chu Kỳ</span>
          <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md font-semibold">🎁 Quà tặng áp dụng trong Tháng 8</span>
        </div>
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold uppercase text-[11px] sm:text-xs border-y border-slate-200">
              <th className="py-3 px-4 border-r border-slate-200">Gói Cước</th>
              <th className="py-3 px-4 border-r border-slate-200 text-center">Chu Kỳ</th>
              <th className="py-3 px-3 border-r border-slate-200 text-center">Ưu Đãi Giá</th>
              <th className="py-3 px-4 border-r border-slate-200 text-right">Giá Bán Khuyến Nghị</th>
              <th className="py-3 px-4 border-r border-slate-200">Vật Phẩm Quà Tặng (Tháng 8)</th>
              <th className="py-3 px-4 text-center">Đăng Ký</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {STUDENT_PACKAGES.map((pkg, idx) => {
              const isGroupStart = idx % 4 === 0;
              return (
                <tr
                  key={pkg.id}
                  className={`hover:bg-slate-50 transition group ${
                    isGroupStart ? 'bg-slate-50/70 border-t-2 border-slate-300' : ''
                  }`}
                >
                  {/* Package Code */}
                  <td className="py-3 px-4 border-r border-slate-200">
                    <div className="border-l-4 border-orange-500 pl-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-blue-600 text-xs sm:text-sm group-hover:text-blue-700">
                          {pkg.code}
                        </span>
                        {pkg.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">{pkg.dataAllowance}</div>
                    </div>
                  </td>

                  {/* Cycle */}
                  <td className="py-3 px-4 border-r border-slate-200 text-center">
                    <span className="font-bold text-slate-800">{pkg.cycle}</span>
                    {pkg.bonusText && (
                      <div className="text-[10px] font-bold text-orange-600">{pkg.bonusText}</div>
                    )}
                  </td>

                  {/* Discount */}
                  <td className="py-3 px-3 border-r border-slate-200 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs">
                      {pkg.discountPercent}%
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 border-r border-slate-200 text-right">
                    <div className="font-bold text-sm sm:text-base text-slate-900 font-mono">
                      {formatNumberVND(pkg.price)}
                    </div>
                    <div className="text-[10px] text-slate-400 line-through">
                      {formatNumberVND(pkg.originalPrice)}
                    </div>
                  </td>

                  {/* Physical Gift */}
                  <td className="py-3 px-4 border-r border-slate-200">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Gift className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{pkg.giftText}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      Duy nhất trong Tháng 8/2026
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition flex items-center gap-1 cursor-pointer shadow-xs"
                        title="Đăng ký nhận sim 15 phút tại Cần Thơ"
                      >
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <span>Đăng Ký</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(pkg)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 rounded-lg transition cursor-pointer border border-slate-200"
                        title="Thêm vào giỏ hàng"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Quà tặng được chuyển phát kèm SIM về tận KTX/địa chỉ đăng ký tại Cần Thơ. Số lượng quà có hạn chỉ có trong Tháng 8.
          </span>
        </div>
        <div className="font-bold text-blue-700 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-blue-600" />
          <span>Tổng đài / Zalo Cần Thơ: 08.1800 6881</span>
        </div>
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="table-modal">
        <div className="max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-slate-50 border-t border-slate-200" id="official-table-section">
      <div className="max-w-7xl mx-auto px-4">
        {content}
      </div>
    </section>
  );
};
