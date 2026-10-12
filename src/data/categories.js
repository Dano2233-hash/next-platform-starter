export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'paid-games', name: 'Paid Games', icon: 'Gamepad2' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' }
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
    description: 'Fast, secure digital wallet in Kurdistan & Iraq',
    accountNumber: '0750 XXX XXXX',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'korek',
    name: 'Korek',
    description: 'Korek Telecom credit transfer or pay',
    accountNumber: '0750 XXX XXXX',
    color: 'from-amber-500 to-red-600'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    description: 'FIB / Local Bank MasterCard transfer',
    accountNumber: 'IBAN / Card No provided on checkout',
    color: 'from-purple-600 to-indigo-600'
  }
];
