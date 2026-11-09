import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ formData, setFormData, errors, onSubmit, isSubmitting }) {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Customer Info Card */}
      <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/5 space-y-4">
        <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="e.g. Dano Ahmed"
              className={`w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.customerName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-cyan-500'
              } focus:outline-none`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.customerName && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.customerName}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number (FastPay / WhatsApp) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="0750 xxx xxxx / 0770 xxx xxxx"
              className={`w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.phoneNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-cyan-500'
              } focus:outline-none`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.phoneNumber && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phoneNumber}</span>
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region in Iraq / Kurdistan <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Erbil, Sulaymaniyah, Duhok, Baghdad, Basra..."
              className={`w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.city ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-cyan-500'
              } focus:outline-none`}
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.city && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID / Account Email (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={formData.orderNote}
              onChange={(e) => handleChange('orderNote', e.target.value)}
              placeholder="For PUBG UC or Diamonds, enter your Player ID & In-game Name here. For subscriptions, add preferred email..."
              className="w-full bg-slate-900/90 text-sm text-white placeholder-slate-500 rounded-xl p-3 border border-white/10 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>
        </div>

      </div>

      {/* Manual Payment Method Selection */}
      <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white font-heading">
            Select Payment Method <span className="text-rose-400">*</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Manual payment confirmation. Select how you will send the payment.
          </p>
        </div>

        {errors.paymentMethod && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.paymentMethod}</span>
          </div>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => handleChange('paymentMethod', id)}
            />
          ))}
        </div>
      </div>

    </form>
  );
}
