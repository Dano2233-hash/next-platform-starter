import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AlertCircle, User, Phone, MapPin, FileText, CheckCircle2 } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Basra', 'Halabja', 'Mosul', 'Other Iraq City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city) errs.city = 'City selection is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';
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
      {/* Customer Info Section */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Kurdistan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Phone Number *</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0750 XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* City Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">City / Province *</label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-slate-900 text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none appearance-none transition-all ${
                errors.city ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.city && (
            <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        {/* Order Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="Include Player ID, Tag, or special instructions..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2 rounded-xl border border-slate-800 focus:border-cyan-500 text-sm focus:outline-none transition-all"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Select Payment Method</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">Manual Payment</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="space-y-3">
          <PaymentMethodCard
            id="FastPay"
            name="FastPay Cash"
            description="Transfer directly to our FastPay number. Fast 24/7 activation."
            badge="Recommended"
            selected={formData.paymentMethod === 'FastPay'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />

          <PaymentMethodCard
            id="Korek"
            name="Korek Cash / Top-Up"
            description="Transfer Korek balance or pay via Korek Cash wallet."
            badge="Instant"
            selected={formData.paymentMethod === 'Korek'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />

          <PaymentMethodCard
            id="MasterCard"
            name="MasterCard / FIB Bank"
            description="Direct card transfer to our local First Iraqi Bank (FIB) or local MasterCard account."
            badge="Local Bank"
            selected={formData.paymentMethod === 'MasterCard'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-black text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 uppercase tracking-wider"
      >
        <span>Confirm Order & Proceed</span>
      </button>
    </form>
  );
};
