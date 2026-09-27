import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Hooks
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

export default function App() {
  const productsHook = useProducts();
  const cartHook = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    cartHook.addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070f] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartHook.cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={productsHook.products}
                onAddToCart={cartHook.addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={productsHook.products}
                onAddToCart={cartHook.addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/product/:slug"
            element={
              <ProductDetails
                products={productsHook.products}
                onAddToCart={cartHook.addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cartHook.cart}
                updateQuantity={cartHook.updateQuantity}
                removeFromCart={cartHook.removeFromCart}
                clearCart={cartHook.clearCart}
                cartTotal={cartHook.cartTotal}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cartHook.cart}
                cartTotal={cartHook.cartTotal}
                clearCart={cartHook.clearCart}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin productsHook={productsHook} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cartHook.cart}
        updateQuantity={cartHook.updateQuantity}
        removeFromCart={cartHook.removeFromCart}
        cartTotal={cartHook.cartTotal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
