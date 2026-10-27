/**
 * Generates a unique readable order ID prefixing DS (Dano Store) with digits.
 * Example: DS-849201
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
};
