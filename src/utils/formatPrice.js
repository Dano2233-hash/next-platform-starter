export function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return `${formatted} IQD`;
}
