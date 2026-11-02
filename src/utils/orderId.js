/**
 * Generate a clean, unique order ID for Dano Store.
 * Format: DS-XXXXXX (e.g., DS-849201)
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}
