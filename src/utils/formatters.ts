export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

export function formatNumberVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
}

export function searchSimMatch(rawNumber: string, query: string): boolean {
  if (!query) return true;
  const cleanQuery = query.trim().replace(/[\s.-]/g, '');
  const cleanRaw = rawNumber.replace(/[\s.-]/g, '');

  // Wildcard search like *888 or 091* or *68*
  if (cleanQuery.includes('*')) {
    const regexPattern = '^' + cleanQuery.replace(/\*/g, '.*') + '$';
    try {
      const regex = new RegExp(regexPattern);
      return regex.test(cleanRaw);
    } catch {
      // fallback to basic inclusion
      return cleanRaw.includes(cleanQuery.replace(/\*/g, ''));
    }
  }

  return cleanRaw.includes(cleanQuery);
}
