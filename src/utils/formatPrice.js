/**
 * Format price into IQD format e.g. "15,000 IQD" or "From 15,000 IQD"
 */
export function formatPrice(amount, prefixFrom = false) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount) + ' IQD';
  return prefixFrom ? `From ${formatted}` : formatted;
}
