/**
 * Generates a unique readable order ID prefixing with DS-
 * Example: "DS-89241"
 *
 * @returns {string}
 */
export function generateOrderId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DS-${randomNum}`;
}
