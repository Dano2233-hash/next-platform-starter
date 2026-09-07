/**
 * Formats a numeric price into IQD format.
 * Example: 25000 -> "25,000 IQD"
 */
export function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) {
    return '0 IQD'
  }
  const formatted = new Intl.NumberFormat('en-US').format(Math.round(price))
  return `${formatted} IQD`
}
