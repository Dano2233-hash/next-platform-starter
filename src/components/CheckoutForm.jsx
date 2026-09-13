import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export const CheckoutForm = ({ onSubmit, isSubmitting = false }) => {
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
    if (!formData.name.trim()) newErrors.name = 'Full Customer Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Active Phone Number is required';
    if (!formData.city.trim()) newErrors.city = 'City location is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

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
      {/* Customer Info Section */}
      <div className="bg-[#090e1a] border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-4 h-4 text-cyan-400" /> Customer Information
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Dano"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 pl-10 border ${
                errors.name ? 'border-red-500' : 'border-slate-800'
              } focus:outline-none focus:border-cyan-500 transition-all`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0750 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 pl-10 border ${
                  errors.phone ? 'border-red-500' : 'border-slate-800'
                } focus:outline-none focus:border-cyan-500 transition-all`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl px-4 py-2.5 pl-10 border border-slate-800 focus:outline-none focus:border-cyan-500 appearance-none transition-all"
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Halabja">Halabja</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Other Iraq City">Other Iraq City</option>
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#090e1a] border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            Select Payment Method <span className="text-red-400">*</span>
          </h3>
          <span className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Manual Payment Only
          </span>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}

        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Order Note */}
      <div className="bg-[#090e1a] border border-slate-800 p-5 rounded-2xl space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" /> Order Note / Player ID (Optional)
        </h3>
        <textarea
          rows={3}
          placeholder="Include your PUBG Player ID, Discord Tag, or special instructions..."
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <span>Complete & Place Order</span>
      </button>
    </form>
  );
};
