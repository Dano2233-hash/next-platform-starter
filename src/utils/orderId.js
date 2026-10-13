export function generateOrderId() {
  const randomHex = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomHex}`;
}
