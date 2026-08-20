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
    <section className="bg-slate-50 text-slate-900 pt-6 pb-10 sm:pb-12 border-b border-slate-200 relative" id="student-hero">
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-6">
        
        {/* Urgent August Banner */}
        <div className="bg-blue-50 text-slate-900 rounded-2xl p-3.5 sm:p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                  DUY NHẤT THÁNG 8/2026
                </span>
                <span className="text-xs font-bold text-blue-700">
                  Số Lượng Quà Tặng Có Hạn!
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">
                {AUGUST_CAMPAIGN_INFO.giftUrgencyWarning}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-blue-200 text-center shadow-xs">
              <div className="text-[10px] uppercase font-bold text-blue-700">Quà còn lại</div>
              <div className="text-sm sm:text-base font-bold text-blue-900 font-mono">382 / 5.000 suất</div>
            </div>
          </div>
        </div>

        {/* Hero Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Title & Key Value Props */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-bold text-blue-800">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>ĐỒNG HÀNH CÙNG ĐOÀN THANH NIÊN & HSSV TP. CẦN THƠ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Gói Cước Tựu Trường VinaPhone <br className="hidden sm:inline" />
              <span className="text-blue-600">
                TP. Cần Thơ Giảm 50%
              </span>{' '}
              + 100% Quà
            </h1>

            <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Trọn bộ 16 gói cước tối ưu riêng cho Học sinh, Sinh viên các trường <strong>ĐH Cần Thơ, ĐH Y Dược, ĐH Nam Cần Thơ, FPT, Kỹ thuật - Công nghệ, Tây Đô, Cao đẳng...</strong> Giao nhanh tận KTX/Phòng trọ sau 15 phút, tặng Mũ bảo hiểm, Áo mưa, Bình nước, Quạt mini Tháng 8.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('student-packages-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-white" />
                <span>Xem 16 Gói Cước Mùa Tựu Trường</span>
              </button>

              <button
                onClick={onOpenQuickTable}
                className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 rounded-full font-bold text-xs sm:text-sm border border-slate-300 shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Table className="w-4 h-4 text-blue-600" />
                <span>Bảng Tổng Hợp So Sánh</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4 Fast Benefit Highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-blue-600 font-black text-xl sm:text-2xl font-mono">59.000 đ</div>
              <div className="text-xs font-bold text-slate-900">FCLUB 1T Siêu Rẻ</div>
              <div className="text-[10px] text-slate-500">Gói tiết kiệm, 3GB/ngày, gọi 1.500p</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-blue-600 font-black text-xl sm:text-2xl font-mono">8GB / Ngày</div>
              <div className="text-xs font-bold text-slate-900">SODA125 Học Online</div>
              <div className="text-[10px] text-slate-500">Free MyTV, TikTok, YouTube</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-blue-600 font-black text-xl sm:text-2xl font-mono">Cơ Chế 5+1</div>
              <div className="text-xs font-bold text-slate-900">Tặng 1 - 2 Tháng Cước</div>
              <div className="text-[10px] text-slate-500">Áp dụng cho gói 6T & 12T (10+2)</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-blue-600 font-black text-xl sm:text-2xl font-mono">15 Phút</div>
              <div className="text-xs font-bold text-slate-900">Giao Tận Cổng KTX Cần Thơ</div>
              <div className="text-[10px] text-slate-500">Hoặc nhận mã eSIM quét trong 3p</div>
            </div>

          </div>

        </div>

        {/* COMMUNICATION POSITIONING MATRIX */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase">
                <Users className="w-4 h-4" />
                <span>PHÂN LOẠI 4 GÓI CƯỚC CHỦ ĐẠO THEO NHU CẦU</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-slate-900 mt-0.5">
                Chọn Nhanh Gói Phù Hợp Với Bạn (1 Chạm Để Lọc)
              </h3>
            </div>

            <div className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 text-slate-900 border-2 border-blue-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div>
                    {/* Nhu cầu & Gói */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {guide.demand}
                      </span>
                      <span className="font-mono font-bold text-base text-blue-600">
                        {guide.packageFamily}
                      </span>
                    </div>

                    {/* Đối tượng */}
                    <div className="text-xs font-bold mb-1.5 flex items-start gap-1">
                      <span className="text-slate-500">Đối tượng:</span>
                      <span className="text-slate-900 font-bold">
                        {guide.targetAudience}
                      </span>
                    </div>

                    {/* Thông điệp */}
                    <p className={`text-xs italic leading-relaxed p-2.5 rounded-xl mb-3 ${
                      isSelected ? 'bg-white text-slate-700 border border-blue-100' : 'bg-white text-slate-600 border border-slate-200'
                    }`}>
                      "{guide.shortMessage}"
                    </p>
                  </div>

                  {/* Filter action button */}
                  <div className={`pt-2 border-t text-xs font-bold flex items-center justify-between ${
                    isSelected ? 'border-blue-200 text-blue-700' : 'border-slate-200 text-blue-600'
                  }`}>
                    <span>{isSelected ? '✓ Đang lọc gói này' : 'Bấm xem các chu kỳ 1T-12T'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUICK FILTER BAR */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 text-slate-800 space-y-4">
          
          {/* Row 1: Filter by Package Family */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-blue-600" />
                <span>1. Lọc Theo Gói Cước:</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">4 Dòng sản phẩm</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ family: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'ALL'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>Tất Cả Gói (16)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'FCLUB' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'FCLUB'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>FCLUB (Tiết Kiệm)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'YOLO100' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'YOLO100'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>YOLO100 (Mạng Xã Hội)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'SODA125' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'SODA125'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>SODA125 (8GB/Ngày)</span>
              </button>

              <button
                onClick={() => onFilterChange({ family: 'D159V' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  filter.family === 'D159V'
                    ? 'bg-blue-600 text-white shadow-sm'
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
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>2. Lọc Theo Chu Kỳ & Quà Tặng Tháng 8:</span>
              </span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                Giảm 30% - 50%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => onFilterChange({ cycle: 'ALL' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === 'ALL'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất Cả Chu Kỳ
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '1T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '1T'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1 Tháng (-30%) • Móc khóa/Quạt
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '3T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '3T'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3 Tháng (-35%) • Sổ/Mũ/Bình nước
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '6T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '6T'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                6 Tháng (5+1) • Áo mưa/Mũ BH
              </button>

              <button
                onClick={() => onFilterChange({ cycle: '12T' })}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  filter.cycle === '12T'
                    ? 'bg-blue-600 text-white shadow-sm'
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
