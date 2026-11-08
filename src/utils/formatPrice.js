/**
 * Format price in Iraqi Dinar (IQD)
 * @param {number|string} amount
 * @returns {string} e.g. "12,500 IQD"
 */
export function formatPrice(amount) {
  const numeric = typeof amount === 'number' ? amount : Number(amount) || 0;
  return `${new Intl.NumberFormat('en-US').format(numeric)} IQD`;
}

export default formatPrice;
