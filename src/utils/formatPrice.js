/**
 * Format number into IQD currency string.
 * Example: 25000 -> "25,000 IQD"
 * @param {number|string} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const numericAmount = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('en-US').format(numericAmount);
  return `${formatted} IQD`;
}

export default formatPrice;
