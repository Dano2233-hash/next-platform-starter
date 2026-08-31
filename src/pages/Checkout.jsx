import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

const ORDERS_STORAGE_KEY = 'dano_orders';

export default function Checkout({ cart = [], cartTotal = 0, onClearCart }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-200">No items in checkout</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleCreateOrder = (customerData) => {
    const newOrderId = generateOrderId();
    const orderData = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      ...customerData,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'Pending Payment',
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Error saving order to localStorage', e);
    }

    // Clear cart & navigate to order success
    onClearCart();
    navigate(`/order-success/${newOrderId}`, { state: { order: orderData } });
  };

  return (
    <div className="space-y-6 pb-12">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Cart
      </button>

      <div className="bg-gradient-to-r from-[#0b1224] to-[#070b16] p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-xl">
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Checkout & Payment
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete your information to create your order. Payment is completed manually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} cartTotal={cartTotal} />
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="min-w-0 pr-2">
                  <span className="font-bold text-white block truncate">{item.productName}</span>
                  {item.packageItem && (
                    <span className="text-[11px] text-cyan-400 block font-semibold">{item.packageItem.name}</span>
                  )}
                  <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                </div>
                <span className="font-bold text-slate-100 shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery</span>
              <span className="font-bold text-emerald-400">Instant Digital</span>
            </div>
            <div className="flex justify-between text-slate-200 text-sm font-black pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>After placing your order, you will receive payment instructions & WhatsApp contact button.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
