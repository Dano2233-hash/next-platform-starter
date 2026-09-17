import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, CreditCard } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.';
    } else if (!/^(\+?964|0)?7[0-9]{9}$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      errs.phoneNumber = 'Please enter a valid Iraqi mobile phone number (e.g., 0750XXXXXXX).';
    }
    if (!formData.city.trim()) {
      errs.city = 'City selection is required.';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const paymentMethodsList = [
    {
      id: 'FastPay',
      name: 'FastPay Mobile Wallet',
      description: 'Send manual transfer to our official FastPay number after order confirmation.',
      badge: 'Most Popular',
    },
    {
      id: 'Korek',
      name: 'Korek Telecom Direct',
      description: 'Transfer credit directly or send Korek scratch card pin code.',
      badge: 'Fast',
    },
    {
      id: 'MasterCard',
      name: 'MasterCard Local Payment',
      description: 'Manual FIB or local MasterCard card transfer.',
      badge: 'Standard',
    },
  ];

  const cities = [
    'Erbil',
    'Sulaymaniyah',
    'Duhok',
    'Kirkuk',
    'Baghdad',
    'Halabja',
    'Zakho',
    'Basra',
    'Mosul',
    'Other City'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Card */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g., Lawa Dano"
              className={`w-full bg-[#0d1424] border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-700/80 focus:border-cyan-400'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.customerName && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.customerName}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone / WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="0750 XXX XX XX"
              className={`w-full bg-[#0d1424] border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-700/80 focus:border-cyan-400'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phoneNumber}</span>
            </p>
          )}
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-all appearance-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID / Special Instructions (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g., PUBG Player ID: 5123456789 or Discord Tag: User#1234"
              className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CreditCard className="w-4 h-4 text-cyan-400" />
          <span>Select Manual Payment Method</span>
        </h3>

        <div className="space-y-3">
          {paymentMethodsList.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              name={pm.name}
              description={pm.description}
              badge={pm.badge}
              selected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 disabled:opacity-50 text-black font-black text-base rounded-2xl shadow-xl shadow-cyan-500/20 transition-all"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm Order & Create Request'}
      </button>

    </form>
  );
}
