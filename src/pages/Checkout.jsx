import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout({ cart, cartTotal, onClearCart }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckoutSubmit = (customerInfo) => {
    const orderNo = generateOrderId();
    const newOrder = {
      orderNo,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
      city: customerInfo.city,
      paymentMethod: customerInfo.paymentMethod,
      note: customerInfo.note,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        packageName: item.selectedPackage.name,
        price: item.selectedPackage.price,
        quantity: item.quantity
      })),
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString()
    };

    // Save to Local Storage
    const savedOrders = localStorage.getItem('dano_orders');
    let ordersList = [];
    if (savedOrders) {
      try {
        ordersList = JSON.parse(savedOrders);
      } catch (e) {
        ordersList = [];
      }
    }
    ordersList.unshift(newOrder);
    localStorage.setItem('dano_orders', JSON.stringify(ordersList));

    // Clear Cart
    onClearCart();

    // Redirect to Order Success
    navigate(`/order-success?orderNo=${orderNo}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
        Checkout Page
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7 bg-[#0c0d12]/80 p-6 rounded-2xl border border-[#1a1e29] shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider mb-6 border-b border-[#1a1e29] pb-3">
            Customer Information
          </h2>
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Order review sidebar */}
        <div className="lg:col-span-5 bg-[#0c0d12] p-6 rounded-2xl border border-[#1a1e29] space-y-6 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-[#1a1e29] pb-3">
            Review Your Order
          </h2>

          <div className="divide-y divide-[#1a1e29] max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{item.product.name}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {item.selectedPackage.name} <span className="text-gray-500 font-bold">x{item.quantity}</span>
                  </p>
                </div>
                <span className="text-xs font-black text-[#00e5ff] shrink-0">
                  {formatPrice(item.selectedPackage.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1a1e29] space-y-3">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Items Total</span>
              <span className="font-bold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-semibold uppercase">FREE INSTANT</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#1a1e29]/50">
              <span className="text-xs font-bold text-gray-300">Total Price:</span>
              <span className="text-base font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
