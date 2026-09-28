/**
 * Formats a number into IQD currency format.
 * Example: 15000 -> "15,000 IQD"
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '0 IQD';
  }
  return new Intl.NumberFormat('en-US').format(price) + ' IQD';
};
