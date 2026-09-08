import React, { useState } from 'react';
import { PaymentMethodCard, paymentMethods } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('fastpay');
  const [orderNote, setOrderNote] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = 'Full name is required.';
    }
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!city.trim()) {
      errs.city = 'City is required.';
    }
    if (!paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        city: city.trim(),
        paymentMethod,
        orderNote: orderNote.trim()
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Block */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: null }));
              }}
              placeholder="e.g. Lawa Dano"
              className={`w-full bg-[#0d1427] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>
          {errors.customerName && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: null }));
                }}
                placeholder="0750 XXX XXXX"
                className={`w-full bg-[#0d1427] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.phoneNumber
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              City / Location <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
                }}
                placeholder="e.g. Erbil / Sulaymaniyah / Duhok"
                className={`w-full bg-[#0d1427] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.city
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                }`}
              />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <textarea
              rows={2}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="e.g. PUBG Player ID: 512345678 or extra instructions"
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Select Payment Method</span>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
            Manual Verification
          </span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={paymentMethod === method.id}
              onSelect={(id) => {
                setPaymentMethod(id);
                if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: null }));
              }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-cyan-950/50 transition-all active:scale-[0.99] uppercase tracking-wider"
      >
        Complete Order & Pay
      </button>
    </form>
  );
};
