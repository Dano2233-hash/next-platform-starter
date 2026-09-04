import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil (Hawler)',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
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

  const cityOptions = [
    'Erbil (Hawler)',
    'Sulaymaniyah (Slemani)',
    'Duhok',
    'Halabja',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Mosul',
    'Anbar',
    'Najaf',
    'Karbala',
    'Other Iraqi City'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" /> Customer Details
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Ahmed"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${
                errors.name ? 'border-rose-500' : 'border-slate-800'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Phone Number (WhatsApp) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0750 123 4567"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors ${
                errors.phone ? 'border-rose-500' : 'border-slate-800'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            City <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Order Note / Player ID / Account Username (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="Enter PUBG Player ID, Free Fire ID, or special instructions if applicable..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Select Payment Method</span>
          <span className="text-xs text-cyan-400 font-semibold">Manual Local Transfer</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-rose-400 text-xs flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Complete Order & View Receipt</span>
      </button>
    </form>
  );
};
