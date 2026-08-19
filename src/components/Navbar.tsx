import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  TrendingUp, 
  Wifi, 
  Package, 
  Compass, 
  Layers, 
  PhoneCall, 
  Flame, 
  Search,
  ChevronDown
} from 'lucide-react';
import { SimCategory } from '../types';

interface NavbarProps {
  activeCategory: SimCategory;
  onSelectCategory: (cat: SimCategory) => void;
  onOpenOrderLookup: () => void;
  onOpenDataPackages: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenOrderLookup,
  onOpenDataPackages,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: SimCategory | 'data-pkgs' | 'lookup'; label: string; icon: React.ReactNode; isAction?: boolean }[] = [
    { id: 'all', label: 'Tất Cả Sim', icon: <Layers className="w-4 h-4" /> },
    { id: 'tam-hoa', label: 'Sim Tam Hoa', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'loc-phat', label: 'Sim Lộc Phát', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'data-4g', label: 'Sim Data 4G/5G', icon: <Wifi className="w-4 h-4" /> },
    { id: 'data-pkgs', label: 'Gói Cước Tháng', icon: <Package className="w-4 h-4" />, isAction: true },
    { id: 'phong-thuy', label: 'Sim Phong Thủy', icon: <Compass className="w-4 h-4" /> },
    { id: 'lookup', label: 'Tra Cứu Đơn Hàng', icon: <Search className="w-4 h-4" />, isAction: true },
  ];

  const handleItemClick = (item: typeof navLinks[0]) => {
    if (item.id === 'data-pkgs') {
      onOpenDataPackages();
    } else if (item.id === 'lookup') {
      onOpenOrderLookup();
    } else {
      onSelectCategory(item.id as SimCategory);
      const catalogEl = document.getElementById('product-catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#0072BC] text-white shadow-md relative z-30" id="main-navigation-bar">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* Desktop Horizontal Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id && !link.isAction;
              return (
                <button
                  key={link.id}
                  onClick={() => handleItemClick(link)}
                  className={`flex items-center gap-2 px-3.5 py-3 text-sm font-semibold transition-all duration-150 relative cursor-pointer ${
                    isActive
                      ? 'bg-[#005a96] text-amber-300 font-bold shadow-inner'
                      : 'hover:bg-white/10 text-white hover:text-white'
                  }`}
                  id={`nav-link-${link.id}`}
                >
                  <span className="opacity-90">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400"></span>
                  )}
                  {link.id === 'tam-hoa' && (
                    <span className="bg-[#D90429] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1 animate-pulse">
                      HOT
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Call hotline & mobile button */}
          <div className="hidden lg:flex items-center gap-3 py-2 text-xs">
            <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-white font-medium border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Kích hoạt eSIM 3 phút</span>
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center justify-between w-full py-2.5">
            <span className="text-sm font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Danh Mục VinaSim</span>
            </span>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none"
              id="mobile-menu-toggle-btn"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#005a96] border-t border-blue-400/30 px-4 py-3 space-y-1 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.id && !link.isAction;
            return (
              <button
                key={link.id}
                onClick={() => handleItemClick(link)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-[#0072BC] font-bold shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.id === 'tam-hoa' && (
                  <span className="bg-[#D90429] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    HOT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
