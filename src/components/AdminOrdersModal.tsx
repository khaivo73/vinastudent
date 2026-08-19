import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Clock, 
  Gift, 
  PhoneCall, 
  School, 
  ShieldCheck,
  Settings,
  HelpCircle
} from 'lucide-react';
import { StudentOrder } from '../types';
import { exportOrdersToCSV } from '../utils/exportUtils';
import { formatNumberVND } from '../utils/formatters';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: StudentOrder[];
  onDeleteOrder: (id: string) => void;
  onClearAllOrders: () => void;
  googleSheetsWebhookUrl: string;
  onSaveWebhookUrl: (url: string) => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onDeleteOrder,
  onClearAllOrders,
  googleSheetsWebhookUrl,
  onSaveWebhookUrl,
}) => {
  const [webhookInput, setWebhookInput] = useState(googleSheetsWebhookUrl);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    exportOrdersToCSV(orders);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveWebhookUrl(webhookInput.trim());
    alert('Đã lưu cấu hình Google Sheets Webhook!');
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

  const copyScriptCode = () => {
    navigator.clipboard.writeText(googleScriptTemplate);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="admin-orders-modal">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0072BC] to-[#005a96] text-white p-5 sm:p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-yellow-300">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">Quản Lý Đơn Hàng & Xuất Excel / Google Sheet</h3>
                <span className="bg-yellow-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
                  {orders.length} đơn
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Lưu trữ cục bộ an toàn trên trình duyệt & hỗ trợ xuất dữ liệu ra bảng tính
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                showConfig ? 'bg-white text-[#0072BC] border-white' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Cấu hình Google Sheets Webhook"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Cấu hình Google Sheet</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={orders.length === 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-md ${
                orders.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Xuất File Excel (.CSV UTF-8)</span>
            </button>

            {googleSheetsWebhookUrl && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Google Sheets: Đã kết nối tự động</span>
              </span>
            )}
          </div>

          {orders.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách đơn hàng đã lưu?')) {
                  onClearAllOrders();
                }
              }}
              className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa tất cả đơn</span>
            </button>
          )}
        </div>

        {/* Google Sheets Config Panel (Collapsible) */}
        {showConfig && (
          <div className="p-5 bg-blue-50/70 border-b border-blue-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>📊 Hướng Dẫn Tích Hợp Tự Động Vào Google Sheets (3 Bước)</span>
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Mỗi khi sinh viên đặt gói trên web, dữ liệu sẽ tự động đẩy thành 1 dòng mới vào file Google Sheet của bạn.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 bg-white p-4 rounded-2xl border border-blue-200">
                <span className="font-bold text-slate-800">Các bước thực hiện trên Google Sheet:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                  <li>Mở 1 file Google Sheet mới của bạn.</li>
                  <li>Vào menu <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>.</li>
                  <li>Dán đoạn mã bên cạnh vào và nhấn <strong>Lưu (Save)</strong>.</li>
                  <li>Nhấn nút <strong>Triển khai (Deploy)</strong> &gt; <strong>Tùy chọn triển khai mới (New deployment)</strong>.</li>
                  <li>Chọn loại <strong>Web app</strong>, mục <em>Who has access</em> chọn <strong>Anyone</strong> (Bất kỳ ai).</li>
                  <li>Copy <strong>Web app URL</strong> dán vào ô bên dưới và bấm Lưu.</li>
                </ol>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-2xl border border-blue-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">Mã Google Apps Script:</span>
                    <button
                      onClick={copyScriptCode}
                      className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-[#0072BC] rounded-lg font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                    >
                      {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Đã sao chép!' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-200 p-2.5 rounded-xl text-[10px] font-mono max-h-32 overflow-y-auto leading-snug">
                    {googleScriptTemplate}
                  </pre>
                </div>

                <form onSubmit={handleSaveWebhook} className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <input
                    type="url"
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:border-[#0072BC] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0072BC] hover:bg-[#005a96] text-white rounded-xl font-bold text-xs cursor-pointer transition"
                  >
                    Lưu URL
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">Chưa có đơn hàng nào được tạo</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Khi có khách hoặc bạn bấm thử đặt gói cước trên web, thông tin đơn hàng sẽ tự động lưu trữ tại đây và có thể xuất ra Excel bất cứ lúc nào!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[750px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-3 px-3">Mã Đơn</th>
                    <th className="py-3 px-3">Thời Gian</th>
                    <th className="py-3 px-3">Khách Hàng (HSSV)</th>
                    <th className="py-3 px-3">Trường / Địa Chỉ</th>
                    <th className="py-3 px-3">Gói Cước</th>
                    <th className="py-3 px-3">Quà Tháng 8</th>
                    <th className="py-3 px-3">Tổng Tiền</th>
                    <th className="py-3 px-2 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  {orders.map((order) => {
                    const item = order.items[0];
                    return (
                      <tr key={order.id} className="hover:bg-blue-50/50 transition">
                        <td className="py-3 px-3 font-mono font-bold text-[#0072BC]">
                          {order.id}
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                          {order.orderDate}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{order.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800 truncate max-w-[160px]">
                            {order.schoolName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate max-w-[160px]">
                            {order.address}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-slate-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {item?.packageItem.code}
                          </span>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {item?.packageItem.cycle}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 text-[#D90429] font-semibold text-[11px]">
                            <Gift className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate max-w-[130px]">{item?.selectedGift}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-black text-[#D90429]">
                          {formatNumberVND(order.totalAmount)}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => onDeleteOrder(order.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Xóa đơn này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 rounded-b-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dữ liệu lưu trữ bền vững trên LocalStorage & đồng bộ trực tiếp ra file Excel CSV Tiếng Việt chuẩn UTF-8</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
