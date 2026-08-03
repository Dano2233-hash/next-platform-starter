export function formatPrice(amount) {
  const parsed = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US').format(parsed) + ' IQD';
}
