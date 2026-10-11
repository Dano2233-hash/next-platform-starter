/**
 * Generates a readable unique Order ID.
 * Example: #DS-84920
 */
export function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `#DS-${randomNum}`;
}
