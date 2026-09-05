import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-500" />
        <h2 className="text-2xl font-black text-white">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="px-5 py-2.5 rounded-xl bg-cyan-600 text-slate-950 font-bold text-xs">
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: cartSubtotal,
      status: 'Pending Payment Verification'
    };

    // Save order to LocalStorage under "dano_orders"
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([orderData, ...existingOrders]));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    // Clear cart and redirect to order success page
    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Checkout & Payment</h1>
          <p className="text-xs text-slate-400">Complete customer information to create your manual digital order.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-6">

          {/* Customer Info Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Customer Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="e.g. Lawa Ahmed"
                  className={`w-full bg-slate-950 border text-xs text-white rounded-xl p-3 focus:outline-none ${
                    errors.customerName ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customerName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0750 123 4567"
                    className={`w-full bg-slate-950 border text-xs text-white rounded-xl p-3 focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City / Region *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-cyan-500"
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
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Order Note / Player ID (Optional)
                </label>
                <textarea
                  name="orderNote"
                  rows={2}
                  value={formData.orderNote}
                  onChange={handleInputChange}
                  placeholder="Enter PUBG Player ID, Free Fire ID, or special instructions..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card Selector */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <PaymentMethodCard
              selectedMethod={formData.paymentMethod}
              onSelectMethod={(methodId) => {
                setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
                if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: null }));
              }}
            />
            {errors.paymentMethod && (
              <p className="text-red-400 text-[11px] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
              </p>
            )}
          </div>

        </div>

        {/* Right Column: Summary & Place Order */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 sticky top-24">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50">
                  <div>
                    <p className="font-bold text-slate-200">{item.title}</p>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-white">
                <span>Total to Pay</span>
                <span className="text-cyan-400">{formatPrice(cartSubtotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Create Order Now
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              By placing your order, you will receive payment account details to complete manual transfer.
            </p>
          </div>
        </div>

      </form>

    </div>
  );
};
