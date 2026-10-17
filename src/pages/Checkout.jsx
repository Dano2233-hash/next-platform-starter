import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-xl font-extrabold text-white">Cart is empty</h2>
        <p className="text-xs text-slate-400">Please add items to cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderNumber = generateOrderId();
    const newOrder = {
      orderId: orderNumber,
      createdAt: new Date().toISOString(),
      customer: formData,
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        packageName: item.packageName,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        total: item.unitPrice * item.quantity
      })),
      totalPrice: totalPrice,
      paymentMethod: formData.paymentMethod,
      status: 'Pending Payment'
    };

    // Save order
    addOrder(newOrder);

    // Clear cart and redirect
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-3">
        <Link to="/cart" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Checkout</h1>
          <p className="text-xs text-slate-400">Enter your order details and choose your preferred payment option.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Items in Order ({cartItems.length})
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    category={item.product.category}
                    platform={item.product.platform}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                  {item.packageName && <span className="text-[10px] text-cyan-400">{item.packageName}</span>}
                  <div className="text-slate-400 font-medium">Qty: {item.quantity}</div>
                </div>
                <div className="font-extrabold text-cyan-400">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
            <span>After placing order, send screenshot/receipt to our WhatsApp support for instant code delivery.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
