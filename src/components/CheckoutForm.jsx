import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Baghdad', 'Basra', 'Kirkuk', 'Nineveh / Mosul', 'Other Kurdistan / Iraq'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      errs.phone = 'Please enter a valid Iraqi mobile number (e.g. 0750XXXXXXX)';
    }
    if (!formData.city.trim()) {
      errs.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a manual payment method';
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
      {/* Customer Info Card */}
      <div className="bg-[#0b101e] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="e.g. Dano Ahmad"
              className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none transition ${
                errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-cyan-400'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Number & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="0750 123 4567"
                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none transition ${
                  errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Governorate <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg text-xs text-white focus:outline-none transition"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Order Notes / Account ID Details (Optional)</span>
            <span className="text-slate-400 text-[10px]">PUBG ID, Riot Tag, etc.</span>
          </label>
          <textarea
            rows={2}
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            placeholder="Provide your in-game Player ID or special instructions..."
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none transition resize-none"
          />
        </div>
      </div>

      {/* Payment Methods Card */}
      <div className="bg-[#0b101e] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Select Manual Payment Method</span>
          </h3>
          <span className="text-[11px] text-amber-400 font-semibold bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/40">
            Manual Transfer Only
          </span>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="grid grid-cols-1 gap-3">
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm rounded-xl transition shadow-[0_0_25px_rgba(0,102,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <span>Confirm Order & Proceed to Payment</span>
      </button>
    </form>
  );
}
