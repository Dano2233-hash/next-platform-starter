import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 0750 123 4567)';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  const paymentOptions = [
    { id: 'FastPay', name: 'FastPay Mobile Wallet', description: 'Instant transfer via FastPay account' },
    { id: 'Korek', name: 'Korek Telecom Cash', description: 'Direct Korek wallet transfer' },
    { id: 'MasterCard', name: 'MasterCard / FIB Card', description: 'Manual credit / debit card payment transfer' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800/80 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Lawa Dano"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full bg-slate-950 border ${
              errors.name ? 'border-rose-500' : 'border-slate-700/80'
            } rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors`}
          />
          {errors.name && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number (WhatsApp) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="0750 XXX XXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full bg-slate-950 border ${
              errors.phone ? 'border-rose-500' : 'border-slate-700/80'
            } rounded-xl py-2.5 px-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors`}
          />
          {errors.phone && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
          >
            <option value="Erbil">Erbil (Hawler)</option>
            <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
            <option value="Duhok">Duhok</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Basra">Basra</option>
            <option value="Halabja">Halabja</option>
            <option value="Other">Other City</option>
          </select>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Enter Player ID / User ID / In-game Tag if ordering top-ups..."
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 px-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800/80 pb-3">
          Select Manual Payment Method
        </h3>

        <div className="space-y-2.5">
          {paymentOptions.map((opt) => (
            <PaymentMethodCard
              key={opt.id}
              id={opt.id}
              name={opt.name}
              description={opt.description}
              selected={formData.paymentMethod === opt.id}
              onSelect={(selectedId) => setFormData({ ...formData, paymentMethod: selectedId })}
            />
          ))}
        </div>

        <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
          💡 <span className="font-semibold text-slate-300">Note:</span> After creating your order, you will receive payment instructions and direct WhatsApp/Discord contact buttons to confirm your payment with our team.
        </p>
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/50 transition-all transform active:scale-98 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Complete Order'}
      </button>

    </form>
  );
};
