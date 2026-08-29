/**
 * Generates a unique order ID for Dano Store orders.
 * Example: "DS-84920"
 */
export const generateOrderId = () => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `DS-${randomDigits}`;
};
