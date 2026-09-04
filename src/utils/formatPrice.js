export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '0 IQD';
  }
  return `${new Intl.NumberFormat('en-US').format(price)} IQD`;
};
