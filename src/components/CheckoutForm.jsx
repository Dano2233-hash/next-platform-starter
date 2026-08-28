import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethodCard from './PaymentMethodCard';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

export function CheckoutForm({ cartItems = [], cartTotal = 0, onClearCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const cities = ['Erbil', 'Sulaymaniyah', 'Duhok', 'Kirkuk', 'Baghdad', 'Basra', 'Mosul', 'Halabja', 'Other City'];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city) {
      errs.city = 'City selection is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cartItems,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment',
    };

    // Save to dano_orders local storage
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      savedOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(savedOrders));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    // Clear cart
    if (onClearCart) {
      onClearCart();
    }

    // Redirect to Order Success
    navigate(`/order-success/${orderId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Customer Information</h3>
          <p className="text-xs text-slate-400">Fill in your contact details for digital delivery</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Checkout</span>
        </div>
      </div>

      {/* General Error Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Please complete all required fields correctly to place your order.</span>
        </div>
      )}

      {/* Customer Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Lawa Dano"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
              errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
            Phone Number (WhatsApp) <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 07501234567"
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* City Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
          City / Region <span className="text-rose-500">*</span>
        </label>
        <select
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
            errors.city ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
          }`}
        >
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>}
      </div>

      {/* Payment Method Selector */}
      <PaymentMethodCard
        selectedMethod={formData.paymentMethod}
        onSelectMethod={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
      />
      {errors.paymentMethod && <p className="text-[11px] text-rose-400">{errors.paymentMethod}</p>}

      {/* Order Note */}
      <div>
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
          Order Note / Player ID (Optional)
        </label>
        <textarea
          rows={3}
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          placeholder="Enter your Player ID, Riot Tag, or any special delivery notes..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Order Total & Submit */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-medium">Total Payable</span>
          <p className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</p>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
        >
          <span>Confirm & Place Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;
