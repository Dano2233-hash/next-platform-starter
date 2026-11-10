/**
 * Generates a unique readable order ID
 * Example: "DS-948215"
 */
export function generateOrderId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `DS-${randomNum}`;
}

export default generateOrderId;
