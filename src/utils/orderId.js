/**
 * Generates a unique order ID for Dano Store orders.
 */
export function generateOrderId() {
  const randomDigits = Math.floor(100000 + Math.random() * 900000)
  return `DANO-${randomDigits}`
}
