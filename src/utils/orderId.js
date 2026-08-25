/**
 * Generates a unique order ID for Dano Store orders.
 * Format: DS-XXXXXX (e.g., DS-948210)
 * @returns {string}
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
};
