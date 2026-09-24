import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ onSubmitOrder, cartTotal, cartItems }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil (Hawler)',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Customer Name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone Number is required.';
    if (!formData.city.trim()) errs.city = 'City selection is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Payment method selection is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
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
      <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" /> Customer Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Dano"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 ${
                  errors.customerName ? 'border-red-500' : 'border-slate-800'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.customerName && (
              <p className="text-xs text-red-400 mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone / WhatsApp Number <span className="text-cyan-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 0750 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 ${
                  errors.phone ? 'border-red-500' : 'border-slate-800'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            City in Kurdistan / Iraq <span className="text-cyan-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 ${
                errors.city ? 'border-red-500' : 'border-slate-800'
              }`}
            >
              <option value="Erbil (Hawler)">Erbil (Hawler)</option>
              <option value="Sulaymaniyah (Slemani)">Sulaymaniyah (Slemani)</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Halabja">Halabja</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Mosul">Mosul</option>
              <option value="Other City in Iraq">Other City in Iraq</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="text-xs text-red-400 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Notes / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="e.g. My Player ID is 512345678 or Discord username"
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Manual Payment Methods Options */}
      <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
          <span>Manual Payment Method</span>
          <span className="text-xs font-semibold text-slate-400">Kurdistan & Iraq Local</span>
        </h3>

        <div className="space-y-3">
          <PaymentMethodCard
            id="FastPay"
            name="FastPay"
            description="Transfer total amount to FastPay wallet. You will get account details after confirming order."
            badge="Instant Local"
            selected={formData.paymentMethod === 'FastPay'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />

          <PaymentMethodCard
            id="Korek"
            name="Korek Telecom / Cash"
            description="Transfer total amount via Korek balance or Korek Cash account."
            badge="Popular"
            selected={formData.paymentMethod === 'Korek'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />

          <PaymentMethodCard
            id="MasterCard"
            name="MasterCard (Iraq / FIB / First Iraqi Bank)"
            description="Manual bank transfer using Iraqi FIB / MasterCard card."
            badge="Direct Bank"
            selected={formData.paymentMethod === 'MasterCard'}
            onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
          />
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 mt-1">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Total Amount Due</span>
          <span className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Confirm & Complete Order</span>
        </button>
      </div>
    </form>
  );
}
