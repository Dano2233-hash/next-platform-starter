import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: '',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'fastpay', name: 'FastPay Wallet' },
    { id: 'korek', name: 'Korek Telecom Balance' },
    { id: 'mastercard', name: 'MasterCard / Visa' }
  ];

  const handleSelectPayment = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Your Name <span className="text-[#00e5ff]">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Lawa Dano"
          className={`w-full bg-[#0c0d12] text-sm text-gray-200 px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:border-[#00e5ff] ${
            errors.name ? 'border-red-500/50' : 'border-[#1a1e29]'
          }`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors.name}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Phone Number <span className="text-[#00e5ff]">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. +964 750 XXX XXXX"
          className={`w-full bg-[#0c0d12] text-sm text-gray-200 px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:border-[#00e5ff] ${
            errors.phone ? 'border-red-500/50' : 'border-[#1a1e29]'
          }`}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors.phone}</p>}
      </div>

      {/* City Field */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          City / Region <span className="text-[#00e5ff]">*</span>
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Erbil, Sulaymaniyah, Duhok..."
          className={`w-full bg-[#0c0d12] text-sm text-gray-200 px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:border-[#00e5ff] ${
            errors.city ? 'border-red-500/50' : 'border-[#1a1e29]'
          }`}
        />
        {errors.city && <p className="text-xs text-red-500 mt-1.5 font-semibold">{errors.city}</p>}
      </div>

      {/* Payment Selection */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Payment Method <span className="text-[#00e5ff]">*</span>
        </label>
        <p className="text-xs text-gray-400 mb-4">Select manual payment below. You will transfer the money after placing the order.</p>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              selected={formData.paymentMethod === method.id}
              onClick={() => handleSelectPayment(method.id)}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="text-xs text-red-500 mt-2 font-semibold">{errors.paymentMethod}</p>}
      </div>

      {/* Order Note */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          Order Notes / Instructions (Optional)
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows={3}
          placeholder="Add any details like player ID, Discord username, or email..."
          className="w-full bg-[#0c0d12] text-sm text-gray-200 px-4 py-3 rounded-xl border border-[#1a1e29] focus:outline-none focus:border-[#00e5ff] transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl text-sm font-black text-white bg-[#0066ff] hover:bg-[#0052cc] transition-colors shadow-xl shadow-[#0066ff]/20 cursor-pointer select-none"
      >
        Place Order & Pay Manually
      </button>
    </form>
  );
}
