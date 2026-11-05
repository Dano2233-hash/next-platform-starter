/**
 * Format a number as IQD currency string.
 * Example: 15000 -> "15,000 IQD"
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number') {
    const parsed = Number(amount);
    if (isNaN(parsed)) return '0 IQD';
    amount = parsed;
  }
  return new Intl.NumberFormat('en-US').format(amount) + ' IQD';
}
