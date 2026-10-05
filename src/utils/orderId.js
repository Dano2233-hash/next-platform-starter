/**
 * Generates a formatted unique order ID.
 * Example: "DANO-849201"
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomNum}`;
};

export default generateOrderId;
