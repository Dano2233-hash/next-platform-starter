/**
 * Generates a unique order ID string.
 * @returns {string} Order reference code
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `DS-${randomNum}`;
};
