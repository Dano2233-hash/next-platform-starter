export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'pc', name: 'PC Gaming', icon: 'Monitor' },
  { id: 'playstation', name: 'PlayStation', icon: 'Gamepad2' },
  { id: 'xbox', name: 'Xbox', icon: 'Box' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    account: '0750 123 4567',
    instructions: 'Send exact total amount to FastPay number. Save transaction reference/screenshot.',
    color: 'from-blue-600 to-indigo-700',
    logoText: 'FastPay'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    account: '0750 987 6543',
    instructions: 'Transfer balance or send Korek top-up code via WhatsApp or note.',
    color: 'from-cyan-600 to-blue-700',
    logoText: 'Korek'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Iraq Pay',
    account: '6274-1002-3984-9012',
    instructions: 'Transfer total amount to card number. Attach receipt details after ordering.',
    color: 'from-purple-600 to-indigo-800',
    logoText: 'MasterCard'
  }
];
