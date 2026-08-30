export const formatPrice = (amount, options = {}) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 IQD';
  }
  const formatted = new Intl.NumberFormat('en-US').format(amount);
  if (options.prefixFrom) {
    return `From ${formatted} IQD`;
  }
  return `${formatted} IQD`;
};
