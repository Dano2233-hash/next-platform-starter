import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard.jsx';
import { ShieldCheck, User, Phone, MapPin, AlertCircle } from 'lucide-react';

export const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'FastPay',
      name: 'FastPay',
      description: 'Send payment via FastPay wallet / number',
      color: 'bg-emerald-400'
    },
    {
      id: 'Korek',
      name: 'Korek',
      description: 'Send payment via Korek Cash / direct balance',
      color: 'bg-amber-400'
    },
    {
      id: 'MasterCard',
      name: 'MasterCard',
      description: 'Transfer via local MasterCard / FIB',
      color: 'bg-blue-400'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.city.trim()) errs.city = 'City location is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';

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
      {/* Customer Information Section */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Dano Lawa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-all`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Phone Number (WhatsApp preferred) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g. 0750 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
                errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none transition-all`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            City / Region <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-900/90 text-sm text-slate-100 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="Erbil">Erbil (Hewlêr)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Halabja">Halabja</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Other Iraq City">Other Iraq City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.city}
            </p>
          )}
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Order Note / Game Player ID (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Include your PUBG Player ID, Free Fire ID, or special instructions if applicable..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl px-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Select Payment Method
        </h3>
        <p className="text-xs text-slate-400">
          All payments are manual. You will receive transfer instructions on the next screen.
        </p>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
      >
        Complete & Place Order
      </button>
    </form>
  );
};
