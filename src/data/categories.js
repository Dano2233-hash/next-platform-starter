export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Zap' },
  { id: 'others', name: 'Others', icon: 'Boxes' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store Official',
    description: 'FastPay Mobile Wallet Transfer. Instant verification in Kurdistan.',
    instructions: 'Send the exact order amount to our FastPay number. Keep the transaction reference for verification.'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    accountNumber: '0750 765 4321',
    accountName: 'Dano Store Official',
    description: 'Korek Telecom Balance Transfer or Cash. Fast local service.',
    instructions: 'Send the total amount to our Korek number or transfer balance, then message us on WhatsApp.'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    accountNumber: '5326 **** **** 9102',
    accountName: 'Dano Store Digital Services',
    description: 'Bank Card Transfer. FIB, Trade Bank of Iraq, or local MasterCard.',
    instructions: 'Transfer the amount to our MasterCard card number and share the screenshot on WhatsApp/Discord.'
  }
];

export const SOCIAL_CONTACTS = {
  whatsapp: {
    name: 'WhatsApp Support',
    number: '+964 750 000 0000',
    link: 'https://wa.me/9647500000000'
  },
  discord: {
    name: 'Discord Community',
    handle: 'DanoStore#0001',
    link: 'https://discord.gg/danostore'
  },
  tiktok: {
    name: 'TikTok Official',
    handle: '@DanoStoreOfficial',
    link: 'https://tiktok.com/@danostore'
  }
};
