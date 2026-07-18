import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit, initialTotal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: '', // FastPay, Korek, MasterCard
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const selectPaymentMethod = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required to contact you.";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City / Region is required for validation.";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }
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
      <div className="bg-[#0a0f1d]/40 border border-blue-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-black text-white tracking-wide uppercase border-b border-white/[0.04] pb-2">
          CUSTOMER INFORMATION
        </h3>

        {/* Customer Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
            Full Name <span className="text-cyan-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Lawa Dano"
            className={`w-full bg-[#050505] text-sm text-gray-200 pl-4 pr-4 py-2.5 rounded-lg border focus:outline-none transition-all duration-300 ${
              errors.name
                ? 'border-rose-500/50 focus:border-rose-500'
                : 'border-white/10 focus:border-cyan-400'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-400 font-medium">{errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
            Phone Number <span className="text-cyan-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. +964 750 123 4567"
            className={`w-full bg-[#050505] text-sm text-gray-200 pl-4 pr-4 py-2.5 rounded-lg border focus:outline-none transition-all duration-300 ${
              errors.phone
                ? 'border-rose-500/50 focus:border-rose-500'
                : 'border-white/10 focus:border-cyan-400'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-400 font-medium">{errors.phone}</p>
          )}
        </div>

        {/* City / Province */}
        <div>
          <label htmlFor="city" className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
            City / Province <span className="text-cyan-400">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Kirkuk..."
            className={`w-full bg-[#050505] text-sm text-gray-200 pl-4 pr-4 py-2.5 rounded-lg border focus:outline-none transition-all duration-300 ${
              errors.city
                ? 'border-rose-500/50 focus:border-rose-500'
                : 'border-white/10 focus:border-cyan-400'
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-rose-400 font-medium">{errors.city}</p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label htmlFor="orderNote" className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
            Order Note / Gamer ID (Optional)
          </label>
          <textarea
            id="orderNote"
            name="orderNote"
            rows="3"
            value={formData.orderNote}
            onChange={handleInputChange}
            placeholder="Add special instructions or your game Player ID (e.g., PUBG ID: 512345678)"
            className="w-full bg-[#050505] text-sm text-gray-200 pl-4 pr-4 py-2.5 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Selectable Payment Cards */}
      <div className="bg-[#0a0f1d]/40 border border-blue-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-black text-white tracking-wide uppercase border-b border-white/[0.04] pb-2">
          MANUAL PAYMENT METHOD <span className="text-cyan-400">*</span>
        </h3>

        {errors.paymentMethod && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-bold">
            {errors.paymentMethod}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          <PaymentMethodCard
            method="FastPay"
            isSelected={formData.paymentMethod === 'FastPay'}
            onSelect={() => selectPaymentMethod('FastPay')}
          />
          <PaymentMethodCard
            method="Korek"
            isSelected={formData.paymentMethod === 'Korek'}
            onSelect={() => selectPaymentMethod('Korek')}
          />
          <PaymentMethodCard
            method="MasterCard"
            isSelected={formData.paymentMethod === 'MasterCard'}
            onSelect={() => selectPaymentMethod('MasterCard')}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-sm font-black uppercase text-white shadow-xl shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-400 transition duration-300 scale-100 hover:scale-[1.01]"
      >
        Complete Order & Generate Invoice
      </button>
    </form>
  );
}
