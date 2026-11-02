/**
 * Format a number as IQD currency string.
 * Example: 15000 -> "15,000 IQD"
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 IQD';
  }
  return `${new Intl.NumberFormat('en-US').format(amount)} IQD`;
}
