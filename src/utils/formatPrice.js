/**
 * Formats a number as IQD price currency.
 * Example: 15000 -> "15,000 IQD"
 */
export function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) {
    return '0 IQD';
  }
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
