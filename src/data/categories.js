export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Instant mobile wallet payment in Kurdistan & Iraq',
    accountNumber: '0750 123 4567',
    icon: 'Zap',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-up',
    description: 'Fast payment using Korek credit or Korek Cash',
    accountNumber: '0750 987 6543',
    icon: 'PhoneCall',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / NASS',
    description: 'Local card transfer or FIB online transfer',
    accountNumber: '5321 **** **** 8890',
    icon: 'CreditCard',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
];
