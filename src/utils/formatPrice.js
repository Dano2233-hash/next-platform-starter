export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const numericAmount = Number(amount);
  const formatted = new Intl.NumberFormat('en-US').format(numericAmount);
  return `${formatted} IQD`;
};
