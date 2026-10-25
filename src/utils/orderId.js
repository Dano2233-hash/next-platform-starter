/**
 * Generates a unique clean order ID for customer receipts
 * Example: DS-849201
 */
export function generateOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `DS-${random}`;
}
