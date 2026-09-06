import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ onSubmit, totalPrice = 0, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Basra', 'Other Iraq City'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) {
      newErrors.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Step 1: Customer Details */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">1. Customer Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Full Name</span>
              <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lawa Ahmed"
                className={`w-full bg-[#0c1220] border ${
                  errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none transition-colors`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-rose-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Phone Number</span>
              <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 0750 123 4567"
                className={`w-full bg-[#0c1220] border ${
                  errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none transition-colors`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-rose-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>City / Region</span>
              <span className="text-rose-400">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 px-3.5 text-xs text-white outline-none transition-colors"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Order Note */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300">
              Order Note / Player ID (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Include your PUBG Player ID, Discord username, or special delivery instructions..."
              className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Payment Method */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-bold text-white">2. Select Local Payment Method</h3>
        </div>

        {errors.paymentMethod && (
          <p className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Order Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/50 transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Confirm & Place Order ({formatPrice(totalPrice)})</span>
        </button>
      </div>
    </form>
  );
}
