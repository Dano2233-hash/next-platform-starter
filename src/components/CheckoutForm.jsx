import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ cart, cartTotal, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Halabja', 'Kirkuk', 'Baghdad', 'Basra', 'Other Iraq City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[0-9+\s-]{7,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. 0750 123 4567)';
    }
    if (!formData.city) errs.city = 'City selection is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';

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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Form details */}
      <div className="lg:col-span-7 space-y-6">

        {/* Customer Information Card */}
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <User className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-extrabold text-white">Customer Details</h3>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Karwan Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                    errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                  } focus:outline-none transition-colors`}
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Phone Number & City Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number (FastPay/Korek) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="0750 xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border ${
                      errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    } focus:outline-none transition-colors`}
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  City <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                {errors.city && (
                  <p className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Order Note / Player ID */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Order Note / Game Player ID (Optional)
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Include Player ID, In-Game Tag, or special instructions..."
                  value={formData.orderNote}
                  onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                  className="w-full bg-slate-900 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-extrabold text-white">Select Payment Method</h3>
            <span className="text-xs text-cyan-400 font-semibold">Manual Payment</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selected={formData.paymentMethod === method.id}
                onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
              />
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="text-xs text-rose-400 font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.paymentMethod}</span>
            </p>
          )}
        </div>

      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-extrabold text-white">Order Summary</h3>
          </div>

          {/* Cart Item Preview List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1">
                <div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                  <span className="text-slate-400 block text-[11px]">
                    Option: {item.packageName} x {item.quantity}
                  </span>
                </div>
                <span className="font-extrabold text-cyan-400">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE (Digital)</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800/80">
              <span>Total IQD</span>
              <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-sm hover:brightness-110 transition shadow-lg shadow-blue-600/30 uppercase tracking-wider"
          >
            Create Order Now
          </button>

          <p className="text-[11px] text-center text-slate-500 leading-relaxed">
            By creating an order, you agree to send the total payment via your chosen local payment operator.
          </p>
        </div>
      </div>
    </form>
  );
}
