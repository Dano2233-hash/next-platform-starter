export const CATEGORIES = [
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone', description: 'Instant game top-ups, coins & diamonds for mobile games' },
  { id: 'pc', name: 'PC Gaming', icon: 'Monitor', description: 'Steam keys, digital codes, and PC game top-ups' },
  { id: 'playstation', name: 'PlayStation', icon: 'Gamepad2', description: 'PSN cards, subscriptions, and games' },
  { id: 'xbox', name: 'Xbox', icon: 'Tv', description: 'Xbox Game Pass, gift cards, and console games' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'CreditCard', description: 'Steam, Google Play, Apple, Razer Gold & store cards' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap', description: 'Discord Nitro, YouTube Premium, Spotify & digital tools' },
];

export const PLATFORMS = [
  { id: 'Mobile', name: 'Mobile' },
  { id: 'PC', name: 'PC' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Multi-Platform', name: 'Multi-Platform' },
];

export const PRODUCT_TYPES = [
  'Game',
  'Top-Up',
  'Gift Card',
  'Subscription',
  'Account'
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 XXX XXXX',
    description: 'Fast and secure mobile payment in Iraq & Kurdistan',
    instructions: 'Send total amount to our FastPay number and enter your transaction details.',
    logoColor: 'from-pink-600 to-purple-600',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Airtime',
    accountNumber: '0750 XXX XXXX',
    description: 'Instant Korek payment',
    instructions: 'Transfer the exact amount using Korek Cash or balance transfer to complete order.',
    logoColor: 'from-amber-500 to-red-600',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / FIB Transfer',
    accountNumber: 'XXXX-XXXX-XXXX-XXXX',
    description: 'Direct Iraqi Bank Card / FIB transfer',
    instructions: 'Transfer funds via FIB or Iraqi MasterCard and keep transaction ID ready.',
    logoColor: 'from-blue-600 to-cyan-500',
  }
];
