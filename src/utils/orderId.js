/**
 * Generates a unique, professional Order ID for Dano Store.
 * Example format: DANO-8F9A2B
 * @returns {string}
 */
export const generateOrderId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DANO-${randomStr}`;
};
