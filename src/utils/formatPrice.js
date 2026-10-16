export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return '0 IQD';
  return new Intl.NumberFormat('en-US').format(amount) + ' IQD';
};
