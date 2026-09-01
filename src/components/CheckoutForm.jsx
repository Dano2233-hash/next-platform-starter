import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ArrowRight } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Customer Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid local phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please choose a manual payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#080d28] border border-cyan-900/30 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-cyan-900/30 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-[#05081c] border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-cyan-900/40 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 0750 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-[#05081c] border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.phone ? 'border-rose-500/80 focus:border-rose-500' : 'border-cyan-900/40 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#05081c] border border-cyan-900/40 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all appearance-none"
            >
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Halabja">Halabja</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Other">Other Region in Iraq</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="e.g. Player ID / Account Username for top-up"
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-[#05081c] border border-cyan-900/40 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#080d28] border border-cyan-900/30 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-cyan-900/30 pb-3">
          Select Payment Method
        </h3>
        <p className="text-xs text-slate-400">
          Manual local payment only. Choose your preferred transfer method:
        </p>

        <div className="space-y-3">
          <PaymentMethodCard
            id="fastpay"
            name="FastPay"
            description="Transfer manually to FastPay Wallet number"
            badge="Recommended"
            selected={formData.paymentMethod === 'fastpay'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />
          <PaymentMethodCard
            id="korek"
            name="Korek"
            description="Transfer Korek mobile phone credit"
            selected={formData.paymentMethod === 'korek'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />
          <PaymentMethodCard
            id="mastercard"
            name="MasterCard"
            description="Bank transfer or local MasterCard"
            selected={formData.paymentMethod === 'mastercard'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200"
      >
        <span>{isSubmitting ? 'Processing Order...' : 'Complete Order Now'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};
