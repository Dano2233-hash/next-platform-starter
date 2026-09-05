export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Digital', name: 'Digital Services' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '+964 750 000 0000',
    color: 'from-amber-500 to-orange-600',
    badge: 'Instant Transfer',
    instruction: 'Send the exact order amount to our FastPay number and enter your transaction details after order creation.'
  },
  {
    id: 'korek',
    name: 'Korek Cash',
    type: 'Mobile Balance / Wallet',
    accountNumber: '+964 750 111 2222',
    color: 'from-red-600 to-rose-700',
    badge: 'Popular in Kurdistan',
    instruction: 'Transfer the required total IQD to our Korek number. We will confirm your payment shortly.'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    type: 'Iraqi Bank Transfer / Card',
    accountNumber: '5399 **** **** 8821',
    color: 'from-blue-600 to-indigo-700',
    badge: 'Direct Card Transfer',
    instruction: 'Transfer payment directly to our MasterCard account number. Fast verification guarantee.'
  }
];
