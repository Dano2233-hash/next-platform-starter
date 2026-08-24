import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number';
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
      const selectedMethodObj = PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod);
      onSubmitOrder({
        ...formData,
        paymentMethodName: selectedMethodObj ? selectedMethodObj.name : formData.paymentMethod,
        paymentAccountDetails: selectedMethodObj,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Box */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-2">
          1. Customer Details
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Dana Ahmed"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition ${
              errors.customerName ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.customerName && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 0750 123 4567"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition ${
                errors.phoneNumber ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition"
            >
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Other Kurdistan / Iraq">Other City</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Player ID / Account Details (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="For game top-ups, enter your Player ID or Character Name here..."
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Manual Payment Method Options */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-base font-bold text-slate-100">
            2. Select Payment Method
          </h3>
          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
            Manual Verification
          </span>
        </div>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-cyan-500/20 active:scale-98 transition duration-200 flex items-center justify-center gap-2"
      >
        <ShieldCheck className="w-5 h-5" />
        <span>Create Order & Complete Payment</span>
      </button>
    </form>
  );
}
