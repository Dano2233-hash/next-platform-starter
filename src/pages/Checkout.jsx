import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 mb-5">Please add at least one gaming item before checking out.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePaymentSelect = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.paymentMethod;
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid Iraqi mobile number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City / Province is required';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a manual payment method';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      note: formData.note.trim(),
      items: cart,
      totalAmount: totalPrice,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order in localStorage (dano_orders)
    try {
      const existingOrdersStr = localStorage.getItem('dano_orders');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Error saving order to localStorage:', err);
    }

    // Clear cart after successful order creation
    clearCart();

    // Navigate to Order Success page with order data in state
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="border-b border-slate-800 pb-5">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani',sans-serif]">
          Manual Checkout
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Provide your delivery details and choose your preferred local Iraqi payment channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onPaymentSelect={handlePaymentSelect}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 bg-[#090e1c] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 sticky top-28">
          <h3 className="text-base font-bold text-white font-['Rajdhani',sans-serif] tracking-wider border-b border-slate-800 pb-3">
            Cart Review ({cart.length} distinct items)
          </h3>

          {/* Mini item list */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                <div className="flex-1 pr-3">
                  <p className="font-bold text-slate-200 truncate">{item.name}</p>
                  <p className="text-[11px] text-cyan-400 truncate">
                    {item.selectedPackage ? item.selectedPackage.name : 'Standard'} × {item.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-white shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span className="text-emerald-400 font-semibold">Free (Manual Chat)</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline text-base font-black text-white border-t border-slate-800 pt-3">
            <span>Total to Transfer:</span>
            <span className="text-cyan-400 text-2xl font-black">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-950/60 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing Order...' : 'Complete & Place Order'}
          </button>

          <div className="p-3 rounded-xl bg-[#060a14] border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Manual Payment Process:
            </p>
            <p>
              After placing your order, an Order Number will be generated. Send that number to our WhatsApp, Discord, or TikTok support to verify your transfer and receive your digital codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
