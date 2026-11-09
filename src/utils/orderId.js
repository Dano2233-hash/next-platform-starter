/**
 * Generates a unique readable order ID.
 * Example: "DANO-783419"
 * @returns {string}
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
}

export default generateOrderId;
