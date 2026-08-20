/**
 * Formats a numeric price into IQD currency format.
 * Example: 15000 -> "15,000 IQD"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
}
