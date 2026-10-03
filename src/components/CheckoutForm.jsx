import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil (Suleimani / Duhok / Kirkuk / Baghdad)',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'fastpay',
      name: 'FastPay',
      description: 'Send payment via FastPay wallet account',
      iconText: 'FP',
      bgClass: 'bg-gradient-to-br from-red-600 to-red-800',
      borderClass: 'border-red-500/40'
    },
    {
      id: 'korek',
      name: 'Korek',
      description: 'Korek Mobile Balance Transfer or Korek Cash',
      iconText: 'KC',
      bgClass: 'bg-gradient-to-br from-yellow-600 to-amber-700',
      borderClass: 'border-amber-500/40'
    },
    {
      id: 'mastercard',
      name: 'MasterCard',
      description: 'Local MasterCard transfer / FIB / NassPay',
      iconText: 'MC',
      bgClass: 'bg-gradient-to-br from-blue-600 to-indigo-800',
      borderClass: 'border-blue-500/40'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City location is required';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info */}
      <div className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Lawa Kurdi"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-[#070b18] border rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors ${
                errors.name ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 0750 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-[#070b18] border rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Erbil, Suleimani, Duhok, Kirkuk, Baghdad"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full bg-[#070b18] border rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors ${
              errors.city ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Add Player ID, Username, or specific instructions for digital top-ups..."
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full bg-[#070b18] border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-white">Select Manual Payment Method</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manual local transfers only. No credit card online processing needed.
          </p>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              selectedMethod={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="text-red-400 text-xs">{errors.paymentMethod}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xl shadow-cyan-950/40 flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-50"
      >
        <span>{isSubmitting ? 'Processing Order...' : 'Complete & Generate Order'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
