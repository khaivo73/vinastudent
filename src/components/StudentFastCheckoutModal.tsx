import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Zap, 
  Truck, 
  QrCode, 
  PhoneCall, 
  CheckCircle2, 
  School, 
  CreditCard, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { StudentPackage, StudentOrder, StudentCartItem } from '../types';
import { formatNumberVND } from '../utils/formatters';
import { sendOrderToGoogleSheetsWebhook } from '../utils/exportUtils';
import { CAN_THO_SCHOOLS, AUGUST_CAMPAIGN_INFO } from '../data/studentPackageData';

const CAN_THO_DISTRICTS = [
  'Quận Ninh Kiều',
  'Quận Cái Răng',
  'Quận Bình Thủy',
  'Quận Ô Môn',
  'Quận Thốt Nốt',
  'Huyện Phong Điền',
  'Huyện Thới Lai',
  'Huyện Cờ Đỏ',
  'Huyện Vĩnh Thạnh',
];

interface StudentFastCheckoutModalProps {
  packageItem: StudentPackage | null;
  selectedGift?: string;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: StudentOrder) => void;
  googleSheetsWebhookUrl?: string;
}

export const StudentFastCheckoutModal: React.FC<StudentFastCheckoutModalProps> = ({
  packageItem,
  selectedGift: initialGift,
  isOpen,
  onClose,
  onOrderSuccess,
  googleSheetsWebhookUrl = '',
}) => {
  if (!isOpen || !packageItem) return null;

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolName, setSchoolName] = useState(CAN_THO_SCHOOLS[0]);
  const [district, setDistrict] = useState(CAN_THO_DISTRICTS[0]);
  const [studentId, setStudentId] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [simOption, setSimOption] = useState<'new_sim_physical' | 'new_sim_esim' | 'existing_sim'>('new_sim_physical');
  const [existingPhone, setExistingPhone] = useState('');
  const [chosenGift, setChosenGift] = useState(initialGift || packageItem.giftOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'cod' | 'momo' | 'vnpay'>('vietqr');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<StudentOrder | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ/KTX tại Cần Thơ!');
      return;
    }

    if (simOption === 'existing_sim' && !existingPhone.trim()) {
      alert('Vui lòng nhập số điện thoại VinaPhone đang dùng để gán gói cước!');
      return;
    }

    const orderId = `SV-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullAddress = `${address}, ${district}, TP. Cần Thơ`;
    const newOrder: StudentOrder = {
      id: orderId,
      customerName,
      schoolName: schoolName || 'Học sinh / Sinh viên Cần Thơ',
      studentId,
      phone,
      address: fullAddress,
      city: 'TP. Cần Thơ',
      district,
      deliveryMethod: simOption === 'new_sim_esim' ? 'instant_esim' : 'dormitory_15m',
      paymentMethod,
      items: [
        {
          packageItem,
          quantity: 1,
          selectedGift: chosenGift,
          simOption,
          existingPhoneNumber: existingPhone,
        },
      ],
      totalAmount: packageItem.price,
      orderDate: new Date().toLocaleString('vi-VN'),
      status: 'pending',
      notes,
    };

    setCreatedOrder(newOrder);
    setIsSubmitted(true);
    onOrderSuccess(newOrder);

    // If Google Sheets webhook is configured, asynchronously send order data
    if (googleSheetsWebhookUrl) {
      sendOrderToGoogleSheetsWebhook(googleSheetsWebhookUrl, newOrder);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCreatedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="student-checkout-modal">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider">
              <School className="w-4 h-4" />
              <span>ĐẶT NHANH GÓI CƯỚC TỰU TRƯỜNG 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
              {packageItem.code} ({packageItem.cycle})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {isSubmitted && createdOrder ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                  ĐĂNG KÝ THÀNH CÔNG!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Mã Đơn Hàng: <span className="text-sky-600 font-mono">{createdOrder.id}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Cảm ơn bạn <strong>{createdOrder.customerName}</strong>! Đơn hàng gói cước <strong>{packageItem.code}</strong> đã được tiếp nhận.
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gói cước:</span>
                  <span className="font-bold text-slate-800">{packageItem.code} ({packageItem.cycle})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quà tặng kèm:</span>
                  <span className="font-bold text-teal-700 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    {chosenGift}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hình thức nhận:</span>
                  <span className="font-bold text-slate-800">
                    {simOption === 'new_sim_physical' && 'SIM Mới Vật Lý (Giao 15p)'}
                    {simOption === 'new_sim_esim' && 'Mã QR eSIM (Gửi Zalo/SMS 3p)'}
                    {simOption === 'existing_sim' && `Gán vào số ${existingPhone}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Địa chỉ / KTX:</span>
                  <span className="font-bold text-slate-800">{createdOrder.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Tổng thanh toán:</span>
                  <span className="font-black text-sm text-sky-600">{formatNumberVND(createdOrder.totalAmount)}</span>
                </div>
              </div>

              {/* QR payment block if VietQR */}
              {paymentMethod === 'vietqr' && (
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-center max-w-sm mx-auto space-y-3">
                  <div className="text-xs font-bold text-sky-700 flex items-center justify-center gap-1.5">
                    <QrCode className="w-4 h-4" />
                    <span>Quét mã VietQR Chuyển Khoản Tức Thì:</span>
                  </div>
                  
                  {/* Dynamic VietQR Image placeholder */}
                  <div className="bg-white p-3 rounded-xl border border-sky-100 inline-block shadow-xs">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=2vnpay-vinasim-order-${createdOrder.id}-${packageItem.price}`}
                      alt="VietQR Payment"
                      className="w-40 h-40 mx-auto"
                    />
                  </div>

                  <p className="text-[11px] text-slate-600">
                    Nội dung CK: <strong className="font-mono text-sky-700">{createdOrder.id} {phone}</strong>
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-sky-600 text-white rounded-full font-bold text-xs sm:text-sm hover:bg-sky-700 transition cursor-pointer shadow-md shadow-sky-600/20"
                >
                  Xong & Tiếp Tục Mua Sắm
                </button>
              </div>
            </div>
          ) : (
            /* ORDER FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Package Summary Box */}
              <div className="bg-gradient-to-br from-sky-50 to-slate-50 p-4 rounded-2xl border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-lg text-sky-600">{packageItem.code}</span>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-black text-xs rounded-full">
                      -{packageItem.discountPercent}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {packageItem.dataAllowance} • {packageItem.voiceAllowance}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-black text-slate-900">
                    {formatNumberVND(packageItem.price)}
                  </div>
                  <div className="text-xs text-slate-400 line-through">
                    {formatNumberVND(packageItem.originalPrice)}
                  </div>
                </div>
              </div>

              {/* 1. CHOOSE PHYSICAL GIFT */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-amber-600 animate-bounce" />
                    <span>1. Chọn Quà Tặng Tựu Trường (Chỉ Có Trong Tháng 8):</span>
                  </label>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-2 py-0.5 rounded-full">
                    Số lượng có hạn
                  </span>
                </div>
                <p className="text-[11px] text-amber-900 italic">
                  * Quà tặng hiện vật được giao kèm SIM tận KTX/địa chỉ đăng ký Cần Thơ. Áp dụng duy nhất trong tháng 8/2026.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {packageItem.giftOptions.map((gift) => (
                    <label
                      key={gift}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition ${
                        chosenGift === gift
                          ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                          : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="student-gift"
                        checked={chosenGift === gift}
                        onChange={() => setChosenGift(gift)}
                        className="hidden"
                      />
                      <Gift className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{gift}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. CHOOSE SIM FORMAT */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>2. Chọn Hình Thức Nhận SIM / Kích Hoạt Gói:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col gap-1 cursor-pointer transition ${
                      simOption === 'new_sim_physical'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-opt"
                      checked={simOption === 'new_sim_physical'}
                      onChange={() => setSimOption('new_sim_physical')}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-sky-600" />
                      <span>SIM Mới Vật Lý</span>
                    </div>
                    <span className="text-[10px] font-normal text-slate-500">Giao KTX trong 15 phút</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col gap-1 cursor-pointer transition ${
                      simOption === 'new_sim_esim'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-opt"
                      checked={simOption === 'new_sim_esim'}
                      onChange={() => setSimOption('new_sim_esim')}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-sky-600" />
                      <span>Mã QR eSIM</span>
                    </div>
                    <span className="text-[10px] font-normal text-slate-500">Quét kích hoạt 3 phút</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col gap-1 cursor-pointer transition ${
                      simOption === 'existing_sim'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-opt"
                      checked={simOption === 'existing_sim'}
                      onChange={() => setSimOption('existing_sim')}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Gán SIM Đang Dùng</span>
                    </div>
                    <span className="text-[10px] font-normal text-slate-500">Dùng số Vina hiện tại</span>
                  </label>
                </div>

                {simOption === 'existing_sim' && (
                  <div className="mt-2.5">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nhập số thuê bao VinaPhone đang dùng *:
                    </label>
                    <input
                      type="tel"
                      required
                      value={existingPhone}
                      onChange={(e) => setExistingPhone(e.target.value)}
                      placeholder="VD: 0912345678"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* 3. STUDENT INFORMATION */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-sky-600" />
                  <span>3. Thông Tin Học Sinh - Sinh Viên & Địa Chỉ Nhận Hàng:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Họ và tên bạn *:
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="VD: Nguyễn Văn An"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Số điện thoại nhận hàng/Zalo *:
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="VD: 0987654321"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Can Tho Scope Alert */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-sky-900">
                  <div className="flex items-center gap-2">
                    <span className="bg-sky-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      TP. CẦN THƠ
                    </span>
                    <span className="font-semibold">Chỉ phục vụ giao nhanh KTX/Phòng trọ tại khu vực Cần Thơ</span>
                  </div>
                  <a href="tel:0818006881" className="font-bold text-sky-700 hover:underline flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                    <span>08.1800 6881</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Trường Học / Viện / Ký Túc Xá tại Cần Thơ *:
                    </label>
                    <select
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-none"
                    >
                      {CAN_THO_SCHOOLS.map((school) => (
                        <option key={school} value={school}>
                          {school}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Quận / Huyện nhận SIM *:
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-none"
                    >
                      {CAN_THO_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mã Sinh Viên / Lớp (Tùy chọn):
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="VD: B2201234 - K48 ĐH Cần Thơ"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Địa chỉ chi tiết / Phòng KTX / Nhà trọ *:
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="VD: Phòng 204 KTX Khu 2 ĐHCT, Đ. 3/2"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. PAYMENT METHOD */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-sky-600" />
                  <span>4. Phương Thức Thanh Toán:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition ${
                      paymentMethod === 'vietqr'
                        ? 'bg-sky-50 border-sky-500 text-sky-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="hidden"
                    />
                    <div className="font-bold">VietQR</div>
                    <div className="text-[10px] text-slate-400 font-normal">Quét mã nhanh</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-sky-50 border-sky-500 text-sky-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="hidden"
                    />
                    <div className="font-bold">Tiền Mặt (COD)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Trả khi nhận sim</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition ${
                      paymentMethod === 'momo'
                        ? 'bg-pink-50 border-pink-400 text-pink-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="hidden"
                    />
                    <div className="font-bold text-pink-600">Ví MoMo</div>
                    <div className="text-[10px] text-slate-400 font-normal">Thanh toán ví</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition ${
                      paymentMethod === 'vnpay'
                        ? 'bg-sky-50 border-sky-500 text-sky-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'vnpay'}
                      onChange={() => setPaymentMethod('vnpay')}
                      className="hidden"
                    />
                    <div className="font-bold text-sky-700">VNPay QR</div>
                    <div className="text-[10px] text-slate-400 font-normal">Thẻ / App Bank</div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-teal-600 hover:from-sky-600 hover:to-teal-700 text-white rounded-full font-bold text-sm sm:text-base shadow-xl shadow-sky-500/25 transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>XÁC NHẬN ĐĂNG KÝ GÓI • {formatNumberVND(packageItem.price)}</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Cam kết bảo mật thông tin sinh viên 100% • Hỗ trợ đăng ký chính chủ miễn phí</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
