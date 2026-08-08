/**
 * Generate a unique and professional order ID
 * e.g., DS-948194
 * @returns {string}
 */
export function generateOrderId() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `DS-${num}`;
}
