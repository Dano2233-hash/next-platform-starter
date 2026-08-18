import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AlertCircle, User, Phone, MapPin, FileText, Check } from 'lucide-react';

export function CheckoutForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil (Hawler)',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil (Hawler)',
    'Sulaymaniyah (Slemani)',
    'Duhok',
    'Kirkuk',
    'Halabja',
    'Baghdad',
    'Basra',
    'Mosul',
    'Other City in Kurdistan/Iraq',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmitOrder(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dano Lawa"
                className={`w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                    : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number / WhatsApp <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 0750 123 4567"
                className={`w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                    : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              City / Location <span className="text-red-400">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none transition-all ${
                errors.city
                  ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500'
                  : 'border-slate-800 focus:border-cyan-400'
              }`}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>

          {/* Order Note */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Player ID / Account Details / Note (Optional)
            </label>
            <textarea
              name="orderNote"
              rows="2"
              value={formData.orderNote}
              onChange={handleChange}
              placeholder="e.g. Player ID for PUBG: 5123456789 or Special Request"
              className="w-full bg-slate-950 text-white rounded-xl px-3.5 py-2.5 text-sm border border-slate-800 focus:border-cyan-400 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span>Select Payment Method</span>
          <span className="text-xs font-normal text-slate-400">(Manual Payment)</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Choose how you would like to complete your order. After placing the order, you will contact us to finalize payment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => {
                setFormData((prev) => ({ ...prev, paymentMethod: id }));
                if (errors.paymentMethod) {
                  setErrors((prev) => ({ ...prev, paymentMethod: null }));
                }
              }}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-cyan-950/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Complete Order Now
      </button>
    </form>
  );
}
