import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';

export function CheckoutForm({ onSubmit, initialTotal = 0 }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City / Location is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please choose a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentSelect = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="bg-[#0a0a14] p-6 rounded-lg border border-slate-900 space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white border-b border-slate-900 pb-3">
          1. Customer Information
        </h3>

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Dano Lawa"
            className={`bg-slate-900/90 border rounded px-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Phone Number (Zain/Asiacell/Korek) *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0750 000 0000"
            className={`bg-slate-900/90 border rounded px-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
              errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">City / Governorate *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad"
            className={`bg-slate-900/90 border rounded px-3.5 py-2.5 text-sm focus:outline-none transition-colors ${
              errors.city ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.city && <span className="text-xs text-red-500 mt-1">{errors.city}</span>}
        </div>

        {/* Order Note */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Order Note (Optional)</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Enter player ID, username, or details for manual activation..."
            rows="3"
            className="bg-slate-900/90 border border-slate-800 focus:border-cyan-500 rounded px-3.5 py-2.5 text-sm focus:outline-none placeholder-slate-600 transition-colors"
          ></textarea>
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#0a0a14] p-6 rounded-lg border border-slate-900 space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white border-b border-slate-900 pb-3">
          2. Manual Payment Method
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Please select your preferred local payment method. Real-time digital payment processing is not performed. After ordering, you will be shown instructions to complete the manual transfer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <PaymentMethodCard
            method="FastPay"
            selected={formData.paymentMethod === 'FastPay'}
            onSelect={handlePaymentSelect}
          />
          <PaymentMethodCard
            method="Korek"
            selected={formData.paymentMethod === 'Korek'}
            onSelect={handlePaymentSelect}
          />
          <PaymentMethodCard
            method="MasterCard"
            selected={formData.paymentMethod === 'MasterCard'}
            onSelect={handlePaymentSelect}
          />
        </div>
        {errors.paymentMethod && <span className="text-xs text-red-500 block mt-1">{errors.paymentMethod}</span>}
      </div>

      {/* Checkout Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-black uppercase py-4 rounded-lg text-sm tracking-wider transition-all duration-300 shadow-lg shadow-cyan-500/10 active:scale-[0.99]"
      >
        Complete Order (Manual Payment)
      </button>
    </form>
  );
}
