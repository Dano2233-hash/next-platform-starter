export const formatPrice = (price) => {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  return new Intl.NumberFormat('en-US').format(numericPrice) + ' IQD';
};

export default formatPrice;
