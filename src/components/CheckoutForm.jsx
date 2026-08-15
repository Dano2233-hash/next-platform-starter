import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard.jsx';
import { User, Phone, MapPin, FileText, Lock, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'fastpay',
      title: 'FastPay',
      description: 'Transfer directly to FastPay wallet number.',
      badge: 'Most Popular'
    },
    {
      id: 'korek',
      title: 'Korek Telecom',
      description: 'Transfer via Korek credit or mobile balance.',
      badge: 'Instant'
    },
    {
      id: 'mastercard',
      title: 'MasterCard / FIB / Bank Transfer',
      description: 'Direct local card transfer or FIB account payment.',
      badge: 'Local Cards'
    }
  ];

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Halabja', 'Kirkuk', 'Baghdad', 'Other City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) errs.city = 'City selection is required';
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
      {/* Customer Info Section */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
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
              className={`w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-9 pr-4 py-2.5 border focus:outline-none transition-colors ${
                errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number (WhatsApp Recommended) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="0750 XXX XXXX or 0770 XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-9 pr-4 py-2.5 border focus:outline-none transition-colors ${
                errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="Add your PUBG ID, Player tag, or special instructions..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            ></textarea>
            <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-slate-800/80 pb-3">
          <span>Select Payment Method</span>
          <span className="text-xs text-cyan-400 font-semibold uppercase">Manual Payment</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              title={pm.title}
              description={pm.description}
              badge={pm.badge}
              selected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-red-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
      >
        <Lock className="w-4 h-4" /> Place Order & View Payment Info
      </button>
    </form>
  );
}
