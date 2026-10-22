/**
 * Generates a unique readable order reference code
 * Example: DS-84920
 */
export function generateOrderId() {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `DS-${randomDigits}`;
}
