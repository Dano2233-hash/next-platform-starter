export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Service', name: 'Service' },
];

export const TYPES = [
  { id: 'all', name: 'All Types' },
  { id: 'Game', name: 'Game' },
  { id: 'Top-Up', name: 'Top-Up' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Subscription', name: 'Subscription' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Pay via FastPay mobile wallet',
    accountNumber: '0750 XXX XXXX',
    color: 'from-blue-600 to-cyan-500',
    icon: 'Wallet'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Card',
    description: 'Pay via Korek Telecom credit transfer',
    accountNumber: '0750 XXX XXXX',
    color: 'from-purple-600 to-indigo-600',
    icon: 'Phone'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Direct Transfer to Iraq MasterCard account',
    accountNumber: '5241 XXXX XXXX XXXX',
    color: 'from-cyan-600 to-blue-700',
    icon: 'CreditCard'
  }
];
