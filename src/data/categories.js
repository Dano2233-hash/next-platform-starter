export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Layers' },
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
    description: 'Instant transfer via FastPay Mobile Wallet',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    icon: 'Zap',
    badge: 'Instant'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    description: 'Fast payment via Korek Telecom',
    accountNumber: '0750 765 4321',
    accountName: 'Dano Store Korek',
    icon: 'PhoneCall',
    badge: 'Popular'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Bank Transfer',
    description: 'Direct local bank card or FIB transfer',
    accountNumber: 'FI00-9876-5432-1098',
    accountName: 'Dano Store Digital',
    icon: 'CreditCard',
    badge: 'Secure'
  }
];
