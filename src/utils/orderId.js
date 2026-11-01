/**
 * Generate a unique, professional order number
 * e.g., DANO-89241-KRD
 */
export function generateOrderId() {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DANO-${timestamp}${random}`;
}
