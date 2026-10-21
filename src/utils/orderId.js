export function generateOrderId() {
  const prefix = 'DANO';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
}
