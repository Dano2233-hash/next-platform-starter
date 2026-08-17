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
import { useAuth } from './hooks/useAuth';

export default function App() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const { cart, orders, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, totalItemCount, createOrder } = useCart();
  const { isAdmin, login, logout } = useAuth();

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const handleAddToCart = (product, pkg = null, qty = 1) => {
    addToCart(product, pkg, qty);
    setCartDrawerOpen(true);
  };

  const handleBuyNow = (product, pkg = null) => {
    addToCart(product, pkg, 1);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Top Main Navigation */}
      <Navbar
        cartCount={totalItemCount}
        isAdmin={isAdmin}
        onLogout={logout}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        cartTotal={cartTotal}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                cartTotal={cartTotal}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                cartTotal={cartTotal}
                onCreateOrder={createOrder}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/admin-login"
            element={
              <AdminLogin
                onLoginSuccess={(u, p) => login(u, p)}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAdmin={isAdmin}>
                <Admin
                  products={products}
                  orders={orders}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onUpdateStock={updateStock}
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
