export const generateOrderId = () => {
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestampPart = Date.now().toString().slice(-4);
  return `DANO-${randomPart}-${timestampPart}`;
};
