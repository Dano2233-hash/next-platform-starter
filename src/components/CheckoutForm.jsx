import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

const CheckoutForm = ({ onSubmit, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'fastpay',
      name: 'FastPay',
      description: 'Send payment via FastPay wallet number in Kurdistan.'
    },
    {
      id: 'korek',
      name: 'Korek Cash / Balance',
      description: 'Transfer via Korek Mobile Cash or Telecom transfer.'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / FIB / NassPay',
      description: 'Direct local bank card or First Iraqi Bank transfer.'
    }
  ];

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Halabja', 'Basra', 'Nineveh', 'Other City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g. 0750XXXXXXX).';
    }
    if (!formData.city) errs.city = 'City selection is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';

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
      {/* Customer Information */}
      <div className="p-5 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Ahmed"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-slate-900 border ${
                  errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                } text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 border ${
                  errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                } text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* City Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Location <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors appearance-none"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-slate-900 text-slate-200">
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="Enter your Player ID, Gamer Tag, or special instructions..."
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2 outline-none transition-colors"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Select Payment Method */}
      <div className="p-5 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400">
          Payment Method (Manual Transfer)
        </h3>
        <p className="text-xs text-slate-400 -mt-2">
          Choose your local payment option. Instructions will be shown on order confirmation.
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
          <p className="text-[11px] text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <CheckCircle className="w-5 h-5" />
        <span>Complete & Place Order</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
