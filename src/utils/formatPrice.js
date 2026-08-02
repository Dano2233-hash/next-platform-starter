/**
 * Formats a number price as IQD with thousands separators
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  const formatter = new Intl.NumberFormat('en-US');
  return `${formatter.format(value)} IQD`;
}
