/**
 * Generate a clean unique order tracking number
 * Format: DS-XXXXXX (6 alphanumeric uppercase chars)
 */
export function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DS-${code}`;
}

export default generateOrderId;
