import React from 'react';
import { 
  HeartHandshake, 
  Truck, 
  Headphones, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const CommitmentSection: React.FC = () => {
  const commitments = [
    {
      id: 'tam',
      title: 'Kinh Doanh Từ Tâm',
      subtitle: 'Minh bạch - Uy tín trọn đời',
      icon: <HeartHandshake className="w-8 h-8 text-[#0072BC]" />,
      bgColor: 'bg-blue-50/70',
      borderColor: 'border-blue-100',
      points: [
        '100% Sim mới nguyên kit chưa kích hoạt',
        'Giá bán niêm yết công khai, đúng giá gốc VinaPhone',
        'Đăng ký thông tin chính chủ bảo hành vĩnh viễn',
      ],
      badge: 'Cam kết #1',
    },
    {
      id: 'giao-nhanh',
      title: 'Giao Nhanh 15 Phút',
      subtitle: 'Toàn quốc - Hỏa tốc tức thì',
      icon: <Truck className="w-8 h-8 text-[#D90429]" />,
      bgColor: 'bg-red-50/60',
      borderColor: 'border-red-100',
      points: [
        'Mạng lưới shipper & bưu cục tại 63 tỉnh thành',
        'Nhận eSIM quét mã QR kích hoạt trong 3 - 5 phút',
        'Miễn phí vận chuyển toàn quốc cho mọi đơn hàng',
      ],
      badge: 'Tốc độ 15P',
    },
    {
      id: 'ho-tro',
      title: 'Hỗ Trợ 24/7',
      subtitle: 'Tận tình - Chuyên nghiệp',
      icon: <Headphones className="w-8 h-8 text-emerald-600" />,
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-100',
      points: [
        'Tổng đài viên & Kỹ thuật viên túc trực xuyên Lễ Tết',
        'Tư vấn thẩm định Sim Phong Thủy miễn phí 100%',
        'Hỗ trợ đổi trả, đổi eSim nếu phát sinh sự cố',
      ],
      badge: 'Phục vụ 24/7',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white" id="commitment-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0072BC] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cam Kết Dịch Vụ VinaSim Store</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            3 Trụ Cột Cam Kết Vàng
          </h2>
          <p className="text-sm text-slate-500">
            Trải nghiệm mua sắm sim số đẹp và dịch vụ viễn thông VinaPhone an tâm tuyệt đối
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {commitments.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 sm:p-8 border ${item.borderColor} ${item.bgColor} relative flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              id={`commitment-card-${item.id}`}
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 bg-white text-slate-700 rounded-full shadow-xs border border-slate-100">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0072BC] transition">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mb-5">
                  {item.subtitle}
                </p>

                {/* Points checklist */}
                <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                  {item.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-[#0072BC]">
                <span>Đảm bảo 100% chuẩn VinaPhone</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
