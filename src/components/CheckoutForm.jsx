import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentOptions = [
    {
      id: 'FastPay',
      name: 'FastPay',
      description: 'Transfer via FastPay wallet to our merchant ID/number in IQD.',
      accountDetails: '+964 750 000 1122 (FastPay Account)',
      colorClass: 'from-blue-600 to-cyan-400'
    },
    {
      id: 'Korek',
      name: 'Korek Telecom / Cash',
      description: 'Transfer via Korek credit or Korek cash service in IQD.',
      accountDetails: '+964 750 000 3344 (Korek Number)',
      colorClass: 'from-purple-600 to-blue-500'
    },
    {
      id: 'MasterCard',
      name: 'MasterCard / FIB Card',
      description: 'Direct IBAN / Card transfer via Iraqi banks or FIB in IQD.',
      accountDetails: 'IBAN: IQ88 FIBE 0000 1234 5678 9012',
      colorClass: 'from-amber-500 to-cyan-400'
    }
  ];

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Halabja', 'Kirkuk', 'Baghdad', 'Basra', 'Mosul', 'Other Iraqi City'];

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information Card */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <span>Customer Details</span>
        </h3>

        {/* Name Input */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Lawa Kurdi"
              value={formData.customerName}
              onChange={(e) => {
                setFormData({ ...formData, customerName: e.target.value });
                if (errors.customerName) setErrors({ ...errors, customerName: null });
              }}
              className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all ${
                errors.customerName ? 'border-red-500' : 'border-slate-700/80 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.customerName && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.customerName}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0750 XXX XXXX"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                }}
                className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all ${
                  errors.phoneNumber ? 'border-red-500' : 'border-slate-700/80 focus:border-cyan-500'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              City <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-100 outline-none transition-all appearance-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-100">
                    {c}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows="2"
              placeholder="e.g. Player ID for PUBG / Valorant Riot ID / Game tag..."
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Payment Method Selection Card */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-base flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Payment Method (Manual)</span>
          <span className="text-xs text-cyan-400 font-normal">IQD Currency Only</span>
        </h3>

        {errors.paymentMethod && (
          <p className="text-red-400 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentOptions.map((opt) => (
            <PaymentMethodCard
              key={opt.id}
              id={opt.id}
              name={opt.name}
              description={opt.description}
              accountDetails={opt.accountDetails}
              isSelected={formData.paymentMethod === opt.id}
              onSelect={(id) => {
                setFormData({ ...formData, paymentMethod: id });
                if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: null });
              }}
              colorClass={opt.colorClass}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm md:text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <ShieldCheck className="w-5 h-5" />
        <span>Confirm & Create Order</span>
      </button>
    </form>
  );
}
