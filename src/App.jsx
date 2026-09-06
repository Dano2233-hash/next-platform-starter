import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Layout Components
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

// Custom Hooks
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();

  // Custom persistent hooks
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefault } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { isAdmin, login, logout } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, selectedPackage = null, quantity = 1) => {
    addToCart(product, selectedPackage, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    const pkg = product.packages && product.packages.length > 0 ? product.packages[0] : null;
    addToCart(product, pkg, 1);
    navigate('/checkout');
  };

  const handleOrderSuccess = (newOrder) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const updated = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Navbar cartCount={totalItems} />

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
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
            path="/product/:slug"
            element={
              <ProductDetails
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
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
                onOrderSuccess={handleOrderSuccess}
              />
            }
          />

          <Route path="/order-success/:orderId" element={<OrderSuccess />} />

          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={login} />}
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
                  onToggleStock={toggleStock}
                  onLogout={logout}
                  onResetToDefault={resetToDefault}
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
