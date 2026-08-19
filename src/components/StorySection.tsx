import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle, 
  ChevronRight, 
  X, 
  Sparkles, 
  PhoneCall, 
  MapPin 
} from 'lucide-react';

export const StorySection: React.FC = () => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-[#F4F8FB] border-y border-slate-200/70" id="brand-story-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Cột Trái: Hình ảnh đại diện / Minh họa thương hiệu */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Frame */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#005a96] to-[#0072BC] text-white p-6 sm:p-8 relative">
                
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-white/20">
                    <Award className="w-4 h-4" />
                    <span>ĐỐI TÁC CHIẾN LƯỢC VINAPHONE VNPT</span>
                  </div>

                  {/* Card Illustration Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      VinaSim Store
                    </h3>
                    <p className="text-sm text-blue-100 mt-1">
                      Hệ thống phân phối Sim Số Đẹp & Giải pháp Viễn thông số 1
                    </p>
                  </div>

                  {/* Stat Counters */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15">
                      <span className="text-2xl sm:text-3xl font-black text-amber-300">15+ Năm</span>
                      <p className="text-xs text-blue-100 mt-0.5">Uy tín toàn quốc</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-300">500.000+</span>
                      <p className="text-xs text-blue-100 mt-0.5">Khách hàng tin chọn</p>
                    </div>
                  </div>

                  {/* Verified Footer */}
                  <div className="flex items-center gap-3 pt-2 border-t border-white/20 text-xs text-blue-100">
                    <div className="w-7 h-7 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <span>Chứng nhận đại lý cấp 1 bởi VNPT VinaPhone</span>
                  </div>
                </div>

              </div>

              {/* Floating trust badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">100% Sim Mới</h4>
                  <p className="text-[11px] text-slate-500">Đăng ký chính chủ ngay khi bàn giao</p>
                </div>
              </div>

            </div>
          </div>

          {/* Cột Phải: Câu chuyện thương hiệu VinaSim Store & Nút "Xem thêm" */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0072BC] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Về Chúng Tôi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Câu chuyện thương hiệu <br />
              <span className="text-[#0072BC]">VinaSim Store</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Khởi nguồn từ mong muốn mang lại sự minh bạch và giá trị đích thực cho người dùng sim số tại Việt Nam, <strong>VinaSim Store</strong> đã trở thành hệ thống đại lý ủy quyền hàng đầu của nhà mạng VinaPhone. Chúng tôi hiểu rằng, một số điện thoại không chỉ là phương tiện liên lạc, mà còn là <em>thương hiệu cá nhân, tài sản phong thủy</em> mang lại may mắn, tài lộc cho chủ nhân.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0072BC] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Kho số nguyên gốc:</strong> Trực tiếp kết nối hạ tầng kho số VinaPhone, không qua trung gian nâng giá.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0072BC] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Giao nhanh 15 phút:</strong> Liên kết mạng lưới bưu cục và đội ngũ giao hàng công nghệ tại 63 tỉnh thành.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0072BC] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Bảo mật & Đăng ký chính chủ:</strong> Kích hoạt trực tiếp trên hệ thống viễn thông VNPT bảo đảm quyền sở hữu vĩnh viễn.
                </p>
              </div>
            </div>

            {/* Action "Xem Thêm" Button */}
            <div className="pt-3">
              <button
                onClick={() => setIsStoryModalOpen(true)}
                id="brand-story-read-more-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0072BC] hover:bg-[#005a96] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Xem Thêm Câu Chuyện</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Story Detailed Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0072BC] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">VinaSim Store - Câu Chuyện Thương Hiệu</h3>
                <p className="text-xs text-slate-500">Hệ thống đại lý viễn thông chính hãng VinaPhone</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Được thành lập từ những năm đầu của sự bùng nổ công nghệ mạng di động tại Việt Nam, <strong>VinaSim Store</strong> tự hào là đối tác chiến lược cấp 1 của Tổng Công ty Dịch vụ Viễn thông VNPT VinaPhone.
              </p>

              <h4 className="text-base font-bold text-[#0072BC] pt-2">
                1. Sứ mệnh "Kinh doanh từ tâm - Nâng tầm giá trị"
              </h4>
              <p>
                Khác biệt với thị trường sim số trôi nổi, VinaSim cam kết 100% sim bán ra là <strong>Sim Trắng Mới Nguyên Kít</strong>, chưa qua sử dụng, có xuất xứ rõ ràng từ kho số quốc gia của VinaPhone. Khách hàng được đăng ký thông tin chính chủ trực tiếp qua hệ thống VinaPhone trước khi nhận sim.
              </p>

              <h4 className="text-base font-bold text-[#0072BC] pt-2">
                2. Hạ tầng giao nhận 15 phút & Kích hoạt eSIM siêu tốc
              </h4>
              <p>
                Nhờ vào mạng lưới hơn 500 điểm phân phối vệ tinh tại Hà Nội, Đà Nẵng, TP. Hồ Chí Minh và 60 tỉnh thành, chúng tôi đáp ứng giao nhận tận tay chỉ trong 15 - 30 phút. Với khách hàng chọn định dạng eSIM, mã QR được khởi tạo và gửi tự động qua Zalo/Email trong vòng 3 phút.
              </p>

              <h4 className="text-base font-bold text-[#0072BC] pt-2">
                3. Đội ngũ chuyên gia Phong Thủy & Tư Vấn Sim
              </h4>
              <p>
                Chúng tôi cung cấp công cụ thẩm định phong thủy sim số dựa trên Kinh Dịch, Ngũ Hành và Cửu Tinh Đồ Pháp, giúp quý khách chọn được con số tương sinh tương hợp với mệnh cách cá nhân và doanh nghiệp.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-[#0072BC] text-white text-sm font-bold hover:bg-[#005a96] transition"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
