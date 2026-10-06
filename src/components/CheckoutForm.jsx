import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import { PaymentMethodCard } from './PaymentMethodCard';

export const CheckoutForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#090d1a] p-6 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              placeholder="e.g. Lawa Kurdistan"
              className={`w-full bg-[#05070f] border rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.customerName && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.customerName}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-[#05070f] border rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-rose-500/80 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phoneNumber}</span>
            </p>
          )}
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            City / Governorate <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
            >
              <option value="Erbil">Erbil (Hewlêr)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
              <option value="Duhok">Duhok</option>
              <option value="Halabja">Halabja</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Mosul">Mosul</option>
              <option value="Other">Other Iraq City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Player ID / Game Tag / Note (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => handleChange('orderNote', e.target.value)}
              placeholder="Enter your Player ID (PUBG ID, MLBB ID, Riot ID) or special instructions..."
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all resize-none"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#090d1a] p-6 rounded-2xl border border-slate-800">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelect={(method) => handleChange('paymentMethod', method)}
        />
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 mt-2">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-cyan-950/50 hover:shadow-cyan-500/20 active:scale-98 transition-all duration-200"
      >
        {isSubmitting ? 'Creating Order...' : 'Complete Order & Pay'}
      </button>
    </form>
  );
};
