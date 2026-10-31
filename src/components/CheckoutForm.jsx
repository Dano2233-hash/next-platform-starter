import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  onPaymentSelect,
  onSubmit,
  isSubmitting
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Customer Info Box */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-['Rajdhani',sans-serif] tracking-wider">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="e.g. Dano Ahmad"
                className={`w-full bg-[#0c1222] border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-700/80 focus:border-cyan-500'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="e.g. 0750 123 4567"
                className={`w-full bg-[#0c1222] border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-700/80 focus:border-cyan-500'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              City / Province in Kurdistan & Iraq <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad, Kirkuk..."
                className={`w-full bg-[#0c1222] border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.city
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-slate-700/80 focus:border-cyan-500'
                }`}
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            {errors.city && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </p>
            )}
          </div>

          {/* Order Note */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Player ID / Character Details / Order Note (Optional)
            </label>
            <div className="relative">
              <textarea
                rows={2}
                name="note"
                value={formData.note}
                onChange={onChange}
                placeholder="For PUBG/Free Fire/MLBB top-ups: Enter your Player ID and Character Name here..."
                className="w-full bg-[#0c1222] border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
              />
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Rajdhani',sans-serif] tracking-wider">
            Payment Method <span className="text-red-400">*</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Manual transfer only. Transfer the total amount via one of our official Iraqi accounts:
          </p>
        </div>

        {errors.paymentMethod && (
          <div className="mb-3 p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.paymentMethod}</span>
          </div>
        )}

        <div className="space-y-3">
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
    </form>
  );
}
