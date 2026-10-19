import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cart, cartTotal, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Customer name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Basra', 'Other Iraq / Kurdistan City'];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Info Section */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Delivery Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Lawa Kurdish"
                className={`w-full bg-[#0d1428] text-slate-100 placeholder-slate-500 text-sm pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all ${
                  errors.customerName
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-slate-800 focus:border-cyan-500/60'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.customerName && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 font-semibold mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.customerName}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0750 xxx xxxx"
                className={`w-full bg-[#0d1428] text-slate-100 placeholder-slate-500 text-sm pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500/80 focus:border-red-500'
                    : 'border-slate-800 focus:border-cyan-500/60'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 font-semibold mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300">
              City / Region <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#0d1428] text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/60 transition-all appearance-none cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-[#080d1a] text-white">
                    {c}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Order Note / Player ID */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300">
              Order Note / Game Player ID (Optional)
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={formData.orderNote}
                onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                placeholder="Include your PUBG Player ID, Free Fire ID, or Discord Tag if applicable..."
                className="w-full bg-[#0d1428] text-slate-100 placeholder-slate-500 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/60 transition-all"
              />
              <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center justify-between pb-3 border-b border-slate-800">
          <span>Select Payment Method</span>
          <span className="text-xs text-cyan-400 font-semibold">Manual Verification</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-4 h-4" />
            {errors.paymentMethod}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer"
      >
        <ShoppingBag className="w-5 h-5 fill-black" />
        <span>Create Order — Total {formatPrice(cartTotal)}</span>
      </button>
    </form>
  );
}
