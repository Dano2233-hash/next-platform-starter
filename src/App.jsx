import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetToDefault,
  } = useProducts();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const handleBuyNow = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">

      {/* Navbar */}
      <Navbar
        cartCount={totalItems}
        isAdmin={isAdmin}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                totalPrice={totalPrice}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                totalPrice={totalPrice}
                onClearCart={clearCart}
              />
            }
          />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={(u, p) => login(u, p)} />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onUpdateStock={updateStock}
                  onToggleFlag={toggleFlag}
                  onResetProducts={resetToDefault}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
