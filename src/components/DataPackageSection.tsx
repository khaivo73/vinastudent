import React from 'react';
import { 
  Wifi, 
  PhoneCall, 
  MessageSquare, 
  Check, 
  Flame, 
  Zap, 
  Gift 
} from 'lucide-react';
import { DATA_PACKAGES } from '../data/simData';
import { formatNumberVND } from '../utils/formatters';
import { DataPackage } from '../types';

interface DataPackageSectionProps {
  onSelectPackage: (pkg: DataPackage) => void;
}

export const DataPackageSection: React.FC<DataPackageSectionProps> = ({
  onSelectPackage,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80" id="data-packages-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0072BC] text-xs font-bold uppercase tracking-wider">
            <Wifi className="w-3.5 h-3.5" />
            <span>Gói Cước 4G/5G VinaPhone Tốc Độ Cao</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Gói Cước Ưu Đãi HOT Nhất Tháng
          </h2>
          <p className="text-sm text-slate-500">
            Đăng ký tích hợp trực tiếp khi mua Sim hoặc nạp cước cho thuê bao VinaPhone hiện tại
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATA_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative bg-white ${
                pkg.isHot
                  ? 'border-[#0072BC] ring-2 ring-[#0072BC]/20 shadow-md'
                  : 'border-slate-200'
              }`}
            >
              {/* Hot badge */}
              {pkg.isHot && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D90429] text-white text-[11px] font-black px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>GÓI BÁN CHẠY NHẤT</span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="text-center pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Mã Cú Pháp: {pkg.code}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 flex items-baseline justify-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#D90429]">
                      {formatNumberVND(pkg.price)}
                    </span>
                    <span className="text-xs text-slate-400">/tháng</span>
                  </div>
                  <span className="text-xs text-slate-400 line-through">
                    Giá gốc: {formatNumberVND(pkg.originalPrice)}
                  </span>
                </div>

                {/* Features list */}
                <div className="py-5 space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue-50 text-[#0072BC] flex items-center justify-center shrink-0 font-bold">
                      <Wifi className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-slate-900">{pkg.dataPerDay}</strong>
                      <p className="text-[11px] text-slate-500">Tốc độ cao không hạ băng thông</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                      <PhoneCall className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="font-medium">{pkg.callInternal}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
                      <PhoneCall className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="font-medium">{pkg.callExternal}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">
                      <Gift className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="font-medium text-[11px] text-purple-700">{pkg.extraBonus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action register button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    pkg.isHot
                      ? 'bg-[#0072BC] hover:bg-[#005a96] text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Đăng Ký Gói Này</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
