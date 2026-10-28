import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AlertCircle, User, Phone, MapPin, FileText, CheckCircle } from 'lucide-react';

export function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g., 0750 123 4567)';
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
      <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" /> Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Lawa Ahmed"
              className={`w-full bg-[#050814] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border transition-colors ${
                errors.customerName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          {errors.customerName && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number (FastPay / Viber / WhatsApp) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0750 XXX XXXX"
              className={`w-full bg-[#050814] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border transition-colors ${
                errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-[#050814] text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 border transition-colors ${
                errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            >
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Mosul">Mosul</option>
              <option value="Other">Other Region in Iraq</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          {errors.city && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g. PUBG Player ID: 512345678 or Discord tag"
              className="w-full bg-[#050814] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Payment Method</span>
          <span className="text-[11px] font-normal text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            Manual Payment Only
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-red-400 text-[11px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <CheckCircle className="w-5 h-5" />
        {isSubmitting ? 'Creating Order...' : 'Complete & Place Order'}
      </button>
    </form>
  );
}
