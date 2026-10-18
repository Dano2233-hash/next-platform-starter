import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../data/categories';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Customer name is required.';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.city.trim()) errs.city = 'City location is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderNumber = generateOrderId();
    const selectedMethod = PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod);

    const orderData = {
      orderId: orderNumber,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: selectedMethod ? selectedMethod.name : formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment Verification'
    };

    addOrder(orderData);
    clearCart();

    // Navigate to order success with state
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Card */}
      <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        {/* Name Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Lawa Dano"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.name && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., 0750 XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* City Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Erbil, Sulaymaniyah, Duhok, Baghdad"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all ${
                errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          </div>
          {errors.city && (
            <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.city}
            </p>
          )}
        </div>

        {/* Order Note Field */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Order Note / Player ID (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Add player ID or special instructions (e.g., Player ID: 512398401)"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Payment Methods Selection */}
      <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Select Payment Method *</span>
          </h3>
          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold border border-amber-500/20">
            Manual Local Transfer
          </span>
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
          <p className="text-red-400 text-[11px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Place Order Action */}
      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Complete Order & Pay ({formatPrice(cartTotal)})</span>
      </button>
    </form>
  );
}
