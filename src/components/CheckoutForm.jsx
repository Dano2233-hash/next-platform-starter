import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';

const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required (e.g. Erbil, Sulaymaniyah, Duhok, Baghdad)';
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="space-y-4 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
        <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
          1. Customer Details
        </h3>

        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleChange('customerName', e.target.value)}
            placeholder="e.g. Dano Lawa"
            className={`w-full bg-slate-950 border text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 transition-all ${
              errors.customerName
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
            }`}
          />
          {errors.customerName && (
            <p className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Phone Number Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone Number / WhatsApp <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="e.g. 0750 XXX XXXX"
              className={`w-full bg-slate-950 border text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 transition-all ${
                errors.phoneNumber
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* City Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> City / Region <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok..."
              className={`w-full bg-slate-950 border text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 transition-all ${
                errors.city
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.city && (
              <p className="text-[11px] font-bold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wider">
            2. Payment Method
          </h3>
          <span className="text-[11px] font-bold text-cyan-400">Manual Transfer Only</span>
        </div>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => handleChange('paymentMethod', id)}
            />
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-[11px] font-bold text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Notes / Player ID Info */}
      <div className="space-y-2 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-cyan-400" /> Order Note / Player ID / Account Email (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.orderNote}
          onChange={(e) => handleChange('orderNote', e.target.value)}
          placeholder="For Mobile Top-ups (PUBG, Free Fire, MLBB), please provide your Player ID or Tag here..."
          className="w-full bg-slate-950 border border-slate-700/80 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-black text-sm text-white shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.01] disabled:opacity-50 uppercase tracking-wider"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm Order & View Payment Info'}
      </button>

    </form>
  );
};

export default CheckoutForm;
