import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
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
      {/* Customer Info */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              placeholder="e.g. Lawa Kurdistan"
              className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                placeholder="0750 XXX XXXX"
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City / Region *
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: null });
                }}
                className={`w-full pl-10 pr-3 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 focus:outline-none transition appearance-none ${
                  errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Mosul">Mosul</option>
                <option value="Halabja">Halabja</option>
                <option value="Other">Other City</option>
              </select>
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Account ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="e.g. Player ID for PUBG top-up or specific instructions"
              className="w-full pl-10 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition resize-none"
            />
            <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(method) => {
            setFormData({ ...formData, paymentMethod: method });
            if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: null });
          }}
        />
        {errors.paymentMethod && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-black text-base shadow-xl shadow-cyan-950/50 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm & Place Order'}
      </button>
    </form>
  );
}
