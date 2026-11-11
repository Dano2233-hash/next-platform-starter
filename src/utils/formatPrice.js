/**
 * Formats a number as Iraqi Dinar (IQD)
 * @param {number} amount
 * @returns {string} e.g. "25,000 IQD"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  return `${new Intl.NumberFormat('en-US').format(amount)} IQD`;
}

export default formatPrice;
