import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay',
    description: 'Direct FastPay transfer in IQD. Fast verification via WhatsApp.',
    accountNumber: '0750 123 4567',
    accountHolder: 'Dano Store Official',
    colorScheme: 'emerald',
  },
  {
    id: 'Korek',
    name: 'Korek (Korek Telecom / Cash)',
    description: 'Transfer via Korek number or Korek balance transfer.',
    accountNumber: '0750 987 6543',
    accountHolder: 'Dano Store Gaming',
    colorScheme: 'amber',
  },
  {
    id: 'MasterCard',
    name: 'MasterCard (Direct Transfer)',
    description: 'Manual IBAN or card-to-card transfer for FIB / Trade Bank / MasterCard.',
    accountNumber: '5324 •••• •••• 8892',
    accountHolder: 'Dano Digital Ltd',
    colorScheme: 'rose',
  },
];

export default function CheckoutForm({
  formData,
  errors,
  onChange,
  onPaymentSelect,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs">
            1
          </span>
          Customer Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Customer Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={onChange}
              placeholder="e.g. Dano Ahmad"
              className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 px-3.5 py-2.5 rounded-xl border ${
                errors.customerName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-colors`}
            />
            {errors.customerName && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              placeholder="e.g. 0750 000 0000"
              className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 px-3.5 py-2.5 rounded-xl border ${
                errors.phoneNumber ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-colors`}
            />
            {errors.phoneNumber && (
              <p className="text-[11px] text-rose-400 mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Province <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad, Kirkuk..."
            className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 px-3.5 py-2.5 rounded-xl border ${
              errors.city ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            } focus:outline-none transition-colors`}
          />
          {errors.city && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID / In-Game Username (Optional)
          </label>
          <textarea
            name="orderNote"
            rows={3}
            value={formData.orderNote}
            onChange={onChange}
            placeholder="Provide your Player ID, Discord tag, or any instructions for your order..."
            className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xs">
              2
            </span>
            Select Payment Method <span className="text-rose-400">*</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Manual Verification</span>
        </div>

        {errors.paymentMethod && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-300">
            {errors.paymentMethod}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              {...pm}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={onPaymentSelect}
            />
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300">
          <p className="font-bold text-cyan-300 mb-1">How manual payment works:</p>
          <p className="text-slate-400 leading-relaxed">
            1. Submit this order to generate an Order ID.
            <br />
            2. Transfer the total IQD to our selected account above.
            <br />
            3. Contact our team via WhatsApp, Discord, or TikTok with your screenshot for instant delivery!
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-xl shadow-cyan-950/50 transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? 'Creating Order...' : 'Place Order & Get Payment Details'}
      </button>
    </form>
  );
}
