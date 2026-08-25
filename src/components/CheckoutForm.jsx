import React from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  onSelectPayment,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Customer Information Section */}
      <div className="bg-[#090e1a]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g. Lawa Kurdi"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition-all outline-none ${
                errors.name
                  ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="e.g. 0750 123 4567"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition-all outline-none ${
                errors.phone
                  ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* City Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="e.g. Erbil / Sulaymaniyah / Duhok / Baghdad"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition-all outline-none ${
                errors.city
                  ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        {/* Order Note Field (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Account ID (Optional)
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
              <FileText className="w-4 h-4" />
            </div>
            <textarea
              name="note"
              rows="3"
              value={formData.note}
              onChange={onChange}
              placeholder="Provide Player ID, User ID, or special instructions if needed..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition-all outline-none resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Section */}
      <div className="bg-[#090e1a]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="border-b border-slate-800/80 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            Select Payment Method <span className="text-rose-400">*</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Choose your preferred manual payment option. No automated online card processing required.
          </p>
        </div>

        {errors.paymentMethod && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.paymentMethod}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={onSelectPayment}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
