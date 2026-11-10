export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', slug: 'all' },
  { id: 'games', name: 'PC & Console Games', icon: 'Gamepad2', slug: 'games' },
  { id: 'mobile-topups', name: 'Mobile Top-Ups', icon: 'Smartphone', slug: 'mobile-topups' },
  { id: 'gift-cards', name: 'Gift Cards', icon: 'CreditCard', slug: 'gift-cards' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'Crown', slug: 'subscriptions' }
];

export const PLATFORMS = [
  { id: 'all', name: 'All Platforms' },
  { id: 'PC', name: 'PC Gaming' },
  { id: 'Xbox', name: 'Xbox' },
  { id: 'PlayStation', name: 'PlayStation' },
  { id: 'Mobile', name: 'Mobile' },
  { id: 'Gift Card', name: 'Gift Card' },
  { id: 'Multi-Platform', name: 'Multi-Platform' }
];

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    tagline: 'Instant FastPay Mobile Transfer',
    accountNumber: '0750 123 4567',
    accountName: 'Dano Store Digital Services',
    description: 'Transfer directly to our FastPay wallet. Take a screenshot of the transfer receipt.',
    color: '#E60000',
    badge: 'Popular'
  },
  {
    id: 'korek',
    name: 'Korek Telecom',
    tagline: 'Direct Korek Balance / Transfer',
    accountNumber: '0750 765 4321',
    accountName: 'Dano Store Korek Agent',
    description: 'Send via Korek balance transfer or Korek cash agent. Keep your transaction SMS.',
    color: '#0055A5',
    badge: 'Fast'
  },
  {
    id: 'mastercard',
    name: 'MasterCard',
    tagline: 'FIB / Iraqi Local MasterCard Transfer',
    accountNumber: '5377 **** **** 8821',
    accountName: 'Dano Store Tech LLC',
    description: 'Direct card-to-card or bank mobile transfer. Upload/send confirmation on WhatsApp.',
    color: '#FF5F00',
    badge: 'Bank'
  }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/9647501234567',
  discord: 'https://discord.gg/danostore',
  tiktok: 'https://tiktok.com/@danostore.iq'
};
