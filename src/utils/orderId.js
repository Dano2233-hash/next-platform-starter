export function generateOrderId() {
  const chars = '0123456789';
  let randStr = '';
  for (let i = 0; i < 6; i++) {
    randStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DS-${randStr}`;
}
