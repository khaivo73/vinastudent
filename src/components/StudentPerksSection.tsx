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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0072BC] text-xs font-bold uppercase">
            <Users className="w-4 h-4 text-[#0072BC]" />
            <span>ĐỒNG HÀNH CÙNG ĐOÀN THANH NIÊN & SINH VIÊN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Đặc Quyền Vàng Dành Riêng Cho Học Sinh - Sinh Viên
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            VinaPhone cam kết mang đến dịch vụ viễn thông tốc độ cao, giá rẻ nhất và trải nghiệm nhận SIM thuận tiện nhất cho mùa tựu trường 2026.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-gradient-to-br from-blue-50/80 to-white p-6 rounded-3xl border border-blue-100 space-y-3 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-[#0072BC] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Giao Nhanh 15 Phút Tận KTX Cần Thơ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đội ngũ shipper VinaPhone Cần Thơ túc trực tại các cụm KTX ĐH Cần Thơ, KTX ĐH Y Dược, ĐH Nam Cần Thơ, FPT, Kỹ thuật - Công nghệ... để giao SIM tận tay sau 15 phút.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/80 to-white p-6 rounded-3xl border border-amber-200 space-y-3 hover:shadow-lg transition relative overflow-hidden">
            <span className="absolute top-3 right-3 bg-red-100 text-[#D90429] text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
              Tháng 8/2026
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#D90429] text-white flex items-center justify-center shadow-md shadow-red-500/20">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Quà Tặng Tháng 8 (Có Hạn)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tất cả các gói cước 1T, 3T, 6T, 12T đều được tặng kèm vật phẩm: Mũ bảo hiểm, Áo mưa, Bình nước, Sổ tay hoặc Quạt tích điện mini — <strong>Số lượng có hạn, áp dụng duy nhất trong Tháng 8/2026 tại TP. Cần Thơ</strong>.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50/80 to-white p-6 rounded-3xl border border-emerald-100 space-y-3 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Đăng Ký Chính Chủ 0đ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hỗ trợ kích hoạt và đăng ký thông tin chính chủ miễn phí 100% theo CCCD/Thẻ học sinh sinh viên chuẩn quy định Bộ TTTT.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50/80 to-white p-6 rounded-3xl border border-purple-100 space-y-3 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Nhận eSIM Kích Hoạt 3 Phút</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nhận mã QR eSIM tức thì qua Zalo hoặc SMS, quét mã trực tiếp trên điện thoại để có mạng 4G/5G dùng ngay không cần chờ giao sim vật lý.
            </p>
          </div>

        </div>

        {/* Student Booths / Support Callout */}
        <div className="mt-10 bg-gradient-to-r from-[#005a96] to-[#0072BC] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-300 font-bold text-xs uppercase">
              <GraduationCap className="w-5 h-5" />
              <span>ĐIỂM HỖ TRỢ TÂN SINH VIÊN TẠI CÁC TRƯỜNG ĐẠI HỌC TP. CẦN THƠ</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Bạn Cần Hỗ Trợ Đăng Ký Trực Tiếp Tại Trường Ở Cần Thơ?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Gian hàng VinaPhone hiện diện tại các điểm trường ĐH Cần Thơ (Khu 1, Khu 2, Khu 3), ĐH Y Dược, ĐH Nam Cần Thơ, ĐH FPT, Cao đẳng Cần Thơ trong suốt mùa tựu trường tháng 8.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://zalo.me/0818006881"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm rounded-full shadow-lg transition flex items-center gap-2 cursor-pointer"
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
