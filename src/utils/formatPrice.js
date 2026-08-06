export function formatPrice(price) {
  if (price === undefined || price === null) return '0 IQD';
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
