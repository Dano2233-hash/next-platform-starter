export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'top-up', name: 'Mobile Top-Ups', slug: 'mobile-top-ups' },
  { id: 'games', name: 'Games', slug: 'games' },
  { id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', slug: 'subscriptions' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'pc', name: 'PC' },
  { id: 'playstation', name: 'PlayStation' },
  { id: 'xbox', name: 'Xbox' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'gift-card', name: 'Gift Card' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Instant Mobile Wallet Payment in Iraq',
    accountNumber: '0750 XXX XXXX',
    instructions: 'Send the total amount to our FastPay number and enter your order number as reference.'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Transfer',
    description: 'Korek Balance Transfer or Korek Cash',
    accountNumber: '0750 XXX XXXX',
    instructions: 'Transfer the balance or payment to our Korek number.'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / NassPay',
    description: 'Direct Bank & Card Transfer in Iraq',
    accountNumber: 'XXXX-XXXX-XXXX-XXXX',
    instructions: 'Transfer the total amount via FIB or local Iraq MasterCard transfer.'
  }
];
