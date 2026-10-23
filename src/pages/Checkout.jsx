import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, User, Phone, MapPin, FileText, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import PaymentMethodCard from '../components/PaymentMethodCard';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h2 className="text-xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Payment method is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = generateOrderId();
    const selectedMethodObj = PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod);

    const orderObj = {
      orderId,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: selectedMethodObj ? selectedMethodObj.name : formData.paymentMethod,
      paymentMethodId: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        packageName: item.selectedPackage?.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    addOrder(orderObj);
    clearCart();
    navigate(`/order-success/${orderId}`, { state: { order: orderObj } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Complete your details and select a local payment method for manual verification.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Details */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Customer Information</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Lawa Kurdistan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
              {errors.customerName && <p className="text-rose-400 text-[11px] mt-1 font-semibold">{errors.customerName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. 0750 123 4567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
                {errors.phoneNumber && <p className="text-rose-400 text-[11px] mt-1 font-semibold">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City / Region *</label>
                <div className="relative">
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Erbil">Erbil / Hewlêr</option>
                    <option value="Sulaymaniyah">Sulaymaniyah / Slêmanî</option>

                    <option value="Duhok">Duhok</option>
                    <option value="Kirkuk">Kirkuk</option>
                    <option value="Halabja">Halabja</option>
                    <option value="Baghdad">Baghdad</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>
                {errors.city && <p className="text-rose-400 text-[11px] mt-1 font-semibold">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Player ID / Note (Optional)</label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={formData.orderNote}
                  onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                  placeholder="Enter PUBG Player ID, Free Fire ID, or special instructions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-extrabold text-white text-sm uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  selected={formData.paymentMethod}
                  onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
                />
              ))}
            </div>
            {errors.paymentMethod && <p className="text-rose-400 text-[11px] mt-1 font-semibold">{errors.paymentMethod}</p>}
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
          <h3 className="font-extrabold text-white text-base pb-3 border-b border-slate-800">
            Order Review
          </h3>

          <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <div>
                  <h5 className="font-bold text-white line-clamp-1">{item.product.name}</h5>
                  <p className="text-[11px] text-cyan-400">{item.selectedPackage?.name} x {item.quantity}</p>
                </div>
                <span className="font-black text-slate-200">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total Amount</span>
              <span className="font-black text-lg text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/20 transition-all"
          >
            <span>Complete Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            By completing this order, you will receive payment transfer instructions to send via WhatsApp or Discord.
          </p>
        </div>
      </form>
    </div>
  );
}
