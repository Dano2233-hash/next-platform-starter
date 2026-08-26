import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

export const PAYMENT_METHODS = [
  {
    id: 'fastpay',
    name: 'FastPay',
    description: 'Manual FastPay transfer to store account number.',
    numberInfo: 'Send to: 0750 XXX XXXX'
  },
  {
    id: 'korek',
    name: 'Korek Cash / Balance',
    description: 'Transfer via Korek Telecom mobile service.',
    numberInfo: 'Send to: 0750 XXX XXXX'
  },
  {
    id: 'mastercard',
    name: 'MasterCard / FIB Bank',
    description: 'Bank transfer or MasterCard FIB payment.',
    numberInfo: 'Iban: IQ00 FIB 0750 XXX XXXX'
  }
];

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required for order verification.';
    } else if (formData.phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City location is required.';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="p-5 rounded-2xl bg-[#090d18] border border-gray-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <User className="w-4 h-4" />
          Customer Information
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="e.g. Lawa Azad"
              className={`w-full bg-[#050811] border text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 transition-all ${
                errors.customerName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          {errors.customerName && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            Phone Number (WhatsApp) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-[#050811] border text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 transition-all ${
                errors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          {errors.phoneNumber && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phoneNumber}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-[#050811] border text-xs text-white rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 transition-all ${
                errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            >
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Halabja">Halabja</option>
              <option value="Other Iraq City">Other Iraq City</option>
            </select>
            <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
          </div>
          {errors.city && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.city}
            </p>
          )}
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="p-5 rounded-2xl bg-[#090d18] border border-gray-800 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            Select Payment Method <span className="text-red-400">*</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Select your preferred local payment method. Real online card processing is not required.
          </p>
        </div>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Notes / Player ID input */}
      <div className="p-5 rounded-2xl bg-[#090d18] border border-gray-800 space-y-3">
        <label className="block text-xs font-semibold text-gray-300">
          Order Note / Player ID / Special Instructions
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            placeholder="e.g. PUBG Player ID: 512345678, or Steam account link..."
            className="w-full bg-[#050811] border border-gray-800 text-xs text-white placeholder-gray-500 rounded-xl p-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm Order & View Contact Details'}
      </button>
    </form>
  );
}
