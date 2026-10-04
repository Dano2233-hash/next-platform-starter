import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';

export default function CheckoutForm({ onSubmit, isSubmitting }) {
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
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City location is required';
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
      {/* Customer Info Card */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Lawa Karwan"
              className={`w-full bg-slate-900 border ${
                errors.customerName ? 'border-red-500' : 'border-slate-700/80'
              } rounded-xl py-2.5 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500`}
            />
          </div>
          {errors.customerName && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0750 XXX XXXX"
                className={`w-full bg-slate-900 border ${
                  errors.phone ? 'border-red-500' : 'border-slate-700/80'
                } rounded-xl py-2.5 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Region <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Halabja">Halabja</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Other Iraq Region">Other Region in Iraq</option>
            </select>
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID / Account Info (Optional)
          </label>
          <textarea
            rows="2"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            placeholder="e.g. PUBG Player ID: 51239840 or Special instructions..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>
      </div>

      {/* Payment Method Card Section */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <FileText className="w-4 h-4 text-cyan-400" />
          Select Payment Method (Manual Payment)
        </h3>

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
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <ShoppingBag className="w-4 h-4" />
        {isSubmitting ? 'Processing Order...' : 'Complete Order & Create Invoice'}
      </button>
    </form>
  );
}
