import React from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  RotateCcw, 
  Grid, 
  Filter 
} from 'lucide-react';
import { SimItem, FilterState, SimCategory } from '../types';
import { ProductCard } from './ProductCard';
import { PREFIXES } from '../data/simData';

interface ProductSectionProps {
  sims: SimItem[];
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onBuyNow: (sim: SimItem) => void;
  onAddToCart: (sim: SimItem) => void;
  onViewDetail: (sim: SimItem) => void;
  onResetFilter: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  sims,
  filter,
  onFilterChange,
  onBuyNow,
  onAddToCart,
  onViewDetail,
  onResetFilter,
}) => {
  const categories: { id: SimCategory; label: string }[] = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'tam-hoa', label: 'Tam Hoa' },
    { id: 'loc-phat', label: 'Lộc Phát 68' },
    { id: 'than-tai', label: 'Thần Tài 79' },
    { id: 'tu-quy', label: 'Tứ Quý / VIP' },
    { id: 'data-4g', label: 'Sim Data 5G' },
    { id: 'nam-sinh', label: 'Năm Sinh' },
    { id: 'phong-thuy', label: 'Phong Thủy' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#F4F8FB]" id="product-catalog-section">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0072BC]">
              <Sparkles className="w-4 h-4" />
              <span>Kho Sim Số Đẹp VinaPhone</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Danh Sách Sim Đang Khuyến Mãi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Cam kết 100% Sim mới nguyên kít, bảo hành chính chủ trọn đời
            </p>
          </div>

          {/* Result Counter */}
          <div className="text-xs sm:text-sm font-semibold text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
            Tìm thấy <strong className="text-[#0072BC] font-extrabold">{sims.length}</strong> số sim phù hợp
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => {
            const isActive = filter.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0072BC] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
                id={`cat-tab-${cat.id}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Filter by Prefix */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lọc theo đầu số:
              </label>
              <select
                value={filter.prefix}
                onChange={(e) => onFilterChange({ prefix: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-[#0072BC] focus:outline-none"
              >
                <option value="all">Tất cả đầu số</option>
                <option value="091">Đầu số cổ 091 (VIP)</option>
                <option value="088">Đầu 088 (Song Phát Đại Gia)</option>
                <option value="081">Đầu 081</option>
                <option value="082">Đầu 082</option>
                <option value="083">Đầu 083</option>
                <option value="084">Đầu 084</option>
                <option value="085">Đầu 085</option>
              </select>
            </div>

            {/* Filter by Price Range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Khoảng giá:
              </label>
              <select
                value={filter.priceRange}
                onChange={(e) => onFilterChange({ priceRange: e.target.value as FilterState['priceRange'] })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-[#0072BC] focus:outline-none"
              >
                <option value="all">Tất cả mức giá</option>
                <option value="under-500k">Dưới 500.000 đ</option>
                <option value="500k-1m">500.000 đ - 1.000.000 đ</option>
                <option value="1m-3m">1.000.000 đ - 3.000.000 đ</option>
                <option value="3m-10m">3.000.000 đ - 10.000.000 đ</option>
                <option value="above-10m">Trên 10.000.000 đ</option>
              </select>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sắp xếp theo:
              </label>
              <select
                value={filter.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:border-[#0072BC] focus:outline-none"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="discount">Giảm giá nhiều nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={onResetFilter}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
                title="Xóa bộ lọc về mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            </div>

          </div>

          {/* Active Filter Tags Row */}
          {(filter.searchQuery || filter.prefix !== 'all' || filter.category !== 'all' || filter.priceRange !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-400">Đang lọc:</span>
              
              {filter.searchQuery && (
                <span className="bg-blue-50 text-[#0072BC] px-2.5 py-1 rounded-lg border border-blue-200 font-medium flex items-center gap-1">
                  Tìm: "{filter.searchQuery}"
                  <button onClick={() => onFilterChange({ searchQuery: '' })} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filter.prefix !== 'all' && (
                <span className="bg-blue-50 text-[#0072BC] px-2.5 py-1 rounded-lg border border-blue-200 font-medium flex items-center gap-1">
                  Đầu số: {filter.prefix}
                  <button onClick={() => onFilterChange({ prefix: 'all' })} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filter.category !== 'all' && (
                <span className="bg-blue-50 text-[#0072BC] px-2.5 py-1 rounded-lg border border-blue-200 font-medium flex items-center gap-1">
                  Danh mục: {filter.category}
                  <button onClick={() => onFilterChange({ category: 'all' })} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filter.priceRange !== 'all' && (
                <span className="bg-blue-50 text-[#0072BC] px-2.5 py-1 rounded-lg border border-blue-200 font-medium flex items-center gap-1">
                  Giá: {filter.priceRange}
                  <button onClick={() => onFilterChange({ priceRange: 'all' })} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={onResetFilter}
                className="text-xs text-[#D90429] hover:underline font-semibold ml-2"
              >
                Xóa tất cả
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {sims.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sims.map((sim) => (
              <ProductCard
                key={sim.id}
                sim={sim}
                onBuyNow={onBuyNow}
                onAddToCart={onAddToCart}
                onViewDetail={onViewDetail}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-[#0072BC] rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Không tìm thấy số sim phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Vui lòng thử tìm kiếm theo cú pháp khác (VD: *888*, *68*, 091*) hoặc điều chỉnh lại bộ lọc giá.
            </p>
            <button
              onClick={onResetFilter}
              className="px-6 py-2.5 bg-[#0072BC] text-white rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-[#005a96] transition"
            >
              Xem tất cả sim đang có
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
