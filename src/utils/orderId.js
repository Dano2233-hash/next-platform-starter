/**
 * Generates a clean random order ID matching standard patterns
 * @returns {string}
 */
export function generateOrderId() {
  const timestamp = Date.now().toString().slice(-4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DANO-${timestamp}-${randomNum}`;
}
