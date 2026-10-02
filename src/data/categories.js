export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'PC & Console Games', icon: 'Gamepad2' },
  { id: 'giftcards', name: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    type: 'Mobile Wallet',
    accountNumber: '0750 123 4567',
    accountHolder: 'Dano Store FastPay',
    instructions: 'Send exact total amount to our FastPay account number and provide your order number in the payment note or WhatsApp chat.',
    badgeColor: 'from-orange-500 to-amber-600'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    type: 'Direct Transfer',
    accountNumber: '0750 765 4321',
    accountHolder: 'Dano Store Korek',
    instructions: 'Transfer Korek credit or Korek Cash to the number provided. Contact support on WhatsApp with receipt immediately.',
    badgeColor: 'from-red-600 to-rose-700'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    type: 'Bank Card / FIB',
    accountNumber: '5321 **** **** 8890',
    accountHolder: 'Dano Store Digital Services',
    instructions: 'Transfer funds via local MasterCard or First Iraqi Bank (FIB) to our account number. Send transaction ID after transfer.',
    badgeColor: 'from-blue-600 to-indigo-700'
  }
];
