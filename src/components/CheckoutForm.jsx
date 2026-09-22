import React, { useState } from 'react';
import { Smartphone, CreditCard, Wallet, AlertCircle, ShieldCheck } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil (Hawler)',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'FastPay',
      name: 'FastPay Mobile Wallet',
      description: 'Send payment via FastPay app. Fast & automated verification.',
      icon: <Wallet className="w-5 h-5" />
    },
    {
      id: 'Korek',
      name: 'Korek Telecom Top-Up',
      description: 'Pay via Korek balance transfer or Korek Cash.',
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: 'MasterCard',
      name: 'MasterCard / FIB / Bank Transfer',
      description: 'Pay using local FIB or MasterCard account transfer.',
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  const cities = [
    'Erbil (Hawler)',
    'Sulaymaniyah (Slemani)',
    'Duhok',
    'Halabja',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Mosul',
    'Other City in Iraq'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Customer Name is required.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city) newErrors.city = 'Please select your city.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Box */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          1. Customer Details (Kurdistan / Iraq)
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Lawa Dano"
            className={`w-full bg-slate-900 border ${
              errors.name ? 'border-red-500/80' : 'border-slate-700/80'
            } focus:border-cyan-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 focus:outline-none transition-all`}
          />
          {errors.name && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone & City Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: null });
              }}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-slate-900 border ${
                errors.phone ? 'border-red-500/80' : 'border-slate-700/80'
              } focus:border-cyan-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 focus:outline-none transition-all`}
            />
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-100 focus:outline-none transition-all"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Account ID (Optional)
          </label>
          <textarea
            rows={2}
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            placeholder="Add player ID or special instructions..."
            className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Payment Selection Box */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
          2. Select Local Payment Method
        </h3>

        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              name={pm.name}
              description={pm.description}
              icon={pm.icon}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-black text-sm rounded-xl transition-all shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 uppercase tracking-wider"
      >
        Complete Order & Pay
      </button>
    </form>
  );
}
