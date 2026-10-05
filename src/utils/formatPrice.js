/**
 * Formats a number or string price into standard IQD currency format.
 * Example: 15000 -> "15,000 IQD"
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(Number(price))) {
    return '0 IQD';
  }

  const num = Number(price);
  return `${new Intl.NumberFormat('en-US').format(num)} IQD`;
};

export default formatPrice;
