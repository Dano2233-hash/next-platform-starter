/**
 * Generates a unique readable order ID, e.g. DS-948123
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}
