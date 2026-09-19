import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import { PaymentMethodCard } from './PaymentMethodCard';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
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
    'Anbar',
    'Najaf',
    'Other City'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handlePaymentMethodSelect = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required (e.g., 0750XXXXXXX)';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <User className="w-4 h-4" /> Customer Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g. Lawa Kurdistan"
                className={`w-full bg-[#060911] text-slate-100 text-xs font-medium pl-9 pr-3 py-3 rounded-xl border ${
                  errors.customerName ? 'border-rose-500' : 'border-slate-800'
                } focus:border-cyan-500 focus:outline-none`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
            {errors.customerName && (
              <p className="text-[11px] font-medium text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.customerName}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Phone Number / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0750 XXX XXXX or 0770 XXX XXXX"
                className={`w-full bg-[#060911] text-slate-100 text-xs font-medium pl-9 pr-3 py-3 rounded-xl border ${
                  errors.phone ? 'border-rose-500' : 'border-slate-800'
                } focus:border-cyan-500 focus:outline-none`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            </div>
            {errors.phone && (
              <p className="text-[11px] font-medium text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block">
              City / Province <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#060911] text-slate-100 text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-[11px] font-medium text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
            Payment Method <span className="text-rose-500">*</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manual transfer options available in Kurdistan & Iraq
          </p>
        </div>

        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={handlePaymentMethodSelect}
        />

        {errors.paymentMethod && (
          <p className="text-[11px] font-medium text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Optional Order Note */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 space-y-3">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Game ID / Player ID / Order Notes (Optional)</span>
        </label>
        <textarea
          name="orderNote"
          rows={3}
          value={formData.orderNote}
          onChange={handleChange}
          placeholder="Enter PUBG Player ID, Free Fire ID, Discord Username, or any specific instructions for delivery..."
          className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 font-extrabold text-sm rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/20 hover:opacity-90 transition transform active:scale-98 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm Order & View Payment Details'}
      </button>
    </form>
  );
};
