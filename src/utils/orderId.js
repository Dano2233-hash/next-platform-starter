/**
 * Generates a clean unique order number for Dano Store (e.g. DANO-23941)
 */
export function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DANO-${randomNum}`;
}
