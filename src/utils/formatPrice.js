/**
 * Format a number to IQD currency format
 * e.g., 25000 -> "25,000 IQD"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
  return `${formatted} IQD`;
}
