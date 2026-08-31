import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, cartTotal }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!city.trim()) errs.city = 'City / Region is required';
    if (!paymentMethod) errs.paymentMethod = 'Please select a payment method';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder({
        customerName: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        paymentMethod,
        orderNote: orderNote.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
        Customer & Payment Details
      </h3>

      {/* Customer Name */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          Customer Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
            }}
            placeholder="e.g. Lawa Ahmed"
            className={`w-full bg-slate-900 border ${
              errors.name ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
            } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1`}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
          </p>
        )}
      </div>

      {/* Phone & City Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
              }}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-slate-900 border ${
                errors.phone ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            City / Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
              }}
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad"
              className={`w-full bg-slate-900 border ${
                errors.city ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1`}
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <PaymentMethodCard
          selectedMethod={paymentMethod}
          onSelect={(methodId) => {
            setPaymentMethod(methodId);
            if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: null }));
          }}
        />
        {errors.paymentMethod && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Note */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
          Order Note / Player ID (Optional)
        </label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <textarea
            rows={3}
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="Add any special instructions or Player ID / Character ID for game top-ups..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all transform active:scale-[0.99]"
      >
        Complete Order & Get Payment Details
      </button>
    </form>
  );
}
