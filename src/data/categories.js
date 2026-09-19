export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Tv' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'Gift' },
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

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Pay quickly using your FastPay mobile wallet in Kurdistan / Iraq.',
    number: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    badge: 'Popular',
    iconColor: 'from-amber-500 to-orange-600'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Top-up',
    description: 'Pay via Korek balance transfer or Korek Cash.',
    number: '0750 987 6543',
    accountName: 'Dano Store Korek',
    badge: 'Instant',
    iconColor: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB',
    description: 'Transfer via First Iraqi Bank (FIB) or local MasterCard.',
    number: 'IQ99 FIB 0001 2345 6789 01',
    accountName: 'Dano Store Digital Services',
    badge: 'Bank Transfer',
    iconColor: 'from-cyan-500 to-blue-600'
  }
];
