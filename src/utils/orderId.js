/**
 * Generate a unique readable Order ID
 * Format: DS-XXXXXX (6 alphanumeric uppercase chars)
 */
export function generateOrderId() {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestampPart = Date.now().toString(36).substring(4).toUpperCase();
  return `DS-${timestampPart}${randomPart}`.substring(0, 11);
}

export default generateOrderId;
