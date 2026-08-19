import React from 'react';
import { GraduationCap, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const StudentFooter: React.FC = () => {
  return (
    <footer className="bg-[#0c2438] text-white pt-12 pb-8 border-t-4 border-[#0072BC]" id="student-footer">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-700/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0072BC] flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black text-white">Vina</span>
                  <span className="text-xl font-black text-[#D90429]">Student</span>
                  <span className="text-[10px] bg-yellow-400 text-slate-900 font-bold px-1.5 py-0.2 rounded ml-1">
                    2026
                  </span>
                </div>
                <p className="text-xs text-blue-200">Chương Trình Ưu Đãi Mùa Tựu Trường VinaPhone</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Chương trình viễn thông học đường chính thức của Tổng Công ty Dịch vụ Viễn thông VNPT VinaPhone, đồng hành cùng <strong>Đoàn TNCS Hồ Chí Minh & Hội Sinh Viên Việt Nam</strong>, mang lại data 5G siêu tốc và các vật phẩm mùa tựu trường cho thế hệ trẻ.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tổng đài / Zalo Cần Thơ: <strong className="text-white">08.1800 6881 (Hỗ trợ 24/7)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>Khu vực phục vụ: <span className="text-white">Chỉ phục vụ khu vực TP. Cần Thơ</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Email hỗ trợ: <span className="text-white">sinhviencantho@vinaphone.vn</span></span>
              </div>
            </div>
          </div>

          {/* Col 2: 4 Main Package Families */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-3 border-[#0072BC] pl-2.5">
              4 Dòng Gói Cước Chính
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <strong className="text-white">Gói FCLUB:</strong> 3GB/ngày + 1.500p gọi (Từ 59k/tháng)
              </li>
              <li>
                <strong className="text-white">Gói YOLO100:</strong> 1GB/ngày 5G tốc độ cao (Từ 69k/tháng)
              </li>
              <li>
                <strong className="text-white">Gói SODA125:</strong> 8GB/ngày + Free TikTok/YouTube & MyTV (Từ 89k)
              </li>
              <li>
                <strong className="text-white">Gói D159V:</strong> 6GB/ngày + 1.700p gọi + SMS + MyTV (Từ 109k)
              </li>
            </ul>
            <div className="pt-1 text-[11px] text-amber-300 font-semibold">
              * Quà tặng vật phẩm số lượng có hạn, áp dụng duy nhất trong Tháng 8/2026.
            </div>
          </div>

          {/* Col 3: Student Support & Dormitory Delivery */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-3 border-[#0072BC] pl-2.5">
              Cam Kết Phục Vụ Sinh Viên
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Giao SIM tận KTX / phòng trọ / cổng trường 15 phút</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Tặng 100% quà: Mũ bảo hiểm, Áo mưa, Bình nước, Quạt</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Đăng ký thông tin chính chủ 0đ theo CCCD</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Bảo hành tốc độ mạng 4G/5G VinaPhone trọn đời</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-bold text-blue-200 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CHÍNH HÃNG VNPT VINAPHONE TOÀN QUỐC</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>VinaStudent</strong> • Chương trình Mùa Tựu Trường VNPT VinaPhone.
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Thanh toán tiện lợi:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold">VietQR</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold">MoMo</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold">VNPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white font-bold">COD KTX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
