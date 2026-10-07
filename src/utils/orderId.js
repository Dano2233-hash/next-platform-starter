/**
 * Generates a unique order ID for Dano Store.
 * Format: DS-XXXXXX (e.g. DS-729401)
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}
