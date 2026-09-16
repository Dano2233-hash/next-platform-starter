import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Kurdistan"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full bg-slate-900 border rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.name
                  ? 'border-rose-500/80 focus:ring-rose-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={`w-full bg-slate-900 border rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.phone
                    ? 'border-rose-500/80 focus:ring-rose-500'
                    : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              City / Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Erbil, Sulaymaniyah, Duhok, Baghdad..."
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                className={`w-full bg-slate-900 border rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.city
                    ? 'border-rose-500/80 focus:ring-rose-500'
                    : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.city && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Order Note / Game ID / User Tag <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Player ID for PUBG (512345678) or Game ID for Mobile Legends"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Select Manual Payment Method
          </h3>
          <span className="text-xs text-cyan-400 font-semibold">IQD Manual Transfer</span>
        </div>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => {
                setFormData({ ...formData, paymentMethod: id });
                if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
              }}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
      >
        Complete Order & Get Payment Details
      </button>
    </form>
  );
}
