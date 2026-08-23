/**
 * Formats a numeric price into IQD currency string format.
 * Example: 15000 -> "15,000 IQD"
 *
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
}
