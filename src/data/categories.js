export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Gamepad2' },
  { id: 'mobile', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'games', name: 'Paid Games', icon: 'Gamepad' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Sparkles' },
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' },
];

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    subtitle: 'Direct Kurdistan & Iraq Mobile Wallet Transfer',
    accountNumber: '0750 123 4567',
    accountHolder: 'Dano Store (FastPay Official)',
    color: 'from-blue-600 to-cyan-500',
    badge: 'Popular in Kurdistan',
    instructions: 'Send the exact amount via your FastPay app to our account number, then share the transaction receipt with us via WhatsApp or Discord.'
  },
  {
    id: 'Korek',
    name: 'Korek Telecom',
    subtitle: 'Korek Telecom Balance Transfer / Korek Pay',
    accountNumber: '0750 987 6543',
    accountHolder: 'Dano Store Korek Agent',
    color: 'from-amber-600 to-orange-500',
    badge: 'Fast & Instant',
    instructions: 'Transfer the amount to the Korek number above. Send a screenshot of the successful transfer SMS to complete your order.'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard',
    subtitle: 'Local / International Card Direct Transfer',
    accountNumber: '5312 •••• •••• 9842',
    accountHolder: 'Dano Digital Gaming Services LLC',
    color: 'from-red-600 to-purple-600',
    badge: 'Direct Card Transfer',
    instructions: 'Transfer to our merchant card account. Keep your transaction reference code ready to confirm your delivery.'
  }
];
