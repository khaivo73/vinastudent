import React, { useState } from 'react';
import { 
  Gift, 
  Zap, 
  ShoppingCart, 
  Wifi, 
  PhoneCall, 
  Sparkles, 
  Check, 
  Flame, 
  GraduationCap, 
  Clock, 
  Tag,
  Users,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { StudentPackage } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface StudentPackageGridProps {
  packages: StudentPackage[];
  onSelectPackage: (pkg: StudentPackage, selectedGift?: string) => void;
  onAddToCart: (pkg: StudentPackage, selectedGift?: string) => void;
  onResetFilter: () => void;
}

export const StudentPackageGrid: React.FC<StudentPackageGridProps> = ({
  packages,
  onSelectPackage,
  onAddToCart,
  onResetFilter,
}) => {
  // Local state to track selected gift per package card
  const [selectedGifts, setSelectedGifts] = useState<{ [packageId: string]: string }>({});

  const handleGiftSelect = (pkgId: string, gift: string) => {
    setSelectedGifts((prev) => ({ ...prev, [pkgId]: gift }));
  };

  if (packages.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-xl p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto my-8">
        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900">Không tìm thấy gói cước phù hợp</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Hãy thử đổi từ khóa tìm kiếm hoặc bỏ bộ lọc chu kỳ để xem trọn bộ 16 gói cước sinh viên.
        </p>
        <button
          onClick={onResetFilter}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs"
        >
          Xem Tất Cả 16 Gói Cước
        </button>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-12" id="student-packages-grid">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-1.5 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>DANH SÁCH 16 GÓI CƯỚC MÙA TỰU TRƯỜNG</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bảng Gói Cước Khuyến Nghị VinaPhone Cần Thơ ({packages.length} Gói)
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 mt-0.5 font-normal">
              Tối ưu theo đúng 4 nhóm nhu cầu: Tiết kiệm chi phí, Mạng XH, Data cao học online & Combo Data + Thoại
            </p>
          </div>

          {/* Gift Reminder */}
          <div className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs font-medium shadow-xs">
            <Gift className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <span className="text-orange-600 font-bold">ƯU ĐÃI TỰU TRƯỜNG:</span> Tặng 100% quà hiện vật (Mũ BH, Áo mưa, Quạt mini...)
            </div>
          </div>
        </div>

        {/* 16 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {packages.map((pkg) => {
            const currentSelectedGift = selectedGifts[pkg.id] || pkg.giftOptions[0];

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-500 shadow-xs transition flex flex-col justify-between overflow-hidden relative group"
              >
                
                {/* Top Card Badge / Demand & Discount */}
                <div className="p-5 pb-0">
                  
                  {/* Row: Demand Badge & Discount */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      🎯 {pkg.demand}
                    </span>

                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-md shadow-xs">
                      -{pkg.discountPercent}%
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="border-l-4 border-orange-500 pl-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-800 block">
                        {pkg.familyName}
                      </span>
                      <h3 className="text-xl font-black text-blue-600 font-mono tracking-tight group-hover:text-blue-700 transition">
                        {pkg.code}
                      </h3>
                    </div>

                    {pkg.badge && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Target Audience in Orange */}
                  <div className="mt-2.5 text-xs font-normal text-slate-900 bg-orange-50/60 px-2.5 py-1.5 rounded-lg border border-orange-200 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">
                      <strong className="text-slate-900 font-medium">Đối tượng:</strong>{' '}
                      <span className="text-orange-600 font-semibold">{pkg.targetAudience}</span>
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900 font-mono">
                        {formatNumberVND(pkg.price)}
                      </span>
                      <span className="text-xs text-slate-800 line-through">
                        {formatNumberVND(pkg.originalPrice)}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs font-normal text-slate-800">
                      <span>Chu kỳ: <strong className="text-blue-700">{pkg.cycle}</strong></span>
                      {pkg.bonusText && (
                        <span className="text-orange-600 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                          {pkg.bonusText}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Data & Voice Perks - GB and mechanism in Orange */}
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex items-start gap-2 text-slate-900">
                      <Wifi className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-900 font-medium">Data:</span>{' '}
                        <span className="text-orange-600 font-bold">{pkg.dataAllowance}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-900">
                      <PhoneCall className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-900 font-medium">Ưu đãi:</span>{' '}
                        <span className="text-slate-800">{pkg.voiceAllowance}</span>
                      </div>
                    </div>
                  </div>

                  {/* PHYSICAL GIFT SELECTOR BOX (NO BLUE BORDER ON SELECTION, GIFT MECHANISM IN ORANGE) */}
                  <div className="mt-3.5 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-xs">
                        <Gift className="w-4 h-4 text-orange-500 shrink-0" />
                        <span>QUÀ TẶNG KÈM:</span>
                      </div>
                      <span className="text-[10px] font-normal px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded">
                        Số lượng có hạn
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-orange-600">
                      {pkg.giftText}
                    </div>

                    {/* Radio pills for gift choice - NO BLUE BORDER */}
                    <div className="pt-1 space-y-1">
                      <span className="text-[11px] text-slate-800 font-medium block">
                        Chọn vật phẩm nhận kèm:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.giftOptions.map((opt) => {
                          const isSelected = currentSelectedGift === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleGiftSelect(pkg.id, opt)}
                              className={`text-[11px] px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer border ${
                                isSelected
                                  ? 'border-slate-300 text-slate-900 bg-slate-100 font-medium shadow-xs'
                                  : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 font-normal'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-orange-500 stroke-[3]" />}
                              <span className="truncate max-w-[130px]">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Card Bottom Actions */}
                <div className="p-4 pt-3 border-t border-slate-100 mt-3 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg, currentSelectedGift)}
                    className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span>Đăng Ký Ngay</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(pkg, currentSelectedGift)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-blue-600 rounded-md transition cursor-pointer border border-slate-200"
                    title="Thêm vào giỏ hàng"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
