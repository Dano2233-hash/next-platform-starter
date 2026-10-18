/**
 * Formats a number price into IQD currency string.
 * Example: 25000 -> "25,000 IQD"
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
};
