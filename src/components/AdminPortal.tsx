import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Trash2, 
  CheckCircle, 
  Copy, 
  Clock, 
  Gift, 
  PhoneCall, 
  School, 
  ShieldCheck,
  Settings,
  HelpCircle,
  Users,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  PlusCircle,
  LogOut,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Smartphone,
  QrCode,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { StudentOrder, OrderStatus, StudentPackage } from '../types';
import { STUDENT_PACKAGES, AUGUST_CAMPAIGN_INFO } from '../data/studentPackageData';
import { exportOrdersToCSV, sendOrderToGoogleSheetsWebhook } from '../utils/exportUtils';
import { formatNumberVND } from '../utils/formatters';

interface AdminPortalProps {
  orders: StudentOrder[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, staffNote?: string) => void;
  onDeleteOrder: (id: string) => void;
  onClearAllOrders: () => void;
  onAddNewOrder: (order: StudentOrder) => void;
  googleSheetsWebhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
  onSwitchToCustomerView: () => void;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onClearAllOrders,
  onAddNewOrder,
  googleSheetsWebhookUrl,
  onSaveWebhookUrl,
  onSwitchToCustomerView,
  onLogout,
}) => {
  // State
  const [activeTab, setActiveTab] = useState<'orders' | 'pos' | 'analytics' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('ALL');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<StudentOrder | null>(null);

  // Google Sheets Config
  const [webhookInput, setWebhookInput] = useState(googleSheetsWebhookUrl);
  const [copiedCode, setCopiedCode] = useState(false);

  // POS State (Tạo đơn tại quầy tiếp thị)
  const [posCustomerName, setPosCustomerName] = useState('');
  const [posPhone, setPosPhone] = useState('');
  const [posSchool, setPosSchool] = useState('');
  const [posStudentId, setPosStudentId] = useState('');
  const [posAddress, setPosAddress] = useState('');
  const [posPackageId, setPosPackageId] = useState(STUDENT_PACKAGES[0].id);
  const [posGift, setPosGift] = useState(STUDENT_PACKAGES[0].giftOptions[0]);
  const [posSimOption, setPosSimOption] = useState<'new_sim_physical' | 'new_sim_esim' | 'existing_sim'>('new_sim_physical');
  const [posExistingPhone, setPosExistingPhone] = useState('');
  const [posPaymentMethod, setPosPaymentMethod] = useState<'vietqr' | 'cod' | 'momo' | 'vnpay'>('cod');
  const [posNotes, setPosNotes] = useState('');

  // Selected POS package object
  const selectedPosPackage = useMemo(() => {
    return STUDENT_PACKAGES.find((p) => p.id === posPackageId) || STUDENT_PACKAGES[0];
  }, [posPackageId]);

  // Analytics KPI
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.totalAmount : sum), 0);
    const pendingCount = orders.filter((o) => o.status === 'pending').length;
    const shippingCount = orders.filter((o) => o.status === 'shipping').length;
    const completedCount = orders.filter((o) => o.status === 'completed').length;
    const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

    // Package breakdown
    const packageStats: { [code: string]: number } = {};
    const giftStats: { [gift: string]: number } = {};

    orders.forEach((o) => {
      if (o.status !== 'cancelled') {
        o.items.forEach((item) => {
          const code = item.packageItem.code;
          packageStats[code] = (packageStats[code] || 0) + item.quantity;
          if (item.selectedGift) {
            giftStats[item.selectedGift] = (giftStats[item.selectedGift] || 0) + item.quantity;
          }
        });
      }
    });

    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingCount,
      shippingCount,
      completedCount,
      cancelledCount,
      packageStats,
      giftStats,
    };
  }, [orders]);

  // Distinct schools in orders
  const distinctSchools = useMemo(() => {
    const schools = new Set<string>();
    orders.forEach((o) => {
      if (o.schoolName && o.schoolName.trim()) {
        schools.add(o.schoolName.trim());
      }
    });
    return Array.from(schools);
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== 'ALL' && order.status !== statusFilter) {
        return false;
      }
      if (schoolFilter !== 'ALL' && order.schoolName !== schoolFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesName = order.customerName.toLowerCase().includes(q);
        const matchesPhone = order.phone.toLowerCase().includes(q);
        const matchesSchool = (order.schoolName || '').toLowerCase().includes(q);
        const matchesPkg = order.items.some((it) => it.packageItem.code.toLowerCase().includes(q));
        if (!matchesId && !matchesName && !matchesPhone && !matchesSchool && !matchesPkg) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, schoolFilter, searchQuery]);

  const handleExportCSV = () => {
    exportOrdersToCSV(orders);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWebhookUrl(webhookInput.trim());
    alert('Đã lưu thành công Google Sheets Webhook URL!');
  };

  // Submit POS Order
  const handleCreatePosOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName.trim() || !posPhone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại của sinh viên!');
      return;
    }

    const orderId = `POS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: StudentOrder = {
      id: orderId,
      customerName: posCustomerName,
      schoolName: posSchool || 'Gian hàng VinaPhone Cần Thơ',
      studentId: posStudentId,
      phone: posPhone,
      address: posAddress || 'Nhận tại quầy tiếp thị TP. Cần Thơ',
      city: 'TP. Cần Thơ',
      district: 'Ninh Kiều',
      deliveryMethod: posSimOption === 'new_sim_esim' ? 'instant_esim' : 'pickup_booth',
      paymentMethod: posPaymentMethod,
      items: [
        {
          packageItem: selectedPosPackage,
          quantity: 1,
          selectedGift: posGift,
          simOption: posSimOption,
          existingPhoneNumber: posExistingPhone,
        },
      ],
      totalAmount: selectedPosPackage.price,
      orderDate: new Date().toLocaleString('vi-VN'),
      status: 'completed', // completed instantly at booth
      notes: posNotes,
      staffNote: 'Đơn tạo trực tiếp tại Quầy Tiếp Thị / Booth Trường Học',
    };

    onAddNewOrder(newOrder);

    // Send to Google Sheets webhook if configured
    if (googleSheetsWebhookUrl) {
      sendOrderToGoogleSheetsWebhook(googleSheetsWebhookUrl, newOrder);
    }

    alert(`Đã tạo thành công đơn hàng tại quầy: ${orderId}`);

    // Reset POS fields
    setPosCustomerName('');
    setPosPhone('');
    setPosStudentId('');
    setPosAddress('');
    setPosNotes('');
    setActiveTab('orders');
  };

  const googleScriptTemplate = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Nếu sheet rỗng, thêm tiêu đề cột
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã Đơn", "Thời Gian", "Họ Tên", "SĐT", "Trường/KTX", 
        "Mã SV", "Địa Chỉ", "Gói Cước", "Chu Kỳ", "Quà Tháng 8", 
        "Hình Thức SIM", "SĐT Gán Gói", "Tổng Tiền", "Thanh Toán"
      ]);
    }
    
    // Thêm dòng dữ liệu đơn hàng
    sheet.appendRow([
      data.orderId,
      data.orderDate,
      data.customerName,
      data.phone,
      data.schoolName,
      data.studentId,
      data.address,
      data.packageCode,
      data.cycle,
      data.gift,
      data.simOption,
      data.existingPhoneNumber,
      data.totalAmount,
      data.paymentMethod
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans" id="admin-portal-view">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#0c2438] text-white border-b-2 border-[#0072BC] sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0072BC] text-white flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg text-white">VNPT VinaPhone</span>
                <span className="bg-[#D90429] text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-blue-200">Hệ Thống Quản Lý Chiến Dịch Tựu Trường 2026</p>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="flex items-center gap-1 bg-black/25 p-1 rounded-2xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#0072BC] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Đơn Hàng ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pos')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pos' ? 'bg-[#D90429] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tạo Đơn Tại Quầy (POS)</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'analytics' ? 'bg-[#0072BC] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Thống Kê KPI</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'settings' ? 'bg-[#0072BC] text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Google Sheet Webhook</span>
            </button>
          </div>

          {/* Right Controls: Switch to Storefront & Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToCustomerView}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Xem Giao Diện Sinh Viên</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 bg-white/10 hover:bg-red-600/80 text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        
        {/* KPI Mini-Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">Doanh Thu Tổng</div>
              <div className="text-xl sm:text-2xl font-black text-[#0072BC] font-mono mt-0.5">
                {formatNumberVND(stats.totalRevenue)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Từ {stats.totalOrders} đơn hàng đăng ký</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0072BC] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">Chờ Xử Lý</div>
              <div className="text-xl sm:text-2xl font-black text-amber-500 font-mono mt-0.5">
                {stats.pendingCount} đơn
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Cần gọi xác nhận thông tin</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">Đang Giao KTX 15p</div>
              <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono mt-0.5">
                {stats.shippingCount} đơn
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Shipper đang trên đường giao</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400">Đã Hoàn Thành</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5">
                {stats.completedCount} đơn
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Đã kích hoạt SIM & trao quà</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* TAB 1: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Filter Bar & Export */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              
              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
                
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên, SĐT, mã đơn, trường học..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#0072BC] rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Status Selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="ALL">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="shipping">Đang giao KTX (15p)</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>

                {/* School Selector */}
                {distinctSchools.length > 0 && (
                  <select
                    value={schoolFilter}
                    onChange={(e) => setSchoolFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 max-w-[180px]"
                  >
                    <option value="ALL">Tất cả trường</option>
                    {distinctSchools.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExportCSV}
                  disabled={orders.length === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md ${
                    orders.length > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Xuất File Excel (.CSV UTF-8)</span>
                </button>

                <button
                  onClick={() => setActiveTab('pos')}
                  className="px-4 py-2 bg-[#D90429] hover:bg-[#b80323] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-600/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Tạo Đơn Quầy</span>
                </button>
              </div>

            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-3.5">Mã Đơn / Ngày</th>
                      <th className="py-3 px-3.5">Học Sinh - Sinh Viên</th>
                      <th className="py-3 px-3.5">Trường Học / Địa Chỉ KTX</th>
                      <th className="py-3 px-3.5">Gói Cước & Quà Tặng</th>
                      <th className="py-3 px-3.5">Tổng Tiền / TT</th>
                      <th className="py-3 px-3.5 text-center">Trạng Thái Đơn</th>
                      <th className="py-3 px-3.5 text-center">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                          <Package className="w-10 h-10 mx-auto text-slate-300" />
                          <p className="font-bold">Không tìm thấy đơn hàng nào phù hợp bộ lọc</p>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const item = order.items[0];
                        return (
                          <tr key={order.id} className="hover:bg-blue-50/40 transition">
                            {/* Order ID & Date */}
                            <td className="py-3 px-3.5">
                              <div className="font-mono font-bold text-[#0072BC]">{order.id}</div>
                              <div className="text-[10px] text-slate-400 whitespace-nowrap">{order.orderDate}</div>
                            </td>

                            {/* Customer */}
                            <td className="py-3 px-3.5">
                              <div className="font-bold text-slate-900">{order.customerName}</div>
                              <a href={`tel:${order.phone}`} className="text-[11px] text-[#0072BC] font-mono hover:underline flex items-center gap-1">
                                <PhoneCall className="w-3 h-3" />
                                <span>{order.phone}</span>
                              </a>
                            </td>

                            {/* School & Address */}
                            <td className="py-3 px-3.5 max-w-[200px]">
                              <div className="font-bold text-slate-800 truncate" title={order.schoolName}>
                                {order.schoolName || 'Chưa rõ'}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate" title={order.address}>
                                {order.address}
                              </div>
                            </td>

                            {/* Package & Gift */}
                            <td className="py-3 px-3.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-slate-900 bg-blue-50 px-2 py-0.2 rounded border border-blue-100">
                                  {item?.packageItem.code}
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold">
                                  ({item?.packageItem.cycle})
                                </span>
                              </div>
                              <div className="text-[11px] text-[#D90429] font-bold flex items-center gap-1 mt-0.5">
                                <Gift className="w-3 h-3 shrink-0" />
                                <span className="truncate max-w-[140px]">{item?.selectedGift}</span>
                              </div>
                            </td>

                            {/* Total & Payment */}
                            <td className="py-3 px-3.5">
                              <div className="font-black text-sm text-[#D90429]">
                                {formatNumberVND(order.totalAmount)}
                              </div>
                              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-slate-100 rounded text-slate-600">
                                {order.paymentMethod}
                              </span>
                            </td>

                            {/* Status Changer */}
                            <td className="py-3 px-3.5 text-center">
                              <select
                                value={order.status}
                                onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                className={`text-[11px] font-bold rounded-xl px-2.5 py-1 border cursor-pointer ${
                                  order.status === 'pending'
                                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                                    : order.status === 'shipping'
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : order.status === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : 'bg-red-50 text-red-700 border-red-300'
                                }`}
                              >
                                <option value="pending">⏳ Chờ xác nhận</option>
                                <option value="shipping">🚚 Đang giao KTX</option>
                                <option value="completed">✅ Đã hoàn thành</option>
                                <option value="cancelled">❌ Đã hủy</option>
                              </select>
                            </td>

                            {/* Action */}
                            <td className="py-3 px-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedOrderDetails(order)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                  title="Xem chi tiết đơn"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => {
                                    if (confirm(`Xác nhận xóa đơn hàng ${order.id}?`)) {
                                      onDeleteOrder(order.id);
                                    }
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Xóa đơn"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: POINT OF SALE (POS) - TẠO ĐƠN TẠI QUẦY TIẾP THỊ TRƯỜNG HỌC */}
        {activeTab === 'pos' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-black text-[#D90429] uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>QUẦY TIẾP THỊ & TƯ VẤN TRỰC TIẾP TẠI TRƯỜNG</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  Tạo Đơn Nhanh Cho Học Sinh - Sinh Viên (POS)
                </h3>
              </div>
              <span className="bg-yellow-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full">
                Cấp SIM & Quà Ngay
              </span>
            </div>

            <form onSubmit={handleCreatePosOrder} className="space-y-4 text-xs">
              
              {/* Row 1: Student info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Họ và tên sinh viên *:</label>
                  <input
                    type="text"
                    required
                    value={posCustomerName}
                    onChange={(e) => setPosCustomerName(e.target.value)}
                    placeholder="VD: Lê Thị Hồng"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *:</label>
                  <input
                    type="tel"
                    required
                    value={posPhone}
                    onChange={(e) => setPosPhone(e.target.value)}
                    placeholder="VD: 0988123456"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: School & Student ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trường Học / KTX / Gian hàng:</label>
                  <input
                    type="text"
                    value={posSchool}
                    onChange={(e) => setPosSchool(e.target.value)}
                    placeholder="VD: ĐH Bách Khoa - Booth Sân C1"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã Sinh Viên / Lớp:</label>
                  <input
                    type="text"
                    value={posStudentId}
                    onChange={(e) => setPosStudentId(e.target.value)}
                    placeholder="VD: 20261234"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Package Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chọn Gói Cước Sinh Viên:</label>
                <select
                  value={posPackageId}
                  onChange={(e) => {
                    setPosPackageId(e.target.value);
                    const selected = STUDENT_PACKAGES.find((p) => p.id === e.target.value);
                    if (selected) {
                      setPosGift(selected.giftOptions[0]);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-blue-50 border border-blue-300 rounded-xl font-bold text-slate-800 focus:outline-none text-xs sm:text-sm"
                >
                  {STUDENT_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.code} ({pkg.cycle}) - {formatNumberVND(pkg.price)} [{pkg.demand}]
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Gift Selector */}
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-2">
                <label className="block font-bold text-amber-900 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#D90429]" />
                  <span>Vật Phẩm Quà Tặng Tháng 8 (Xuất Tại Quầy):</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPosPackage.giftOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`p-2 rounded-xl border font-bold flex items-center gap-2 cursor-pointer transition ${
                        posGift === opt
                          ? 'bg-[#D90429] text-white border-red-700'
                          : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pos-gift"
                        checked={posGift === opt}
                        onChange={() => setPosGift(opt)}
                        className="hidden"
                      />
                      <Gift className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 5: Sim format */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPosSimOption('new_sim_physical')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                    posSimOption === 'new_sim_physical' ? 'bg-[#0072BC] text-white border-blue-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  SIM Mới Vật Lý
                </button>

                <button
                  type="button"
                  onClick={() => setPosSimOption('new_sim_esim')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                    posSimOption === 'new_sim_esim' ? 'bg-[#0072BC] text-white border-blue-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  Mã QR eSIM
                </button>

                <button
                  type="button"
                  onClick={() => setPosSimOption('existing_sim')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                    posSimOption === 'existing_sim' ? 'bg-[#0072BC] text-white border-blue-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  Gán SIM Hiện Tại
                </button>
              </div>

              {posSimOption === 'existing_sim' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số thuê bao VinaPhone gán gói:</label>
                  <input
                    type="tel"
                    required
                    value={posExistingPhone}
                    onChange={(e) => setPosExistingPhone(e.target.value)}
                    placeholder="VD: 0914112233"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              )}

              {/* Submit POS button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D90429] hover:bg-[#b80323] text-white rounded-full font-black text-sm shadow-xl shadow-red-600/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span>XÁC NHẬN TẠO ĐƠN & THU TIỀN: {formatNumberVND(selectedPosPackage.price)}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: KPI ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Package Breakdown */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#0072BC]" />
                  <span>Top Gói Cước Sinh Viên Đăng Ký Nhiều Nhất</span>
                </h4>

                <div className="space-y-2.5">
                  {Object.entries(stats.packageStats).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Chưa có dữ liệu đơn hàng</p>
                  ) : (
                    Object.entries(stats.packageStats).map(([code, rawCount]) => {
                      const count = Number(rawCount);
                      const percent = Math.round((count / Math.max(1, stats.totalOrders)) * 100);
                      return (
                        <div key={code} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-800">{code}</span>
                            <span className="text-[#0072BC]">{count} đơn ({percent}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-[#0072BC] h-2 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Gift Stock Breakdown */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#D90429]" />
                  <span>Thống Kê Vật Phẩm Quà Tặng Tháng 8 Đã Xuất</span>
                </h4>

                <div className="space-y-2.5">
                  {Object.entries(stats.giftStats).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Chưa có quà tặng nào được chọn</p>
                  ) : (
                    Object.entries(stats.giftStats).map(([gift, count]) => (
                      <div key={gift} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-xs">
                        <span className="font-bold text-amber-950">{gift}</span>
                        <span className="font-black text-[#D90429] bg-white px-2 py-0.5 rounded-full border border-amber-200">
                          {count} phần
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE SHEETS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase">
                <FileSpreadsheet className="w-4 h-4" />
                <span>TÍCH HỢP TỰ ĐỘNG ĐỒNG BỘ GOOGLE SHEETS</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                Cấu Hình Google Apps Script Webhook
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Khi sinh viên đặt mua gói hoặc nhân viên tạo đơn tại quầy, dữ liệu sẽ tự động đẩy thành 1 dòng mới vào Google Sheets ngay lập tức.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 text-sm">3 Bước cài đặt Google Sheet:</span>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 leading-relaxed">
                  <li>Mở 1 file Google Sheets trên Google Drive của bạn.</li>
                  <li>Vào menu <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                  <li>Dán đoạn mã bên cạnh vào và nhấn <strong>Lưu (Save)</strong>.</li>
                  <li>Nhấn nút <strong>Triển khai (Deploy)</strong> &gt; <strong>Tùy chọn triển khai mới</strong>.</li>
                  <li>Chọn loại <strong>Web app</strong>, mục <em>Who has access</em> chọn <strong>Anyone</strong>.</li>
                  <li>Copy <strong>Web app URL</strong> dán vào ô cấu hình bên dưới và bấm Lưu.</li>
                </ol>
              </div>

              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-800">Mã Script Đồng Bộ:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(googleScriptTemplate);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-[#0072BC] rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Đã sao chép!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <pre className="bg-slate-900 text-slate-200 p-3 rounded-2xl text-[10px] font-mono max-h-48 overflow-y-auto leading-snug">
                    {googleScriptTemplate}
                  </pre>
                </div>

                <form onSubmit={handleSaveWebhook} className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block font-bold text-slate-700">Dán Web App URL của bạn vào đây:</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={webhookInput}
                      onChange={(e) => setWebhookInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#0072BC] hover:bg-[#005a96] text-white rounded-xl font-bold text-xs cursor-pointer shadow-md transition"
                    >
                      Lưu URL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-slate-900">
                Chi Tiết Đơn Hàng: <span className="text-[#0072BC] font-mono">{selectedOrderDetails.id}</span>
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-bold text-slate-800">{selectedOrderDetails.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-bold text-[#0072BC] font-mono">{selectedOrderDetails.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Trường học:</span>
                <span className="font-bold text-slate-800">{selectedOrderDetails.schoolName}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Địa chỉ nhận hàng / KTX:</span>
                <span className="font-bold text-slate-800">{selectedOrderDetails.address}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Gói cước:</span>
                <span className="font-bold text-slate-800">{selectedOrderDetails.items[0]?.packageItem.code} ({selectedOrderDetails.items[0]?.packageItem.cycle})</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Quà tặng Tháng 8:</span>
                <span className="font-black text-[#D90429]">{selectedOrderDetails.items[0]?.selectedGift}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Tổng thanh toán:</span>
                <span className="font-black text-sm text-[#D90429]">{formatNumberVND(selectedOrderDetails.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
