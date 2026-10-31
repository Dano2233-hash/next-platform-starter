/**
 * Formats a number to Iraqi Dinar (IQD) display string.
 * Example: formatPrice(12500) => "12,500 IQD"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
  return `${formatted} IQD`;
}
