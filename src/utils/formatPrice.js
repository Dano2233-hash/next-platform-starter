/**
 * Format a number or string into IQD format (e.g., "15,000 IQD")
 */
export function formatPrice(price) {
  const num = Number(price) || 0;
  return `${new Intl.NumberFormat('en-US').format(num)} IQD`;
}
