import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCreateOrder = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      items: cartItems,
      totalPrice: totalPrice,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    addOrder(newOrder);
    clearCart();

    // Navigate to Order Success page with order state
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Title Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 mb-2 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Cart
          </button>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            SECURE <span className="text-cyan-400">CHECKOUT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in your details and select your local payment option to finalize your order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cartItems={cartItems}
            totalPrice={totalPrice}
            onSubmitOrder={handleCreateOrder}
          />
        </div>

        {/* Order Items Review Sidebar */}
        <div className="lg:col-span-5 bg-[#090e1f] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="font-orbitron font-bold text-base text-slate-100">Items in Order</h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="p-3 bg-[#0c1224] border border-slate-800/80 rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage
                    image={item.image}
                    name={item.name}
                    platform={item.platform}
                    category="Item"
                    className="h-12 w-12"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-orbitron font-semibold text-xs text-slate-200 line-clamp-1">{item.name}</h4>
                  <p className="text-[11px] text-purple-300 font-mono">{item.packageName} x {item.quantity}</p>
                </div>
                <div className="text-right">
                  <span className="font-orbitron font-bold text-xs text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Subtotal</span>
              <span className="font-mono">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Digital Processing</span>
              <span className="text-emerald-400 font-bold uppercase">Free</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-orbitron font-bold text-sm text-white uppercase">Total Payable</span>
              <span className="font-orbitron font-extrabold text-xl text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>After placing order, you will be redirected to the order receipt to contact support for payment execution.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
