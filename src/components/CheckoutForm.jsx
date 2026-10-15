import React, { useState } from 'react';
import { PAYMENT_METHODS, PaymentMethodCard } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
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
      {/* Section 1: Customer Details */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Details</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Dano"
              className={`w-full bg-[#05070f] border ${
                errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-3 px-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0750 XXX XXXX or 0770 XXX XXXX"
              className={`w-full bg-[#05070f] border ${
                errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl py-3 px-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            City / Location <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={`w-full bg-[#05070f] border ${
              errors.city ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            } rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none transition-all`}
          >
            <option value="Erbil">Erbil (Hawler)</option>
            <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
            <option value="Duhok">Duhok</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Basra">Basra</option>
            <option value="Mosul">Mosul</option>
            <option value="Other">Other City in Kurdistan / Iraq</option>
          </select>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Order Note / Player ID (Optional)
          </label>
          <textarea
            rows="2"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            placeholder="Add Player ID, User ID, or special instructions..."
            className="w-full bg-[#05070f] border border-slate-800 focus:border-cyan-500 rounded-xl py-3 px-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Section 2: Manual Payment Methods */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Select Payment Method</span>
          <span className="text-xs text-cyan-400 font-semibold uppercase">Manual Transfer</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selectedMethod={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950 transition-all duration-200 active:scale-98 flex items-center justify-center gap-2"
      >
        {isLoading ? 'Creating Order...' : 'Confirm Order'}
      </button>
    </form>
  );
};
