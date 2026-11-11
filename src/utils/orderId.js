/**
 * Generates a clean readable order ID
 * @returns {string} e.g. "DS-829104"
 */
export function generateOrderId() {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DS-${timestamp}${random}`;
}

export default generateOrderId;
