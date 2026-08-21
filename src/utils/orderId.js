export const generateOrderId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `DANO-${randomDigits}`;
};
