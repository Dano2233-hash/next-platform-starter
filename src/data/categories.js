export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Monitor' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PRODUCT_TYPES = [
  { id: 'all', name: 'All Types' },
  { id: 'Top-Up', name: 'Top-Up' },
  { id: 'Game', name: 'Game' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Subscription', name: 'Subscription' },
  { id: 'Account', name: 'Account' },
];

export const CITIES = [
  'Erbil',
  'Sulaymaniyah',
  'Duhok',
  'Kirkuk',
  'Baghdad',
  'Basra',
  'Mosul',
  'Najaf',
  'Karbala',
  'Hilla',
  'Nasiriyah',
  'Amarah',
  'Diwaniyah',
  'Kut',
  'Ramadi',
  'Samarra',
  'Other City (Kurdistan / Iraq)',
];

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    description: 'Instant mobile wallet payment in Iraqi Dinar',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40',
    badge: 'Fast & Instant',
    instructions: 'Send the total amount to FastPay Number: 0750 123 4567, then send receipt screenshot via WhatsApp.',
  },
  {
    id: 'Korek',
    name: 'Korek Cash / Balance',
    description: 'Fast mobile transfer for Korek Telecom users',
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/40',
    badge: 'Popular in Kurdistan',
    instructions: 'Transfer the amount to Korek Number: 0750 987 6543 or transfer mobile credit, then contact support with your order ID.',
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / FIB Card',
    description: 'Local Iraqi Bank / MasterCard card transfer',
    color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40',
    badge: 'Secure Bank Transfer',
    instructions: 'Transfer via FIB (First Iraqi Bank) or MasterCard account. Account Number: 9876-5432-1011-1213.',
  },
];
