export function formatPrice(price) {
  if (price === undefined || price === null) return '';
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
