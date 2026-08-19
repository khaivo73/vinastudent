import { StudentOrder } from '../types';

/**
 * Exports orders to an Excel-compatible CSV file with UTF-8 BOM so Vietnamese characters display properly.
 */
export function exportOrdersToCSV(orders: StudentOrder[]) {
  if (!orders || orders.length === 0) {
    alert('Chưa có đơn hàng nào để xuất file!');
    return;
  }

  const headers = [
    'Mã Đơn Hàng',
    'Thời Gian Đặt',
    'Họ Và Tên',
    'Số Điện Thoại',
    'Trường / KTX',
    'Mã Sinh Viên',
    'Địa Chỉ Nhận Hàng',
    'Gói Cước',
    'Chu Kỳ',
    'Quà Tặng Tháng 8',
    'Hình Thức SIM',
    'Số Thuê Bao Gán Gói',
    'Tổng Tiền (VNĐ)',
    'Phương Thức TT',
    'Trạng Thái',
    'Ghi Chú',
  ];

  const rows = orders.map((order) => {
    const item = order.items[0];
    const packageCode = item?.packageItem.code || '';
    const cycle = item?.packageItem.cycle || '';
    const gift = item?.selectedGift || '';
    let simOptionText = 'SIM Mới Vật Lý (KTX 15p)';
    if (item?.simOption === 'new_sim_esim') simOptionText = 'Mã QR eSIM (3p)';
    if (item?.simOption === 'existing_sim') simOptionText = 'Gán SIM Đang Dùng';
    const existingPhone = item?.existingPhoneNumber || '';

    return [
      `"${order.id}"`,
      `"${order.orderDate}"`,
      `"${order.customerName.replace(/"/g, '""')}"`,
      `"${order.phone}"`,
      `"${(order.schoolName || '').replace(/"/g, '""')}"`,
      `"${(order.studentId || '').replace(/"/g, '""')}"`,
      `"${(order.address || '').replace(/"/g, '""')}"`,
      `"${packageCode}"`,
      `"${cycle}"`,
      `"${gift.replace(/"/g, '""')}"`,
      `"${simOptionText}"`,
      `"${existingPhone}"`,
      order.totalAmount,
      `"${order.paymentMethod.toUpperCase()}"`,
      `"${order.status}"`,
      `"${(order.notes || '').replace(/"/g, '""')}"`,
    ].join(',');
  });

  // UTF-8 BOM (\uFEFF) ensures Microsoft Excel opens Vietnamese characters cleanly without mojibake
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `Don_Hang_VinaStudent_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Sends order data to a Google Sheets Webhook (Google Apps Script).
 */
export async function sendOrderToGoogleSheetsWebhook(webhookUrl: string, order: StudentOrder): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.trim().startsWith('http')) {
    return false;
  }

  try {
    const item = order.items[0];
    const payload = {
      orderId: order.id,
      orderDate: order.orderDate,
      customerName: order.customerName,
      phone: order.phone,
      schoolName: order.schoolName || 'Học sinh / Sinh viên',
      studentId: order.studentId || '',
      address: order.address,
      packageCode: item?.packageItem.code || '',
      cycle: item?.packageItem.cycle || '',
      gift: item?.selectedGift || '',
      simOption: item?.simOption || 'new_sim_physical',
      existingPhoneNumber: item?.existingPhoneNumber || '',
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
    };

    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // standard for Google Apps Script webhooks
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error('Error sending order to Google Sheets:', error);
    return false;
  }
}
