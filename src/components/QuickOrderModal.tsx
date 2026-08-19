import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Truck, 
  QrCode, 
  ShieldCheck, 
  PhoneCall, 
  CreditCard, 
  Wallet, 
  Copy, 
  Sparkles, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { SimItem, Order, CartItem } from '../types';
import { formatNumberVND } from '../utils/formatters';

interface QuickOrderModalProps {
  sim: SimItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  sim,
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  if (!isOpen || !sim) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [simFormat, setSimFormat] = useState<'eSIM' | 'physical'>('physical');
  const [deliverySpeed, setDeliverySpeed] = useState<'15min_instant' | 'standard'>('15min_instant');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay_qr' | 'momo' | 'bank_transfer'>('cod');
  const [citizenId, setCitizenId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  // Discount calculation
  const discountAmount = paymentMethod === 'vnpay_qr' ? 20000 : 0;
  const finalTotal = Math.max(0, sim.price - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại nhận hàng!');
      return;
    }

    if (simFormat === 'physical' && !address.trim()) {
      alert('Vui lòng nhập địa chỉ giao sim tận nơi!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'VN-SIM-' + Math.floor(100000 + Math.random() * 900000),
        customerName,
        phone,
        email: email || `${phone}@khachhang.vinasim.vn`,
        address: simFormat === 'eSIM' ? 'Nhận mã QR eSIM qua Zalo/Email' : address,
        items: [
          {
            sim,
            quantity: 1,
            selectedFormat: simFormat,
            registeredName: customerName,
          },
        ],
        total: finalTotal,
        discountAmount,
        paymentMethod,
        deliverySpeed,
        simFormat,
        citizenId,
        notes,
        createdAt: new Date().toLocaleString('vi-VN'),
        status: deliverySpeed === '15min_instant' ? 'Đang giao hỏa tốc 15p' : 'Chờ xác nhận',
      };

      setIsSubmitting(false);
      setOrderCompleted(newOrder);
      onOrderSuccess(newOrder);
    }, 800);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="quick-order-popup-modal">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005a96] to-[#0072BC] text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div>
            <span className="text-[11px] uppercase font-bold text-yellow-300 tracking-wider">
              {orderCompleted ? 'ĐẶT HÀNG THÀNH CÔNG' : 'FORM ĐẶT HÀNG NHANH 15 PHÚT'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {orderCompleted ? 'Đơn Hàng Đã Ghi Nhận' : 'Đặt Mua Sim VinaPhone'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
            id="close-quick-order-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {orderCompleted ? (
          /* Order Success View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black text-slate-900">Chúc Mừng Quý Khách!</h4>
              <p className="text-sm text-slate-600">
                Đơn hàng mua Sim <strong>{sim.number}</strong> đã được gửi tới hệ thống tổng đài VinaPhone.
              </p>
            </div>

            {/* Order Code Box */}
            <div className="bg-blue-50 border-2 border-dashed border-[#0072BC]/40 rounded-2xl p-4 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-slate-500 font-medium">Mã đơn hàng của bạn:</span>
                <p className="text-lg font-black text-[#0072BC] font-mono">{orderCompleted.id}</p>
              </div>
              <button
                onClick={() => handleCopyCode(orderCompleted.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0072BC] text-white text-xs font-bold rounded-xl hover:bg-[#005a96] transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép mã'}</span>
              </button>
            </div>

            {/* Delivery Timeline info */}
            <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Trạng thái hiện tại:</span>
                <span className="text-[#D90429] bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  {orderCompleted.status}
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Khách hàng:</strong> {orderCompleted.customerName} ({orderCompleted.phone})
              </p>
              <p className="text-slate-600">
                • <strong>Địa chỉ giao:</strong> {orderCompleted.address}
              </p>
              <p className="text-slate-600">
                • <strong>Hình thức:</strong> {orderCompleted.simFormat === 'eSIM' ? 'Nhận mã QR eSIM' : 'Sim Vật Lý (Giao tận nơi 15p)'}
              </p>
              <p className="text-slate-600">
                • <strong>Tổng thanh toán:</strong> <strong className="text-[#D90429]">{formatNumberVND(orderCompleted.total)}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-[#0072BC] text-white font-bold text-sm hover:bg-[#005a96] transition shadow-md cursor-pointer"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        ) : (
          /* Order Form View */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            
            {/* Sim Info Summary Card */}
            <div className="bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Sim đã chọn:</span>
                <div className="text-xl sm:text-2xl font-black text-[#0072BC] font-mono tracking-tight">
                  {sim.number}
                </div>
                <p className="text-xs text-slate-500">{sim.categoryName} • Mã SP: {sim.id}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">
                  {formatNumberVND(sim.originalPrice)}
                </span>
                <span className="text-lg sm:text-xl font-black text-[#D90429]">
                  {formatNumberVND(sim.price)}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 block">Freeship 100%</span>
              </div>
            </div>

            {/* Sim Format Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. Chọn định dạng Sim:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSimFormat('physical')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    simFormat === 'physical'
                      ? 'border-[#0072BC] bg-blue-50/50 ring-2 ring-[#0072BC]/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#0072BC] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Sim Vật Lý Nguyên Kít</h5>
                    <p className="text-[11px] text-slate-500">Shipper giao tận nhà trong 15p</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSimFormat('eSIM')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition ${
                    simFormat === 'eSIM'
                      ? 'border-[#0072BC] bg-blue-50/50 ring-2 ring-[#0072BC]/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#D90429] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">eSIM Quét Mã QR</h5>
                    <p className="text-[11px] text-slate-500">Nhận QR qua Zalo/Mail trong 3p</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Inputs Required by Task */}
            <div className="space-y-3.5">
              <label className="block text-xs font-bold text-slate-700">
                2. Thông tin người nhận sim (Đăng ký chính chủ):
              </label>

              {/* Họ tên */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Họ và tên quý khách <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                  id="order-input-fullname"
                />
              </div>

              {/* SĐT nhận sim */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Số điện thoại liên hệ <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0912345678"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                    id="order-input-phone"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Số CCCD / CMND (Tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                    placeholder="Để đăng ký chính chủ trước"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                    id="order-input-cccd"
                  />
                </div>
              </div>

              {/* Địa chỉ giao hàng */}
              {simFormat === 'physical' ? (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Địa chỉ nhận sim tận nơi <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                    id="order-input-address"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Email hoặc Số Zalo nhận mã QR eSIM <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email hoặc số Zalo của bạn"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#0072BC] focus:ring-2 focus:ring-[#0072BC]/20 focus:outline-none"
                    id="order-input-email-esim"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                3. Phương thức thanh toán:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition ${
                    paymentMethod === 'cod'
                      ? 'border-[#0072BC] bg-blue-50 text-[#0072BC]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Thanh toán khi nhận (COD)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('vnpay_qr')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                    paymentMethod === 'vnpay_qr'
                      ? 'border-[#0072BC] bg-blue-50 text-[#0072BC]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>Quét QR VNPay</span>
                  </div>
                  <span className="text-[9px] bg-red-100 text-[#D90429] px-1.5 py-0.5 rounded font-black">
                    -20K
                  </span>
                </button>
              </div>
            </div>

            {/* Ghi chú */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Ghi chú thêm (khung giờ giao sim...):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Giao giờ hành chính, gọi trước khi đến..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#0072BC] focus:outline-none"
              />
            </div>

            {/* Total Calculation & Submit Button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 font-medium">Tổng tiền thanh toán:</span>
                <div className="text-xl font-black text-[#D90429]">
                  {formatNumberVND(finalTotal)}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#0072BC] hover:bg-[#005a96] disabled:opacity-70 text-white py-3.5 px-6 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                id="submit-order-form-btn"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span>Xác Nhận Đặt Sim</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
