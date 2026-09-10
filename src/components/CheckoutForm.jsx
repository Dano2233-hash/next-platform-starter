import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cart, totalPrice, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
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
    'Other Iraqi City'
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
    if (!formData.name.trim()) {
      newErrors.name = 'Full customer name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number (e.g., 0750XXXXXXX)';
    }
    if (!formData.city) {
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
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Delivery Information</span>
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="e.g. Lawa Dano"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-slate-950 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Phone Number (WhatsApp) *
          </label>
          <div className="relative">
            <input
              type="text"
              name="phone"
              placeholder="0750 XXX XXXX or 0770 XXX XXXX"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full bg-slate-950 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Location *
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-slate-100">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          </div>
        </div>

        {/* Order Note Optional */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Player ID / Account Note (Optional)
          </label>
          <div className="relative">
            <textarea
              name="orderNote"
              rows={2}
              placeholder="e.g., PUBG Player ID: 5123456789 or special instructions"
              value={formData.orderNote}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <FileText className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6">
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
          <p className="text-xs text-rose-400 mt-2 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/60 transition-all active:scale-[0.99]"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Complete Order ({formatPrice(totalPrice)})</span>
      </button>
    </form>
  );
}
