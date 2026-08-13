/**
 * Format dynamic numbers into Kurdistan & Iraqi Dinars standard format (e.g. 15,000 IQD).
 * Sole currency is IQD. Format using Intl.NumberFormat('en-US') with suffix " IQD".
 */
export function formatPrice(amount) {
  const parsed = Number(amount);
  if (isNaN(parsed)) return '0 IQD';
  return new Intl.NumberFormat('en-US').format(parsed) + ' IQD';
}
