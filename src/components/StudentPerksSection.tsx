import React from 'react';
import { 
  GraduationCap, 
  Truck, 
  Gift, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  QrCode, 
  Award,
  Users
} from 'lucide-react';
import { SCHOOL_PERKS } from '../data/studentPackageData';

export const StudentPerksSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200" id="student-perks">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase border border-blue-200">
            <Users className="w-4 h-4 text-blue-600" />
            <span>ĐỒNG HÀNH CÙNG ĐOÀN THANH NIÊN & SINH VIÊN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Đặc Quyền Vàng Dành Riêng Cho Học Sinh - Sinh Viên
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-normal">
            VinaPhone cam kết mang đến dịch vụ viễn thông tốc độ cao, giá rẻ nhất và trải nghiệm nhận SIM thuận tiện nhất cho mùa tựu trường 2026.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Giao Nhanh 15 Phút Tận KTX Cần Thơ</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-normal">
              Đội ngũ shipper VinaPhone Cần Thơ túc trực tại các cụm KTX ĐH Cần Thơ, KTX ĐH Y Dược, ĐH Nam Cần Thơ, FPT, Kỹ thuật - Công nghệ... để giao SIM tận tay sau 15 phút.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs relative overflow-hidden">
            <span className="absolute top-3 right-3 bg-orange-50 text-orange-700 border border-orange-200 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
              Tựu Trường 2026
            </span>
            <div className="w-12 h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Quà Tặng Tựu Trường (Có Hạn)</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-normal">
              Tất cả các gói cước 1T, 3T, 6T, 12T đều được tặng kèm vật phẩm: Mũ bảo hiểm, Áo mưa, Bình nước, Sổ tay hoặc Quạt tích điện mini — <strong>Số lượng có hạn tại TP. Cần Thơ</strong>.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Đăng Ký Chính Chủ 0đ</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-normal">
              Hỗ trợ kích hoạt và đăng ký thông tin chính chủ miễn phí 100% theo CCCD/Thẻ học sinh sinh viên chuẩn quy định Bộ TTTT.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Nhận eSIM Kích Hoạt 3 Phút</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-normal">
              Nhận mã QR eSIM tức thì qua Zalo hoặc SMS, quét mã trực tiếp trên điện thoại để có mạng 4G/5G dùng ngay không cần chờ giao sim vật lý.
            </p>
          </div>

        </div>

        {/* Student Booths / Support Callout */}
        <div className="mt-10 bg-blue-50 text-slate-900 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-blue-200">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-700 font-bold text-xs uppercase">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>ĐIỂM HỖ TRỢ TÂN SINH VIÊN TẠI CÁC TRƯỜNG ĐẠI HỌC TP. CẦN THƠ</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Bạn Cần Hỗ Trợ Đăng Ký Trực Tiếp Tại Trường Ở Cần Thơ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 max-w-xl font-normal">
              Gian hàng VinaPhone hiện diện tại các điểm trường ĐH Cần Thơ (Khu 1, Khu 2, Khu 3), ĐH Y Dược, ĐH Nam Cần Thơ, ĐH FPT, Cao đẳng Cần Thơ trong suốt mùa tựu trường.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://zalo.me/0818006881"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>Tổng Đài / Zalo: 08.1800 6881</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
