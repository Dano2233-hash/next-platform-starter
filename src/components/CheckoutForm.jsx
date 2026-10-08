import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
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
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
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
      {/* Customer Information Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Alan Kurdi"
              value={formData.customerName}
              onChange={(e) => {
                setFormData({ ...formData, customerName: e.target.value });
                if (errors.customerName) setErrors({ ...errors, customerName: null });
              }}
              className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.customerName && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g. 0750 123 4567"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: null });
              }}
              className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* City Select/Input Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            City <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: null });
              }}
              className="w-full bg-slate-900 text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Erbil">Erbil (Hewlêr)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
              <option value="Duhok">Duhok</option>
              <option value="Halabja">Halabja</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Mosul">Mosul</option>
              <option value="Other">Other Iraq / Kurdistan City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.city}
            </p>
          )}
        </div>

        {/* Order Note Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Account ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="e.g. PUBG ID: 512345678 or Discord tag: user#1234"
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelect={(method) => {
            setFormData({ ...formData, paymentMethod: method });
            if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: null });
          }}
        />
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/50 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span>Creating Order...</span>
        ) : (
          <span>Confirm & Create Order</span>
        )}
      </button>
    </form>
  );
}
