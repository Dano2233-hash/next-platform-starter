import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout({ cartState }) {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = cartState;

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckoutSubmit = (customerInfo) => {
    const orderNumber = generateOrderId();

    // Structure the final order
    const finalOrder = {
      orderNumber,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerCity: customerInfo.city,
      paymentMethod: customerInfo.paymentMethod,
      orderNote: customerInfo.orderNote || '',
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        platform: item.product.platform,
        type: item.product.type,
        package: item.selectedPackage ? item.selectedPackage.name : null,
        price: item.selectedPackage ? item.selectedPackage.price : item.product.price,
        quantity: item.quantity
      })),
      totalAmount: getCartTotal(),
      orderDate: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    const existingOrdersJson = localStorage.getItem('dano_orders');
    let existingOrders = [];
    if (existingOrdersJson) {
      try {
        existingOrders = JSON.parse(existingOrdersJson);
      } catch (e) {
        console.error("Failed to parse existing dano_orders", e);
      }
    }
    existingOrders.push(finalOrder);
    localStorage.setItem('dano_orders', JSON.stringify(existingOrders));

    // Clear active shopping cart
    clearCart();

    // Direct navigate to Order Success page with state
    navigate('/order-success', { state: { order: finalOrder } });
  };

  return (
    <div className="space-y-8 text-left">
      <div className="border-b border-blue-500/10 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          SECURE CHECKOUT
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Complete the required details and choose your preferred manual mobile payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: validation forms */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} initialTotal={getCartTotal()} />
        </div>

        {/* Right column: cart sidebar recap */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
              RECAP YOUR ORDER
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cart.map((item, idx) => {
                const pkgName = item.selectedPackage ? item.selectedPackage.name : null;
                const price = item.selectedPackage ? item.selectedPackage.price : item.product.price;
                return (
                  <div key={idx} className="flex justify-between gap-4 text-xs">
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{item.product.name}</p>
                      <p className="text-[10px] text-gray-500">
                        Qty: {item.quantity} {pkgName ? `| Option: ${pkgName}` : ''}
                      </p>
                    </div>
                    <span className="font-semibold text-cyan-200 text-right shrink-0">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/[0.04] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal</span>
                <span className="font-medium text-white">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping Fee</span>
                <span className="font-extrabold text-emerald-400 uppercase">FREE</span>
              </div>
              <div className="border-t border-white/[0.03] pt-3 flex justify-between text-sm">
                <span className="font-bold text-gray-300">Total Amount</span>
                <span className="font-black text-cyan-400 text-base">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0f1d]/20 border border-white/5 space-y-2 text-xs text-gray-400">
            <span className="font-bold text-gray-300 block">⚠️ Note about payment processing:</span>
            <p className="leading-relaxed">
              Dano Store is a premium manual digital provider. We do not use online payment gateways to keep costs low and secure for Kurdish users. Please complete transfer on the next page and notify support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
