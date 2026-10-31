/**
 * Generates an easily readable, unique order ID for Dano Store.
 * Example: DS-784920
 */
export function generateOrderId() {
  const timestampPart = Date.now().toString().slice(-4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `DS-${timestampPart}${randomPart}`;
}
