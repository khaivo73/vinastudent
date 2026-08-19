import React, { useState } from 'react';
import { 
  X, 
  User, 
  Search, 
  Package, 
  Clock, 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Truck 
} from 'lucide-react';
import { Order } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialTab?: 'account' | 'orders' | 'vip';
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialTab = 'account',
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'vip'>(initialTab);
  const [searchOrderCode, setSearchOrderCode] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const code = searchOrderCode.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === code || o.phone.includes(code)
    );
    setSearchedOrder(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="account-management-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005a96] to-[#0072BC] text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-yellow-300 tracking-wider">
                TRUNG TÂM KHÁCH HÀNG
              </span>
              <h3 className="text-xl font-black text-white">Quản Lý Tài Khoản VinaSim</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'account'
                ? 'border-[#0072BC] text-[#0072BC] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Thông Tin Tài Khoản
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#0072BC] text-[#0072BC] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Tra Cứu & Lịch Sử Đơn</span>
            <span className="bg-[#D90429] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('vip')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1 ${
              activeTab === 'vip'
                ? 'border-[#0072BC] text-[#0072BC] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Quyền Lợi VIP Club</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-6">
          
          {/* TAB 1: ACCOUNT PROFILE */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              
              <div className="flex items-center gap-4 p-4 bg-blue-50/70 rounded-2xl border border-blue-100">
                <div className="w-14 h-14 rounded-2xl bg-[#0072BC] text-white font-black text-2xl flex items-center justify-center shadow-md">
                  V
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-slate-900">Quý Khách Hàng Thân Thiết</h4>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                      HẠNG VÀNG
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Thuê bao VinaPhone VIP Member</p>
                  <p className="text-xs text-[#0072BC] font-semibold">Tích lũy điểm thưởng: 1.250 Điểm</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 font-medium block">Số điện thoại đăng ký:</span>
                  <span className="font-bold text-slate-800 text-sm">0912.xxx.999 (Đã xác minh)</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 font-medium block">Tổng số sim đã sở hữu:</span>
                  <span className="font-bold text-[#0072BC] text-sm">{orders.length + 1} Sim chính chủ</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 font-medium block">Ưu đãi giảm giá độc quyền:</span>
                  <span className="font-bold text-emerald-600 text-sm">Giảm 10% trọn đời khi mua sim</span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 font-medium block">Hỗ trợ riêng:</span>
                  <span className="font-bold text-slate-800 text-sm">Chuyên viên VIP 24/7</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">Bảo hành thông tin chính chủ VinaPhone:</p>
                  <p className="text-emerald-800">
                    Tất cả sim mua tại VinaSim Store đều được bảo hộ quyền sử dụng trọn đời. Hỗ trợ cấp lại eSim, đổi sim 5G miễn phí tại các quầy giao dịch VNPT trên toàn quốc.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ORDERS & LOOKUP */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Search Order Bar */}
              <form onSubmit={handleLookup} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchOrderCode}
                    onChange={(e) => setSearchOrderCode(e.target.value)}
                    placeholder="Nhập Mã đơn hàng (VD: VN-SIM-...) hoặc Số điện thoại..."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#0072BC] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#005a96] transition flex items-center gap-1"
                >
                  <span>Tra Cứu</span>
                </button>
              </form>

              {/* Searched Order Result */}
              {hasSearched && (
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Kết quả tra cứu:</span>
                    <button
                      onClick={() => {
                        setHasSearched(false);
                        setSearchedOrder(null);
                      }}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Đóng
                    </button>
                  </div>

                  {searchedOrder ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-[#0072BC] font-mono text-sm">{searchedOrder.id}</span>
                        <span className="text-[#D90429] bg-red-50 px-2 py-0.5 rounded-full">
                          {searchedOrder.status}
                        </span>
                      </div>
                      <p>Khách hàng: <strong>{searchedOrder.customerName}</strong> ({searchedOrder.phone})</p>
                      <p>Sim đặt mua: <strong className="text-[#0072BC] font-mono">{searchedOrder.items[0]?.sim.number}</strong></p>
                      <p>Địa chỉ: {searchedOrder.address}</p>
                      <p>Tổng tiền: <strong className="text-[#D90429]">{formatNumberVND(searchedOrder.total)}</strong></p>
                    </div>
                  ) : (
                    <p className="text-xs text-red-500 font-medium">
                      Không tìm thấy đơn hàng với thông tin vừa nhập. Vui lòng kiểm tra lại mã đơn hoặc số điện thoại.
                    </p>
                  )}
                </div>
              )}

              {/* All Stored Orders List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Đơn Hàng Gần Đây ({orders.length})
                </h4>

                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#0072BC]/40 transition space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#0072BC]" />
                          <span className="font-mono font-bold text-slate-800">{order.id}</span>
                        </div>
                        <span className="bg-blue-50 text-[#0072BC] font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-slate-700">
                        <div>
                          <p className="font-bold text-sm text-[#0072BC] font-mono">
                            {order.items[0]?.sim.number}
                          </p>
                          <p className="text-slate-500 text-[11px]">
                            {order.items[0]?.selectedFormat === 'eSIM' ? 'eSIM Nhanh' : 'Giao 15 Phút'} • {order.createdAt}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-sm text-[#D90429]">
                            {formatNumberVND(order.total)}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {order.paymentMethod === 'cod' ? 'COD Khi nhận' : 'Đã thanh toán Online'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                    <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">Chưa có đơn hàng nào được tạo trong phiên này.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: VIP PRIVILEGES */}
          {activeTab === 'vip' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl text-white space-y-1 shadow-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100">
                  CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT
                </span>
                <h4 className="text-xl font-black">VinaSim VIP Club 2026</h4>
                <p className="text-amber-100 text-xs">
                  Tận hưởng đặc quyền ưu tiên kích hoạt và giảm giá số đẹp độc quyền
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Chiết khấu 10% - 20% trọn đời:</strong>
                    <p className="text-slate-500">Áp dụng cho mọi lần mua sim tiếp theo hoặc giới thiệu bạn bè.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Giao Sim Hỏa Tốc Miễn Phí:</strong>
                    <p className="text-slate-500">Ưu tiên shipper công nghệ giao trong 15 phút tại 63 tỉnh thành.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Tư Vấn Phong Thủy Sim Độc Quyền:</strong>
                    <p className="text-slate-500">Báo cáo phân tích bát tự quẻ dịch miễn phí từ chuyên gia hàng đầu.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
