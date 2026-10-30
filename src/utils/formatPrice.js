export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  const num = Number(price);
  return `${new Intl.NumberFormat('en-US').format(num)} IQD`;
};
