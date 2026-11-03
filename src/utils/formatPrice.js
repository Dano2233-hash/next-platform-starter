/**
 * Format number into Iraqi Dinar (IQD) string
 * @param {number} price
 * @returns {string} e.g. "25,000 IQD"
 */
export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(price);
  return `${formatted} IQD`;
}

export default formatPrice;
