export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'pc', name: 'PC' },
  { id: 'xbox', name: 'Xbox' },
  { id: 'playstation', name: 'PlayStation' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'giftcard', name: 'Gift Card' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '+964 750 123 4567',
    instructions: 'Send exact total amount to our FastPay number and click confirm order.',
    badge: 'Fast & Instant',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Transfer',
    accountNumber: '+964 750 987 6543',
    instructions: 'Transfer the amount to our Korek number or send Korek card codes via WhatsApp.',
    badge: 'Popular in Kurdistan',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Bank Transfer',
    accountNumber: 'FI-9823-4412-8821',
    instructions: 'Send transfer to FIB / MasterCard account and provide reference note on WhatsApp.',
    badge: 'Secure Bank Transfer',
    color: 'from-purple-600 to-indigo-600',
  },
];
