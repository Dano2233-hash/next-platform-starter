/**
 * Formats a number into IQD currency format: e.g. 15,000 IQD
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

/**
 * Formats starting price or range for products with packages
 * @param {Array} packages
 * @param {number} defaultPrice
 * @returns {string}
 */
export function formatProductPrice(product) {
  if (product?.packages && product.packages.length > 0) {
    const prices = product.packages.map((p) => p.price);
    const minPrice = Math.min(...prices);
    return `From ${formatPrice(minPrice)}`;
  }
  return formatPrice(product?.price || 0);
}
