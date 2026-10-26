/**
 * Generates a readable, unique order ID for Dano Store orders.
 * Example: DS-849201
 */
export function generateOrderId() {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomDigits}`;
}
