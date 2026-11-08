import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Checkout fields:
 * - Customer name
 * - Phone number
 * - City
 * - Payment method
 * - Order note
 *
 * Validation:
 * - Name is required
 * - Phone number is required
 * - City is required
 * - Payment method is required
 * - Show clean error messages
 */
export function CheckoutForm({ onSubmit, isSubmitting }) {
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
    } else if (formData.phoneNumber.trim().length < 9) {
      errs.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please choose a payment method';
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

  const PAYMENT_METHODS = [
    {
      id: 'fastpay',
      name: 'FastPay',
      description: 'Transfer directly to Dano Store FastPay wallet.',
      numberInfo: '+964 750 123 4567'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      description: 'Korek balance transfer or direct top-up code verification.',
      numberInfo: '+964 750 987 6543'
    },
    {
      id: 'mastercard',
      name: 'MasterCard (Manual Transfer)',
      description: 'Manual IBAN or local card transfer. Verified via WhatsApp.',
      numberInfo: 'IBAN: IQ98KORE00001234567890'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Customer & Delivery Details</span>
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ahmed Kurdistan"
            value={formData.customerName}
            onChange={(e) => {
              setFormData({ ...formData, customerName: e.target.value });
              if (errors.customerName) setErrors({ ...errors, customerName: null });
            }}
            className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
              errors.customerName
                ? 'border-rose-500/80 focus:border-rose-500'
                : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.customerName && (
            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.customerName}</span>
            </p>
          )}
        </div>

        {/* Phone & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 0750 123 4567"
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phoneNumber && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phoneNumber}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Governorate <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad"
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: null });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.city
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.city && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>
        </div>

        {/* Order note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="e.g. PUBG Player ID 512345678, or Discord username"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
          />
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-xl p-5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Select Payment Method</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manual local transfer only. You will receive invoice confirmation and contact instructions upon ordering.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              description={method.description}
              numberInfo={method.numberInfo}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => {
                setFormData({ ...formData, paymentMethod: id });
                if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: null });
              }}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
      >
        <span>{isSubmitting ? 'Processing Order...' : 'Complete Order'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default CheckoutForm;
