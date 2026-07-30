/**
 * Generates a random professional order number.
 * Example: DS-48291
 */
export function generateOrderId() {
  const prefix = 'DS';
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit number
  return `${prefix}-${randomNum}`;
}
