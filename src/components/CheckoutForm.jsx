import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, Lock } from 'lucide-react';
import { paymentMethods } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';

export const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil (Hawler)',
    'Sulaymaniyah (Slemani)',
    'Duhok',
    'Baghdad',
    'Kirkuk',
    'Halabja',
    'Basra',
    'Mosul',
    'Anbar',
    'Najaf',
    'Karbala',
    'Other Iraq City'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Customer name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) newErrors.city = 'City selection is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method selection is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const selectedPayment = paymentMethods.find((p) => p.id === formData.paymentMethod);
      onSubmitOrder({
        ...formData,
        paymentMethodName: selectedPayment ? selectedPayment.name : formData.paymentMethod,
        paymentDetails: selectedPayment ? selectedPayment.accountDetails : ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          1. Customer & Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Kurdistan"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                className={`w-full bg-[#0d1428] border ${
                  errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
              Phone Number / WhatsApp <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full bg-[#0d1428] border ${
                  errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* City Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#0d1428] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-8 text-sm text-slate-100 outline-none appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-[#080d1a] text-slate-200">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            2. Select Manual Payment Method
          </h3>
          <span className="text-xs text-amber-400 font-semibold bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
            Kurdistan / Iraq Local Payments
          </span>
        </div>

        {/* Rule note */}
        <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 leading-relaxed">
          <strong>Note:</strong> We accept <strong>FastPay</strong>, <strong>Korek</strong>, and <strong>MasterCard</strong> transfers only. No credit card charge or automated payment gateway required.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              selected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Note */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          3. Player ID / Order Instructions (Optional)
        </h3>
        <textarea
          rows="3"
          placeholder="For Mobile Top-Ups (e.g. PUBG ID, Free Fire ID) or specific game tag, write it here..."
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="w-full bg-[#0d1428] border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-slate-950 font-black text-base shadow-xl shadow-cyan-950 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? 'Creating Order...' : 'Complete Order & Request Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
