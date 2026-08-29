import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    note: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g. 0750 123 4567).';
    }
    if (!formData.city.trim()) errs.city = 'City / Region is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Information Section */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer & Delivery Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Lawa Dano"
                className={`w-full bg-[#080b14] border text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/50'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.name && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="e.g. 0750 123 4567"
                className={`w-full bg-[#080b14] border text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/50'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City / Governorate */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              City / Region <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. Erbil / Sulaymaniyah / Duhok / Baghdad"
                className={`w-full bg-[#080b14] border text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-all ${
                  errors.city
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500/50'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50'
                }`}
              />
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Optional Note */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Order Note / In-game ID (Optional)
            </label>
            <div className="relative">
              <textarea
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                rows={3}
                placeholder="Enter Player ID, User ID, or specific instructions if applicable..."
                className="w-full bg-[#080b14] border border-slate-800 text-slate-100 placeholder-slate-500 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              />
              <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Payment Method Selection Section */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-white font-extrabold text-base flex items-center gap-2">
            <span>Select Manual Payment Method</span>
            <span className="text-rose-500">*</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Manual local transfer only (FastPay, Korek, MasterCard). No online credit card charge.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="text-rose-400 text-xs flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => handleChange('paymentMethod', id)}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-cyan-600/25 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm & Place Order'}
      </button>

    </form>
  );
}
