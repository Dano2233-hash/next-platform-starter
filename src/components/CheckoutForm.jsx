import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil (Hawler)',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const citiesList = [
    'Erbil (Hawler)',
    'Sulaymaniyah (Slemani)',
    'Duhok',
    'Kirkuk',
    'Halabja',
    'Baghdad',
    'Basra',
    'Mosul',
    'Najaf',
    'Other City in Iraq',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
      {/* Customer Name */}
      <div>
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Full Name *
        </label>
        <div className="relative">
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="e.g. Lawa Dano"
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
              errors.customerName
                ? 'border-rose-500 ring-1 ring-rose-500'
                : 'border-slate-800 focus:border-cyan-400'
            }`}
          />
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>
        {errors.customerName && (
          <p className="flex items-center gap-1 text-xs text-rose-400 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.customerName}</span>
          </p>
        )}
      </div>

      {/* Phone Number & City Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 0750 123 4567"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-rose-500 ring-1 ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-400'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          {errors.phoneNumber && (
            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phoneNumber}</span>
            </p>
          )}
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
            City / Location *
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-all appearance-none cursor-pointer"
            >
              {citiesList.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-slate-100">
                  {c}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>
      </div>

      {/* Payment Method Selector */}
      <PaymentMethodCard
        selectedMethod={formData.paymentMethod}
        onSelectMethod={(methodId) => {
          setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
          if (errors.paymentMethod) {
            setErrors((prev) => ({ ...prev, paymentMethod: null }));
          }
        }}
      />
      {errors.paymentMethod && (
        <p className="flex items-center gap-1 text-xs text-rose-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errors.paymentMethod}</span>
        </p>
      )}

      {/* Order Note */}
      <div>
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Player ID / Account Note (Optional)
        </label>
        <div className="relative">
          <textarea
            name="orderNote"
            rows="2"
            value={formData.orderNote}
            onChange={handleChange}
            placeholder="e.g. PUBG Player ID: 512345678, or Steam account link"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Confirm & Place Order'}
      </button>
    </form>
  );
}

export default CheckoutForm;
