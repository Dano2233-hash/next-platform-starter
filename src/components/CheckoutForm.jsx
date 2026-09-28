import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { AlertCircle, Send } from 'lucide-react';

export const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil (Hewlêr)',
    'Sulaymaniyah (Slemany)',
    'Duhok',
    'Halabja',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Mosul',
    'Other City'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectPayment = (id) => {
    setFormData((prev) => ({ ...prev, paymentMethod: id }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City selection is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800/80 pb-3">
          1. Customer Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alan Karwan"
              className={`w-full bg-slate-900 border text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors ${
                errors.name ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) *
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0750 XXX XXXX"
              className={`w-full bg-slate-900 border text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            City / Region *
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800/80 pb-3">
          2. Select Payment Method
        </h3>

        <p className="text-xs text-slate-400">
          Payment is processed manually after creating the order. Only FastPay, Korek, and MasterCard are accepted.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              selected={formData.paymentMethod === pm.id}
              onSelect={handleSelectPayment}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Notes */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800/80 pb-3">
          3. Account / Order Note (Optional)
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Player ID, Account Email or Notes
          </label>
          <textarea
            name="orderNote"
            value={formData.orderNote}
            onChange={handleChange}
            rows={3}
            placeholder="Enter your PUBG ID, Valorant tag, or any special instruction for fast delivery..."
            className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Creating Order...' : 'Complete Order & Pay'}</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
