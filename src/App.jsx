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

import useProducts from './hooks/useProducts';
import useCart from './hooks/useCart';
import useAuth from './hooks/useAuth';

export function App() {
  const navigate = useNavigate();

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetProducts,
  } = useProducts();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  const { isAdmin, login, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleBuyNow = (product, selectedPackage, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-slate-950 py-1.5 px-4 text-center text-xs font-black tracking-wide shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>⚡ Special Deals: Instant Digital Delivery in Kurdistan & Iraq • Pay via FastPay, Korek & MasterCard</span>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route
            path="/"
            element={<Home products={products} onAddToCart={addToCart} onBuyNow={handleBuyNow} />}
          />
          <Route
            path="/products"
            element={<Products products={products} onAddToCart={addToCart} onBuyNow={handleBuyNow} />}
          />
          <Route
            path="/product/:slug"
            element={<ProductDetails products={products} onAddToCart={addToCart} onBuyNow={handleBuyNow} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                cartTotal={cartTotal}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} cartTotal={cartTotal} onClearCart={clearCart} />}
          />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
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
                  onResetProducts={resetProducts}
                  onLogout={logout}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        cartTotal={cartTotal}
      />

      {/* Main Footer */}
      <Footer />
    </div>
  );
}

export default App;
