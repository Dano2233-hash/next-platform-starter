/**
 * Formats a number as an IQD currency string.
 * Example: 15000 -> "15,000 IQD"
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return `${formatted} IQD`;
};
