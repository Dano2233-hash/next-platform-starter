import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, ArrowRight, User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export const CheckoutForm = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

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
    if (!formData.name.trim()) errs.name = 'Full Customer Name is required';
    if (!formData.phone.trim()) errs.phone = 'Valid Phone Number is required';
    if (!formData.city.trim()) errs.city = 'City name is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        orderNote: formData.orderNote.trim()
      },
      paymentMethod: formData.paymentMethod,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart & navigate to Order Success page with order state
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-heading font-extrabold text-lg text-slate-100 flex items-center gap-2">
          <User className="text-cyan-400" size={20} /> Customer Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Lawa Kardo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 focus:outline-none transition-all ${
                  errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g., 0750 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 focus:outline-none transition-all ${
                  errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <Phone size={16} className="absolute left-3.5 top-3 text-slate-500" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              City / Governorate *
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-sm text-slate-100 focus:outline-none transition-all"
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Halabja">Halabja</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Mosul">Mosul</option>
                <option value="Other Iraq City">Other Iraq City</option>
              </select>
              <MapPin size={16} className="absolute left-3.5 top-3 text-slate-500" />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle size={12} /> {errors.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(id) => setFormData({ ...formData, paymentMethod: id })}
        />
        {errors.paymentMethod && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1 font-medium">
            <AlertCircle size={12} /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Note */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <FileText size={16} className="text-cyan-400" /> Player ID / Game Tag / Order Notes (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Enter Player ID for top-ups (e.g. PUBG Player ID: 512345678) or any specific instructions..."
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-sm text-slate-100 focus:outline-none transition-all"
        />
      </div>

      {/* Complete Order Button */}
      <button
        type="submit"
        disabled={cart.length === 0}
        className="w-full py-4 rounded-2xl font-heading font-black text-base bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>Complete Order & Send Transfer Details ({formatPrice(cartTotal)})</span>
        <ArrowRight size={20} />
      </button>
    </form>
  );
};

export default CheckoutForm;
