/**
 * Generates a unique, readable order ID.
 * Example: "DANO-892104"
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
};
