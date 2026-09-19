export function formatPrice(amount) {
  if (amount === undefined || amount === null) return '0 IQD';
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  return `${formatted} IQD`;
}
