import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Gift, 
  Table, 
  Clock, 
  CheckCircle, 
  Percent, 
  GraduationCap, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Users,
  Wifi,
  Smartphone,
  PhoneCall
} from 'lucide-react';
import { QuickFilterState, PackageFamily, CycleFilter, DemandType } from '../types';
import { AUGUST_CAMPAIGN_INFO, PACKAGE_COMMUNICATION_GUIDE } from '../data/studentPackageData';

interface StudentHeroBannerProps {
  filter: QuickFilterState;
  onFilterChange: (newFilter: Partial<QuickFilterState>) => void;
  onOpenQuickTable: () => void;
}

export const StudentHeroBanner: React.FC<StudentHeroBannerProps> = ({
  filter,
  onFilterChange,
  onOpenQuickTable,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#0072BC] via-[#005a96] to-[#0c2438] text-white pt-6 pb-10 sm:pb-14 relative overflow-hidden" id="student-hero">
      
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ⚠️ CRITICAL URGENT AUGUST BANNER: QUÀ TẶNG CÓ HẠN DUY NHẤT TRONG THÁNG 8 */}
        <div className="mb-6 bg-gradient-to-r from-red-600 via-[#D90429] to-red-700 text-white rounded-2xl p-3 sm:p-4 shadow-xl border-2 border-yellow-300 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-900 flex items-center justify-center font-black shrink-0 shadow-md">
              <Gift className="w-6 h-6 text-red-600 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  ⚠️ CHỈ TRONG THÁNG 8/2026
                </span>
                <span className="text-xs font-bold text-yellow-200">
                  Số Lượng Vật Phẩm Quà Tặng Có Hạn!
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {AUGUST_CAMPAIGN_INFO.giftUrgencyWarning}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/20 text-center">
              <div className="text-[10px] uppercase font-bold text-yellow-300">Quà còn lại</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">382 / 5.000 suất</div>
            </div>
          </div>
        </div>

        {/* Hero Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Left Column: Title & Key Value Props */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-yellow-300">
              <GraduationCap className="w-4 h-4" />
              <span>ĐỒNG HÀNH CÙNG ĐOÀN THANH NIÊN & HSSV TP. CẦN THƠ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Gói Cước Tựu Trường VinaPhone <br className="hidden sm:inline" />
              <span className="text-yellow-400 underline decoration-red-500 decoration-wavy">
                TP. Cần Thơ Giảm 50%
              </span>{' '}
              + Tặng 100% Quà
            </h1>

            <p className="text-xs sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Trọn bộ 16 gói cước chuyên biệt cho Học sinh, Sinh viên và Đoàn viên các trường <strong>ĐH Cần Thơ, ĐH Y Dược, ĐH Nam Cần Thơ, FPT, Kỹ thuật - Công nghệ, Tây Đô, CĐ Cần Thơ...</strong>: <strong>FCLUB, YOLO100, SODA125, D159V</strong>. Tặng kèm Mũ bảo hiểm, Áo mưa, Bình nước, Quạt tích điện — <em>Chỉ áp dụng duy nhất trong Tháng 8/2026 tại TP. Cần Thơ</em>.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('student-packages-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#D90429] hover:bg-[#b80323] text-white rounded-full font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Flame className="w-4 h-4 text-yellow-300" />
                <span>Xem 16 Gói Cước Mùa Tựu Trường</span>
              </button>

              <button
                onClick={onOpenQuickTable}
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-full font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Table className="w-4 h-4 text-yellow-300" />
                <span>Bảng Giá Khuyến Nghị Chính Thức</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4 Fast Benefit Highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-yellow-300 font-black text-xl sm:text-2xl">59.000 đ</div>
              <div className="text-xs font-bold text-white">FCLUB 1T Siêu Rẻ</div>
              <div className="text-[10px] text-blue-200">Gói tiết kiệm, 3GB/ngày, gọi 1.500p</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-yellow-300 font-black text-xl sm:text-2xl">8GB / Ngày</div>
              <div className="text-xs font-bold text-white">SODA125 Học Online</div>
              <div className="text-[10px] text-blue-200">Free MyTV, TikTok, YouTube</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-yellow-300 font-black text-xl sm:text-2xl">Cơ Chế 5+1</div>
              <div className="text-xs font-bold text-white">Tặng 1 - 2 Tháng Cước</div>
              <div className="text-[10px] text-blue-200">Áp dụng cho gói 6T & 12T (10+2)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-emerald-300 font-black text-xl sm:text-2xl">15 Phút</div>
              <div className="text-xs font-bold text-white">Giao Tận Cổng KTX</div>
              <div className="text-[10px] text-blue-200">Hoặc nhận mã eSIM quét trong 3p</div>
            </div>

          </div>

        </div>

        {/* 📊 COMMUNICATION POSITIONING MATRIX (CHUẨN 100% THEO HÌNH ẢNH YÊU CẦU) */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 text-yellow-300 text-xs font-black uppercase">
                <Users className="w-4 h-4" />
                <span>ĐỊNH HƯỚNG TRUYỀN THÔNG 4 GÓI CƯỚC CHỦ ĐẠO THEO NHU CẦU</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white mt-0.5">
                Chọn Gói Cước Theo Đúng Nhu Cầu Của Bạn
              </h3>
            </div>

            <div className="text-xs font-bold text-blue-200 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 inline-flex items-center gap-1.5 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Bấm vào thẻ nhu cầu để lọc ngay</span>
            </div>
          </div>

          {/* 4 Cards representing the Table from the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {PACKAGE_COMMUNICATION_GUIDE.map((guide) => {
              const isSelected = filter.family === guide.packageFamily;
              return (
                <div
                  key={guide.packageFamily}
                  onClick={() => onFilterChange({ family: guide.packageFamily as PackageFamily })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white text-slate-900 border-yellow-400 shadow-xl scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                >
                  <div>
                    {/* Nhu cầu & Gói */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#0072BC] text-white' : 'bg-white/20 text-yellow-300'
                      }`}>
                        {guide.demand}
                      </span>
                      <span className="font-mono font-black text-base text-[#D90429]">
                        {guide.packageFamily}
                      </span>
                    </div>

                    {/* Đối tượng */}
                    <div className="text-xs font-bold mb-1.5 flex items-start gap-1">
                      <span className={isSelected ? 'text-slate-500' : 'text-blue-200'}>Đối tượng:</span>
                      <span className={isSelected ? 'text-slate-900' : 'text-white'}>
                        {guide.targetAudience}
                      </span>
                    </div>

                    {/* Thông điệp ngắn chuẩn theo hình */}
                    <p className={`text-xs italic leading-relaxed p-2 rounded-xl mb-3 ${
                      isSelected ? 'bg-slate-100 text-slate-700' : 'bg-black/20 text-blue-100'
                    }`}>
                      "{guide.shortMessage}"
                    </p>
                  </div>

                  {/* Filter action button */}
                  <div className={`pt-2 border-t text-xs font-bold flex items-center justify-between ${
                    isSelected ? 'border-slate-200 text-[#0072BC]' : 'border-white/10 text-yellow-300'
                  }`}>
                    <span>{isSelected ? '✓ Đang xem gói này' : 'Xem các chu kỳ 1T-12T'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🎛️ COMPREHENSIVE FILTER CONTROL BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
          
          {/* Row 1: Filter by Package Family */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#0072BC]" />
                <span>1. Lọc Theo Gói Cước:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">4 Dòng sản phẩm</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ family: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'ALL'
                    ? 'bg-[#0072BC] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Tất Cả Gói (16)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'FCLUB' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'FCLUB'
                    ? 'bg-[#0072BC] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>FCLUB (Tiết Kiệm)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'YOLO100' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'YOLO100'
                    ? 'bg-[#0072BC] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>YOLO100 (Mạng Xã Hội)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'SODA125' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'SODA125'
                    ? 'bg-[#0072BC] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>SODA125 (8GB/Ngày)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'D159V' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'D159V'
                    ? 'bg-[#0072BC] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>D159V (Data + Thoại)</span>
              </button>
            </div>
          </div>

          {/* Row 2: Filter by Cycle */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D90429]" />
                <span>2. Lọc Theo Chu Kỳ & Quà Tặng:</span>
              </span>
              <span className="text-[11px] font-bold text-[#D90429]">Giảm 30% - 50%</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ cycle: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === 'ALL'
                    ? 'bg-[#D90429] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất Cả Chu Kỳ
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '1T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '1T'
                    ? 'bg-[#D90429] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1 Tháng (-30%) • Móc khóa/Quạt
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '3T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '3T'
                    ? 'bg-[#D90429] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3 Tháng (-35%) • Sổ/Mũ/Bình nước
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '6T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '6T'
                    ? 'bg-[#D90429] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                6 Tháng (5+1) • Áo mưa/Mũ BH
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '12T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '12T'
                    ? 'bg-[#D90429] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                12 Tháng (10+2) • Quạt điện/Bình cao cấp
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
