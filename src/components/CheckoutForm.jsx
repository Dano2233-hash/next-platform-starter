import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import PaymentMethodCard from './PaymentMethodCard';
import { AlertCircle, ArrowRight, ShieldCheck, User, Phone, MapPin } from 'lucide-react';

const PAYMENT_METHODS = [
  {
    id: 'FastPay',
    name: 'FastPay Mobile Wallet',
    shortName: 'FastPay',
    description: 'Instant transfer via FastPay account',
    badgeClass: 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
  },
  {
    id: 'Korek',
    name: 'Korek Cash / Top-Up',
    shortName: 'Korek',
    description: 'Direct transfer using Korek Telecom number',
    badgeClass: 'bg-amber-950 text-amber-400 border border-amber-700/60'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / FIB / Iraq Card',
    shortName: 'MasterCard',
    description: 'Local Iraqi Bank & MasterCard transfer',
    badgeClass: 'bg-blue-950 text-blue-400 border border-blue-700/60'
  }
];

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    note: ''
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

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.note,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    addOrder(newOrder);
    clearCart();
    navigate(`/order-success?orderId=${orderId}`, { state: { order: newOrder } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Information */}
      <div className="bg-[#0a0f24] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Full Name *</label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Dano"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.name && <p className="text-xs font-semibold text-red-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Phone Number (WhatsApp) *</label>
          <div className="relative">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0750 123 4567"
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-700/80 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
          {errors.phone && <p className="text-xs font-semibold text-red-400 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">City / Province *</label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition-all appearance-none"
            >
              <option value="Erbil">Erbil (Hewlêr)</option>
              <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
              <option value="Duhok">Duhok</option>
              <option value="Halabja">Halabja</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Basra">Basra</option>
              <option value="Mosul">Mosul</option>
              <option value="Other Iraq City">Other Iraq City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Order Note */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Player ID / Order Note (Optional)</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="For game top-ups, add your Player ID / Character ID here..."
            rows={2}
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          ></textarea>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-[#0a0f24] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>Select Payment Method</span>
          <span className="text-xs font-semibold text-cyan-400">Manual Payment</span>
        </h3>

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selectedMethod={formData.paymentMethod}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="text-xs font-semibold text-red-400">{errors.paymentMethod}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all"
      >
        <span>Confirm Order</span>
        <ArrowRight className="w-5 h-5" />
      </button>

    </form>
  );
}
