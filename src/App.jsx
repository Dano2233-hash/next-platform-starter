import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
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
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();
  const productsState = useProducts();
  const cartState = useCart();
  const authState = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Buy Now trigger - instantly adds to cart and redirects to checkout
  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    cartState.addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  const handleAddToCart = (product, selectedPackage = null, quantity = 1) => {
    cartState.addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true); // Open drawer so they see action feedback
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Dynamic Navigation */}
      <Navbar
        cartCount={cartState.getCartCount()}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Slide-out Shopping Cart Sidebar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartState={cartState}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Public Views */}
          <Route
            path="/"
            element={
              <Home
                products={productsState.products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={productsState.products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products/:slug"
            element={
              <ProductDetails
                products={productsState.products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cartState={cartState} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cartState={cartState} />}
          />
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          {/* Admin Panels */}
          <Route
            path="/admin-login"
            element={<AdminLogin authState={authState} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin productsState={productsState} authState={authState} />
              </ProtectedRoute>
            }
          />

          {/* Fallback View */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer Block */}
      <Footer />
    </div>
  );
}
