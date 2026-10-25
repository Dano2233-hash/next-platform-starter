/**
 * Formats a number price into IQD string format
 * Example: formatPrice(15000) => "15,000 IQD"
 */
export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return `${formatted} IQD`;
}
