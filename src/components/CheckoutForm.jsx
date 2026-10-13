import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cartItems, totalPrice, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const cities = [
    'Erbil',
    'Sulaymaniyah',
    'Duhok',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Halabja',
    'Zakho',
    'Other City in Iraq'
  ];

  const paymentMethods = [
    {
      id: 'fastpay',
      name: 'FastPay',
      details: 'Fast & Instant FastPay Mobile Wallet transfer',
      icon: 'FP'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      details: 'Korek Cash / Balance transfer',
      icon: 'KC'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / FIB',
      details: 'Direct Card transfer / First Iraqi Bank',
      icon: 'MC'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer full name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city) {
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
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information Card */}
      <div className="bg-[#090e1f] border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          <h3 className="font-orbitron font-bold text-base text-slate-100">Customer Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Full Name</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Ahmed"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={`w-full bg-[#0c1224] border rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.customerName ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>
            {errors.customerName && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.customerName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Phone Number</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0770 XXX XXXX or 0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-[#0c1224] border rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City Selection */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>City / Region</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none appearance-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-[#0c1224] text-slate-200">
                    {city}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Order Note */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Player ID / GamerTag / Account Note (Optional)</span>
            </label>
            <div className="relative">
              <textarea
                rows="2"
                placeholder="e.g. PUBG Player ID: 5123456789 or Special Instructions"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
              <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#090e1f] border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-bold text-base text-slate-100">Select Payment Method</h3>
          </div>
          <span className="text-xs text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            Manual Payment Only
          </span>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              name={pm.name}
              details={pm.details}
              icon={pm.icon}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
      >
        Complete Order ({formatPrice(totalPrice)})
      </button>
    </form>
  );
}
