export function formatPrice(price, showCurrency = true) {
  if (price === undefined || price === null || isNaN(price)) return '0 IQD';
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return showCurrency ? `${formatted} IQD` : formatted;
}
