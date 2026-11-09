export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 35 },
  { id: 'games', name: 'Games', icon: 'Gamepad2', count: 20 },
  { id: 'mobile-topup', name: 'Mobile Top-Ups', icon: 'Smartphone', count: 13 },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard', count: 8 },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Tv', count: 8 }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Cards' },
  { id: 'Subscription', name: 'Subscriptions' },
  { id: 'Multiplatform', name: 'Multiplatform' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    subtitle: 'Direct mobile wallet transfer in Iraq & Kurdistan',
    accountNumber: '0750 123 4567',
    accountHolder: 'Dano Store',
    badge: 'Popular',
    iconType: 'fastpay',
    color: '#00c389',
    instructions: 'Send the exact amount via FastPay app to our account number, then share the transaction receipt with us.'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    subtitle: 'Korek cash transfer / balance transfer',
    accountNumber: '0750 987 6543',
    accountHolder: 'Dano Store Official',
    badge: 'Fast',
    iconType: 'korek',
    color: '#ffc107',
    instructions: 'Send Korek credit or mobile wallet balance to our phone number, then contact our support team.'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    subtitle: 'Local Iraqi Bank / FIB / Neo card transfer',
    accountNumber: '5314 0000 1234 5678',
    accountHolder: 'Dano Digital Gaming Ltd.',
    badge: 'Bank Card',
    iconType: 'mastercard',
    color: '#eb001b',
    instructions: 'Transfer the amount to our MasterCard account or FIB wallet, then provide the transfer ID upon confirmation.'
  }
];
