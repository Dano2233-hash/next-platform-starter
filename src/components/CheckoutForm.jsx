import React, { useState } from 'react';
import { User, Phone, MapPin, MessageSquare, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cart, cartTotal, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'fastpay',
      name: 'FastPay',
      description: 'Send payment directly via FastPay app',
      badgeText: 'FASTPAY',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      description: 'Balance transfer or Korek cash',
      badgeText: 'KOREK',
      badgeClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / Visa',
      description: 'Fib / First Iraqi Bank or MasterCard transfer',
      badgeText: 'CARD',
      badgeClass: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    }
  ];

  const cities = [
    'Erbil',
    'Sulaymaniyah',
    'Duhok',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Halabja',
    'Zakho',
    'Mosul',
    'Other'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Customer Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) errs.city = 'City selection is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Payment method is required';

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
      {/* Customer Info Section */}
      <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lawa Dano"
                className={`w-full pl-3.5 pr-3 py-2.5 bg-slate-900 border rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.name ? 'border-red-500/80' : 'border-slate-700/80 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 0750 123 4567"
                className={`w-full pl-3.5 pr-3 py-2.5 bg-slate-900 border rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.phone ? 'border-red-500/80' : 'border-slate-700/80 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* City & Note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Governorates <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full pl-3.5 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-slate-100">
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Player ID / Note (Optional)
            </label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="e.g. PUBG ID: 512345678 or extra note"
              className="w-full pl-3.5 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Select Payment Method</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-400">IQD Manual Payment</span>
        </h3>

        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              selected={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Complete Order ({formatPrice(cartTotal)})</span>
      </button>
    </form>
  );
}
