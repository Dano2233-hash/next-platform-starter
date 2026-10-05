import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, Lock } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const CITIES_IRAQ = [
  'Erbil',
  'Sulaymaniyah',
  'Duhok',
  'Kirkuk',
  'Halabja',
  'Baghdad',
  'Basra',
  'Mosul',
  'Anbar',
  'Babil',
  'Dhi Qar',
  'Diyala',
  'Karbala',
  'Maysan',
  'Muthanna',
  'Najaf',
  'Qadisiyyah',
  'Saladin',
  'Wasit'
];

const CheckoutForm = ({ onSubmitOrder, cartTotal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid Iraqi phone number';
    }

    if (!formData.city) {
      newErrors.city = 'City selection is required';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Banner Alert for Validation Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs shadow-lg animate-shake">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm text-red-300">Form validation required</h4>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
              {Object.values(errors).map((err, idx) => err && <li key={idx}>{err}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* Customer Information Card */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-800">
          <User className="w-4 h-4" />
          <span>1. Customer & Delivery Info</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Full Name <span className="text-red-400">*</span></span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Karwan Ahmed"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.name && <p className="text-[11px] text-red-400 font-medium">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Phone Number <span className="text-red-400">*</span></span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0750 XXX XXXX / 0770 XXX XXXX"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            {errors.phone && <p className="text-[11px] text-red-400 font-medium">{errors.phone}</p>}
          </div>

          {/* City Selection */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>City / Region <span className="text-red-400">*</span></span>
            </label>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-xl text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all appearance-none"
              >
                {CITIES_IRAQ.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
            {errors.city && <p className="text-[11px] text-red-400 font-medium">{errors.city}</p>}
          </div>

          {/* Order Note */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Order Note / Account Player ID <span className="text-slate-500">(Optional)</span></span>
            </label>
            <div className="relative">
              <textarea
                name="orderNote"
                rows="2"
                value={formData.orderNote}
                onChange={handleChange}
                placeholder="e.g., Player ID: 5123456789 or special delivery instructions"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 focus:border-cyan-400 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none"
              />
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-800">
          <Lock className="w-4 h-4" />
          <span>2. Payment Method</span>
        </h3>

        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(method) => {
            setFormData(prev => ({ ...prev, paymentMethod: method }));
            if (errors.paymentMethod) {
              setErrors(prev => ({ ...prev, paymentMethod: null }));
            }
          }}
        />
        {errors.paymentMethod && <p className="text-[11px] text-red-400 font-medium">{errors.paymentMethod}</p>}
      </div>

      {/* Place Order Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-base uppercase tracking-wider shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Complete Order ({formatPrice(cartTotal)})</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
