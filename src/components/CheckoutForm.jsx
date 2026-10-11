import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Halabja', 'Baghdad', 'Kirkuk', 'Basra', 'Other'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) errs.city = 'City selection is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Payment method is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-4 h-4 text-cyan-400" /> Customer Details
        </h3>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Ahmed"
              className={`w-full bg-slate-950 border text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-slate-950 border text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-white">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Enter your Player ID, Discord username, or special instructions..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-sm p-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection Box */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          Select Manual Payment Method <span className="text-rose-500">*</span>
        </h3>

        <div className="space-y-3">
          <PaymentMethodCard
            id="FastPay"
            name="FastPay (Direct Transfer)"
            description="Send payment to our official FastPay wallet. Instant digital code or top-up release upon verification."
            selected={formData.paymentMethod === 'FastPay'}
            onSelect={(m) => setFormData({ ...formData, paymentMethod: m })}
            badge="Popular in Kurdistan"
          />

          <PaymentMethodCard
            id="Korek"
            name="Korek Telecom (Balance Transfer)"
            description="Transfer Korek mobile phone credit to our number for instant order completion."
            selected={formData.paymentMethod === 'Korek'}
            onSelect={(m) => setFormData({ ...formData, paymentMethod: m })}
            badge="Fast & Easy"
          />

          <PaymentMethodCard
            id="MasterCard"
            name="MasterCard / Local Card"
            description="Manual card payment transfer via FIB or Local Iraqi MasterCard."
            selected={formData.paymentMethod === 'MasterCard'}
            onSelect={(m) => setFormData({ ...formData, paymentMethod: m })}
            badge="Secure"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Processing Order...' : 'Complete Order & Send Details'}
      </button>
    </form>
  );
}
