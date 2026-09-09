import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import { PaymentMethodCard } from './PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';
import { User, Phone, MapPin, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ cartItems, totalAmount, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder({
        customer: formData,
        items: cartItems,
        total: totalAmount,
        createdAt: new Date().toISOString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
          <User className="w-4 h-4 text-cyan-400" /> Customer Information
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Dano"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.customerName ? 'border-red-500' : 'border-slate-700/80'
              } focus:outline-none focus:border-cyan-500`}
            />
            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
          {errors.customerName && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0750 XXX XXXX"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className={`w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-slate-700/80'
                } focus:outline-none focus:border-cyan-500`}
              />
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/80 focus:outline-none focus:border-cyan-500 appearance-none"
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Halabja">Halabja</option>
                <option value="Other">Other City</option>
              </select>
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="e.g. PUBG Player ID: 512345678 or extra account instructions"
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-2 border border-slate-700/80 focus:outline-none focus:border-cyan-500"
            />
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Select Manual Payment Method
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selectedMethod={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl text-sm font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 hover:text-black hover:opacity-95 shadow-xl shadow-cyan-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Complete & Submit Order ({formatPrice(totalAmount)})</span>
      </button>
    </form>
  );
};
