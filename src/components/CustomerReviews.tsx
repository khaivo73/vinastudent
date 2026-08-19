import React from 'react';
import { Star, CheckCircle2, MessageSquare, Sparkles, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Anh Trần Quốc Bảo',
      role: 'Chủ Doanh Nghiệp Xây Dựng (Hà Nội)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      simPurchased: '0888.68.68.68',
      rating: 5,
      date: 'Vừa đánh giá 2 ngày trước',
      comment:
        'Mua sim số VIP 0888.68.68.68 tại VinaSim Store thực sự rất an tâm. Đúng 15 phút shipper giao tận tay tại Huỳnh Thúc Kháng, hỗ trợ kích hoạt chính chủ qua App VNPT ngay tại chỗ. Rất chuyên nghiệp!',
      verified: true,
    },
    {
      id: 2,
      name: 'Chị Nguyễn Phương Thảo',
      role: 'Giám đốc Marketing (TP. Hồ Chí Minh)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      simPurchased: '0912.888.666',
      rating: 5,
      date: 'Đánh giá 4 ngày trước',
      comment:
        'Mình chọn nhận eSIM qua mã QR, chưa đầy 3 phút sau khi thanh toán là có mã quét trên iPhone dùng luôn. Gói cước YOLO125V tặng kèm data 7GB/ngày vào mạng siêu nhanh.',
      verified: true,
    },
    {
      id: 3,
      name: 'Anh Lê Hoàng Nam',
      role: 'Nhà Đầu Tư Bất Động Sản (Đà Nẵng)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      simPurchased: '0919.79.79.79',
      rating: 5,
      date: 'Đánh giá 1 tuần trước',
      comment:
        'Được chuyên gia phong thủy của shop tư vấn số Thần Tài rất hợp bản mệnh Kim của mình. Giá niêm yết đúng giá gốc, rẻ hơn các bên khác 15-20%. Sẽ giới thiệu cho bạn bè.',
      verified: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F8FB] border-t border-slate-200/80" id="customer-reviews-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0072BC] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Phản Hồi & Đánh Giá Thực Tế</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Khách Hàng Nói Gì Về VinaSim Store
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Hơn 500.000+ khách hàng trên toàn quốc đã tin tưởng và hài lòng với chất lượng dịch vụ
          </p>
        </div>

        {/* Reviews 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-100 group-hover:text-[#0072BC]/20 transition" />
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-5">
                  "{rev.comment}"
                </p>
              </div>

              {/* User Info & Purchased Sim Tag */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#0072BC]/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {rev.name}
                      </h4>
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Đã mua hàng chính chủ" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{rev.role}</p>
                    <div className="mt-1 inline-flex items-center gap-1 bg-blue-50 text-[#0072BC] px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                      <span>Đã mua:</span>
                      <span>{rev.simPurchased}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
