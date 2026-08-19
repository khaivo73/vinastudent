import React from 'react';
import { 
  Sparkles, 
  Crown, 
  TrendingUp, 
  Coins, 
  Calendar, 
  Wifi, 
  ShieldCheck, 
  Compass, 
  Zap 
} from 'lucide-react';
import { SimCategory } from '../types';
import { QUICK_CATEGORIES } from '../data/simData';

interface QuickCategoriesProps {
  activeCategory: SimCategory;
  onSelectCategory: (cat: SimCategory) => void;
  onSelectPackageFilter?: (packageName: string) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
  onSelectPackageFilter,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Crown': return <Crown className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      case 'Coins': return <Coins className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const packagePills = [
    { label: 'Gói VD149', query: 'VD149' },
    { label: 'Gói BIG90', query: 'BIG90' },
    { label: 'Gói YOLO125V', query: 'YOLO125V' },
    { label: 'Gói D159V', query: 'D159V' },
    { label: 'Đầu 091 Cổ', query: '091' },
    { label: 'Đầu 088 Đại Gia', query: '088' },
  ];

  return (
    <section className="bg-white py-4 sm:py-6 border-b border-slate-200/80 shadow-xs" id="quick-categories-bar">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0072BC]"></span>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Danh Mục Tìm Nhanh Dạng Oval
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Nhấp để lọc danh sách tức thì
          </span>
        </div>

        {/* Scrollable Oval Pills Container */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          
          {/* All category pill */}
          <button
            onClick={() => {
              onSelectCategory('all');
              const el = document.getElementById('product-catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#0072BC] text-white border-[#0072BC] shadow-md shadow-blue-500/20'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
            id="cat-pill-all"
          >
            <Zap className="w-4 h-4" />
            <span>Tất Cả Sim</span>
          </button>

          {/* Individual Category Oval Pills */}
          {QUICK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id as SimCategory);
                  const el = document.getElementById('product-catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#0072BC] text-white border-[#0072BC] shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
                id={`cat-pill-${cat.id}`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-[#0072BC]'}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Quick Package pills */}
          {packagePills.map((pkg) => (
            <button
              key={pkg.label}
              onClick={() => {
                if (onSelectPackageFilter) {
                  onSelectPackageFilter(pkg.query);
                }
                const el = document.getElementById('product-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-red-50 hover:bg-red-100 text-[#D90429] border border-red-200 transition cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]"></span>
              <span>{pkg.label}</span>
            </button>
          ))}

        </div>

      </div>
    </section>
  );
};
