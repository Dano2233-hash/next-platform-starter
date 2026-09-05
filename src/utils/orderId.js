/**
 * Generates a unique clean order ID for Dano Store
 * Example: "DS-892415"
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
};
