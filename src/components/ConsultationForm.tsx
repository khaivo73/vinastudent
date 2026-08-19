import React, { useState } from 'react';
import { Sparkles, Compass, Send, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';

export const ConsultationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [element, setElement] = useState('all');
  const [budget, setBudget] = useState('1m-3m');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#005a96] via-[#0072BC] to-[#004e82] text-white relative overflow-hidden" id="consultation-section">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-white/20">
              <Compass className="w-4 h-4" />
              <span>DỊCH VỤ TÌM SIM THEO YÊU CẦU & PHONG THỦY MIỄN PHÍ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Bạn Chưa Tìm Được Số Sim Ưng Ý? <br />
              <span className="text-yellow-300">Để Chuyên Gia VinaSim Tìm Giúp Bạn</span>
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Chỉ cần để lại năm sinh, bản mệnh hoặc đuôi số mong muốn, chuyên viên phong thủy VinaPhone sẽ liên hệ gửi danh sách <strong>5 - 10 số sim đẹp nhất</strong> kèm bảng phân tích quẻ dịch hoàn toàn miễn phí.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Phản hồi trong 3 phút</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Tư vấn phong thủy 100% Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Báo giá gốc không kênh giá</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Cảm ơn <strong>{name}</strong>. Chuyên gia tư vấn sim số VinaPhone sẽ gọi tới số <strong>{phone}</strong> trong vòng 3 phút tới để gửi danh sách số sim phù hợp nhất!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 bg-[#0072BC] text-white rounded-full text-xs font-bold hover:bg-[#005a96] transition"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#0072BC]" />
                      <span>Đăng Ký Nhận Tư Vấn Chọn Sim</span>
                    </h3>
                    <span className="text-[11px] font-bold text-[#D90429] bg-red-50 px-2 py-0.5 rounded-full">
                      Miễn phí 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Họ và tên quý khách *:
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Hoàng Minh"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-[#0072BC] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Số điện thoại nhận tư vấn *:
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="VD: 0912345678"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-[#0072BC] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Năm sinh (tùy chọn):
                      </label>
                      <input
                        type="text"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        placeholder="VD: 1988, 1995"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Bản mệnh:
                      </label>
                      <select
                        value={element}
                        onChange={(e) => setElement(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                      >
                        <option value="all">Chưa rõ / Tư vấn giúp</option>
                        <option value="kim">Mệnh Kim</option>
                        <option value="moc">Mệnh Mộc</option>
                        <option value="thuy">Mệnh Thủy</option>
                        <option value="hoa">Mệnh Hỏa</option>
                        <option value="tho">Mệnh Thổ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Ngân sách dự kiến:
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                      >
                        <option value="under-1m">Dưới 1 triệu</option>
                        <option value="1m-3m">1 - 3 triệu</option>
                        <option value="3m-10m">3 - 10 triệu</option>
                        <option value="vip">Trên 10 triệu (VIP)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Đuôi số hoặc yêu cầu chi tiết (nếu có):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="VD: Tìm sim đuôi 6868 hoặc tam hoa 9, đầu 091..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#D90429] hover:bg-[#b80323] text-white rounded-full font-bold text-sm shadow-md shadow-red-600/25 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Yêu Cầu Tìm Sim Ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
