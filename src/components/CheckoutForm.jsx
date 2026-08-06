import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Payment method is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handlePaymentChange = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className={`w-full bg-[#0a0a0d] border ${
            errors.name ? 'border-red-500' : 'border-slate-800 focus:border-[#00e5ff]'
          } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
          placeholder="e.g. Lawa Ahmed"
        />
        {errors.name && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.name}</span>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className={`w-full bg-[#0a0a0d] border ${
            errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-[#00e5ff]'
          } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
          placeholder="e.g. 0750 XXX XXXX or 0770 XXX XXXX"
        />
        {errors.phone && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.phone}</span>}
      </div>

      {/* City Field */}
      <div>
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
          City / Region <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
          className={`w-full bg-[#0a0a0d] border ${
            errors.city ? 'border-red-500' : 'border-slate-800 focus:border-[#00e5ff]'
          } rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
          placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Kirkuk"
        />
        {errors.city && <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.city}</span>}
      </div>

      {/* Payment Method Selector */}
      <div>
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-3">
          Select Payment Method <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <PaymentMethodCard
            id="fastpay"
            name="FastPay"
            icon="📱"
            description="Manual Transfer"
            selected={formData.paymentMethod}
            onChange={handlePaymentChange}
          />
          <PaymentMethodCard
            id="korek"
            name="Korek"
            icon="📶"
            description="Balance transfer / Card"
            selected={formData.paymentMethod}
            onChange={handlePaymentChange}
          />
          <PaymentMethodCard
            id="mastercard"
            name="MasterCard"
            icon="💳"
            description="Direct manual deposit"
            selected={formData.paymentMethod}
            onChange={handlePaymentChange}
          />
        </div>
        {errors.paymentMethod && (
          <span className="text-xs text-red-500 font-semibold mt-1 block">{errors.paymentMethod}</span>
        )}
      </div>

      {/* Order Note */}
      <div>
        <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
          Order Note / Special Instructions (Optional)
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
          rows={3}
          className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#00e5ff] focus:outline-none transition-colors"
          placeholder="Enter player ID, platform details, custom username or any detail here..."
        />
      </div>

      {/* Confirm Button */}
      <button
        type="submit"
        className="w-full bg-[#0066ff] hover:bg-[#0055dd] text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#0066ff]/10 focus:outline-none"
      >
        Place Order & Pay manually
      </button>
    </form>
  );
}
