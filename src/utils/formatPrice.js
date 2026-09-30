export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
}
