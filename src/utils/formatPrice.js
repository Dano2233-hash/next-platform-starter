/**
 * Formats a number price as IQD currency string.
 * @param {number} price
 * @returns {string} e.g. "15,000 IQD"
 */
export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
