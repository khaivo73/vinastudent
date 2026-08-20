import React from 'react';
import { 
  X, 
  Gift, 
  Zap, 
  ShoppingCart, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Flame,
  Users,
  PhoneCall
} from 'lucide-react';
import { STUDENT_PACKAGES, PACKAGE_COMMUNICATION_GUIDE, AUGUST_CAMPAIGN_INFO } from '../data/studentPackageData';
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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden" id="official-packages-table">
      
      {/* Table Header / Title */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-700 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>BẢNG THỐNG NHẤT TRUYỀN THÔNG & GIÁ BÁN KHUYẾN NGHỊ</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white">
            Tổng Hợp 16 Gói Cước Mùa Tựu Trường VinaPhone Cần Thơ
          </h3>
          <p className="text-xs text-cyan-200 mt-0.5">
            Áp dụng cho học sinh, sinh viên các trường Đại học, Cao đẳng tại TP. Cần Thơ
          </p>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ⚠️ URGENT AUGUST LIMITED GIFT NOTICE */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center justify-between gap-3 text-xs text-amber-950 font-bold">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
          <span>
            <strong>LƯU Ý VẬT PHẨM QUÀ TẶNG:</strong> Số lượng vật phẩm quà tặng (Mũ BH, Áo mưa, Bình nước, Quạt...) có hạn và <span className="text-amber-800 underline">CHỈ ÁP DỤNG TRONG THÁNG 8/2026</span>.
          </span>
        </div>
        <span className="shrink-0 bg-amber-400 text-slate-950 text-[10px] px-2.5 py-0.5 rounded-full font-black">
          Chỉ có trong tháng 8
        </span>
      </div>

      {/* 📋 TABLE 1: COMMUNICATION & TARGET AUDIENCE MATRIX */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-sky-600" />
          <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
            1. Bảng Định Hướng Truyền Thông 4 Dòng Gói Cước (Theo Nhu Cầu & Đối Tượng)
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse bg-white rounded-2xl overflow-hidden border border-slate-200 min-w-[650px]">
            <thead>
              <tr className="bg-sky-50 text-sky-700 font-black uppercase text-[11px] border-b border-sky-100">
                <th className="py-2.5 px-3 border-r border-sky-100 w-[18%]">Nhu Cầu</th>
                <th className="py-2.5 px-3 border-r border-sky-100 w-[15%] text-center">Gói Ưu Tiên</th>
                <th className="py-2.5 px-3 border-r border-sky-100 w-[27%]">Đối Tượng</th>
                <th className="py-2.5 px-3 w-[40%]">Thông Điệp Ngắn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {PACKAGE_COMMUNICATION_GUIDE.map((row) => (
                <tr key={row.packageFamily} className="hover:bg-sky-50/50 transition">
                  <td className="py-2.5 px-3 font-bold border-r border-slate-200 text-slate-900">
                    {row.demand}
                  </td>
                  <td className="py-2.5 px-3 font-black font-mono text-center border-r border-slate-200 text-sky-600">
                    {row.packageFamily}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-700">
                    {row.targetAudience}
                  </td>
                  <td className="py-2.5 px-3 italic text-slate-700">
                    {row.shortMessage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📊 TABLE 2: FULL 16-PACKAGE PRICING & GIFT TABLE */}
      <div className="overflow-x-auto">
        <div className="p-4 pb-1 font-black text-xs text-slate-700 flex items-center justify-between">
          <span>2. BẢNG GIÁ KHUYẾN NGHỊ VÀ VẬT PHẨM QUÀ TẶNG (16 GÓI)</span>
          <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">🎁 Quà tặng áp dụng duy nhất trong Tháng 8</span>
        </div>
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-sky-50 text-sky-700 font-black uppercase text-[11px] sm:text-xs border-y border-sky-100">
              <th className="py-3 px-4 border-r border-sky-100">Gói Cước</th>
              <th className="py-3 px-4 border-r border-sky-100 text-center">Chu Kỳ</th>
              <th className="py-3 px-3 border-r border-sky-100 text-center">Ưu Đãi Giá</th>
              <th className="py-3 px-4 border-r border-sky-100 text-right">Giá Bán Khuyến Nghị</th>
              <th className="py-3 px-4 border-r border-sky-100">Vật Phẩm Quà Tặng (Tháng 8)</th>
              <th className="py-3 px-4 text-center">Đăng Ký</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-medium">
            {STUDENT_PACKAGES.map((pkg, idx) => {
              const isGroupStart = idx % 4 === 0;
              return (
                <tr
                  key={pkg.id}
                  className={`hover:bg-sky-50/40 transition group ${
                    isGroupStart ? 'bg-slate-50/70 border-t-2 border-slate-300' : ''
                  }`}
                >
                  {/* Package Code */}
                  <td className="py-3 px-4 border-r border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-slate-900 text-xs sm:text-sm group-hover:text-sky-600">
                        {pkg.code}
                      </span>
                      {pkg.badge && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 bg-teal-50 text-teal-700 border border-teal-200 rounded">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500">{pkg.dataAllowance}</div>
                  </td>

                  {/* Cycle */}
                  <td className="py-3 px-4 border-r border-slate-200 text-center">
                    <span className="font-bold text-slate-800">{pkg.cycle}</span>
                    {pkg.bonusText && (
                      <div className="text-[10px] font-black text-teal-700">{pkg.bonusText}</div>
                    )}
                  </td>

                  {/* Discount */}
                  <td className="py-3 px-3 border-r border-slate-200 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-black text-xs">
                      {pkg.discountPercent}%
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 border-r border-slate-200 text-right">
                    <div className="font-black text-sm sm:text-base text-slate-900">
                      {formatNumberVND(pkg.price)}
                    </div>
                    <div className="text-[10px] text-slate-400 line-through">
                      {formatNumberVND(pkg.originalPrice)}
                    </div>
                  </td>

                  {/* Physical Gift */}
                  <td className="py-3 px-4 border-r border-slate-200">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{pkg.giftText}</span>
                    </div>
                    <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                      ⏳ Duy nhất trong Tháng 8/2026
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-xs shadow-xs transition flex items-center gap-1 cursor-pointer"
                        title="Đăng ký nhận sim 15 phút tại Cần Thơ"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Đăng Ký</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(pkg)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-sky-600 rounded-xl transition cursor-pointer"
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
          <Info className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            Quà tặng được chuyển phát kèm SIM về tận KTX/địa chỉ đăng ký tại Cần Thơ. Số lượng quà có hạn chỉ có trong Tháng 8.
          </span>
        </div>
        <div className="font-bold text-sky-700 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-teal-600" />
          <span>Tổng đài / Zalo Cần Thơ: 08.1800 6881</span>
        </div>
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="table-modal">
        <div className="max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
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
