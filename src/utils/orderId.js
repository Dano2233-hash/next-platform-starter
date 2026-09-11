/**
 * Generates a unique readable order ID (e.g. "DANO-8A3F91")
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

export default generateOrderId;
