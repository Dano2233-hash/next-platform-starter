export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Fast & Instant wallet transfer in Kurdistan / Iraq',
    accountDetails: '0750 XXX XXXX',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/50'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-Up',
    description: 'Direct transfer using Korek mobile payment',
    accountDetails: '0750 XXX XXXX',
    color: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/50'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'Local and international MasterCard transfers',
    accountDetails: 'Card Transfer ID: 5241-XXXX-XXXX-9821',
    color: 'from-blue-500/20 to-indigo-600/20 border-blue-500/50'
  }
];
