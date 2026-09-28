/**
 * Generates a unique order ID format e.g. DANO-894231
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
};
