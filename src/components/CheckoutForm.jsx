import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const CITIES = [
  'Erbil (Hewlêr)',
  'Sulaymaniyah (Silêmanî)',
  'Duhok (Duhok)',
  'Baghdad',
  'Basra',
  'Kirkuk',
  'Mosul',
  'Najaf',
  'Karbala',
  'Other City (Iraq)',
];

export default function CheckoutForm({ onSubmitOrder, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil (Hewlêr)',
    paymentMethod: 'FastPay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g. 0750 123 4567).';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck size={16} className="text-cyan-400" />
          <span>Customer & Delivery Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dano Gamer"
              className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
                errors.name
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0750 123 4567"
              className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 ${
                errors.phone
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Province *
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 ${
                errors.city
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Order Note / Player ID */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Order Note / Player ID / Game Details (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g. PUBG Player ID: 5123456789, or special delivery instructions"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 sm:p-6">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelect={(method) => setFormData({ ...formData, paymentMethod: method })}
        />
        {errors.paymentMethod && (
          <p className="mt-2 text-[11px] text-rose-400 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all transform active:scale-98"
      >
        <span>Confirm Manual Order</span>
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
