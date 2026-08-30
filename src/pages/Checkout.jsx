import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Checkout({ cartItems = [], cartTotal, onClearCart, onOrderCreated }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  const handleCreateOrder = (customerData) => {
    setIsSubmitting(true);

    const newOrderId = generateOrderId();
    const orderObj = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customerName: customerData.name,
      customerPhone: customerData.phone,
      customerCity: customerData.city,
      paymentMethod: customerData.paymentMethod,
      orderNote: customerData.note || '',
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        packageId: item.packageItem?.id || null,
        packageName: item.packageItem?.name || null,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.unitPrice * item.quantity
      })),
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    // Save to local storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(orderObj);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Failed to save order:', e);
    }

    if (onOrderCreated) {
      onOrderCreated(orderObj);
    }

    // Clear cart
    onClearCart();
    setIsSubmitting(false);

    // Redirect to Order Success page
    navigate(`/order-success/${newOrderId}`, { state: { order: orderObj } });
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Checkout</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Complete your details to generate payment instructions.</p>
        </div>
        <Link
          to="/cart"
          className="text-xs text-slate-400 hover:text-white font-bold flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Customer & Payment Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} isSubmitting={isSubmitting} />
        </div>

        {/* Right: Order Items Summary */}
        <div className="lg:col-span-5 bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl sticky top-24">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Items Summary ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
            <Link to="/cart" className="text-xs text-cyan-400 hover:underline">Edit</Link>
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.itemKey} className="flex items-center gap-3 py-2 border-b border-slate-800/60 text-xs">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                  <ProductImage product={item.product} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate">{item.product.name}</h4>
                  {item.packageItem && (
                    <span className="text-[10px] text-cyan-400 font-medium block">
                      Package: {item.packageItem.name}
                    </span>
                  )}
                  <span className="text-slate-400 text-[11px]">Qty: {item.quantity}</span>
                </div>
                <div className="font-extrabold text-cyan-400">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Digital Delivery</span>
              <span className="font-bold text-emerald-400">Free (Instant)</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Total Amount</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
