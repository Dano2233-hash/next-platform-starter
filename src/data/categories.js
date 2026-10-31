export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming', icon: 'Monitor' },
  { id: 'Xbox', name: 'Xbox', icon: 'Gamepad2' },
  { id: 'PlayStation', name: 'PlayStation', icon: 'Tv' },
  { id: 'Mobile', name: 'Mobile', icon: 'Smartphone' },
  { id: 'Gift Card', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'Subscription', name: 'Subscriptions', icon: 'Sparkles' }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'Games', name: 'Games' },
  { id: 'Mobile Top-Up', name: 'Mobile Top-Ups' },
  { id: 'Gift Cards', name: 'Gift Cards' },
  { id: 'Subscriptions', name: 'Subscriptions' },
  { id: 'Others', name: 'Others' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Direct FastPay transfer via Mobile Number or FastPay QR / Account',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    badge: 'Popular in Kurdistan',
    color: 'emerald'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    description: 'Korek Cash / Balance transfer to authorized Dano Store wallet',
    accountNumber: '0750 987 6543',
    accountName: 'Dano Store Korek',
    badge: 'Fast & Instant',
    color: 'blue'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Direct manual bank transfer to authorized Dano Store Iraqi MasterCard IBAN',
    accountNumber: 'IQ88 0000 1234 5678 9012',
    accountName: 'DANO DIGITAL SERVICES',
    badge: 'Direct Card Transfer',
    color: 'purple'
  }
];
