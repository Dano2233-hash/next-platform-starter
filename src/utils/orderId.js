/**
 * Generates a professional, unique order ID for the Dano Store.
 * Format: DS-[YEAR][MONTH][DAY]-[RANDOM_NUMBER]
 *
 * @returns {string} The generated order ID
 */
export function generateOrderId() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Generate a random 4-digit number
  const random = Math.floor(1000 + Math.random() * 9000);

  return `DS-${year}${month}${day}-${random}`;
}
