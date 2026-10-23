export function formatPrice(amount) {
  if (amount === undefined || amount === null) return '0 IQD';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${new Intl.NumberFormat('en-US').format(num)} IQD`;
}
