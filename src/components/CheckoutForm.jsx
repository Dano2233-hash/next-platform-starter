import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function CheckoutForm({ cartItems, totalPrice, onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'FastPay',
      name: 'FastPay Wallet',
      details: 'Instant transfer via FastPay App. Instructions will be provided on order completion page.',
      badge: 'Popular in Kurdistan'
    },
    {
      id: 'Korek',
      name: 'Korek Mobile Cash',
      details: 'Direct top-up / transfer via Korek Telecom balance or Korek Cash.',
      badge: 'Iraq / Kurdistan'
    },
    {
      id: 'MasterCard',
      name: 'MasterCard (FIB / Local Bank)',
      details: 'Manual bank card transfer for First Iraqi Bank or local Mastercard.',
      badge: 'Local Cards'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) errs.city = 'City selection is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';

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
      {/* Customer Info & Payment Method */}
      <div className="lg:col-span-7 space-y-6">
        {/* Customer Details Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Customer Details</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dana Ahmed"
                className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-2.5 border ${
                  errors.name ? 'border-red-500' : 'border-slate-800'
                } focus:outline-none focus:border-cyan-500`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0750 000 0000"
                  className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-2.5 border ${
                    errors.phone ? 'border-red-500' : 'border-slate-800'
                  } focus:outline-none focus:border-cyan-500`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-950 text-sm text-slate-100 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Erbil">Erbil (Hawler)</option>
                  <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                  <option value="Duhok">Duhok</option>
                  <option value="Kirkuk">Kirkuk</option>
                  <option value="Baghdad">Baghdad</option>
                  <option value="Basra">Basra</option>
                  <option value="Other Iraq City">Other Iraq City</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Order Note / Game Player ID (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.orderNote}
                onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                placeholder="Include Player ID or extra instructions"
                className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <span>Select Payment Method (Manual Payment Only)</span>
          </h3>

          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <PaymentMethodCard
                key={pm.id}
                id={pm.id}
                name={pm.name}
                details={pm.details}
                badge={pm.badge}
                selected={formData.paymentMethod === pm.id}
                onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary Right Column */}
      <div className="lg:col-span-5">
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 sticky top-24 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <span>Order Summary</span>
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/50 pb-2">
                <div>
                  <p className="font-bold text-white">{item.productName}</p>
                  <p className="text-[11px] text-cyan-400">{item.selectedPackage?.name} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-slate-100">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Processing Fee</span>
              <span className="text-emerald-400 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Total Amount</span>
              <span className="text-cyan-400 text-base">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-wide mt-4"
          >
            Create Order Now
          </button>
        </div>
      </div>
    </form>
  );
}
