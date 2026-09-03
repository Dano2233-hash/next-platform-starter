import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider text-cyan-400">
          Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Lawa Karim"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full bg-slate-900 border ${
              errors.name ? 'border-rose-500' : 'border-slate-700'
            } rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500`}
          />
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 0750 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full bg-slate-900 border ${
              errors.phone ? 'border-rose-500' : 'border-slate-700'
            } rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500`}
          />
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            City <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Erbil">Erbil (Hewlêr)</option>
            <option value="Sulaymaniyah">Sulaymaniyah (Silêmanî)</option>
            <option value="Duhok">Duhok</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Halabja">Halabja</option>
            <option value="Zakho">Zakho</option>
            <option value="Other">Other City in Iraq / Kurdistan</option>
          </select>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.city}
            </p>
          )}
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Player ID / Note (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Enter your PUBG ID, Valorant Tag, or special instructions..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider text-cyan-400">
          Payment Method <span className="text-rose-500">*</span>
        </h3>

        <div className="space-y-2">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm tracking-wider uppercase shadow-xl shadow-cyan-950/60 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm Order & Pay'}
      </button>
    </form>
  );
};
