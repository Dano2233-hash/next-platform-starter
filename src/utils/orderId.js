/**
 * Generates a unique order ID string.
 * @returns {string} e.g. "DS-20250520-9A8B"
 */
export const generateOrderId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
  return `DS-${dateStr}-${randomHex}`;
};
