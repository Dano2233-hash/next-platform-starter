import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil (Hewlêr)',
    'Sulaymaniyah (Slemany)',
    'Duhok',
    'Halabja',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Mosul',
    'Najaf',
    'Karbala',
    'Other City'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Dano"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 border ${
                errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-slate-700/80 focus:border-cyan-400'
              } focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number (WhatsApp) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0750XXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 border ${
                  errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-slate-700/80 focus:border-cyan-400'
                } focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City Select Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-lg pl-10 pr-8 py-2.5 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-100">
                    {c}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

        </div>

        {/* Order Note Optional */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Account ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="e.g. PUBG Player ID: 512345678 or special instructions..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-lg pl-10 pr-3 py-2 border border-slate-700/80 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 space-y-4 shadow-lg">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 pb-1">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Select Payment Method</span>
          </h3>
          <p className="text-xs text-slate-400">
            Manual transfer. Instructions will be provided on the order confirmation screen.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1 bg-red-950/40 p-2.5 rounded-lg border border-red-800/50">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="space-y-3">
          {['FastPay', 'Korek', 'MasterCard'].map((method) => (
            <PaymentMethodCard
              key={method}
              method={method}
              selected={formData.paymentMethod === method}
              onSelect={(m) => setFormData({ ...formData, paymentMethod: m })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>Complete & Submit Order</span>
      </button>

    </form>
  );
}
