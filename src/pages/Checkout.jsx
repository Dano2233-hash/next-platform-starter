import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-100">No Items to Checkout</h2>
        <p className="text-slate-400 text-xs">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Products</span>
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    const orderId = generateOrderId();

    const newOrder = {
      orderId,
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: [...cart],
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    addOrder(newOrder);
    clearCart();

    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Checkout & Payment</h1>
          <p className="text-xs text-slate-400 mt-1">Complete customer details to generate your manual payment order</p>
        </div>

        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm
            onSubmitOrder={handleOrderSubmit}
            cartTotal={cartTotal}
          />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-slate-100 text-sm pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Order Summary ({cart.length} items)</span>
              <span className="text-cyan-400 font-bold">{formatPrice(cartTotal)}</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div>
                    <h4 className="font-bold text-slate-200 line-clamp-1">{item.productName}</h4>
                    <span className="text-[11px] text-cyan-400">{item.packageName} x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-slate-100">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-bold">Instant Digital</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm pt-1">
                <span>Grand Total</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>How Manual Payment Works:</span>
            </h4>
            <p className="text-[11px] leading-relaxed">
              After placing the order, an Order Number will be generated. Transfer the total amount via <strong>FastPay</strong>, <strong>Korek</strong>, or <strong>MasterCard</strong>, then share the screenshot on WhatsApp to complete delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
