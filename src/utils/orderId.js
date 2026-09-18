/**
 * Generates a unique readable order ID for Dano Store.
 * e.g. "DS-89214"
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}
