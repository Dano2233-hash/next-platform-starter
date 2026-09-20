export const categories = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid PC/Console Games', icon: 'Monitor' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Tv' }
];

export const platforms = [
  { id: 'all', name: 'All Platforms' },
  { id: 'pc', name: 'PC' },
  { id: 'playstation', name: 'PlayStation' },
  { id: 'xbox', name: 'Xbox' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'gift-card', name: 'Gift Card' }
];

export const paymentMethods = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    description: 'Instant transfer via FastPay Iraq app',
    accountDetails: '0750 123 4567 (Dano Store FastPay)',
    badgeColor: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    type: 'Phone Transfer / Balance',
    description: 'Transfer balance to Korek phone number',
    accountDetails: '0750 987 6543 (Dano Store Korek)',
    badgeColor: 'from-amber-500 to-red-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Neo',
    type: 'Bank Transfer / Card',
    description: 'Direct card or FIB bank transfer in Iraq',
    accountDetails: 'IBAN / Card No: 8849-2049-1102-9938',
    badgeColor: 'from-purple-600 to-indigo-600'
  }
];
