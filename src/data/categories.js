export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile-topup', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'PC & Console Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Tv' },
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
    description: 'Instant mobile wallet payment in Kurdistan & Iraq',
    accountNumber: '+964 750 123 4567',
    badge: 'Recommended',
    logoBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    description: 'Fast transfer via Korek telecom credit',
    accountNumber: '+964 750 987 6543',
    badge: 'Popular',
    logoBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / NASS',
    description: 'Local card or FIB bank transfer',
    accountNumber: '9876 5432 1098 7654',
    badge: 'Card',
    logoBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
  }
];
