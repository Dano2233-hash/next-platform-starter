export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '0750 XXX XXXX',
    description: 'Instant transfer via FastPay App',
    badge: 'Popular in Kurdistan'
  },
  {
    id: 'korek',
    name: 'Korek Cash',
    type: 'Mobile Top-Up / Wallet',
    accountNumber: '0750 XXX XXXX',
    description: 'Instant mobile payment via Korek',
    badge: 'Local Kurdistan'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / First Iraqi Bank',
    type: 'Bank Transfer',
    accountNumber: 'IQ00 FIB XXXX XXXX XXXX',
    description: 'Direct bank transfer or card deposit',
    badge: 'Iraq & Kurdistan'
  }
];
