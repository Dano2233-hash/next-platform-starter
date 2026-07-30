import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import { ArrowLeft, Ticket } from 'lucide-react';

export default function Checkout({ navigate, onOrderCreated }) {
  const { cart, cartTotal, clearCart } = useCart();

  // If cart is empty on mount, redirect to products
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  if (cart.length === 0) return null;

  const handleCheckoutSubmit = (customerDetails) => {
    // 1. Generate Order Number
    const orderId = generateOrderId();

    // 2. Build full order payload
    const orderPayload = {
      orderId,
      customer: {
        name: customerDetails.name,
        phone: customerDetails.phone,
        city: customerDetails.city,
        note: customerDetails.note || '',
      },
      items: [...cart],
      paymentMethod: customerDetails.paymentMethod,
      total: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
    };

    // 3. Save order to Local Storage
    const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
    existingOrders.unshift(orderPayload); // Add new order to the beginning
    localStorage.setItem('dano_orders', JSON.stringify(existingOrders));

    // 4. Save current order to App level to display on Success Page
    onOrderCreated(orderPayload);

    // 5. Clear shopping cart
    clearCart();

    // 6. Redirect to Success Page
    navigate('/order-success');
  };

  return (
    <div className="space-y-8 pb-16 text-left">
      <div>
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Manual Secure Checkout</h1>
        <p className="text-xs text-zinc-500 mt-1">Provide your local Kurdistan/Iraq delivery coordinates to complete purchase.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Checkout Form (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Right Side: Order Summary list (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 bg-[#0d0d12] border border-white/5 p-6 rounded-3xl shadow-xl">
          <div className="border-b border-white/5 pb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Your Order Items</h3>
          </div>

          {/* Quick list of read-only items */}
          <div className="divide-y divide-white/5 space-y-3.5">
            {cart.map((item, index) => (
              <div
                key={`${item.productId}-${item.packageName || 'base'}-${index}`}
                className="flex items-start justify-between text-xs pt-3"
              >
                <div className="space-y-1 text-left">
                  <span className="font-bold text-white block">{item.name}</span>
                  <div className="flex gap-2">
                    <span className="text-zinc-500 font-semibold uppercase">{item.platform}</span>
                    {item.packageName && (
                      <span className="text-cyan-400 font-semibold">{item.packageName}</span>
                    )}
                    <span className="text-zinc-500">x{item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#00e5ff] shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Regional Transfer Surcharges:</span>
              <span className="text-emerald-400 font-bold">0 IQD</span>
            </div>
            <div className="border-t border-white/5 pt-3.5 flex justify-between text-sm font-black text-white">
              <span>Total Price:</span>
              <span className="text-base text-[#00e5ff]">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
