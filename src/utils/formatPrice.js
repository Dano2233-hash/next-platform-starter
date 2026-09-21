export const formatPrice = (amount) => {
  if (typeof amount !== 'number') {
    amount = Number(amount) || 0;
  }
  return new Intl.NumberFormat('en-US').format(amount) + ' IQD';
};
