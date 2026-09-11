/**
 * Formats a numeric price into IQD format (e.g. 25000 -> "25,000 IQD")
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
};

export default formatPrice;
