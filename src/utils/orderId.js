export function generateOrderId() {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `DANO-${dateStr}-${randomStr}`;
}
