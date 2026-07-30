/**
 * Formats a number to IQD currency format.
 * Example: 15000 -> 15,000 IQD
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null) return '0 IQD';
  const formatter = new Intl.NumberFormat('en-US');
  return `${formatter.format(amount)} IQD`;
}
