export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' },
  { id: 'others', name: 'Others & Software', icon: 'Layers' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
];

export const PRODUCT_TYPES = [
  { id: 'all', name: 'All Types' },
  { id: 'Game', name: 'Game' },
  { id: 'Top-Up', name: 'Top-Up' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Subscription', name: 'Subscription' },
  { id: 'Account', name: 'Account' },
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    description: 'Instant transfer via FastPay Mobile Wallet (Kurdistan / Iraq)',
    color: 'from-blue-600 to-cyan-500',
    badge: 'Fast & Direct'
  },
  {
    id: 'korek',
    name: 'Korek Mobile',
    accountNumber: '0750 987 6543',
    description: 'Balance transfer or Korek Cash (Fast processing)',
    color: 'from-purple-600 to-blue-600',
    badge: 'Popular'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / Visa',
    accountNumber: '5399 **** **** 8821',
    description: 'FIB / Local Bank Transfer / MasterCard Payment',
    color: 'from-emerald-600 to-teal-500',
    badge: 'Secure'
  }
];

export const CONTACT_LINKS = {
  whatsapp: 'https://wa.me/9647500000000?text=Hello%20Dano%20Store!%20I%20have%20an%20order',
  discord: 'https://discord.gg/danostore',
  tiktok: 'https://tiktok.com/@danostore.official'
};
