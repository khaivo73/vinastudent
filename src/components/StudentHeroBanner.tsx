import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Gift, 
  Table, 
  Clock, 
  GraduationCap, 
  ChevronRight,
  Users,
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { QuickFilterState, PackageFamily, CycleFilter } from '../types';
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
    <section className="bg-gradient-to-b from-sky-600 via-blue-700 to-slate-900 text-white pt-6 pb-10 sm:pb-12 relative overflow-hidden" id="student-hero">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-6">
        
        {/* ⚠️ URGENT AUGUST BANNER: QUÀ TẶNG CÓ HẠN DUY NHẤT TRONG THÁNG 8 (NO RED - SỬ DỤNG AMBER & CYAN GOLD) */}
        <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-3.5 sm:p-4 shadow-xl border border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
              <Gift className="w-5 h-5 text-slate-950 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  DUY NHẤT THÁNG 8/2026
                </span>
                <span className="text-xs font-bold text-amber-200">
                  Số Lượng Quà Tặng Có Hạn!
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5">
                {AUGUST_CAMPAIGN_INFO.giftUrgencyWarning}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/20 text-center">
              <div className="text-[10px] uppercase font-bold text-amber-300">Quà còn lại</div>
              <div className="text-sm sm:text-base font-black text-white font-mono">382 / 5.000 suất</div>
            </div>
          </div>
        </div>

        {/* Hero Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Title & Key Value Props */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-cyan-200">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>ĐỒNG HÀNH CÙNG ĐOÀN THANH NIÊN & HSSV TP. CẦN THƠ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Gói Cước Tựu Trường VinaPhone <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-200 to-teal-200">
                TP. Cần Thơ Giảm 50%
              </span>{' '}
              + 100% Quà
            </h1>

            <p className="text-xs sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Trọn bộ 16 gói cước tối ưu riêng cho Học sinh, Sinh viên các trường <strong>ĐH Cần Thơ, ĐH Y Dược, ĐH Nam Cần Thơ, FPT, Kỹ thuật - Công nghệ, Tây Đô, Cao đẳng...</strong> Giao nhanh tận KTX/Phòng trọ sau 15 phút, tặng Mũ bảo hiểm, Áo mưa, Bình nước, Quạt mini Tháng 8.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('student-packages-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 rounded-full font-black text-xs sm:text-sm shadow-lg shadow-amber-400/25 transition flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Flame className="w-4 h-4 text-slate-950" />
                <span>Xem 16 Gói Cước Mùa Tựu Trường</span>
              </button>

              <button
                onClick={onOpenQuickTable}
                className="px-5 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-full font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Table className="w-4 h-4 text-cyan-300" />
                <span>Bảng Tổng Hợp So Sánh</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4 Fast Benefit Highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-amber-300 font-black text-xl sm:text-2xl">59.000 đ</div>
              <div className="text-xs font-bold text-white">FCLUB 1T Siêu Rẻ</div>
              <div className="text-[10px] text-blue-200">Gói tiết kiệm, 3GB/ngày, gọi 1.500p</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-cyan-300 font-black text-xl sm:text-2xl">8GB / Ngày</div>
              <div className="text-xs font-bold text-white">SODA125 Học Online</div>
              <div className="text-[10px] text-blue-200">Free MyTV, TikTok, YouTube</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-teal-300 font-black text-xl sm:text-2xl">Cơ Chế 5+1</div>
              <div className="text-xs font-bold text-white">Tặng 1 - 2 Tháng Cước</div>
              <div className="text-[10px] text-blue-200">Áp dụng cho gói 6T & 12T (10+2)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
              <div className="text-emerald-300 font-black text-xl sm:text-2xl">15 Phút</div>
              <div className="text-xs font-bold text-white">Giao Tận Cổng KTX Cần Thơ</div>
              <div className="text-[10px] text-blue-200">Hoặc nhận mã eSIM quét trong 3p</div>
            </div>

          </div>

        </div>

        {/* 📊 COMMUNICATION POSITIONING MATRIX (4 NHU CẦU CHỦ ĐẠO 1-CHẠM) */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase">
                <Users className="w-4 h-4" />
                <span>PHÂN LOẠI 4 GÓI CƯỚC CHỦ ĐẠO THEO NHU CẦU</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white mt-0.5">
                Chọn Nhanh Gói Phù Hợp Với Bạn (1 Chạm Để Lọc)
              </h3>
            </div>

            <div className="text-xs font-bold text-cyan-200 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 inline-flex items-center gap-1.5 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm thẻ để lọc danh sách</span>
            </div>
          </div>

          {/* 4 Cards representing the Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {PACKAGE_COMMUNICATION_GUIDE.map((guide) => {
              const isSelected = filter.family === guide.packageFamily;
              return (
                <div
                  key={guide.packageFamily}
                  onClick={() => onFilterChange({ family: isSelected ? 'ALL' : (guide.packageFamily as PackageFamily) })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white text-slate-900 border-cyan-400 shadow-2xl scale-[1.02] ring-2 ring-cyan-400/50'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                >
                  <div>
                    {/* Nhu cầu & Gói */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-white/20 text-cyan-200'
                      }`}>
                        {guide.demand}
                      </span>
                      <span className="font-mono font-black text-base text-sky-600">
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

                    {/* Thông điệp */}
                    <p className={`text-xs italic leading-relaxed p-2.5 rounded-xl mb-3 ${
                      isSelected ? 'bg-sky-50 text-slate-700 border border-sky-100' : 'bg-black/20 text-blue-100'
                    }`}>
                      "{guide.shortMessage}"
                    </p>
                  </div>

                  {/* Filter action button */}
                  <div className={`pt-2 border-t text-xs font-bold flex items-center justify-between ${
                    isSelected ? 'border-slate-200 text-sky-600' : 'border-white/10 text-amber-300'
                  }`}>
                    <span>{isSelected ? '✓ Đang lọc gói này' : 'Bấm xem các chu kỳ 1T-12T'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🎛️ COMPREHENSIVE QUICK FILTER BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-800 space-y-4">
          
          {/* Row 1: Filter by Package Family */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-sky-600" />
                <span>1. Lọc Theo Gói Cước:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">4 Dòng sản phẩm</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ family: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'ALL'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Tất Cả Gói (16)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'FCLUB' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'FCLUB'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>FCLUB (Tiết Kiệm)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'YOLO100' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'YOLO100'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>YOLO100 (Mạng Xã Hội)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'SODA125' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'SODA125'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>SODA125 (8GB/Ngày)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'D159V' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'D159V'
                    ? 'bg-indigo-600 text-white shadow-md'
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
                <Clock className="w-4 h-4 text-teal-600" />
                <span>2. Lọc Theo Chu Kỳ & Quà Tặng Tháng 8:</span>
              </span>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                Giảm 30% - 50%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ cycle: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === 'ALL'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất Cả Chu Kỳ
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '1T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '1T'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1 Tháng (-30%) • Móc khóa/Quạt
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '3T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '3T'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3 Tháng (-35%) • Sổ/Mũ/Bình nước
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '6T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '6T'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                6 Tháng (5+1) • Áo mưa/Mũ BH
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '12T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '12T'
                    ? 'bg-teal-600 text-white shadow-md'
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
