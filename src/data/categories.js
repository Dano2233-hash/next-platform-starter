export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'pc', name: 'PC Games', icon: 'Monitor' },
  { id: 'xbox', name: 'Xbox Games', icon: 'Gamepad2' },
  { id: 'playstation', name: 'PlayStation', icon: 'Tv' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Multi-Platform', name: 'Multi-Platform' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '0750 123 4567',
    instructions: 'Send exact total amount to FastPay number: 0750 123 4567',
    badge: 'Fast & Auto',
  },
  {
    id: 'korek',
    name: 'Korek Cash / Transfer',
    type: 'Telecom Transfer',
    accountNumber: '0750 987 6543',
    instructions: 'Transfer exact amount or Korek balance to 0750 987 6543',
    badge: 'Popular in Kurdistan',
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / First Iraqi Bank',
    type: 'Bank Transfer',
    accountNumber: 'IQ88 FIBK 0000 1122 3344 55',
    instructions: 'Transfer to FIB account: IQ88 FIBK 0000 1122 3344 55',
    badge: 'Bank Card',
  },
];
