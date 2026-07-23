/**
 * Formats a numeric price into IQD format.
 * Sole currency is IQD. Formatted using Intl.NumberFormat('en-US') with suffix ' IQD'.
 *
 * @param {number} amount - The price amount to format
 * @returns {string} The formatted price string
 */
export function formatPrice(amount) {
  const value = amount || 0;
  const formatted = new Intl.NumberFormat('en-US').format(value);
  return `${formatted} IQD`;
}
