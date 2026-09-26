import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';
import { PAYMENT_METHODS, PaymentMethodCard } from './PaymentMethodCard';

export const CheckoutForm = ({ onSubmitOrder, isSubmitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
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
      onSubmitOrder(formData);
    }
  };

  const handleMethodSelect = (id) => {
    setFormData((prev) => ({ ...prev, paymentMethod: id }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-[#090e1f] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Full Name</span>
              <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Ahmed"
                value={formData.customerName}
                onChange={(e) => {
                  setFormData({ ...formData, customerName: e.target.value });
                  if (errors.customerName) setErrors({ ...errors, customerName: null });
                }}
                className={`w-full bg-[#0d142a] border ${
                  errors.customerName ? 'border-red-500' : 'border-slate-700'
                } text-slate-100 text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-400`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.customerName && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.customerName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>Phone Number (WhatsApp)</span>
              <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full bg-[#0d142a] border ${
                  errors.phone ? 'border-red-500' : 'border-slate-700'
                } text-slate-100 text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-400`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* City Select/Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>City / Governorate</span>
            <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-[#0d142a] border border-slate-700 text-slate-100 text-xs rounded-xl py-2.5 pl-9 pr-3 focus:outline-none focus:border-cyan-400"
            >
              <option value="Erbil">Erbil (Hewlêr)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
              <option value="Duhok">Duhok</option>
              <option value="Halabja">Halabja</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Mosul">Mosul</option>
              <option value="Basra">Basra</option>
              <option value="Other">Other Iraqi City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Order Note */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>Order Note / Player ID (Optional)</span>
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="e.g. PUBG Player ID, Discord Username, or special instruction..."
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-[#0d142a] border border-slate-700 text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#090e1f] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <span>Select Payment Method</span>
          <span className="text-xs text-cyan-400 font-normal ml-auto">(Manual Transfer)</span>
        </h3>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod}
              onSelect={handleMethodSelect}
            />
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 font-bold flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-cyan-950/60 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Order...' : 'Complete Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;
