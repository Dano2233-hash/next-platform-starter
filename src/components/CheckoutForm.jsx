import React, { useState } from 'react';
import { ALLOWED_PAYMENT_METHODS, PaymentMethodCard } from './PaymentMethodCard';
import { ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * Manual checkout form requirement:
 * Fields:
 * - Customer name
 * - Phone number
 * - City
 * - Payment method
 * - Order note
 *
 * Validation:
 * - Name is required
 * - Phone number is required
 * - City is required
 * - Payment method is required
 * - Show clean error messages
 */
export function CheckoutForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Baghdad', 'Basra', 'Kirkuk', 'Nineveh / Mosul', 'Other'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required (e.g. 0750 XXX XXXX)';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please provide a valid Iraqi mobile number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Please select or provide your city';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please choose a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePaymentSelect = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: null }));
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
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-white">Customer Delivery Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Dano Ahmad"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors ${
                errors.name
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number (WhatsApp) <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0750 123 4567"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phone && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City Selection */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              City / Region <span className="text-rose-400">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Order Note / Player ID */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Order Note / In-game Player ID (Optional)
            </label>
            <textarea
              name="orderNote"
              rows={2}
              value={formData.orderNote}
              onChange={handleChange}
              placeholder="Enter your PUBG ID, Riot Tag, Discord username, or special instructions..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
            />
          </div>

        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-white">Select Manual Payment Method</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose how you will transfer funds. No online cards are charged automatically.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ALLOWED_PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={handlePaymentSelect}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl font-extrabold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? 'Creating Order...' : 'Place Order & Complete Payment'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>

    </form>
  );
}

export default CheckoutForm;
