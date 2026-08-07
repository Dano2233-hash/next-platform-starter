import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export function Checkout({ cart = [], clearCart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.packagePrice * item.quantity, 0);

  const handleCheckoutSubmit = (customerData) => {
    if (cart.length === 0) return alert('Your cart is empty');

    // Generate Order ID
    const orderId = generateOrderId();

    // Create Order Object
    const newOrder = {
      orderId,
      customerName: customerData.name,
      phone: customerData.phone,
      city: customerData.city,
      paymentMethod: customerData.paymentMethod,
      note: customerData.note,
      items: [...cart],
      totalPrice: total,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save to Local Storage key 'dano_orders'
    const storedOrders = localStorage.getItem('dano_orders');
    let ordersList = [];
    if (storedOrders) {
      try {
        ordersList = JSON.parse(storedOrders);
      } catch (e) {
        console.error('Error parsing stored orders', e);
      }
    }
    ordersList = [newOrder, ...ordersList];
    localStorage.setItem('dano_orders', JSON.stringify(ordersList));

    // Clear Cart
    clearCart();

    // Navigate to Order Success page, passing order ID as query string
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-[#0a0a14] border border-slate-900 rounded-2xl p-8 space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-500 mx-auto opacity-30" />
        <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wider">Checkout is Empty</h2>
        <p className="text-xs text-slate-400">Add games or top-up items to your cart before checking out.</p>
        <div className="pt-4">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back to Cart */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-cyan-400 uppercase tracking-widest transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form Panel */}
        <div className="lg:col-span-7">
          <div className="border-b border-slate-900 pb-5 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Manual Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Provide your details and complete payment using local Kurdistan transfer options.
            </p>
          </div>

          <CheckoutForm onSubmit={handleCheckoutSubmit} initialTotal={total} />
        </div>

        {/* Right Order Details Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0a0a14] border border-slate-900 rounded-xl p-6 space-y-4 sticky top-24">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-slate-900 pb-3">
              Your Items
            </h3>

            {/* List items */}
            <div className="divide-y divide-slate-900 max-h-80 overflow-y-auto pr-2 space-y-3.5 pb-2">
              {cart.map((item, idx) => (
                <div key={`${item.productId}-${item.packageId}`} className="pt-3.5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.productName}</h4>
                    <span className="text-[10px] text-cyan-400 font-medium uppercase">{item.platform} • {item.packageName}</span>
                    <span className="text-slate-500 text-xs block">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-xs text-slate-200 font-extrabold shrink-0">
                    {formatPrice(item.packagePrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal list */}
            <div className="border-t border-slate-900 pt-4 space-y-3 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Manual Verification Fee</span>
                <span className="text-emerald-400 font-bold">Free (0 IQD)</span>
              </div>
              <div className="border-t border-slate-900 pt-3.5 flex justify-between items-baseline">
                <span className="text-xs font-black text-white uppercase tracking-wider">Grand Total Amount</span>
                <span className="text-lg font-black text-cyan-400">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
