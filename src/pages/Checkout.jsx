import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-12 bg-[#090e1a] border border-slate-800 rounded-3xl text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (customerData) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customer: customerData,
      items: cart,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Error saving order to LocalStorage:', e);
    }

    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <Link to="/cart" className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <h1 className="text-2xl font-black text-white">Checkout & Payment Details</h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4" /> Secure Manual Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800/80 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <ProductImage
                        image={item.product?.image}
                        name={item.product?.name}
                        category={item.product?.category}
                        platform={item.product?.platform}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-200 truncate">{item.product?.name}</p>
                      <p className="text-[11px] text-cyan-400 font-medium">{item.packageName} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-cyan-400 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-100">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing & Delivery</span>
                <span className="text-emerald-400 font-semibold">FREE (Instant)</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Note:</strong> After placing your order, you will receive instructions on completing payment via FastPay, Korek, or MasterCard.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
