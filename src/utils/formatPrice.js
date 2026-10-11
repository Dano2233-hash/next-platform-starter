/**
 * Formats a numeric price into IQD format.
 * Example: 15000 -> "15,000 IQD"
 */
export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  const numericPrice = Number(price);
  const formatted = new Intl.NumberFormat('en-US').format(numericPrice);
  return `${formatted} IQD`;
}
