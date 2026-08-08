/**
 * Format a number to IQD currency format
 * e.g., 25000 -> 25,000 IQD
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
