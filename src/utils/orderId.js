/**
 * Generates a unique clean order ID for Dano Store
 * @returns {string} e.g. "DS-74921"
 */
export function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DS-${randomNum}`;
}
