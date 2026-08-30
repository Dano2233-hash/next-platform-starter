import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { isAdmin, login, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Automatically close cart drawer on route change
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleAddToCart = (product, selectedPackage, quantity) => {
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleAdminLoginSuccess = (username, password) => {
    login(username, password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 selection:bg-[#0066ff] selection:text-white">
      {/* Navbar */}
      <Navbar cartCount={cartCount} onOpenCart={handleOpenCart} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route
            path="/product/:slug"
            element={
              <ProductDetails
                products={products}
                onAddToCart={handleAddToCart}
                onOpenCart={handleOpenCart}
              />
            }
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
            element={
              <Checkout
                cartItems={cartItems}
                cartTotal={cartTotal}
                onClearCart={clearCart}
              />
            }
          />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/admin-login" element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute isAdmin={isAdmin} />}>
            <Route
              path="/admin"
              element={
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onResetProducts={resetProducts}
                  onLogout={logout}
                />
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        cartTotal={cartTotal}
      />
    </div>
  );
}
