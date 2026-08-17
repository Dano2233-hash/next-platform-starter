import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ArrowRight } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method';
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-[#090d16] p-5 sm:p-6 rounded-2xl border border-slate-800">
        <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Kurdistan"
              value={formData.customerName}
              onChange={(e) => {
                setFormData({ ...formData, customerName: e.target.value });
                if (errors.customerName) setErrors({ ...errors, customerName: null });
              }}
              className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                errors.customerName ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none focus:ring-1 transition`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          {errors.customerName && (
            <span className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                  errors.phone ? 'border-red-500/80 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
                } focus:outline-none focus:ring-1 transition`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </span>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500 transition appearance-none cursor-pointer"
              >
                <option value="Erbil">Erbil (Hewlêr)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Other">Other Iraq / Kurdistan City</option>
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>
        </div>

        {/* Order Note */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Player ID / Account Details / Order Note <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="e.g. PUBG Player ID: 512398401 or Steam Profile link"
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="flex flex-col gap-4 bg-[#090d16] p-5 sm:p-6 rounded-2xl border border-slate-800">
        <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">
          Select Payment Method
        </h3>
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelect={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-black font-black text-base hover:brightness-110 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>Complete & Place Order</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
