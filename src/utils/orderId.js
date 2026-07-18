export const generateOrderId = () => {
  const prefix = "DS-";
  const num = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `${prefix}${num}`;
};
