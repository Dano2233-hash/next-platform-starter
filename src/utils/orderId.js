/**
 * Generates a unique readable order ID for Dano Store.
 * Example: "DANO-892401"
 */
export const generateOrderId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomDigits}`;
};
