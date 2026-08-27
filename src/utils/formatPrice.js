/**
 * Formats a number price as IQD with comma separators.
 * Example: 25000 -> "25,000 IQD"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
}
