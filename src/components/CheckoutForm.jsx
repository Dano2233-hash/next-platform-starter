import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories.js';
import PaymentMethodCard from './PaymentMethodCard.jsx';
import { AlertCircle, User, Phone, MapPin, FileText, ArrowRight } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder }) {
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
    if (!formData.name.trim()) errs.name = 'Full name is required';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Ahmed"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-500 text-sm rounded-xl border transition-all outline-none ${
                errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0750 XXX XXXX"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-500 text-sm rounded-xl border transition-all outline-none ${
                  errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-slate-100 text-sm rounded-xl border border-slate-800 focus:border-cyan-500 transition-all outline-none"
              >
                <option value="Erbil (Hawler)">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Halabja">Halabja</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Mosul">Mosul</option>
                <option value="Other Region">Other Region</option>
              </select>
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID / Account Info <span className="text-slate-500">(Optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g. PUBG Player ID: 512345678 or Discord Tag"
              className="w-full pl-10 pr-4 py-2 bg-slate-950 text-slate-100 placeholder-slate-500 text-sm rounded-xl border border-slate-800 focus:border-cyan-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <span>Select Local Payment Method</span>
          <span className="text-xs text-cyan-400 font-normal">(Kurdistan & Iraq)</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selectedMethod={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-base rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
      >
        <span>Confirm Order & Get Payment Code</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
