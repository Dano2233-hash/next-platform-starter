export const CATEGORIES = [
  { id: 'all', name: 'All Products', slug: 'all', icon: 'Grid' },
  { id: 'xbox', name: 'Xbox', slug: 'xbox', icon: 'Gamepad2' },
  { id: 'playstation', name: 'PlayStation', slug: 'playstation', icon: 'Tv' },
  { id: 'pc', name: 'PC Gaming', slug: 'pc', icon: 'Monitor' },
  { id: 'mobile', name: 'Mobile Top-Ups', slug: 'mobile', icon: 'Smartphone' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions', icon: 'Sparkles' },
  { id: 'others', name: 'Others', slug: 'others', icon: 'Layers' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Multiplatform', name: 'Multiplatform' },
];

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    accountName: 'Dano Store FastPay',
    accountNumber: '0750 123 4567',
    description: 'Instant manual transfer via FastPay Iraq app. Submit order and send screenshot.',
    badge: 'Popular in Kurdistan',
    color: 'from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30'
  },
  {
    id: 'Korek',
    name: 'Korek',
    accountName: 'Korek Telecom Cash / Balance',
    accountNumber: '0750 987 6543',
    description: 'Direct Korek Telecom transfer. Fast validation across Erbil, Sulaymaniyah, and Duhok.',
    badge: 'Direct Transfer',
    color: 'from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard',
    accountName: 'Dano Store FIB / FIB MasterCard',
    accountNumber: '5326 **** **** 9102',
    description: 'Manual IBAN or card-to-card transfer for MasterCard holders in Iraq.',
    badge: 'Universal Card',
    color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30'
  }
];
