import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  Heart 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b2b40] text-white pt-12 sm:pt-16 pb-8 border-t-4 border-[#0072BC]" id="vinasim-footer">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-700/80">
          
          {/* Brand Info & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0072BC] flex items-center justify-center text-white font-black text-xl shadow-md">
                V
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-white">Vina</span>
                  <span className="text-2xl font-black text-blue-300">Sim</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-[#0072BC] text-white rounded">Store</span>
                </div>
                <span className="text-xs text-slate-300">Hệ Thống Phân Phối Sim Số Đẹp VinaPhone</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              VinaSim Store là đại lý phân phối cấp 1 chính thức của VNPT VinaPhone. Chuyên cung cấp Sim Số Đẹp, Sim Tam Hoa, Sim Tứ Quý, Sim Lộc Phát, Sim Thần Tài, Sim Data 4G/5G và các gói cước viễn thông chính hãng trên toàn quốc.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tổng đài CSKH: <strong className="text-white font-bold">1800 1091 (Miễn phí)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline Mua Sim: <strong className="text-yellow-300 font-bold">0912.888.999 - 0888.68.68.68</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Email: <span className="text-white">cskh@vinasimstore.vn</span></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-3 border-[#0072BC] pl-2.5">
              Danh Mục Sim
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim Tam Hoa VIP</a></li>
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim Lộc Phát 68 - 86</a></li>
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim Thần Tài 39 - 79</a></li>
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim Tứ Quý Đại Gia</a></li>
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim Đầu Số Cổ 091</a></li>
              <li><a href="#product-catalog-section" className="hover:text-yellow-300 transition">Sim 5G Data Khủng</a></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-3 border-[#0072BC] pl-2.5">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Chính sách giao sim hỏa tốc 15 phút</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Hướng dẫn đăng ký chính chủ VinaPhone</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Chính sách bảo hành quyền sở hữu trọn đời</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Bảo mật thông tin khách hàng 100%</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0072BC]"></span>
                <span>Quy trình cấp mã QR eSIM nhanh</span>
              </li>
            </ul>
          </div>

          {/* Branches & Certification */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-3 border-[#0072BC] pl-2.5">
              Hệ Thống Điểm Giao Dịch
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Hà Nội:</strong> 57 Huỳnh Thúc Kháng, Đống Đa & Tòa nhà VNPT VinaPhone.</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Đà Nẵng:</strong> 271 Nguyễn Văn Linh, Q. Thanh Khê.</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>TP. Hồ Chí Minh:</strong> 121 Pasteur, Phường Võ Thị Sáu, Quận 3.</span>
              </div>
            </div>

            {/* Certifications Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-bold text-blue-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>VinaSim Store</strong>. Toàn bộ bản quyền thuộc Tổng Công ty Dịch vụ Viễn thông VNPT VinaPhone.
          </div>

          {/* Payment methods icons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 mr-1 font-medium">Chấp nhận thanh toán:</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">VNPay QR</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">VietQR</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">MoMo</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
