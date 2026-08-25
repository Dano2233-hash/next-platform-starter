import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/40"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectPayment = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City / Region is required.';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        note: formData.note.trim()
      },
      paymentMethod: formData.paymentMethod,
      items: [...cartItems],
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to Local Storage under 'dano_orders'
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([orderData, ...existingOrders]));
    } catch (err) {
      console.error('Error saving order to Local Storage:', err);
    }

    // Clear cart and navigate to Order Success page
    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 flex items-center gap-3">
          <Lock className="w-8 h-8 text-cyan-400" />
          <span>Manual Checkout</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete your information and select FastPay, Korek, or MasterCard to place your order.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onSelectPayment={handleSelectPayment}
            onSubmit={handleSubmitOrder}
          />
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090e1a]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span>Order Summary</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {cartItems.length} items
              </span>
            </h3>

            {/* Items snippet */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-slate-200 truncate">{item.product?.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[11px] text-cyan-400 font-medium block">
                        Package: {item.selectedPackage.name}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 block">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-100 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery:</span>
                <span className="font-bold text-emerald-400">Digital / Free</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-extrabold">
                <span className="text-slate-100">Total Amount:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitOrder}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all mt-4"
            >
              <span>Place Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Manual payment mode: You will receive the transfer details on the success screen to finish payment via WhatsApp/Discord.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
