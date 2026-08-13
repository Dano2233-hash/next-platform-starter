import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';

export function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [error, setError] = useState('');

  const paymentOptions = [
    { id: 'FastPay', label: 'FastPay Wallet', description: 'Instant transfer to our Kurdistan FastPay wallet' },
    { id: 'Korek', label: 'Korek Telecom', description: 'Manual Korek balance transfer or digit recharge' },
    { id: 'MasterCard', label: 'FIB / MasterCard', description: 'Manual credit/debit card invoice transfer' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a working phone number.');
      return;
    }
    if (!city.trim()) {
      setError('Please select or specify your city in Iraq.');
      return;
    }
    if (!paymentMethod) {
      setError('Please select one of the manual payment methods.');
      return;
    }

    onSubmit({
      name,
      phone,
      city,
      paymentMethod,
      orderNote
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-xs font-semibold text-red-500">
          ⚠️ {error}
        </div>
      )}

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dana Ahmed"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#0c0c14] px-4 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +964 750 000 0000"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#0c0c14] px-4 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City / Province *</label>
        <select
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-[#1e1e2d] bg-[#0c0c14] px-4 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
        >
          <option value="">-- Select Your City --</option>
          <option value="Erbil">Erbil (Hewlêr)</option>
          <option value="Sulaymaniyah">Sulaymaniyah (Silêmanî)</option>
          <option value="Duhok">Duhok</option>
          <option value="Kirkuk">Kirkuk</option>
          <option value="Halabja">Halabja</option>
          <option value="Baghdad">Baghdad</option>
          <option value="Other">Other region in Kurdistan / Iraq</option>
        </select>
      </div>

      {/* Payment Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Manual Payment Method *</label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {paymentOptions.map((opt) => (
            <PaymentMethodCard
              key={opt.id}
              selected={paymentMethod === opt.id}
              onClick={() => setPaymentMethod(opt.id)}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
      </div>

      {/* Order note */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Order Notes (Player ID, User Account etc)</label>
        <textarea
          rows={3}
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          placeholder="For top-ups, please enter your Player ID & Nickname here..."
          className="w-full rounded-lg border border-[#1e1e2d] bg-[#0c0c14] px-4 py-2.5 text-sm text-gray-200 outline-none transition focus:border-[#0066ff]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 transition shadow-lg premium-glow-blue"
      >
        Submit Manual Order
      </button>
    </form>
  );
}
