import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.selectedPackage.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  const handlePlaceOrder = (customerDetails) => {
    const orderNum = generateOrderId();

    const newOrder = {
      orderNumber: orderNum,
      customerName: customerDetails.name,
      phoneNumber: customerDetails.phone,
      city: customerDetails.city,
      paymentMethod: customerDetails.paymentMethod,
      note: customerDetails.note,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        platform: item.product.platform,
        package: item.selectedPackage.name,
        price: item.selectedPackage.price,
        quantity: item.quantity
      })),
      totalAmount: total,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment Verification'
    };

    // Save order in local storage
    const currentOrders = localStorage.getItem('dano_orders');
    let ordersList = [];
    if (currentOrders) {
      try {
        ordersList = JSON.parse(currentOrders);
      } catch (e) {
        ordersList = [];
      }
    }
    ordersList.unshift(newOrder); // Newest first
    localStorage.setItem('dano_orders', JSON.stringify(ordersList));

    // Reduce stock of actual items dynamically
    const storedProducts = localStorage.getItem('dano_products');
    if (storedProducts) {
      try {
        const prodList = JSON.parse(storedProducts);
        cart.forEach(item => {
          const match = prodList.find(p => p.id === item.product.id);
          if (match) {
            match.stock = Math.max(0, match.stock - item.quantity);
          }
        });
        localStorage.setItem('dano_products', JSON.stringify(prodList));
      } catch (e) {
        console.error('Failed to update stock', e);
      }
    }

    // Clear shopping cart
    clearCart();

    // Navigate to Order success page with order context state
    navigate('/order-success', { state: { order: newOrder } });
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-black uppercase tracking-wider text-white">Secure Checkout</h1>
        <p className="text-xs text-white/50">Provide your billing credentials and manual local Iraq payment method below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Left Form (3/5 space) */}
        <div className="lg:col-span-3">
          <CheckoutForm onSubmit={handlePlaceOrder} total={total} />
        </div>

        {/* Right order summary review (2/5 space) */}
        <div className="lg:col-span-2 bg-[#0d0d11] border border-white/5 p-6 rounded-lg space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-xs border-b border-white/5 pb-2">
                <div>
                  <h4 className="font-bold text-white leading-tight">{item.product.name}</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">
                    Package: <span className="text-purple-400 font-semibold">{item.selectedPackage.name}</span>
                  </p>
                  <p className="text-[10px] text-white/40">
                    Qty: <span className="text-white font-bold">{item.quantity}</span>
                  </p>
                </div>
                <span className="font-extrabold text-cyan-400">
                  {formatPrice(item.selectedPackage.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between text-white/50">
              <span>Items Total</span>
              <span className="font-bold text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Handling Fees</span>
              <span className="text-green-400 font-bold">0 IQD</span>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between text-sm font-black text-cyan-400">
              <span>Total Price</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
