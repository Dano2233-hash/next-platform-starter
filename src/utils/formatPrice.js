/**
 * Formats a number as IQD currency string.
 * @param {number} amount
 * @returns {string} e.g. "15,000 IQD"
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 IQD';
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
};
