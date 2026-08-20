import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Zap, 
  Smartphone, 
  Truck, 
  QrCode, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  School,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { StudentPackage, StudentOrder } from '../types';
import { CAN_THO_SCHOOLS, CAN_THO_DISTRICTS } from '../data/studentPackageData';
import { formatNumberVND } from '../utils/formatters';
import { sendOrderToGoogleSheetsWebhook } from '../utils/exportUtils';

interface StudentFastCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageItem: StudentPackage | null;
  selectedGift?: string;
  initialGift?: string;
  onOrderSuccess: (order: StudentOrder) => void;
  googleSheetsWebhookUrl?: string;
}

export const StudentFastCheckoutModal: React.FC<StudentFastCheckoutModalProps> = ({
  isOpen,
  onClose,
  packageItem,
  selectedGift,
  initialGift,
  onOrderSuccess,
  googleSheetsWebhookUrl,
}) => {
  if (!isOpen || !packageItem) return null;

  // Form states
  const [chosenGift, setChosenGift] = useState<string>(
    selectedGift || initialGift || packageItem.giftOptions[0] || 'Mũ bảo hiểm VinaPhone'
  );
  const [simOption, setSimOption] = useState<'new_sim_physical' | 'new_sim_esim' | 'existing_sim'>('new_sim_physical');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [existingPhone, setExistingPhone] = useState('');
  const [schoolName, setSchoolName] = useState(CAN_THO_SCHOOLS[0]);
  const [district, setDistrict] = useState(CAN_THO_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [studentId, setStudentId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'cod' | 'momo' | 'vnpay'>('vietqr');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<StudentOrder | null>(null);

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formErrorList, setFormErrorList] = useState<string[]>([]);

  const handleFieldChange = (field: string, value: string, setter: (val: string) => void) => {
    setter(value);
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (formErrorList.length > 0) {
      setFormErrorList([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    const errorList: string[] = [];

    if (!customerName.trim()) {
      errors.customerName = 'Vui lòng nhập họ và tên của bạn';
      errorList.push('Họ và tên bạn');
    }

    if (!phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại nhận hàng/Zalo';
      errorList.push('Số điện thoại nhận hàng/Zalo');
    } else if (!/^[0-9]{9,11}$/.test(phone.trim().replace(/\s+/g, ''))) {
      errors.phone = 'Số điện thoại không đúng định dạng (9-11 chữ số)';
      errorList.push('Số điện thoại nhận hàng (chưa đúng định dạng)');
    }

    if (simOption === 'existing_sim') {
      if (!existingPhone.trim()) {
        errors.existingPhone = 'Vui lòng nhập số thuê bao VinaPhone đang dùng';
        errorList.push('Số thuê bao VinaPhone đang dùng');
      } else if (!/^[0-9]{9,11}$/.test(existingPhone.trim().replace(/\s+/g, ''))) {
        errors.existingPhone = 'Số thuê bao VinaPhone không đúng định dạng';
        errorList.push('Số thuê bao VinaPhone (chưa đúng định dạng)');
      }
    }

    if (!address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ chi tiết / phòng KTX';
      errorList.push('Địa chỉ chi tiết / Phòng KTX / Nhà trọ');
    }

    if (errorList.length > 0) {
      setFieldErrors(errors);
      setFormErrorList(errorList);
      return;
    }

    setFieldErrors({});
    setFormErrorList([]);

    const orderId = `VINA-CT-${Date.now().toString().slice(-6)}`;
    const newOrder: StudentOrder = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      schoolName,
      studentId: studentId ? studentId.trim() : undefined,
      city: 'Cần Thơ',
      district,
      address: `${address.trim()}, ${district}, TP. Cần Thơ`,
      deliveryMethod: simOption === 'new_sim_esim' ? 'instant_esim' : 'dormitory_15m',
      paymentMethod,
      totalAmount: packageItem.price,
      status: 'pending',
      orderDate: new Date().toLocaleString('vi-VN'),
      items: [
        {
          packageItem: packageItem,
          quantity: 1,
          selectedGift: chosenGift,
          simOption,
          existingPhoneNumber: simOption === 'existing_sim' ? existingPhone.trim() : undefined,
        },
      ],
    };

    setCreatedOrder(newOrder);
    setIsSubmitted(true);
    onOrderSuccess(newOrder);

    // Auto-sync to Google Sheets webhook if configured
    if (googleSheetsWebhookUrl) {
      sendOrderToGoogleSheetsWebhook(googleSheetsWebhookUrl, newOrder);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCreatedOrder(null);
    setFieldErrors({});
    setFormErrorList([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="student-checkout-modal">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 text-slate-900 p-5 sm:p-6 rounded-t-xl flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 uppercase tracking-wider">
              <School className="w-4 h-4 text-blue-600" />
              <span>ĐẶT NHANH GÓI CƯỚC TỰU TRƯỜNG 2026</span>
            </div>
            <div className="border-l-4 border-orange-500 pl-2 mt-1">
              <h3 className="text-xl sm:text-2xl font-black text-blue-600 font-mono">
                {packageItem.code} <span className="text-slate-800 font-sans font-bold text-base sm:text-lg">({packageItem.cycle})</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {isSubmitted && createdOrder ? (
            /* SUCCESS CONFIRMATION SCREEN */
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
                  ĐĂNG KÝ THÀNH CÔNG!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Mã Đơn Hàng: <span className="text-blue-600 font-mono">{createdOrder.id}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 font-normal">
                  Cảm ơn bạn <strong>{createdOrder.customerName}</strong>! Đơn hàng gói cước <strong>{packageItem.code}</strong> đã được tiếp nhận.
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto font-normal">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gói cước:</span>
                  <span className="font-semibold text-slate-800">{packageItem.code} ({packageItem.cycle})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quà tặng kèm:</span>
                  <span className="font-semibold text-blue-700 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    {chosenGift}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Hình thức nhận:</span>
                  <span className="font-semibold text-slate-800">
                    {simOption === 'new_sim_physical' && 'SIM Mới Vật Lý (Giao 15p)'}
                    {simOption === 'new_sim_esim' && 'Mã QR eSIM (Gửi Zalo/SMS 3p)'}
                    {simOption === 'existing_sim' && `Gán vào số ${existingPhone}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Địa chỉ / KTX:</span>
                  <span className="font-semibold text-slate-800">{createdOrder.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-800">Tổng thanh toán:</span>
                  <span className="font-bold text-sm text-blue-600">{formatNumberVND(createdOrder.totalAmount)}</span>
                </div>
              </div>

              {/* QR payment block if VietQR */}
              {paymentMethod === 'vietqr' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center max-w-sm mx-auto space-y-3 font-normal">
                  <div className="text-xs font-semibold text-blue-900 flex items-center justify-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    <span>Quét mã VietQR Chuyển Khoản Tức Thì:</span>
                  </div>
                  
                  {/* Dynamic VietQR Image */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 inline-block shadow-xs">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=2vnpay-vinasim-order-${createdOrder.id}-${packageItem.price}`}
                      alt="VietQR Payment"
                      className="w-40 h-40 mx-auto"
                    />
                  </div>

                  <p className="text-[11px] text-slate-600">
                    Nội dung CK: <span className="font-mono font-semibold text-blue-700">{createdOrder.id} {phone}</span>
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-700 transition cursor-pointer shadow-xs"
                >
                  Xong & Tiếp Tục Mua Sắm
                </button>
              </div>
            </div>
          ) : (
            /* ORDER FORM */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              {/* Package Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-lg text-blue-600">{packageItem.code}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 font-semibold text-xs rounded-md">
                      -{packageItem.discountPercent}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 mt-0.5 font-normal">
                    <span className="text-orange-600 font-semibold">{packageItem.dataAllowance}</span> • <span>{packageItem.voiceAllowance}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-black text-slate-900">
                    {formatNumberVND(packageItem.price)}
                  </div>
                  <div className="text-xs text-slate-400 line-through font-normal">
                    {formatNumberVND(packageItem.originalPrice)}
                  </div>
                </div>
              </div>

              {/* Validation Summary Warning Alert if incomplete */}
              {formErrorList.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3.5 text-xs animate-in fade-in duration-150 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>Vui lòng kiểm tra và nhập đủ các thông tin bắt buộc sau:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-red-600 pl-1 font-normal">
                    {formErrorList.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 1. CHOOSE PHYSICAL GIFT */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-orange-500" />
                    <span>1. Chọn Quà Tặng Tựu Trường:</span>
                  </label>
                  <span className="text-[10px] bg-slate-200 text-slate-800 font-normal px-2 py-0.5 rounded-md">
                    Số lượng có hạn
                  </span>
                </div>
                <p className="text-[11px] text-slate-800 font-normal">
                  * Quà tặng hiện vật được giao kèm SIM tận KTX/địa chỉ đăng ký Cần Thơ.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {packageItem.giftOptions.map((gift) => (
                    <label
                      key={gift}
                      className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 cursor-pointer transition font-normal ${
                        chosenGift === gift
                          ? 'bg-slate-100 text-slate-900 border-slate-300 shadow-xs font-medium'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="student-gift"
                        checked={chosenGift === gift}
                        onChange={() => setChosenGift(gift)}
                        className="hidden"
                      />
                      <Gift className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                      <span className="truncate">{gift}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. CHOOSE SIM FORMAT */}
              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>2. Chọn Hình Thức Nhận SIM / Kích Hoạt Gói:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-1 cursor-pointer transition font-normal ${
                      simOption === 'new_sim_physical'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-opt"
                      checked={simOption === 'new_sim_physical'}
                      onChange={() => {
                        setSimOption('new_sim_physical');
                        if (fieldErrors.existingPhone) {
                          setFieldErrors(prev => {
                            const u = { ...prev };
                            delete u.existingPhone;
                            return u;
                          });
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1">
                      <Truck className={`w-3.5 h-3.5 ${simOption === 'new_sim_physical' ? 'text-blue-600' : 'text-slate-500'}`} />
                      <span>SIM Mới Vật Lý</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Giao KTX trong 15 phút</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-1 cursor-pointer transition font-normal ${
                      simOption === 'new_sim_esim'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sim-opt"
                      checked={simOption === 'new_sim_esim'}
                      onChange={() => {
                        setSimOption('new_sim_esim');
                        if (fieldErrors.existingPhone) {
                          setFieldErrors(prev => {
                            const u = { ...prev };
                            delete u.existingPhone;
                            return u;
                          });
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1">
                      <QrCode className={`w-3.5 h-3.5 ${simOption === 'new_sim_esim' ? 'text-blue-600' : 'text-slate-500'}`} />
                      <span>Mã QR eSIM</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Quét kích hoạt 3 phút</span>
                  </label>

                  <label
                    className={`p-3 rounded-lg border text-xs flex flex-col gap-1 cursor-pointer transition font-normal ${
                      simOption === 'existing_sim'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
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
                      <Zap className={`w-3.5 h-3.5 ${simOption === 'existing_sim' ? 'text-blue-600' : 'text-slate-500'}`} />
                      <span>Gán SIM Đang Dùng</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Dùng số Vina hiện tại</span>
                  </label>
                </div>

                {simOption === 'existing_sim' && (
                  <div className="mt-2.5">
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Nhập số thuê bao VinaPhone đang dùng <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <input
                      type="tel"
                      value={existingPhone}
                      onChange={(e) => handleFieldChange('existingPhone', e.target.value, setExistingPhone)}
                      placeholder="VD: 0912345678"
                      className={`w-full px-3.5 py-2 bg-slate-50 border rounded-lg text-xs sm:text-sm font-normal focus:bg-white focus:outline-none transition ${
                        fieldErrors.existingPhone
                          ? 'border-red-400 focus:border-red-600 bg-red-50/20'
                          : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {fieldErrors.existingPhone && (
                      <p className="text-[11px] text-red-600 mt-1 font-normal flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{fieldErrors.existingPhone}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 3. STUDENT INFORMATION */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-blue-600" />
                  <span>3. Thông Tin Học Sinh - Sinh Viên & Địa Chỉ Nhận Hàng:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Họ và tên bạn <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => handleFieldChange('customerName', e.target.value, setCustomerName)}
                      placeholder="VD: Nguyễn Văn An"
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs sm:text-sm font-normal focus:bg-white focus:outline-none transition ${
                        fieldErrors.customerName
                          ? 'border-red-400 focus:border-red-600 bg-red-50/20'
                          : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {fieldErrors.customerName && (
                      <p className="text-[11px] text-red-600 mt-1 font-normal flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{fieldErrors.customerName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Số điện thoại nhận hàng/Zalo <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value, setPhone)}
                      placeholder="VD: 0987654321"
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs sm:text-sm font-normal focus:bg-white focus:outline-none transition ${
                        fieldErrors.phone
                          ? 'border-red-400 focus:border-red-600 bg-red-50/20'
                          : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 font-normal flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Can Tho Scope Alert */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-900 font-normal">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                      TP. CẦN THƠ
                    </span>
                    <span>Chỉ phục vụ giao nhanh KTX/Phòng trọ tại khu vực Cần Thơ</span>
                  </div>
                  <a href="tel:0818006881" className="font-semibold text-blue-600 hover:underline flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                    <span>08.1800 6881</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Trường Học / Viện / Ký Túc Xá tại Cần Thơ <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <select
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-normal text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                    >
                      {CAN_THO_SCHOOLS.map((school) => (
                        <option key={school} value={school}>
                          {school}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Quận / Huyện nhận SIM <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-normal text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Mã Sinh Viên / Lớp (Tùy chọn):
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="VD: B2201234 - K48 ĐH Cần Thơ"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-normal focus:bg-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      Địa chỉ chi tiết / Phòng KTX / Nhà trọ <span className="text-red-500 font-bold">*</span>:
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => handleFieldChange('address', e.target.value, setAddress)}
                      placeholder="VD: Phòng 204 KTX Khu 2 ĐHCT, Đ. 3/2"
                      className={`w-full px-3.5 py-2 bg-slate-50 border rounded-lg text-xs font-normal focus:bg-white focus:outline-none transition ${
                        fieldErrors.address
                          ? 'border-red-400 focus:border-red-600 bg-red-50/20'
                          : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                    {fieldErrors.address && (
                      <p className="text-[11px] text-red-600 mt-1 font-normal flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{fieldErrors.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. PAYMENT METHOD */}
              <div>
                <label className="block text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>4. Phương Thức Thanh Toán:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label
                    className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition font-normal ${
                      paymentMethod === 'vietqr'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="hidden"
                    />
                    <div className="font-medium">VietQR</div>
                    <div className="text-[10px] text-slate-400">Quét mã nhanh</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition font-normal ${
                      paymentMethod === 'cod'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="hidden"
                    />
                    <div className="font-medium">Tiền Mặt (COD)</div>
                    <div className="text-[10px] text-slate-400">Trả khi nhận sim</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition font-normal ${
                      paymentMethod === 'momo'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="hidden"
                    />
                    <div className="font-medium">Ví MoMo</div>
                    <div className="text-[10px] text-slate-400">Thanh toán ví</div>
                  </label>

                  <label
                    className={`p-2.5 rounded-lg border text-center text-xs cursor-pointer transition font-normal ${
                      paymentMethod === 'vnpay'
                        ? 'bg-blue-50/50 border-blue-600 text-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-method"
                      checked={paymentMethod === 'vnpay'}
                      onChange={() => setPaymentMethod('vnpay')}
                      className="hidden"
                    />
                    <div className="font-medium">VNPay QR</div>
                    <div className="text-[10px] text-slate-400">Thẻ / App Bank</div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-white" />
                  <span>XÁC NHẬN ĐĂNG KÝ GÓI • {formatNumberVND(packageItem.price)}</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2 font-normal">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
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

