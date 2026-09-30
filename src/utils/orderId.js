export function generateOrderId() {
  const dateStr = new Date().getFullYear().toString();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${dateStr}-${randomNum}`;
}
