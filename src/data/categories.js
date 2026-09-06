export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Grid' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Digital', name: 'Digital Service' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Fast & direct mobile wallet payment in Kurdistan/Iraq',
    icon: 'Zap',
    instructions: 'Send exact total to FastPay Number: 0750 123 4567. Use your order ID as payment reference.'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    description: 'Quick Korek transfer for instant processing',
    icon: 'PhoneCall',
    instructions: 'Transfer balance or Korek Cash to: 0750 987 6543.'
  },
  {
    id: 'mastercard',
    name: 'FIB / MasterCard',
    description: 'Direct card or FIB transfer',
    icon: 'CreditCard',
    instructions: 'Transfer to FIB Account / MasterCard: 1234-5678-9012-3456 (Account Name: Dano Store).'
  }
];
