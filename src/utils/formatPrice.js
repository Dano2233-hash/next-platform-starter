export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  return new Intl.NumberFormat('en-US').format(amount) + ' IQD';
}
