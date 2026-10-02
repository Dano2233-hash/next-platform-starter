/**
 * Formats a numeric price into IQD format.
 * Example: 15000 -> "15,000 IQD"
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return `${formatted} IQD`;
};
