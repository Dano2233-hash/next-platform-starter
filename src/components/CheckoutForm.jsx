import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';
import { User, Phone, MapPin, MessageSquare, AlertCircle, ArrowRight } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';

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
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 font-heading border-b border-slate-800 pb-3">
          Customer & Delivery Information
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-all`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          {errors.name && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Phone Number / WhatsApp *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. 0750 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-all`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          {errors.phone && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            City *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad..."
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                errors.city ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-all`}
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          {errors.city && (
            <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Order Note / Game ID / Account Info (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Enter Player ID (e.g. PUBG ID: 51234567), Steam profile link, or any special instructions..."
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all"
            />
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
        />
        {errors.paymentMethod && (
          <p className="text-rose-400 text-xs mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>Complete Order ({formatPrice(totalAmount)})</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};
