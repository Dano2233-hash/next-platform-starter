import React, { useState } from 'react';
import PaymentMethodCard, { PAYMENT_METHODS } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const CheckoutForm = ({ cart, cartTotal, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Basra', 'Mosul', 'Other Iraqi City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
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
      {/* Customer Info Section */}
      <div className="bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" /> Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className={`w-full bg-[#060a14] border ${
                errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.name && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number (WhatsApp) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g., 0750 123 4567"
              className={`w-full bg-[#060a14] border ${
                errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            City <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 outline-none transition appearance-none cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-slate-100">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.city && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Player ID / Special Instructions (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="e.g. PUBG Player ID 512345678 or Account Email"
              className="w-full bg-[#060a14] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Payment Method (Manual IQD Payment)
        </h3>

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
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-cyan-950/50 hover:brightness-110 active:scale-[0.99] transition duration-200 cursor-pointer"
      >
        Complete Order ({formatPrice(cartTotal)})
      </button>
    </form>
  );
};

export default CheckoutForm;
