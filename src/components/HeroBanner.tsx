import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Clock, 
  QrCode, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Phone 
} from 'lucide-react';
import { FilterState } from '../types';
import { PREFIXES } from '../data/simData';

interface HeroBannerProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onQuickOrderHero: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  filter,
  onFilterChange,
  onQuickOrderHero,
}) => {
  const [heroPrefix, setHeroPrefix] = useState('all');
  const [heroPattern, setHeroPattern] = useState('');
  const [heroPrice, setHeroPrice] = useState('all');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      prefix: heroPrefix,
      searchQuery: heroPattern,
      priceRange: heroPrice as FilterState['priceRange'],
    });
    const el = document.getElementById('product-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#004e82] via-[#0072BC] to-[#0093eb] text-white py-8 sm:py-12 lg:py-16 shadow-inner" id="hero-banner-section">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines, Trust badges, and Call to Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-white/20 shadow-sm text-yellow-300">
              <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>ĐẠI LÝ ỦY QUYỀN CHÍNH THỨC VINAPHONE VIỆT NAM</span>
            </div>

            {/* Main Title according to user requirement */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-none text-white drop-shadow-sm">
              Giao Sim Tận Nơi <br className="hidden sm:inline" />
              <span className="text-yellow-300 underline decoration-red-500 decoration-wavy decoration-2">
                15 Phút Toàn Quốc
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Kho hơn <strong>500.000+</strong> Sim Số Đẹp VinaPhone chính hãng: Tam Hoa, Lộc Phát, Thần Tài, Tứ Quý & Sim Data 5G khủng. Đăng ký thông tin chính chủ miễn phí, nhận mã QR eSIM hỏa tốc trong 3 phút.
            </p>

            {/* 4 Quick Value Prop Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-2 rounded-xl border border-white/15">
                <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-medium">Giao hỏa tốc 15p</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-2 rounded-xl border border-white/15">
                <ShieldCheck className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="text-xs font-medium">100% Chính chủ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-2 rounded-xl border border-white/15">
                <QrCode className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="text-xs font-medium">Hỗ trợ eSIM QR</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2.5 py-2 rounded-xl border border-white/15">
                <Sparkles className="w-4 h-4 text-pink-300 shrink-0" />
                <span className="text-xs font-medium">Định giá gốc</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('product-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#D90429] hover:bg-[#b80323] text-white px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
                id="hero-explore-catalog-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Xem Kho Sim Khuyến Mãi</span>
              </button>

              <button
                onClick={onQuickOrderHero}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-5 py-3 rounded-full font-semibold text-sm sm:text-base transition flex items-center gap-2 cursor-pointer"
                id="hero-instant-request-btn"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Tư Vấn Chọn Số Phong Thủy</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Sim Finder Search Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl border border-blue-100 relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0072BC] flex items-center justify-center font-bold">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-800">Bộ Lọc Tìm Sim Nhanh</h3>
                    <p className="text-xs text-slate-500">Tra cứu tức thì trong kho 500k số</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-red-100 text-[#D90429] px-2 py-0.5 rounded-full">
                  Trực Tuyến
                </span>
              </div>

              <form onSubmit={handleHeroSearch} className="space-y-3.5">
                {/* Chọn Đầu Số */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Chọn Đầu Số VinaPhone:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setHeroPrefix('all')}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition ${
                        heroPrefix === 'all'
                          ? 'bg-[#0072BC] text-white border-[#0072BC] shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Tất cả
                    </button>
                    {PREFIXES.slice(0, 7).map((pfx) => (
                      <button
                        key={pfx}
                        type="button"
                        onClick={() => setHeroPrefix(pfx)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition ${
                          heroPrefix === pfx
                            ? 'bg-[#0072BC] text-white border-[#0072BC] shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {pfx}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nhập dãy số hoặc số mong muốn */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Dãy số hoặc đuôi sim mong muốn:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={heroPattern}
                      onChange={(e) => setHeroPattern(e.target.value)}
                      placeholder="VD: *888*, *6868*, 7979, 199x..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Gợi ý cú pháp: <code>*888*</code> (chứa 888) hoặc <code>*68</code> (đuôi 68)
                  </span>
                </div>

                {/* Mức giá */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Khoảng giá ngân sách:
                  </label>
                  <select
                    value={heroPrice}
                    onChange={(e) => setHeroPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  >
                    <option value="all">Tất cả mức giá</option>
                    <option value="under-500k">Dưới 500.000 đ</option>
                    <option value="500k-1m">500.000 đ - 1.000.000 đ</option>
                    <option value="1m-3m">1.000.000 đ - 3.000.000 đ</option>
                    <option value="3m-10m">3.000.000 đ - 10.000.000 đ</option>
                    <option value="above-10m">Trên 10.000.000 đ (Sim VIP)</option>
                  </select>
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="w-full bg-[#0072BC] hover:bg-[#005a96] text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-submit-search-btn"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm Kiếm Sim VinaPhone</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
