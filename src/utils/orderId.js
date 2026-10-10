/**
 * Generates a unique readable order ID for Dano Store.
 * @returns {string} e.g. "DANO-894201"
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
};
