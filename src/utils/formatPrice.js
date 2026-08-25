/**
 * Formats a given number into IQD currency string format.
 * Example: 25000 -> "25,000 IQD"
 * @param {number|string} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  const num = Number(amount) || 0;
  return `${new Intl.NumberFormat('en-US').format(num)} IQD`;
};
