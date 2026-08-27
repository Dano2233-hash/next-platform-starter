/**
 * Generates a unique readable order ID (e.g. DANO-849201)
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
}
