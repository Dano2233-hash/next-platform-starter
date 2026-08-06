import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout({ cart, total, onClearCart }) {
  const navigate = useNavigate();

  const handleCheckoutSubmit = (formData) => {
    // Save order details to local storage
    const newOrder = {
      orderId: generateOrderId(),
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      items: cart.map((item) => ({
        id: item.id,
        name: item.product.name,
        packageName: item.selectedPackageName,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      date: new Date().toISOString(),
      status: 'pending',
    };

    // Save order in dano_orders
    const savedOrders = localStorage.getItem('dano_orders');
    let ordersList = [];
    if (savedOrders) {
      try {
        ordersList = JSON.parse(savedOrders);
      } catch (e) {
        console.error('Error parsing orders', e);
      }
    }
    ordersList.push(newOrder);
    localStorage.setItem('dano_orders', JSON.stringify(ordersList));

    // Clear cart
    onClearCart();

    // Navigate to success
    navigate('/order-success', { state: { order: newOrder } });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/50 border border-slate-850 flex items-center justify-center text-slate-500 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-base font-extrabold text-white uppercase tracking-wider">Checkout Cart Empty</h2>
        <p className="text-xs text-slate-500 mt-2">Add games or mobile points packages before paying.</p>
        <Link
          to="/products"
          className="mt-6 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Manual Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">Complete your registration detail & coordinate payment delivery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-[#08080b] border border-slate-900 p-6 md:p-8 rounded-3xl">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Right: Items Overview summary */}
        <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 p-6 rounded-3xl space-y-5">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-900 pb-3">
            Your Order Items
          </h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center justify-between">
                <div className="min-w-0">
                  <span className="font-extrabold text-sm text-white block truncate">{item.product.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 block">
                    {item.selectedPackageName} × {item.quantity}
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-300">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-4 space-y-3">
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-400">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-400">
              <span>Fast Manual Processing</span>
              <span className="text-emerald-400 uppercase font-black">Free</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-900/60 pt-3">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Total Amount Due</span>
              <span className="text-xl font-black text-[#00e5ff]">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
