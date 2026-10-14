/**
 * Generates a readable order ID for Dano Store orders.
 * Example: DS-948201
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}
