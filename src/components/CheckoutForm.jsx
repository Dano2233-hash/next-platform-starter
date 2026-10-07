import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';

const IRAQ_CITIES = [
  'Erbil (Hawler)',
  'Sulaymaniyah',
  'Duhok',
  'Halabja',
  'Kirkuk',
  'Baghdad',
  'Basra',
  'Mosul',
  'Najaf',
  'Karbala',
  'Anbar',
  'Other City'
];

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(IRAQ_CITIES[0]);
  const [paymentMethod, setPaymentMethod] = useState('FastPay');
  const [orderNote, setOrderNote] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!city) {
      errs.city = 'City selection is required';
    }
    if (!paymentMethod) {
      errs.paymentMethod = 'Payment method is required';
    }
    if (cartItems.length === 0) {
      errs.cart = 'Your cart is empty. Please add items before checkout.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newOrderId = generateOrderId();
      const orderPayload = {
        id: newOrderId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        city,
        paymentMethod,
        orderNote: orderNote.trim(),
        items: cartItems,
        totalAmount: cartTotal
      };

      const createdOrder = addOrder(orderPayload);
      clearCart();

      // Navigate to order success page
      navigate('/order-success', { state: { order: createdOrder } });
    } catch (err) {
      console.error('Error placing order:', err);
      setErrors({ submit: 'Failed to process order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.cart && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errors.cart}</span>
        </div>
      )}

      {/* Customer Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Customer Full Name *
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Lawa Dano"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className={`w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
              errors.customerName ? 'border-rose-500' : 'border-slate-700/80'
            } focus:border-cyan-500 focus:outline-none transition-all`}
          />
          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        {errors.customerName && (
          <p className="text-xs text-rose-400 font-medium">{errors.customerName}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Phone Number *
        </label>
        <div className="relative">
          <input
            type="tel"
            placeholder="e.g. 0750 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border ${
              errors.phone ? 'border-rose-500' : 'border-slate-700/80'
            } focus:border-cyan-500 focus:outline-none transition-all`}
          />
          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        {errors.phone && (
          <p className="text-xs text-rose-400 font-medium">{errors.phone}</p>
        )}
      </div>

      {/* City Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          City / Region *
        </label>
        <div className="relative">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full bg-slate-900/90 text-sm text-slate-100 rounded-xl pl-10 pr-4 py-2.5 border ${
              errors.city ? 'border-rose-500' : 'border-slate-700/80'
            } focus:border-cyan-500 focus:outline-none transition-all appearance-none`}
          >
            {IRAQ_CITIES.map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-slate-100">
                {c}
              </option>
            ))}
          </select>
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        {errors.city && (
          <p className="text-xs text-rose-400 font-medium">{errors.city}</p>
        )}
      </div>

      {/* Payment Method Selector */}
      <PaymentMethodCard
        selectedMethod={paymentMethod}
        onSelectMethod={setPaymentMethod}
      />
      {errors.paymentMethod && (
        <p className="text-xs text-rose-400 font-medium">{errors.paymentMethod}</p>
      )}

      {/* Order Note (Optional) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
          Order Note / Player ID (Optional)
        </label>
        <div className="relative">
          <textarea
            rows={3}
            placeholder="e.g. Character ID: 512394819, or special delivery instructions..."
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-700/80 focus:border-cyan-500 focus:outline-none transition-all resize-none"
          />
          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || cartItems.length === 0}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5 fill-slate-950" />
        <span>Confirm &amp; Create Order</span>
      </button>
    </form>
  );
}
