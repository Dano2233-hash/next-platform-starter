/**
 * Formats a number to Iraqi Dinar (IQD) string representation.
 * Currency is strictly IQD only.
 * @param {number|string} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US').format(num) + ' IQD';
}

export default formatPrice;
