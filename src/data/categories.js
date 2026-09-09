export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Tv' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Digital', name: 'Digital' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Instant mobile payment via FastPay app',
    accountNumber: '0750 XXX XXXX',
    badge: 'Popular',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    description: 'Fast transfer via Korek Telecom line',
    accountNumber: '0750 XXX XXXX',
    badge: 'Fast',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Pay with Fib / Local MasterCard transfer',
    accountNumber: 'XXXX-XXXX-XXXX-XXXX',
    badge: 'Secure',
    color: 'from-purple-600 to-indigo-600',
  },
];
