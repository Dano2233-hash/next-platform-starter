import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, Info, ArrowLeft, Send } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import PaymentMethodCard from '../components/PaymentMethodCard';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    note: ''
  });
  const [selectedPayment, setSelectedPayment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city) newErrors.city = 'Please select a city';
    if (!selectedPayment) newErrors.payment = 'Please select a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = generateOrderId();
      const order = {
        id: orderId,
        customer: formData,
        payment: selectedPayment,
        items: cartItems,
        total: cartTotal,
        date: new Date().toISOString(),
        status: 'Pending'
      };

      // Save to local storage
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([...savedOrders, order]));

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success', { state: { order } });
    }, 1500);
  };

  const paymentMethods = [
    { id: 'FastPay', name: 'FastPay', icon: 'FP' },
    { id: 'Korek', name: 'Korek Pay', icon: 'KP' },
    { id: 'MasterCard', name: 'MasterCard', icon: 'MC' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-bold">
           <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-sm">1</div>
                <h2 className="text-xl font-bold text-white">Customer Information</h2>
              </div>
              <div className="glass-card p-6">
                <CheckoutForm formData={formData} onChange={handleFormChange} errors={errors} />
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-sm">2</div>
                <h2 className="text-xl font-bold text-white">Payment Method</h2>
              </div>
              <div className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <PaymentMethodCard
                        key={method.id}
                        {...method}
                        selected={selectedPayment === method.id}
                        onSelect={setSelectedPayment}
                      />
                    ))}
                 </div>
                 {errors.payment && <p className="text-red-500 text-xs mt-1">{errors.payment}</p>}

                 <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 mt-6">
                    <Info className="text-accent-cyan shrink-0" size={20} />
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Manual payment required. After placing the order, you will receive instructions on how to complete the payment via your selected method.
                    </p>
                 </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 sticky top-28">
              <h3 className="text-white font-bold text-xl mb-6">Order Summary</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedPackage.name}`} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                       <div className="w-12 h-12 bg-dark-700 rounded-lg shrink-0 border border-white/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="text-white text-sm font-bold truncate max-w-[150px]">{item.name}</p>
                          <p className="text-gray-500 text-[10px]">{item.selectedPackage.name} x {item.quantity}</p>
                       </div>
                    </div>
                    <span className="text-white text-sm font-medium">{formatPrice(item.selectedPackage.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-6 space-y-3 mb-8">
                 <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                 </div>
                 <div className="flex justify-between text-white font-extrabold text-xl pt-2">
                    <span>Order Total</span>
                    <span className="text-accent-cyan">{formatPrice(cartTotal)}</span>
                 </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-3 font-extrabold py-4 rounded-xl shadow-lg transition-all ${
                  isSubmitting
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-accent-blue hover:bg-blue-600 text-white shadow-accent-blue/20'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Place Order
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Your transaction is safe & secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
