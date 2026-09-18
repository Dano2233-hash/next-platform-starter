import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Hooks
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export default function App() {
  const navigate = useNavigate();
  const productsHooks = useProducts();
  const { products } = productsHooks;

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemsCount,
    totalPrice
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQty={updateQuantity}
                onRemove={removeFromCart}
                onClearCart={clearCart}
                totalPrice={totalPrice}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                totalPrice={totalPrice}
                onClearCart={clearCart}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={<Admin productsHooks={productsHooks} />}
            />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={totalPrice}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
