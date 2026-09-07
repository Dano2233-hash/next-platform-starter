export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Grid' },
  { id: 'Games', name: 'PC & Console Games', icon: 'Gamepad2' },
  { id: 'Mobile Top-Ups', name: 'Mobile Top-Ups', icon: 'Smartphone' },
  { id: 'Gift Cards', name: 'Gift Cards', icon: 'CreditCard' },
  { id: 'Subscriptions', name: 'Subscriptions', icon: 'Zap' },
]

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
]

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Instant mobile wallet payment across Iraq & Kurdistan',
    accountNumber: '0750 123 4567',
    instructions: 'Send total amount to the FastPay number above, then share receipt via WhatsApp or Discord.',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    description: 'Direct Korek credit transfer or cash code',
    accountNumber: '0750 987 6543',
    instructions: 'Transfer Korek balance to the number above and contact support with your phone number.',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB / Card',
    description: 'Local & international MasterCard, FIB, or Bank Transfer',
    accountNumber: 'IBAN: IQ99 FIBK 0000 1234 5678 90',
    instructions: 'Transfer funds to our MasterCard/FIB account and attach your transaction screenshot.',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  }
]
