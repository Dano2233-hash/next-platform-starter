/**
 * Generates a unique readable order ID for Dano Store orders
 * Example: DS-849201
 */
export const generateOrderId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomDigits}`;
};
