/**
 * Generates a readable and unique Order ID for Dano Store
 * Format: DS-XXXXXX (e.g. DS-849201)
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}

export default generateOrderId;
