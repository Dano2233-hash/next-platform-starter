/**
 * Formats a numeric price into IQD currency format.
 * @param {number} price
 * @returns {string} Formatted price with IQD suffix
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  return `${Number(price).toLocaleString('en-US')} IQD`;
};
