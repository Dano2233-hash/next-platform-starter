import React, { useState } from 'react';
import { CITIES, PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: CITIES[0],
    paymentMethod: 'FastPay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer Name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) {
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
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Personal Info Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-slate-200 text-base flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. Lawa Ahmed"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.customerName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
          </div>
          {errors.customerName && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Phone Number (WhatsApp) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="tel"
              placeholder="e.g. 0750 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phone ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            City / Region <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all appearance-none"
            >
              {CITIES.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-slate-100">
                  {city}
                </option>
              ))}
            </select>
          </div>
          {errors.city && (
            <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="font-bold text-slate-200 text-base flex items-center gap-2">
            <span>Select Payment Method</span>
            <span className="text-rose-500">*</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Fast manual payment via Kurdistan / Iraq local payment providers.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Optional Note */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Player ID / Game Tag / Order Note (Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="For PUBG UC / Mobile top-ups, enter your Player ID (e.g. ID: 512345678, Name: Lawa) here or send via WhatsApp..."
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
      >
        <CheckCircle2 className="w-5 h-5 fill-slate-950 text-cyan-400" />
        <span>{isSubmitting ? 'Creating Order...' : 'Confirm Order & View Instructions'}</span>
      </button>

    </form>
  );
};

export default CheckoutForm;
