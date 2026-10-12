import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSuccess }) {
  const { cartItems, cartTotal, createOrder } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPaymentObj = PAYMENT_METHODS.find(
      (m) => m.id === formData.paymentMethod
    );

    const newOrder = {
      id: generateOrderId(),
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: selectedPaymentObj?.name || formData.paymentMethod,
      paymentMethodId: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    const created = createOrder(newOrder);
    onSuccess(created);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Lawa Omer"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full py-2.5 px-3.5 bg-slate-950 border rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.name && (
              <p className="text-[11px] font-medium text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="0750 XXX XXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full py-2.5 px-3.5 bg-slate-950 border rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] font-medium text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            City / Region <span className="text-red-400">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            <option value="Erbil">Erbil / Hewlêr</option>
            <option value="Sulaymaniyah">Sulaymaniyah / Slemani</option>
            <option value="Duhok">Duhok</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Halabja">Halabja</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Basra">Basra</option>
            <option value="Mosul">Mosul</option>
            <option value="Other">Other City (Iraq / Kurdistan)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Include Player ID, In-Game Name, or specific delivery instructions..."
            value={formData.orderNote}
            onChange={(e) =>
              setFormData({ ...formData, orderNote: e.target.value })
            }
            className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-100">
            Payment Method
          </h3>
          <span className="text-[11px] font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-md">
            Manual Transfer Only
          </span>
        </div>

        {errors.paymentMethod && (
          <p className="text-[11px] font-medium text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.paymentMethod}
          </p>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:via-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all transform active:scale-98"
      >
        Complete Order ({formatPrice(cartTotal)})
      </button>
    </form>
  );
}
