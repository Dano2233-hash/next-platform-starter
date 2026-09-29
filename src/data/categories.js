export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 XXX XXXX',
    description: 'Instant transfer via FastPay Wallet. Send exact IQD amount.',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40',
    badge: 'Fast & Instant',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    accountNumber: '0750 XXX XXXX',
    description: 'Fast mobile balance or Korek Cash transfer.',
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40',
    badge: 'Popular in Kurdistan',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / FIB Transfer',
    accountNumber: 'IBAN / Card No provided on checkout',
    description: 'Direct local bank card or FIB transfer.',
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40',
    badge: 'Secure Local Card',
  },
];
