import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">No items to checkout</h2>
        <p className="text-sm text-slate-400">Your cart is currently empty.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order & clear cart
    addOrder(newOrder);
    clearCart();

    // Redirect to success page with state
    navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Checkout</h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" /> Secure Order Processing
        </div>
      </div>

      {/* Main Form & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Mini Cart Summary */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl sticky top-24">
          <h3 className="font-black text-base text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Selected Items</span>
            <span className="text-xs text-slate-400 font-normal">{cart.length} items</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    src={item.image}
                    title={item.name}
                    platform={item.platform}
                    category={item.type}
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-extrabold text-xs text-slate-200 truncate">{item.name}</h5>
                  <p className="text-[11px] text-slate-400">{item.packageName} x{item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Processing Fee</span>
              <span className="text-emerald-400 font-bold uppercase">0 IQD</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-100 pt-2 border-t border-slate-800/60">
              <span>Total Due</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
            ℹ️ After clicking confirm, you will receive explicit payment instructions for FastPay, Korek, or MasterCard to complete your order.
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;
