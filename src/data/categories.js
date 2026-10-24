export const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: 'Grid' },
  { id: 'games', label: 'Paid Games', icon: 'Gamepad2' },
  { id: 'topups', label: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'giftcards', label: 'Gift Cards', icon: 'Gift' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'Sparkles' },
];

export const PLATFORMS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'PC', label: 'PC Gaming' },
  { id: 'PlayStation', label: 'PlayStation' },
  { id: 'Xbox', label: 'Xbox' },
  { id: 'Mobile', label: 'Mobile' },
  { id: 'Gift Card', label: 'Gift Cards' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store FastPay',
    instructions: 'Send exact IQD amount to FastPay number. Enter order reference in transfer notes.',
    logoText: 'FastPay',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    accentColor: '#ff2d55'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    accountNumber: '0750 987 6543',
    accountName: 'Dano Store Korek',
    instructions: 'Transfer balance or pay via Korek Cash to our official Korek number.',
    logoText: 'Korek',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    accentColor: '#eab308'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / First Iraqi Bank',
    accountNumber: 'FI-9920-4821-3001',
    accountName: 'Dano Gaming Store',
    instructions: 'Direct FIB transfer or MasterCard top-up. Keep receipt screenshot for quick verification.',
    logoText: 'MasterCard',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    accentColor: '#3b82f6'
  }
];
