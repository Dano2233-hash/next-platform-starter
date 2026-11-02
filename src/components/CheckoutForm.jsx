import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  onPaymentSelect
}) {
  return (
    <div className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer & Delivery Details</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g. Dano Sherwan"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number (WhatsApp active) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="0750 XXX XXXX or 0770 XXX XXXX"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* City Selection / Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="Erbil, Sulaymaniyah, Duhok, Baghdad, etc."
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.city
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.city && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              name="note"
              rows={2}
              value={formData.note}
              onChange={onChange}
              placeholder="e.g. PUBG Player ID: 512345678, or Discord username"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Include your in-game ID or account tag if applicable for faster delivery.
          </p>
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div>
          <h3 className="font-bold text-white text-base">Select Manual Payment Method</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose your preferred Iraqi transfer method. FastPay, Korek, and MasterCard only.
          </p>
          {errors.paymentMethod && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.paymentMethod}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={onPaymentSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
