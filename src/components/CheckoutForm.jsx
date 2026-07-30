import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');

  // Validation state
  const [errors, setErrors] = useState({});

  const paymentMethods = ['FastPay', 'Korek', 'MasterCard'];

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Customer name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a manual payment method';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        paymentMethod,
        note: note.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left bg-[#0d0d12] border border-white/5 p-6 md:p-8 rounded-3xl shadow-xl">
      <div className="border-b border-white/5 pb-4">
        <h3 className="text-base font-black text-white uppercase tracking-wider">Customer Details</h3>
        <p className="text-xs text-zinc-500 mt-1">Please provide accurate contact details so we can assist with activation.</p>
      </div>

      {/* Basic Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Your Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="e.g. Lawa Dano"
            className={`w-full bg-white/[0.02] border focus:outline-none focus:ring-1 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="e.g. 0750XXXXXXX"
              className={`w-full bg-white/[0.02] border focus:outline-none focus:ring-1 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/10 focus:border-cyan-500'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">City / Region *</label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok"
              className={`w-full bg-white/[0.02] border focus:outline-none focus:ring-1 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all ${
                errors.city
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/10 focus:border-cyan-500'
              }`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.city}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Order Notes (Optional)</label>
          <textarea
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Account username, specific player ID for UC top-up..."
            className="w-full bg-white/[0.02] border border-white/10 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 resize-none"
          ></textarea>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="border-t border-white/5 pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider">Select manual payment method *</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Choose your preferred local transfer option. No automatic charges will be made.</p>
        </div>

        <div className="space-y-2.5">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method}
              method={method}
              isSelected={paymentMethod === method}
              onSelect={(val) => {
                setPaymentMethod(val);
                if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
              }}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Button wrapper */}
      <div className="border-t border-white/5 pt-6">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-500/15 uppercase tracking-wider"
        >
          Confirm and Submit Order
        </button>
      </div>
    </form>
  );
}
