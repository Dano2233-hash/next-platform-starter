import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag, Lock } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cart, totalPrice, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil',
    'Sulaymaniyah',
    'Duhok',
    'Kirkuk',
    'Halabja',
    'Baghdad',
    'Basra',
    'Mosul',
    'Other City'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid Iraqi phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Information Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-4 h-4 text-cyan-400" /> Customer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lawa Dano"
                className={`w-full bg-slate-950 text-slate-100 placeholder-slate-600 text-sm pl-10 pr-4 py-2.5 rounded-xl border ${
                  errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } focus:outline-none focus:ring-1 transition-all`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone Number / WhatsApp <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 0750 000 0000"
                className={`w-full bg-slate-950 text-slate-100 placeholder-slate-600 text-sm pl-10 pr-4 py-2.5 rounded-xl border ${
                  errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } focus:outline-none focus:ring-1 transition-all`}
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              City / Location <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(method) => setFormData({ ...formData, paymentMethod: method })}
        />
        {errors.paymentMethod && <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.paymentMethod}</p>}
      </div>

      {/* Order Notes Optional */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-slate-500" /> Order Note / Player ID (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          placeholder="Add your Player ID, Discord username, or special delivery notes here..."
          className="w-full bg-slate-950 text-slate-100 placeholder-slate-600 text-sm p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
      >
        <Lock className="w-5 h-5 text-cyan-200" />
        <span>Create Order ({formatPrice(totalPrice)})</span>
      </button>

    </form>
  );
}
